# JammmyRewards — Changelog

This file tracks meaningful changes to the site, kept up to date after each change so anyone
picking this project up (including a future me) can see what's actually been built and why,
without re-deriving it from scratch.

Newest entries at the top.

---

## 2026-10-10 (d): Witch hats fixed on iPhone Safari

- **Problem:** on iPhone, the hats sat too low on the jar, the home vault card's jar was pushed to the right, and a stray ring showed around the hat brim.
- **Hats:** they now sit in a box with a fixed shape instead of relying on the browser to work out the SVG's height, which Safari got wrong, so they're the same size and position in every browser. Every other Halloween drawing (skeleton, bats, pumpkins, cauldron, skull) also got an explicit shape.
- **Home vault card:** the jar picture is left untouched. The hat sits in its own overlay that bobs in sync with the jar, instead of wrapping the image.
- **Brim ring:** removed the green landing "poof" ring, which was the stray ring on Safari. The hop and squash stay.

---

## 2026-10-10 (c): Vault jar matches the real fill level

- The jar video was picked by rounding UP into 8 steps, so 90% showed video 8, the completely full, celebrating jar. Videos 1–7 actually show 1/7 to 7/7 full, and 8 is full plus the celebration.
- It now rounds DOWN, so the jar never looks fuller than the vault is. For example, 90% shows the 6/7 jar. The full jar only shows at 100%.
- Same fix on the home vault card.

---

## 2026-10-10 (b): Halloween v2 — faster mascot, new witch hat, skeletons, new share image

- **Faster loading:** the home page went from about 3.1 MB to about 1.1 MB.
  - **Jar videos:** were 1080p and 290 KB–1.5 MB each, with an unused audio track. They are re-encoded as `jar-1…8.webm` at 512px, still 60fps and still transparent, at 38–380 KB each (about 80% smaller in total). They look the same.
  - **Instant mascot:** each jar video now has a still `jar-N.webp` poster (about 10 KB), so the mascot appears straight away while the video loads. When the vault level changes, the poster changes too.
  - **Images:** `powerwin.png` (1.2 MB) is now `powerwin.webp` (49 KB). The coin, the Request Slot and Request Battle tabs, and the iPhone jar images are now webp too.
  - **Loading screen:** hides as soon as the page is ready, normally about 1s, with a 2.4s cap. It no longer waits for every video to finish. Three bats now orbit the pumpkin.
- **New witch hat:**
  - Drawn in more detail, with shading, a stitched patch, an orange band with a gold buckle that catches the light, and a green star charm.
  - The floppy tip bends in three segments and the charm swings.
  - Every few seconds it hops off the jar and lands with a squash and a green "poof" ring.
  - It now also appears in the Vault-full celebration. On iPhone, where a still jar replaces the video, it is placed to fit that image.
- **Skulls and skeletons:**
  - Now and then a skeleton peeks in from the side of the screen, waving, chattering its jaw and saying something like "Boo!", "Use code JAMMMY 💀" or "Bone appétit 🦴". It appears less often on phones.
  - Every page now has a graveyard strip above the footer: tombstones, crosses, a fence, a dead tree, glowing pumpkins, skeleton hands rising from the ground, a floating skull ghost and fireflies.
  - The leaderboard's graveyard line has a small animated skull, and the Vault-full confetti includes 💀.
- **New `share-powerwin-halloween.png`:**
  - Redesigned from scratch: a big moon with bats and the Power.win logo over a night sky.
  - "I'M ON THE LEADERBOARD!" with "Use code JAMMMY".
  - A leaderboard panel with slime and a pumpkin for 1st.
  - The Jammmy jar wearing the witch hat.
  - A graveyard with a skeleton waving from the corner.
- **Checked:** all 10 pages on desktop and on phones (390px, 360px and the iPhone still-image jar) have no errors and no sideways scrolling. The theme turns off correctly with `?halloween=0`, and reduced-motion mode still works.

---

