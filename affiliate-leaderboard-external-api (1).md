# Affiliate Leaderboard API

Pulls a leaderboard of one streamer's own referred users only.

## Endpoint

```
GET /api/external/v1/affiliate-leaderboard
```

## Query params

| Param | Required | Values | Notes |
|---|---|---|---|
| `affiliateId` | yes | uuid | Must match the key's scope |
| `metric` | no (default `GGR`) | `WAGER` \| `GGR` | Use `WAGER` for wagering amount |
| `period` | no | `BIWEEKLY` | Fixed, self-resetting 2-week window. Recommended — see below |
| `from`, `to` | no | ISO date | Custom range instead of `period`. Max 90 days apart |
| `limit` | no (default 25) | 1–100 | Result count |
| `page` | no (default 1) | integer | Pagination |

Use `period` instead of `from`/`to` when polling repeatedly — it always
returns the same fixed window during a cycle and flips automatically
once it ends, so you never need to compute dates or risk mixing two
cycles' wager together.

## Example

```
GET /api/external/v1/affiliate-leaderboard?affiliateId=<id>&metric=WAGER&period=BIWEEKLY&limit=20
x-api-key: pwr_aff_xxxxxxxxxxxxx
```

```json
{
  "version": "v1",
  "metric": "WAGER",
  "preset": "BIWEEKLY",
  "period": { "from": "2026-09-10T00:00:00.000Z", "to": "2026-09-24T00:00:00.000Z" },
  "entries": [
    { "rank": 1, "player": "9F2A6C...", "valueCents": 452000 }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 1, "pages": 1 }
}
```


## Errors

| Status | Meaning |
|---|---|
| 401 | Missing or invalid `x-api-key` |
| 403 | Key isn't scoped to the requested `affiliateId` |
| 400 | Bad/missing params (e.g. invalid `period`, `metric`, date range) |


BaseUrl: https://api.power.win