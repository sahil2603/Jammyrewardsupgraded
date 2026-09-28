# JammmyRewards — Changelog

This file tracks meaningful changes to the site, kept up to date after each change so anyone
picking this project up (including a future me) can see what's actually been built and why,
without re-deriving it from scratch.

Newest entries at the top.

---

## 2026-09-29: Masked leaderboard names + one slot request at a time

- **Masked names:** both leaderboards (Power.win and DegenCity) now show masked usernames on the podium and in the table: the first 2 characters, stars, and the last 2 on longer names (SAHIL2603 → SA****03, ruly → ru**). The Share on X text uses the same masking. The search box still matches real names so players can find themselves, but results show masked. The Vault player list is unchanged, since players need their real name there to claim it.
- **One slot request at a time:** a player can have only one open slot request. It stays open until Jammmy awards coins on it or deletes it (the same rule as his admin Active list). The Cloudflare worker enforces it in a single SQL statement, so double-clicks or two tabs can't get around it; a blocked attempt gets a 409 with the waiting slot's name. On the page, the form locks with a "Your request is in the queue" banner naming the waiting slot.

---

## 2026-09-28: Power.win $1,000 bi-weekly prize pool

- The Power.win leaderboard now pays the top 10 out of a **$1,000** pool: 1st $300, 2nd $200, 3rd $130, 4th $100, 5th $75, 6th $55, 7th $45, 8th $35, 9th $30, 10th $30. The table lives in `LB_CASINO_PRIZES.powerwin` and overrides whatever prizes Power.win's API reports.
- The prize pool tile and the home page race card now say $1,000 (previously $350).
- New link-preview image (`og-share.jpg`, now 1200×630, supplied by Sahil): JAMMMYREWARDS wordmark, "$1,000 bi-weekly leaderboard" with Power.win, the jar mascot with Jammmy coins, code JAMMMY and the partner logos. Replaces the old "$10,000 given away" image.
- The New (Power.win) page has a new "Bi-weekly leaderboard" card above Live races. It shows $1,000, a live countdown to the end of the current 2-week cycle, all 10 prizes and a button to the leaderboard.

---

## 2026-09-27: Home hero v2 (wordmark back)

- The hero is centered on the big **JAMMMYREWARDS** wordmark again. It uses the rainbow gradient, letters flip in one by one, and a soft glow and a gentle wave run through the letters afterwards. Under it is "Wager · Climb · Get paid" and the original tagline.
- The Jammmy jar is back as the mascot (full rainbow jar), with rings and orbiting coins. The Vault card and Vault-linked jar fill were removed from the hero. Beside the jar: the Power.win race countdown and Kick status. Buttons are back to Explore bonuses / Join loyalty / Leaderboards.
- The Vault section further down is more compact.

---

## 2026-09-27: Home page redesign + smooth scrolling

- **New hero:** "Wager. Climb. Get paid." with a word-by-word reveal and a moving colour mesh. The Vault jar sits on a stage with spinning rings and orbiting Jammmy coins, and its fill level now matches the real Vault %. Three floating live cards show Vault % to payout, the Power.win race countdown and $350 pool, and Kick live status. Also added a tap-to-copy JAMMMY chip and partner logos.
- **Motion:** smooth scrolling site-wide (Lenis, inlined; mouse wheel only, phones keep native scroll, nested scroll areas unaffected). Added scroll reveals and hero parallax, a slanted marquee that speeds up and skews with scroll speed, 3D tilt + spotlight on cards and magnetic buttons (desktop only). The "How it works" line draws itself as you scroll.
- **Sections:** stat tiles, a bento grid (bonuses, live races with animated podium, Jammmy Coins with a spinning coin, slot/battle requests) and 4-step "How it works". Also a Vault showcase with an animated progress ring, partner cards with a rotating border beam and Leaderboard buttons, a Kick "screen" for Watch Live, and a closing call-to-action.
- **Copy fixes:** removed claims that weren't true any more ("$2,000+ weekly prizes, paid every Monday", "Bronze to Diamond tiers").
- **Performance:** offscreen sections pause their animations, the hero video pauses when scrolled away and never has a filter on it, and everything animates with transform/opacity. Respects reduced-motion.

---

## 2026-09-27: Leaderboard, Power.win page and Slot Library refresh