## 2026-10-10: Halloween theme (October only)

- **When it's on:** automatically from 1 Oct to 31 Oct (the visitor's own date). It switches itself off on 1 Nov, so nothing needs to be removed afterwards.
  - Preview any day with `?halloween=1`; turn it off with `?halloween=0`. The choice is kept for that browser tab.
  - Everything is layered on top of the normal site. Leaderboards, vault, coins, requests and admin work exactly as before; there is no worker change.
- **Look and motion:**
  - Purple stays as the main colour, with pumpkin-orange and toxic-green accents (wordmark, gradient headings, scroll bar, background glow).
  - Drifting fog along the bottom of every page and spider webs in the top corners, with a spider that drops down on its thread.
  - The background sparkles are now embers and fireflies, and the lightning is purple.
  - A glowing moon sits behind the home jar, with clouds and little bats passing in front of it. Bats fly across the screen now and then.
  - Flickering neon headings and LIVE badges.
  - On desktop, embers trail behind the mouse.
- **Jammmy mascot:** wears a swaying witch hat in the nav, the home hero, the home vault card and the Vault page.
- **Vault:**
  - The Vault page jar floats over a bubbling green cauldron with flames and rising bubbles.
  - The progress bars are bubbling potion.
  - The "Vault full" celebration turns spooky: orange, green and purple confetti, 🎃🦇👻🕸️, and "Spooky Community Vault".
- **Leaderboard:**
  - Same podium layout, with pumpkin-orange glows and 🎃 instead of the crown on 1st.
  - The prize line is now "🪦 Graveyard line" ("$X to the graveyard line").
- **Cards:** slime drips on the top edges, plus a flickering candle-glow on hover.
- **Loading screen:** a jack-o'-lantern lights up while the page loads. It shows once per tab and for 3.2s at most.
- **Banner:** "Happy Halloween from Jammmy" with a live countdown to 31 Oct.
  - The × shrinks it to a small pumpkin; tap the pumpkin to open it again. It stays shrunk once closed.
  - On phones it shrinks by itself after 9s.
- **Share on X:** during Halloween, the Power.win share uses `share-powerwin-halloween.png`, which has a moon, bats, webs, a witch hat on the logo, slime, pumpkins and a "Halloween Edition" badge.
- **Phones and accessibility:**
  - Phones get a lighter version: fewer bats, one fog layer, one web, static drips and no mouse trail.
  - `prefers-reduced-motion` turns the motion off and skips the loading screen.

---

## 2026-10-08 (e): "Leaderboard" wording + Discord pictures on the leaderboards

- **Wording:** our boards are leaderboards, not races. Power.win's own races on the New page keep their name.
  - Leaderboard page: "LIVE" pill, "Power.win wager leaderboard", "Current leaderboard / Previous leaderboard" (just "Current / Previous" on phones under 440px), "LEADERBOARD STARTS IN / ENDS IN / ENDED", "This leaderboard: …", the waiting card ("Waiting for the current leaderboard to finish", "See the live leaderboard →"), the loading and empty texts, and the previous-leaderboard subtitle.
  - Home page: the hero card says "Leaderboard ends in", the bento card and marquee say "Live leaderboards", and How-it-works says "counts toward the leaderboard".
- **Pictures:** verified players' Discord pictures now show on the leaderboard podium and in the full standings, for both current and previous.
  - **Worker:** `withLbAvatars()` adds `avatarUrl` for approved Power.win claims. It runs one small query, kept in memory for 60s per worker instance.
  - Names stay masked. If a picture fails to load, the player's initial shows instead.

---

## 2026-10-08 (d): Race notice shows UTC only

- Removed the visitor's local time from the "New leaderboard starts…" notice (e.g. "(Oct 9, 5:30 AM your time)" for someone in India), which read as confusing. It now just says "New leaderboard starts 9 Oct, 00:00 UTC and runs until 23 Oct, 00:00 UTC".

---

## 2026-10-08 (c): Full standings polish (current + previous race)

