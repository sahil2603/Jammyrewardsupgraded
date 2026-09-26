/* JammmyRewards service worker -- shows push notifications (live alerts + coin credits) even
   when the site isn't open, and opens the right page when one is tapped. Push only; it does
   NOT cache the site, so deploys show up immediately like before. */

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; }
  catch (e) { d = { title: 'JammmyRewards', body: event.data ? event.data.text() : '' }; }

  const options = {
    body: d.body || '',
    icon: 'favicon-192.png',               // colour logo shown next to the text
    badge: 'notification-badge.png',       // small white icon for the Android status bar
    tag: d.tag || undefined,               // same tag replaces the old one instead of stacking
    renotify: !!d.tag,
    data: { url: d.url || '/' },
    vibrate: d.kind === 'live' ? [120, 60, 120] : [80],
  };
  if (d.image) options.image = d.image;    // stream thumbnail (Android / Windows show it large)
  if (d.kind === 'live') options.actions = [{ action: 'watch', title: '▶ Watch now' }];
  if (d.kind === 'coins') options.actions = [{ action: 'open', title: 'View balance' }];

  event.waitUntil(self.registration.showNotification(d.title || 'JammmyRewards', options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = new URL((event.notification.data && event.notification.data.url) || '/', self.location.origin).href;
  event.waitUntil((async () => {
    if (target.startsWith(self.location.origin)) {
      const open = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const c of open) {
        if (c.url.startsWith(self.location.origin)) {
          await c.focus();
          if ('navigate' in c) { try { await c.navigate(target); } catch (e) {} }
          return;
        }
      }
    }
    await self.clients.openWindow(target);
  })());
});