- **Leaderboard redesigned:** animated partner tabs, prize-pool tile, a segmented countdown with a race progress bar, and a code-copy/Join tile. The top 3 now sit on a podium with a crown and glow. Full standings show wager bars and prize column, search ("Find your name"), and a show-all toggle (first 10 visible).
- **Power.win (New) page redesigned:** aurora hero with a spinning logo ring, one-tap code copy, and a Sign up button. Also added a stat strip, an animated 0→30x "unlock" track for the cash match, a lossback medallion, "More ways to win" cards, race prize ladders, the $1,000 bounty card and a 3-step "How to get started". All offer text is unchanged.
- **Slot Library:** added 228 recently launched and upcoming slots from 24 providers (catalog now 785) with images and release dates. It now defaults to a "Newest releases" sort, has All / New releases / Coming soon / Full reviews chips, and shows NEW / SOON badges. Upcoming slots show their release date instead of a Request button and are left out of the request autocomplete.

---

## 2026-09-27 — Partner cards, Power.win bonus, partner count
- Verified Partners cards are compact again: max 340px each and centred (they stretched across the page once there were only two); max 420px, centred, on tablets/phones.
- Bonuses page: Power.win card is live. Ribbon "Newest Partner" and a working **Claim Bonus** button to https://power.win/?aff=jammmy (was a disabled "Coming Soon").
- Home stats: "Verified casinos" now counts **2 partners**.

## 2026-09-27 — RustMafia removed
- **Site:** removed the RustMafia partner card (home), leaderboard preview card, leaderboard tab, bonus-code card, footer logo, vault player filter, profile claim card, "Redeem via RustMafia" option, the RustMafia prize table and all related styles. Added the missing Power.win filter to the vault players list.
- **Worker:** removed `fetchRustMafia` and RustMafia from the partner lists, so it's no longer fetched by the leaderboard proxy, the wager/vault sync, claim approval or the verify list. Redemptions to RustMafia are refused ("no longer available"). Verify Players, the pending badge, the duplicate-accounts check and the Users list now only consider current partners (Power.win, DegenCity).
- **Kept on purpose:** the display name "RustMafia" is still used to label *old* records (past redemptions, activity log), so history reads properly. No database rows were deleted; past coins, claims and redemptions are untouched.
- Optional: delete the `RUSTMAFIA_API_KEY` secret in Cloudflare and `rustmafia.png` / `share-rustmafia.png` from the repo.

## 2026-09-27 — Users list: verified accounts only
- Admin → Users now shows only **verified (approved) accounts on current partners** (Power.win, DegenCity, RustMafia) as "✓ Casino: username" badges tinted per partner. Pending/rejected claims and retired casinos (Upgrader, RustMagic) are no longer listed; users with none show "No verified casino accounts". Filtered in the worker (`/api/admin/users`) and in the page. Nothing is deleted from the database.

## 2026-09-27 — Dismiss duplicate-account flags
- Each flag under **Possible Duplicate Accounts** (Overview) has a **✓ Seen · Dismiss** button. Dismissing hides it for all admins (stored in `app_state` key `dup_dismissed`, no migration needed).
- A flag is identified by what's shared *and which accounts share it*. If another account later joins the same shared wallet / payout account / casino username, it's a new situation and the flag shows up again.
- "N dismissed flags hidden · Show them again" brings them all back if needed.
- Dismiss and restore are recorded in the Activity Log; admins only (mods get 403).