The podium is unchanged. The table below it gets:
- **Board:** a slow glowing border that travels around the edge, and a **● LIVE** / **FINAL** / **SOON** tag next to "Full standings".
- **Rows:**
  - Rows slide in one after another with a short blur-in, and wagered amounts **count up** from $0 when the board loads.
  - A colour bar on the left of each row: gold, silver or bronze for the top 3, green for the other paid places.
  - Hover lifts and glows the row and tilts the avatar.
- **Rank badges:** top-3 badges are metallic with a moving shine; the top-3 rows get a soft sheen and avatar rings; ranks 4+ are round badges, green while in the prize places.
- **Prizes:** shown as glowing chips in each row's colour. On the previous race they read "$300 **won**".
- **Prize line:** a gold "🏆 PRIZE LINE · TOP 10 GET PAID" divider after the last paid rank, with players outside it slightly dimmed.
- **Current race only:** players outside the prizes show "$X to the prize line".
- Visitors who have "reduce motion" turned on get a still version.

---

## 2026-10-08 (b): Races moved to 9 Oct → 23 Oct (00:00 UTC), new 14-day schedule

- **New schedule:** the last race on the old schedule was 24 Sep → 8 Oct. From **9 Oct 00:00 UTC** races run 9 → 23 Oct, 23 Oct → 6 Nov, 6 → 20 Nov, … every 14 days.
  - Worker: `powerWinRaces()`. Site: `powerwinRaces()`. The two use the same rules.
  - This replaces the earlier "count from 9 Oct" override for the 8 Oct race.
- **Exact windows:** every race now counts exactly its own window via Power.win's from/to range. The rolling 14-day BIWEEKLY feed is never used for the race board. If the fetch fails, the site shows "couldn't load" instead of wrong numbers.
- **Before 9 Oct 00:00 UTC:**
  - The live pill says "STARTING SOON" and the countdown reads "RACE STARTS IN".
  - The board shows an empty state ("The new leaderboard starts 9 Oct at 00:00 UTC…").
  - A gold notice says "New leaderboard starts 9 Oct, 00:00 UTC and runs until 23 Oct, 00:00 UTC", with the visitor's local time.
- **After the start:** the notice reads "This race: 9 Oct 00:00 UTC → 23 Oct 00:00 UTC".
- **Dates:** race dates are shown in UTC ("Oct 9, 2026 → Oct 23, 2026 (00:00 UTC)").
- **Previous race:** the 24 Sep → 8 Oct race (already frozen), until the 9 Oct race ends.
- The vault is unaffected.

---

## 2026-10-08: Current race counts from 9 Oct 00:00 UTC

- The 8 Oct → 22 Oct Power.win race counts wagering from **9 Oct 00:00 UTC** (5:30 AM IST), using a new `POWERWIN_FETCH_OVERRIDES` entry `'2026-10-08': { from: '2026-10-09', to: '2026-10-22' }`.
- Until 9 Oct 00:00 UTC the board is empty. It never falls back to the rolling 14-day feed, which would show wagering that doesn't count.
- When the race ends on 22 Oct, its "previous race" standings use the same 9 Oct → 22 Oct window.
- The dates and countdown on the site are unchanged (8 Oct → 22 Oct). The vault isn't affected; it always counts all wagering.

---

## 2026-10-06: Cut D1 reads (free plan was at 78% of 5M rows/day)

- **Cause:** every open tab polled `/api/vault` every 30s. Each call rebuilt the vault from several tables and did a full scan of `coin_transactions`, which grows with every daily claim and bulk coin send. `/api/casino-wagers` did the same. The per-minute cron's push cleanup also scanned every push subscription even with nothing queued.
- **Worker:**
  - `/api/vault` and `/api/casino-wagers` are shared responses, served from a 60s cache. That's an in-memory copy per worker instance (which works on workers.dev) plus Cloudflare's edge cache (which only kicks in on a custom domain), and simultaneous requests share one build.
  - `/api/casino-wagers` no longer depends on who's asking; the site works out the "You" tag itself.
  - The cron creates indexes once (`idx_coin_tx_type`, `idx_coin_tx_user`, `idx_page_views_created`, `idx_casino_links_status`), remembered in `app_state` as `indexes_v1`. Totals, profile activity and analytics now read only matching rows.
  - The push flush stops after a 1-row check when the queue is empty.
