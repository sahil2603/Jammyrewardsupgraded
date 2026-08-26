/**
 * JammmyRewards Leaderboard Proxy
 * Holds the Upgrader + RustMagic API keys privately (never sent to browsers).
 * The site calls this Worker; this Worker calls the real APIs server-side,
 * where CORS restrictions and Referer requirements don't apply.
 *
 * Set the two secrets in the Cloudflare dashboard under
 * Settings -> Variables and Secrets -> "Add" (as Secret, not plain text):
 *   UPGRADER_API_KEY
 *   RUSTMAGIC_API_KEY
 * Nothing needs to be hardcoded in this file.
 */

// Lock this to your real domain once the site is live, so other sites can't
// ride on your Worker or burn through RustMagic's 1-request/15-min limit.
const ALLOWED_ORIGIN = '*'; // e.g. 'https://sahil2603.github.io'

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

async function fetchUpgrader(apiKey) {
  const res = await fetch('https://api.upgrader.com/leaderboard/connect-by-key', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Referer': 'upgrader.com' },
    body: JSON.stringify({ apiKey }),
  });
  if (!res.ok) throw new Error('Upgrader API error: ' + res.status);
  const data = await res.json();
  const wagers = (data.wagers || []).map(w => ({ rank: w.rank, name: w.username, wager: w.wager }));
  return { casino: 'upgrader', wagers, meta: { leaderboard: data.leaderboard, currentEntry: data.currentEntry } };
}

async function fetchRustMagic(apiKey, fromTime, toTime) {
  let apiUrl = 'https://api.rustmagic.com/api/affiliates-data/users';
  const params = new URLSearchParams();
  if (fromTime) params.set('fromTime', fromTime);
  if (toTime) params.set('toTime', toTime);
  if ([...params].length) apiUrl += '?' + params.toString();

  const res = await fetch(apiUrl, { headers: { 'x-api-key': apiKey } });
  if (!res.ok) throw new Error('RustMagic API error: ' + res.status);
  const data = await res.json();
  const list = Array.isArray(data) ? data : (data.users || []);
  const wagers = list.map((w, i) => ({ rank: i + 1, name: w.username || w.name, wager: w.wager || w.wagered }));
  return { casino: 'rustmagic', wagers };
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }

    const url = new URL(request.url);
    const casino = url.searchParams.get('casino');

    if (!casino || !['upgrader', 'rustmagic'].includes(casino)) {
      return new Response(JSON.stringify({ error: 'Pass ?casino=upgrader or ?casino=rustmagic' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders() },
      });
    }

    try {
      let result;
      if (casino === 'upgrader') {
        if (!env.UPGRADER_API_KEY) throw new Error('UPGRADER_API_KEY secret not set in Cloudflare');
        result = await fetchUpgrader(env.UPGRADER_API_KEY);
      } else {
        if (!env.RUSTMAGIC_API_KEY) throw new Error('RUSTMAGIC_API_KEY secret not set in Cloudflare');
        result = await fetchRustMagic(
          env.RUSTMAGIC_API_KEY,
          url.searchParams.get('fromTime'),
          url.searchParams.get('toTime')
        );
      }

      return new Response(JSON.stringify(result), {
        headers: {
          'Content-Type': 'application/json',
          // Small cache cushion — also helps stay under RustMagic's 15-min rate limit
          // if multiple visitors load the page around the same time.
          'Cache-Control': 'public, max-age=60',
          ...corsHeaders(),
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: String(err) }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...corsHeaders() },
      });
    }
  },
};
