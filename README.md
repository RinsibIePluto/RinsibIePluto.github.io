# Cyrune website

These files are the developer website for Google Play and AdMob, served at https://cyrune.app.
Copy everything in this folder (including `.nojekyll` and `CNAME`) to the root of the public repo
`RinsibIePluto.github.io`; GitHub Pages publishes it from the main branch. `CNAME` tells GitHub to
serve the site on cyrune.app (DNS at Cloudflare: four A records to GitHub Pages, www → CNAME, DNS only).

| File | Public URL | Used for |
| --- | --- | --- |
| index.html | https://cyrune.app/ | Developer website on the Play listing |
| cyrune/privacy.html | https://cyrune.app/cyrune/privacy.html | Privacy policy link in Play Console |
| cyrune/terms.html | https://cyrune.app/cyrune/terms.html | Terms of service link (trader status) |
| play/ | https://cyrune.app/play/ | The game in the browser (built by `python3 build-web.py`) |
| app-ads.txt | https://cyrune.app/app-ads.txt | AdMob seller verification |

Support email in the privacy policy: jasonleroux10000000000@gmail.com.

## Content pages

`/ciphers/`, `/about/`, `/contact/`, `sitemap.xml` and `robots.txt` are generated: run
`python3 build-web.py && python3 site-src/compute-examples.py && python3 site-src/build-ciphers.py`.
The worked examples are computed with the game's own cipher code, so they always match the game.