- **Site:** the vault refresh runs every 2 minutes instead of 30s, and only while the tab is visible.

---

## 2026-10-05: Vault page overhaul + new Active Users score

**Vault page**
- **Faster:** the worker reuses one Power.win result for 45s per instance (and shares an in-flight request) instead of fetching it 2–3 times per page request. Live, the player list took ~4.7s and the vault number ~2s.
- **No fake numbers while loading:** the placeholder "80% complete / 200 Coins remaining / 6 Players" is gone. It shows "—", "Loading…" and shimmering skeleton rows until real data arrives.
- **Explains itself:** a new 4-step strip: wager under JAMMMY (every $10 = 1 coin), claim your username, vault fills and you're paid, and not claimed yet means your coins wait in the vault.
- **Clearer stats:**
  - Total wagered since 10 Sep
  - Wagered by verified players
  - Wagered by players who haven't claimed yet
  - Players
  - Verified players (replaces the meaningless "Live Leaderboards")
- **"Coins waiting for their owners"** replaces "Unclaimed wagering": "9 players wagered $11,144 but haven't claimed their username yet…", with the coins waiting in the vault and a "Claim my username →" button. The stray "Open Settings" button is gone.
- **"Players in the vault"** replaces "Live Players":
  - **All / ✓ Verified / Not claimed yet** tabs.
  - Each player has a status chip: ✓ Verified · Discord name, ⏳ Being verified, or Not claimed · *is this you?* (links to Profile).
  - A "You" tag on your own row, and coins shown under each wager.
- **Phones:** the jar is bigger and centred above the progress, and the players header no longer wraps onto three lines.

