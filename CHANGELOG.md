# JammmyRewards — Changelog

This file tracks meaningful changes to the site, kept up to date after each change so anyone
picking this project up (including a future me) can see what's actually been built and why,
without re-deriving it from scratch.

Newest entries at the top.

---

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