## 2026-09-27 — Discord login: configurable app + visible errors
- The Discord app used for login is now set in Cloudflare instead of being hard-coded: `DISCORD_CLIENT_ID` (variable) + `DISCORD_CLIENT_SECRET` (secret), optional `DISCORD_REDIRECT_URI` (defaults to https://jammmyrewards.com/). The website reads the client ID from the new `/api/auth/config`, so switching Discord apps needs no code change. Falls back to the old app ID if the variable isn't set.
- Failed logins now tell the player (toast) instead of silently failing, and the worker translates Discord's errors: wrong ID/secret (`invalid_client`), redirect not registered in the Discord app, expired/used code, missing secret.
- Cancelling on Discord's approval screen just returns to the site quietly.

## 2026-09-27 — Redemptions: readable payout queue
- Admin **Redemptions** now use the same queue layout as slot/battle requests. Pending view is sorted oldest first and numbered, with a header like "3 to pay · $120.30 total".
- Each card: player name large, "⏱ 18h ago" + exact time + transaction ID, and the **dollar amount big and green** on the right (coins underneath).
- Payout details as labelled tiles: casino payouts show **PAY ON** (Power.win / DegenCity / RustMafia) + **TO USERNAME**; crypto shows **SEND** (USDT…), **NETWORK** (TRC20…) and the full **TO WALLET** address. Username and wallet each have a **Copy** button.
- The PAY ON tile shows the partner's logo (Power.win, DegenCity, RustMafia) tinted in that partner's colour; Power.win's black background is blended out so it sits cleanly on the card.
- Actions: green "✓ Mark Paid", "Reject & refund", Delete as a small outline button on the right. Paid/rejected cards say so instead of showing buttons.

## 2026-09-27 — Slot & battle requests: readable queue
- Admin **Slot Requests** and **Battle Requests** redesigned as a numbered queue (oldest first, "N in queue" counter) so Jammmy can read them at a glance on stream.
- Slot cards: queue number, the slot's catalog picture, big slot name, "from <user> · provider · ⏱ 2h 5m ago", and the player's note in a clear quote box ("NOTE FROM …"). Result badge on the right ("Not played yet" / Profit · $420 / coins awarded).
- Battle cards: "BATTLE WITH <name>" as the headline, then labelled tiles: Mode, Format, Position, Crazy mode (Yes/No), Borrow (Yes/No), Cases, instead of small chips.
- Admin controls (result, amount, award coins, Save, Delete) moved to a quieter strip at the bottom of each card; Delete is now a subtle outline button on the far right so it isn't hit by accident.
- **📺 Big view** toggle on both tabs: hides the controls and enlarges everything for reading during a stream; remembered per browser.
- Same element IDs and API calls as before; no worker change.

## 2026-09-27 — Staff activity log, mandatory coin notes, clearer activity
- **Admin → 🧾 Activity Log (admins only; mods don't see the tab and the API refuses them):** every successful staff action is recorded with who did it (ADMIN/MOD badge), what happened, to whom, and when: claim approve / reject / revoke (single and bulk, incl. revoke-all), coin add/deduct (with the note and balance before → after), redemption paid / rejected / deleted (with refunds), slot & battle request reviews/deletes (result, coins awarded, note), admin/mod role changes, vault edits, live notifications and manual wager syncs. Filters: person, category, free-text search; grouped by day; "Load older" paging.
- Logging happens centrally in the worker router, so it can't be skipped by any screen, and a logging failure never blocks the action itself. Failed/refused attempts aren't logged.
- **Manual coin changes need a note** (3–200 characters), enforced in the worker. The old two-prompt flow is replaced by a dialog: Add/Deduct toggle, amount, required note; the button stays disabled until both are filled.
- **Recent Activity (player profile):** manual changes now show the admin's note (e.g. "for testing · Added by the JammmyRewards team") instead of "Balance adjusted". Redemptions say where they went ("Redeemed to Power.win · JR-…" / "Redeemed for crypto · USDT · JR-…"). This fixes Power.win redemptions being labelled "Redeemed for crypto". Refunds of rejected/deleted redemptions show as "Redemption refunded" (new `redemption_refund` type; older refunds are recognised too).
- Admin tabs now sit in a 5-column grid (9 tabs).
- Requires `migration-audit-log.sql`.

## 2026-09-27 — Redeem only to verified casino accounts
- **Profile → Redeem Coins:** DegenCity / RustMafia / Power.win redemptions now pay out only to the player's own **verified** (admin-approved) account on that casino. The free-text username box is gone; the card shows the verified username instead ("✓ JammmyFan_77 · Verified Power.win account").
- Casinos without a verified account show a 🔒 on their button and a "No verified … account" note with a **Verify account** button that scrolls to Casino Accounts; Redeem stays disabled for that method. Crypto redemptions are unchanged.
- **Worker:** `/api/redeem` ignores any username sent by the browser for platform payouts, looks up the player's approved `casino_links` row for that casino, and refuses with 403 if there isn't one, so it can't be bypassed by calling the API directly.
- Fixed the "Funds are credited within 1–7 days" note splitting into columns.

## 2026-09-26 (night, cont.) — Old reviews removed
- Removed the 7 hand-written review cards (Jiggy's Pot O'Gold, Soaked by Seamen, Fury of Anubis, Pirots 5, Viva Lock Vegas, Kicker Mania, Triple Launch Fortune Wild). The Reviews page is now just the Slot Library.
- Removed the duplicate top search bar (the library has its own) and rewrote the page intro to match.

## 2026-09-26 (night) — Slot Library on the Reviews page
- **Slot Library** added under Jammmy's own reviews: all 557 slots from `slots-catalog.json` with search (name or provider), provider / volatility filters, sort (full review first, A→Z, biggest max win) and "Show more" paging (24 at a time).
- Each card shows facts from our own catalog only (name, provider, volatility, max win, image when the catalog has one) and links out to Slot-Streamers: **Read review ↗** goes straight to the review for slots that have one (verified once and stored as `"ss"` in the catalog); others get **Find review ↗**, which opens their search for that name. No text or images are copied from Slot-Streamers.
- **Request** button on each card opens Request a Slot with that slot filled in.
- The top search bar on the Reviews page now also filters the library.
- **Slot pictures:** 414 of 557 slots now have real game art (was 114). Images were looked up on SlotsLaunch game pages (the same image host the catalog already used); ambiguous same-name matches were skipped rather than risk showing the wrong game.
- Slots with no art available get a themed card instead of a flat gradient: slow-rotating light rays, a theme icon picked from the name (Egypt 🏺, dragons 🐉, Vikings ⚔️, candy 🍭 …), sparkles and the title. If a real image fails to load, the card falls back to this automatically.
- Fixed wrong providers on 24 catalog entries while matching (e.g. San Quentin and Mental → Nolimit City, Big Bamboo → Push Gaming, Cash Patrol → Pragmatic Play).

## 2026-09-26 (late, cont.) — Request a Slot redesign
- **Request a Slot redesigned** in the same style as Request a Battle, themed purple/pink/gold to match the slot button art: full-width hero with the slot card (float + light sweep), live canvas coin shower bursting from the 777 reels (spinning gold coins with gravity, twinkling purple sparkles, a bigger "jackpot" burst every few seconds; runs only while the page is visible, off for reduced motion), staggered entrance animations, animated gradient title, "1 Pick a slot · 2 Say why · 3 It pays → you earn" strip.
- Popular picks restyled (glow/lift on hover, fill the row); tapping one fills the form, smooth-scrolls to it, flashes the field and marks the picked card.
- Form as numbered sections; submit shows a coin-burst celebration from the button. Request a Battle submit now shows a matching spark burst. My Requests rows show date + time.
- Same fields, IDs and payload as before.
- slots-catalog.json: Wanted Dead or a Wild provider → Hacksaw Gaming; Big Bass Bonanza max win 4,000x → 2,100x.

## 2026-09-26 (late) — Battle page redesign, Loyalty guide, mobile bar
- **Request a Battle redesigned** to match the new battle button art: full-width electric-blue hero with the battle card, live spark bursts from the crossed swords + drifting embers (canvas; runs only while the page is visible, off for reduced-motion), "1 Pick the mode · 2 Choose your cases · 3 Watch it live" strip, form as numbered sections (01–05) with blue-glow chips and side-by-side Crazy mode / Borrow toggles. Same fields, IDs and submit payload as before.
- **Loyalty page**: new "Get started in 4 steps" guide with real screenshots of the site (`guide-1..4.webp`): log in → claim casino username → play under code JAMMMY / vault → collect & redeem. Fixed the outdated "redeem at 500 coins" line (real minimums: 1,000 casino balance / 10,000 crypto).
- **Mobile bottom bar**: Home · Leaderboard · Req. Slot · Req. Battle (replaces Bonuses and Discord, which are still in the ☰ menu / footer).
- "Send me a test" notification button now only shows for admins.
- Admin tabs: tidy 4×2 grid on desktop (no scrollbar); swipeable row with hidden scrollbar and edge fade on phones.

## 2026-09-26 (night) — Profile redesign, request dates, new buttons, Power.win race dates
- **Profile redesigned**: header card (avatar, name, coin balance + $ value, daily claim in one row); casino accounts as a 3-across grid (locked Approved/Pending cards no longer show a dead "Choose screenshot" button); balanced two-column rows **Redeem | Notifications** and **Redemption history | Recent activity**, each pair equal height; every history line shows date + time + "x ago". Stacks cleanly on phones.
- **Admin**: 🕒 date/time chip ("Requested … (5h ago)") on every redemption (+ paid time), slot request, battle request, and casino claim ("Submitted …", new `casino_links.submitted_at`); approved claims show "✓ Approved by X · date" (worker was dropping reviewed_by/reviewed_at from the list — fixed). Tabs on one row (scrolls sideways if needed). Phones: card icons hidden so details get the full width. Date parsing fixed for both D1 `YYYY-MM-DD HH:MM:SS` (UTC) and ISO timestamps.
- **New Request a Slot / Request a Battle buttons** (cropped to their neon border, transparent rounded corners), cache-bust `?v=4`.
- **Power.win countdown** now uses Power.win's fixed 2-week race cycle (anchor Thu 10 Sep 2026 00:00 UTC → current race Sep 24 → Oct 8) instead of the generic schedule. `POWERWIN_CYCLE_ANCHOR` in index.html if the schedule ever changes. **Join Power.win** button (Jammy's affiliate link) under the countdown on the Power.win tab.
- **Header fix**: on 1100–1500px screens the profile chip ran off the right edge and the page scrolled sideways (up to 280px). Header now collapses in steps: username hidden ≤1500px, socials ≤1320px, ☰ menu ≤1120px.
- Profile redemptions now include the payout method (worker). Migration: `migration-claim-submitted.sql`.

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