**Admin → Active Users: new score**
- The score counts only:
  - slot requests ×4
  - battle requests ×4
  - free 5-coin claims ×2
  - days visiting the site ×3 (once per day, so refreshing doesn't boost it; total page views are shown too)
  - +1 per $100 wagered on Power.win in the chosen period (exact from/to window, matched to verified accounts)
- Live-days and live-time tracking were removed, and the 5-minute "still here" heartbeat is no longer sent.

---

## 2026-10-05: Discord profile pictures on every player list

- Players' Discord profile pictures now show on:
  - Admin: Users (with a ring in the admin, mod or player colour), Verify Players, Slot Requests, Battle Requests, Redemptions, Activity Log (staff) and Active Users.
  - The public **Vault player list**, for **verified** players only, with the 🥇🥈🥉 badge on the top 3.
- If someone has no picture, or it fails to load, their initial shows instead.
- The **leaderboards keep masked names with no pictures**, so players there can't be identified.
- **Worker:** the slot and battle request lists, redemptions and Activity Log now include `avatar` / `actor_avatar`. `/api/casino-wagers` includes `avatar` for verified claims only.

---

## 2026-10-05: Vault rebuilt on exact totals, "Vault full" celebration, previous-race fixes

**How the vault works now**
- Every player's vault wagering is their **exact all-time Power.win total since 10 Sep 2026**: the sum of every 14-day window, fetched with Power.win's from/to range.
  - Finished windows are fetched once, 2 hours after they close, and stored in `vault_cycle_totals` / `vault_cycles_done`, so they never change again. The current window is fetched live.
  - This replaces the rolling-ledger estimate. Wagering before 24 Sep is now counted (SAHIL2603 +$8,119, GoingtheGulag +$598), and the vault matches the race board to the cent.
- When the pool reaches **10,000 coins**:
  - every **verified** player is paid their share automatically, including old wagering on former partners such as DegenCity;
  - coins belonging to **unclaimed or not-yet-verified** players stay in the vault and roll into the next one. They are paid to the owner once that player is verified.
- **Payout guard:** a payout needs at least one verified player to be owed coins, and at least 24h since the last payout. Unclaimed coins carry over forever, so this stops the vault paying out again every few minutes if it refills quickly.
- **One vault number everywhere:** the admin Vault tab, Overview and the public pages all show the payout pool (the admin tab showed an older formula before).
- `/api/vault` now also returns `pool.last_distributed_count`, the number of players paid.

**"Vault full" celebration**
- After a payout, every visitor sees the vault at 100% with a full-screen celebration **once per payout, per browser**:
  - rotating light rays, confetti, the full jar bouncing with coins, "VAULT FULL!" and a filling 100% bar;
  - "X coins were just paid out to N verified players";
  - buttons: Check my coins (logged in) or Claim your username, and Nice!
- On close, the vault drops to its real level. It only shows for payouts in the last 7 days, and the animation switches off for visitors who have "reduce motion" turned on.

**Leaderboard**
- The Power.win tab sits on top with the Current / Previous race toggle centred **below** it (they were side by side).
- **Previous race** before the first real JAMMMY race (started 24 Sep) has finished shows "Waiting for the current race to finish", the date it ends, a "RESULTS IN" countdown and a button back to the live race. The podium is hidden in this state.
- When a race ends, its exact standings for that race's window (no bets after the end) show as the previous race. 2 hours after the end they are **frozen** in `lb_snapshots`; the cron does this even if nobody visits, and from then on they're served from the database and never change.

No D1 console step: all new tables create themselves.

---

## 2026-10-05: Reasons for rejected claims

- **Admin/Mod → Verify Players:** "Reject" (and "Reject Selected") now opens a dialog instead of a plain confirm box.
  - Five quick-pick reasons: screenshot doesn't show the username, username doesn't match, not signed up under code JAMMMY, blurry or cropped screenshot, belongs to someone else.
  - A free-text box (up to 300 characters) for anything else.
  - A reason is optional; the button reads "Reject without reason" when the box is empty.
  - Bulk reject sends the same reason to every selected player.
- **Player's Profile:** a rejected claim now shows a red "✕ Rejected" badge and a notice: "Your claim for ALICE99 was rejected", the reason from Jammmy, and "Fix it and submit again below". The claim form underneath stays open as before.
- **Activity Log:** rejections now record the reason.
- **Worker:**
  - `reject-claim` and `bulk-reject-claims` accept `reason` and store it in a new `casino_links.reject_reason` column.
  - The column adds itself the first time it's needed, so **no D1 console step is needed**.
  - `/api/profile` returns the reason.
  - Submitting a new claim clears the old reason.

---

## 2026-10-05: Power.win race cards redesigned

- Each race card is now styled like power.win's own race banners:
  - A big heading in the site's display font: **$70 DAILY RACE**, **$1,075 WEEKLY RACE**, **$5,290 MONTHLY RACE** (the current pools).
  - Above the cards, a headline banner reads **$10,000 MONTHLY RACE** (Power.win's advertised race) in shimmering gold, with checkered flags and speed lines. It replaces the old "🏁 Live races" heading.
  - A **live countdown** to that race's reset: daily 00:00 UTC, weekly Monday 00:00 UTC, monthly the 1st 00:00 UTC. These times match power.win/races, so no API is needed.
  - A colour per race: green daily, purple weekly, gold monthly.
- Effects:
  - a waving checkered flag
  - streaking speed lines
  - a glowing border that runs around the card on hover (always on for Monthly)
  - a shine sweep on 1st place
  - a gold shimmer on the $10,000 heading
  - a bobbing trophy on Monthly
  - lift-on-hover rows
- Animations switch off for visitors who have "reduce motion" turned on.
- Layout: three across on desktop, two plus Monthly full-width on tablets, stacked on phones.
- Each card links to "Live standings ↗" on power.win/races.

---

## 2026-10-05: Power.win races + share image

- **Power.win page:** the "Live races" section now shows Power.win's three site-wide races as static cards. This replaces the two weekly USDT cards (Originals / Win Multiplier). The prizes come from power.win/races and there's no live data, so update them here if Power.win changes them.
  - **Daily ($70):** 15 / 12 / 10 / 8 / 5 USDT
  - **Weekly ($1,075):** 250 / 175 / 150 / 125 / 100 USDT
  - **Monthly ($5,290):** 1,000 / 750 / 600 / 450 / 350 USDT
  - Each card shows the top 5 places plus "+ more places paid", and the fine print links to power.win/races for live standings.
  - Three columns on desktop, two plus one on mid-size screens, and stacked on phones.
- **Share on X:** added `share-powerwin.png` (Jammmy's "I'm on the leaderboard" Power.win image). The share button already looks for `share-<casino>.png`, so it works with no code change.

---

## 2026-10-05: Previous race, send coins to everyone, Active Users

**Leaderboard: Current race / Previous race**
- A toggle under the Power.win tab switches between the live board and the **final standings of the race before it**.
- Previous mode shows a grey "FINAL RESULTS" pill, "RACE ENDED", the old race's dates, and "final standings" instead of a live time. Share on X then posts "FINAL RESULTS".
- **Worker:** `?casino=powerwin&race=previous` fetches the previous 14-day cycle from Power.win with its exact from/to dates, using the same count-from override if that race had one. The numbers don't move once a race is over, so the result is edge-cached for 10 minutes.
- The prize pool tile now says "Top 10 paid" (it said Top 3).

**Admin → Users: 🎁 Send coins to everyone**
- One button opens a dialog: coins per player (quick picks 50–1,000), a required note, and a live total ("100 × 523 players = 52,300 coins").
- Send needs two taps; the first spells out exactly what will happen.
- **Worker:** `POST /api/admin/bulk-coins` with `{mode:'all'|'ids', amount, note, discord_ids}`.
  - Adds coins only, never deducts, with a maximum of 100,000 each.
  - Writes one transaction row per player with the note, all in a single D1 batch.
  - Sends a coins notification to subscribed phones and records the action in the Activity Log ("Sent 100 coins to ALL 523 users").

**Admin → 🔥 Active Users (new tab, admins only)**
- Ranks players for Today / 7 days / 30 days by:
  - 🔴 days on the site while Jammmy was live (×10)
  - 📅 active days (×5)
  - slot + battle requests (×4)
  - daily claims (×2)
- Each row also shows ⏱ live time, balance and last seen.
- **Sending coins:** "+ Coins" on any row sends to that one player. Checkboxes plus "Send to selected" or "Send to all listed" use the same bulk dialog.
- **Tracking:** logged-in page views now include the session, and logged-in players send a 5-minute heartbeat while the tab is visible.
  - **Worker:** `recordActivity` stores one row per player per UTC day in `user_activity` (visits, live visits, pings, live pings), counting whether Jammmy was live from the existing `kick_live` state.
  - Heartbeats count at most once every 4 minutes per player, so they can't be spammed.
  - The table creates itself on first use, so **no D1 console step is needed**.
- Kick chat itself isn't readable from here, so "live" means on the site while Jammmy is streaming.

**Not done yet**
- The Power.win daily/weekly/monthly races page needs Power.win's races data feed. Their site is behind a Cloudflare human check, and the feed isn't part of the affiliate API.
- The Power.win "Share on X" image (`share-powerwin.png`) hasn't been received yet.

---

## 2026-10-02: Leaderboard prizes visible on phones

- On phones (640px and narrower) the leaderboard hid its whole Prize column to save space, so only the top 3 podium cards showed a prize. Now every paid rank (Power.win: 1st–10th) shows its prize in green with a 🏆 under the wagered amount. Unpaid ranks just show the wager, vertically centred. The header reads "Wagered / prize".
- Desktop is unchanged. Tested at 360px and 390px wide with no sideways scrolling.

---

## 2026-10-02: DegenCity removed

- **Site:** removed DegenCity everywhere a visitor sees it:
  - **Home page:** the "Official partners" logo strip, the cashback chip in the Bonuses tile and the partner card. The partner count now reads "1 partner · Verified casino".
  - **Other pages:** the DegenCity leaderboard tab and its slots-only note, the DegenCity bonus card, the vault players filter, the profile claim card, "Redeem via DegenCity" and the footer logo.
  - The single remaining partner card, bonus card and leaderboard tab are centred so nothing looks half-empty.
- **Worker:**
  - Removed `fetchDegenCity` and DegenCity from every partner list. It's no longer fetched by the leaderboard proxy, the wager/vault sync, claim approval or Verify Players.
  - Redemptions to DegenCity are refused ("no longer available").
  - Verify Players, the pending badge, the duplicate-accounts check and the Users list now only consider Power.win.
- **Kept on purpose:**
  - The DegenCity name and logo still label *old* records (past redemptions, the Redemptions queue, the activity log), so history reads properly.
  - No database rows were deleted.
  - DegenCity wagering that was already banked in the vault before today still pays out at the next vault payout. New DegenCity wagering no longer counts.
- Optional: delete the `DEGENCITY_API_KEY` secret in Cloudflare and `share-degencity.png` from the repo. **Keep `degencity.png`**, since old redemptions still show it.

---

## 2026-10-02: A request unlocks once Jammmy responds, plus simpler request cards

**One request at a time, now released by Jammmy's response**
- Before, a player's open slot or battle request blocked them from sending another until it was *deleted*. Now it also unblocks the moment Jammmy (or an admin) clicks **Save** on it, after marking Profit / Loss / Didn't play or awarding coins. Deleting still unblocks too.
- An open request means `status` is not `'reviewed'`. Save sets `status = 'reviewed'`.
- Worker: both `/api/slot-request` and `/api/battle-request` check for an open request and insert in one atomic `INSERT … SELECT … WHERE NOT EXISTS`, so a double-click can't sneak two through. A blocked request gets a 409 with `code: 'request_pending'`, and battles also return which battle is pending.
- Worker: new `GET /api/my-battle-requests`, which returns the player's pending battle (or null). `/api/my-slot-requests` now includes `status`.
- Request a Battle now shows the same lock banner as Request a Slot ("Your battle request is with Jammmy…"), both when the page loads and if a send is refused. The form greys out and the button reads "🔒 One request at a time".
- No database change needed.

**Simpler admin request cards (Slot + Battle Requests)**
- The tabs are now just **⏳ To review** (open requests, oldest first) and **✓ Done** (saved ones, newest first).
- The result dropdown became three one-tap chips: 🎉 Profit · 😬 Loss · 💤 Didn't play. Next to them are an optional $ amount, 🪙 coins (slots only), ✓ Save and 🗑.
- A hint line on each card explains that Save closes it and lets the player send a new one. Clicking Save with nothing picked shakes the chips instead of saving an empty result.
- After Save, the card slides out of To review into Done. On Done the button reads "✓ Update", for fixing a result later.
- Mods still see these lists read-only, with no controls.

---

## 2026-09-30: Power.win race counts wagering from 10 Sep

- For the current Power.win race (shown on the site as **24 Sep → 8 Oct**), the public leaderboard now counts wagering from **10 Sep → 8 Oct** (both 2-week cycles combined). The worker's new `fetchPowerWinRace` asks Power.win for `from=2026-09-10&to=2026-10-08` but sends the site the display dates (24 Sep → 8 Oct), so the dates and countdown shown are unchanged. `meta.fetchWindow` records what was actually counted.
- Controlled by `POWERWIN_FETCH_OVERRIDES` in the worker (keyed by the race's display start date). Races without an entry use the normal `period=BIWEEKLY` feed, so the next race (8 Oct →) goes back to normal automatically. If Power.win rejects the custom dates, the leaderboard falls back to the normal feed instead of going empty.
- Only the public leaderboard uses this. The Vault and the claim/verify checks still use the normal feed, so vault accounting is unchanged.

---

## 2026-09-29: Leaderboard "Show all" button fix

- The "Show all N players" / "Show top 10 only" button stayed on screen after switching to a leaderboard with 10 or fewer players (DegenCity), still showing the previous casino's count, e.g. "Show all 86 players" from Power.win. The code did hide it, but `.lbx-more{display:block}` overrode the `hidden` attribute. Added `.lbx-more[hidden]{display:none}` and the label is cleared when hidden.
- Checked the live data: DegenCity's feed really has 10 players with wagers this month, so the DegenCity board itself was already complete.

---

## 2026-09-29: Faster admin actions

**Worker (server):**
- **Approve / Bulk approve** no longer fetch both casinos' live leaderboards and rebuild the whole Vault ledger before answering; that step made Approve take seconds. Approval only marks the claim verified (crediting is done by the vault pool anyway), so the vault check is left to the cron, which is nudged (`last_vault_sync = 0`) to run it on its next tick, within 1-2 minutes. This also means vault payouts only ever run from the cron, so two can't overlap. Bulk approve also dropped a casino fetch whose result was never used.
- **Push notifications** (Add Coins, redemption refunds, slot-request rewards) and **Activity Log writes** now happen after the response is sent (`ctx.waitUntil`), so the button gets its answer without waiting for them. They still always run.
- The session/login lookup is done once per request instead of twice.
- Measured locally against SQLite with casino APIs taking 1.5s: Approve went from 1.7s to 0.12s, and Add Coins from 0.17s to 0.08s (more in real use, since phone notifications are no longer waited on).

**Page:**
- Clicking any admin action shows "…" on the button and fades its row immediately. On success, removing actions (approve, reject, revoke, mark paid, delete) slide the row out straight away. On failure, the row and button are restored.
- Lists refresh quietly after an action: old rows stay visible while the new ones load, with no "Loading…" flash and no replayed fade-in.

---

## 2026-09-29: Live search in the admin/mod Users tab

- The Users search now filters as you type (300ms after the last keystroke), and Enter searches immediately; the Search button still works. The old results stay on screen, dimmed, while the new ones load instead of flashing "Loading…", and only the newest search is allowed to show, so a slow earlier response can't replace the results for what's typed now.

---

## 2026-09-29: DegenCity leaderboard reads every page

- The DegenCity leaderboard only ever showed 10 players because the Cloudflare worker read just the first page of DegenCity's API. `fetchDegenCity` now keeps requesting `?page=2, 3, …` (up to 15 pages) until a page brings no new players, comes back shorter than the first, or the response says it was the last page. Players are de-duplicated by user id, so if DegenCity ignores `page` nothing is double-counted. Page 1 is requested exactly as before.
- The same function feeds the Vault sync, so verified DegenCity players outside the top 10 now have their wagering counted too.

---

## 2026-09-29: Mod panel fix + read-only request queues for mods

- **Blank mod/admin lists fixed:** the admin cards (users, claims, empty states, overview tiles) start invisible and fade in with an animation. On computers with animations turned off (Windows "Animation effects" off, i.e. reduced motion), the site switches all animations off, so those cards stayed invisible. The panel looked empty even though the data had loaded. They now show immediately when animations are off.
- **Mods can view Slot and Battle requests (read-only):** the Mod Panel now has Slot Requests and Battle Requests tabs. Mods see the full queue (Active/Awarded, notes, results, Big view) but no Save, Award, Delete or Delete All controls, and a "View only" note explains why. In the Cloudflare worker, only the two list endpoints moved from admin-only to staff (admin or mod); saving, awarding and deleting are still admin-only on the server.

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
