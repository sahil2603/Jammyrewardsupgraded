# JammmyRewards — Changelog

This file tracks meaningful changes to the site, kept up to date after each change so anyone
picking this project up (including a future me) can see what's actually been built and why,
without re-deriving it from scratch.

Newest entries at the top.

---

## 2026-09-26 (evening) — Mod role + push notifications
- **Mod role**: new `users.is_mod`. Mods get a trimmed "🛡 Mod Panel" with only **Verify Players** (approve/reject, single + bulk) and a **read-only Users** list. Revoking approved claims, coins, redemptions, vault, analytics, notifications and role changes stay admin-only — enforced in the Worker (`requireStaff` vs `requireAdmin`), not just hidden. Admins get Make Mod / Remove Mod on each user. Every approve/reject now records `casino_links.reviewed_by`, shown as "✓ Approved by X".
- **Push notifications** (Web Push sent directly from the Worker, no third-party service): "🔴 Jammmy is LIVE on Kick!" (with stream title + thumbnail) and "🪙 +X Jammmy Coins" whenever coins are credited (vault payout, admin add, redemption refund, slot-request reward — not deductions or the user's own daily claim). Friendly opt-in card after 8s (browser permission popup only after "Turn on"; "Not now" snoozes 7 days), Profile → 🔔 Notifications card with per-type toggles, "Send me a test" and turn-off. Logged-out visitors can get live alerts; logout unlinks coin alerts from the device. iPhone: works after Add to Home Screen (iOS 16.4+) — new `manifest.webmanifest`. New files: `sw.js`, `manifest.webmanifest`, `notification-badge.png`.
- **Live detection**: the cron checks Kick (official API if `KICK_CLIENT_ID`/`KICK_CLIENT_SECRET` are set, otherwise the public endpoint) and notifies on an offline→live change, at most once per 3h. Admin Overview has a 📣 Notifications card with stats and a manual **Send "Jammmy is live"** button. Sends are queued and flushed ≤40 per run (free-plan subrequest limit); dead devices (404/410) are removed automatically. The vault sync inside the cron is now throttled to ~10 min so the cron can run every 1–2 min for fast live alerts.
- Power.win admin diagnostic accepts `?from=&to=` to test the documented custom date range.
- Migration: `migration-mod-push.sql`. New Worker secret: `VAPID_PRIVATE_JWK`.

## 2026-09-26 — Power.win live, reset-safe vault, leaderboard-only username claims
- **Power.win is live**: default leaderboard tab, real bi-weekly period/countdown from Power.win's API, "Coming Soon" placeholders removed. Worker wires `fetchPowerWin()` into the leaderboard route, `KNOWN_CASINOS`, the vault and claim approvals.
- **Vault survives leaderboard resets**: `vault_checkpoints` now stores `period_key`, `last_seen_wager` and `carry_wager`. When a casino starts a new period, an approved/pending player's unpaid wagering is banked as carry and their checkpoint restarts at 0 — previously they earned nothing after a reset until they passed their old total. Unclaimed players' wagering still expires with the period. Migration: `migration-vault-periods.sql`.
- **Claims can only use real, unowned leaderboard usernames**: the Profile claim box is now a searchable picker fed by the new `GET /api/claimable-usernames?casino=` (everyone on that casino's live affiliate leaderboard, minus names with a pending/approved claim). Submit only enables after picking a name from the list. `/api/link-casino` re-checks server-side that the name is on the leaderboard and stores the leaderboard's exact spelling. A partial unique index (`idx_casino_links_one_active_owner`) guarantees one active owner per casino username, even for simultaneous submits. Rejected names become claimable again. Migration: `migration-claim-owner.sql`.
- **Fix: vault pool was inflated by Power.win.** Power.win's `period=BIWEEKLY` is a rolling last-14-days window (`period.to` = the moment of the request), so the reset-safe vault saw a "new period" on every sync and re-banked the same wagering as carry (pool showed 3,586 coins vs ~1,663 real). Worker now flags rolling windows, never resets on them, and stops sending the moving dates to the site countdown. Cleanup: `fix-powerwin-carry.sql`. Admin diagnostic accepts `?period=` to probe for a fixed/lifetime period.
- **Power.win running totals**: since Power.win only offers a rolling 14-day figure (every `period` value tested returns the same window), the worker keeps its own ever-growing total per player (`vault_rolling_totals` + `vault_rolling_log`) and the vault reads that instead. New wagering is logged when seen; aged-out bets drop out of the log at the same time they drop out of Power.win's window, so the total never goes down. Never double-counts; steady players can be credited up to ~14 days late. Only the scheduled sync writes it. Migration: `migration-rolling-ledger.sql`.
- **Fix: false "Shared wallet: null" duplicate flag.** Platform redemptions have no wallet address, so the duplicate check grouped every platform payout together as one shared wallet. Empty wallets are now skipped (and addresses trimmed), and a new check flags the same casino account receiving *platform* payouts for more than one Discord user. Admin flags now escape names and show casino display names.
- **Leaderboard**: Power.win is now the first tab (and still the default). On phones all three casino tabs stay on one row.
- **Mobile pass** (tested at 390px, 360px, 375px logged-out and 320px with the real fonts): fixed the Reviews search button being pushed off-screen on 360px phones (`.searchbar input{min-width:0}`), bigger vault refresh button on phones, claim-picker names wrap instead of clipping, vault count-up lands on a whole number (was briefly showing decimals like 1,662.85 until the 30s refresh). No horizontal scroll and no JS errors on any page.
- Vault "Last distributed" no longer shows a hardcoded "100 Coins / April 1" placeholder before the first real distribution.

## 2026-09 — Redemption minimums, request ordering, and Active/Awarded split
- Referral link on the Power.win page updated to `https://power.win/?aff=jammmy`.
- Redemption minimums now differ by method: 10,000 coins for crypto/address payouts, 1,000
  for casino platform redemptions. The redeem form unlocks at the lower threshold and
  independently checks eligibility per selected method, so someone with 1,500 coins can
  redeem via a platform but sees a clear "need X more" note if they switch to crypto.
- Slot/Battle Requests admin listings now show oldest-first instead of newest-first, for a
  natural FIFO processing queue.
- Added an Active/Awarded filter to both Slot and Battle Requests admin tabs. Once coins have
  been awarded (slots: `coins_awarded` > 0; battles: `profit_status = 'profit'`), a request
  moves into its own Awarded tab instead of staying mixed into the active queue; non-awarded
  requests stay in Active either way until manually deleted.

## 2026-09 — Claim flow: proof screenshots, mandatory fields, locking
- Users must now attach a proof screenshot (mandatory, not optional) alongside their casino
  username when claiming — enforced both client-side (Submit button stays disabled until both
  fields are filled) and server-side (API rejects a claim with no image).
- Submitting locks the whole card (username, file picker, button) until an admin approves or
  rejects it. A rejected claim reopens for a fresh attempt.
- Images are resized/compressed in-browser (max 900px, JPEG ~72% quality) before upload, so a
  full-resolution phone photo never gets sent as-is.
- Admin sees a thumbnail on each pending claim in Verify Players, click for a full-size
  lightbox view.
- Cleaned up the pending-claims row: removed the "Already credited / New / +X Coins" labels,
  which were leftover from the old immediate-crediting system and no longer mean anything now
  that coins come from the vault threshold, not per-claim approval.

## 2026-09 — Vault: corrected to a global-checkpoint model
- Reworked how the vault pool fills. It's no longer "approved users' individual pending coins"
  — it's driven by ALL wagering on the leaderboard, claimed and unclaimed alike, tracked via a
  shared wager checkpoint per (casino, player name).
- When the pool crosses 10,000 coins: every currently-verified player gets their own share
  paid out and their checkpoint advances. An unclaimed player's share stays uncounted and
  carries forward in full into the next cycle — if they claim later, their entire wagering
  history becomes payable at once, not just wagering from the moment they claimed.
- Approving a claim no longer credits coins directly — it only marks the claim verified; all
  crediting happens uniformly through the vault pool.
- Revoking a claim now correctly claws back both any already-distributed coins (capped by
  what's still in their balance) and resets their vault checkpoint, so a later re-approval
  recognizes their full wagering history again.

## 2026-09 — Power.win: new partner rollout
- Added Power.win across the site as a partner: Verified Partners section, Bonuses page,
  footer, leaderboard tabs (shown as "Coming Soon" until a real leaderboard API exists).
- Built a dedicated "New" showcase page: headline, offer cards (100% First Deposit Cash
  Match, High Roller Session Lossback), a "More Ways to Win" grid (Rakeback, Lossback,
  Cashboost, Weekly Bonus, VIP Bonus), a Weekly Live Races section with real reward tiers,
  and a High Roller Referral Bounty section.
- Logo went through two rounds of fixes: background removed/made transparent, then re-cropped
  after a "too tiny everywhere" report traced to large empty padding in the source canvas.
- `fetchPowerWin()` is written against their documented external API (bi-weekly leaderboard,
  real period dates) but deliberately NOT wired into the live leaderboard routing yet — still
  waiting on real API credentials and confirmation that the `player` field returns an actual
  username rather than a masked ID.

## 2026-09 — RustMagic removed entirely
- Pulled RustMagic from every surface: leaderboard tabs, Verified Partners, Bonuses, footer,
  admin Verify Players, and (importantly) the Profile page's claim inputs, so no new claims
  could even be submitted for it.
- Backend: removed `fetchRustMagic()` and all routing to it; the public API now returns a
  clean 400 for `?casino=rustmagic` instead of silently mixing in another casino's data.
- Existing (pre-removal) approved claims were left alone in the database as inert history —
  a bulk-revoke endpoint exists if that data ever needs cleaning up, but nothing was deleted
  automatically.

## 2026-09 — Redeem: added platform options alongside crypto
- Redeem now offers 5 methods via a tab selector: Crypto (existing currency/network/wallet
  flow), DegenCity, Upgrader, RustMafia, Power.win (platform username + a 24-hour credit
  note, vs. 48-72 hours for crypto).
- Fixed a real backend bug this surfaced: `crypto_currency`/`wallet_address` were still
  NOT NULL from before platform redemptions existed, so any platform-based redemption was
  silently rejected with a 500. Required a table rebuild (SQLite doesn't support dropping a
  NOT NULL constraint directly) to fix properly.
- Admin's Redemptions view now shows platform + username clearly for platform-based
  redemptions instead of always showing (blank) crypto fields.
- Fixed rejected redemptions incorrectly displaying as "Paid" in both the admin view and the
  user's own Redemption History — was a binary pending/not-pending check that didn't
  distinguish rejected from paid.

## Earlier this session
- Admin dashboard visual overhaul: tab icons, Slot/Battle Request cards, Users and
  Redemptions tabs upgraded to the same polished card style.
- Delete-all option added for Slot Requests and Battle Requests (double-confirmed, since
  it's permanent).
- Manual "Sync New Wagers Now" button for admin, independent of the Cron Trigger schedule.
- Live Players list on the Vault page simplified to show only rank/name/casino/wager, with
  a medal + glow treatment for the top 3.
- Fixed three images referencing a dead external domain (`jammmyslots.com`, a leftover from
  before a rebrand): the Request a Slot / Request a Battle sidebar icons, and the Kick logo
  in the "Watch Live" chip.
- Slot catalog expanded to 500+ titles across 26 providers, ~110+ with real images sourced
  from slotslaunch.com.

---

*This file is maintained alongside code changes — updated in the same push whenever
something changes, not as an afterthought.*
