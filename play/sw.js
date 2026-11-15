/* Cyrune offline cache. Bump CACHE when releasing a new version. */
const CACHE = "cyrune-863f0328";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png", "./fonts/fonts.css", "./fonts/archivo-latin-400-normal.woff2", "./fonts/archivo-latin-500-normal.woff2", "./fonts/archivo-latin-700-normal.woff2", "./fonts/martian-mono-latin-400-normal.woff2", "./fonts/martian-mono-latin-600-normal.woff2", "./fonts/martian-mono-latin-700-normal.woff2", "./fonts/saira-stencil-one-latin-400-normal.woff2"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const put = (req, res) => { if (res && (res.ok || res.type === "opaque")) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; };
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (req.mode === "navigate") {
    /* network first so new versions arrive; cached copy when offline */
    e.respondWith(fetch(req).then(res => put("./index.html", res)).catch(() => caches.match("./index.html")));
    return;
  }
  if (url.origin === location.origin || url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com")) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => put(req, res))));
  }
});
