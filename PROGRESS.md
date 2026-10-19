# PORTFOLIO — Session Handoff (Oct 19, 2026, late)

Build GREEN + automated E2E 50/50 GREEN. Only a visual browser pass remains.

## How to run
```
cd H:\LAUNCH\PORTFOLIO
npm run dev        # dev server → http://localhost:3000 (currently RUNNING, pid in data/dev.pid)
npm run build      # production build (verified green, 21 routes)
npm start          # production server
```

## What is BUILT (all code complete + compiled)
- Public view `/` — single-viewport, no scroll, black/white terminal theme, JetBrains Mono + Press Start 2P
  - profile pic, bio, status light (blink modes + color), latest project block
  - tabs: UPDATES / PROJECTS / CERTIFICATES / SEMINARS / ACTIVITY (GitHub-style heatmap, 52 weeks)
  - live clock + date + mini calendar, social buttons (IG/LI new tab, EMAIL → /request)
  - REQUEST CV button → `/request`
  - "MattDevs" login button (header) → `/login`
  - Pixel companion walking the bottom line: click = "Hi!", double-click = "Sup?", auto-resumes after ~3s
  - visitor tracking (15s heartbeat, localStorage vid, no IPs)
- `/request` — CV request form (name*, company*, phone, message). Submit button shrinks → 10x10 pixel
  courier walks the lane → deposits envelope in the pixel mailbox → walks off → "SUBMITTED_" shows
  in the button's place. Real POST to /api/request.
- `/login` — password → TOTP 2FA (QR enrollment on first login), rate-limited
- `/admin` — guarded console (redirects to /login if not authed):
  overview stats + live visitor feed, visitors telemetry (durations like 10s/50s, live poll 4s),
  activity matrix editor (click cell = cycle level 0-4, "log today" with note), CRUD for
  projects/certificates/seminars/updates, CV requests inbox (auto-marks read), site settings
  (avatar upload w/ client resize, status color+mode, socials, latest project), security
  (change password, reset 2FA), mini calendar + live clock in chrome
- Full REST API under `/api/**` (auth, track, request, admin CRUD) with zod validation
- DB: `node:sqlite` at `data/portfolio.db` (auto-migrates + seeds on first access)
- Auth: scrypt password + otplib v13 TOTP + HMAC-signed httpOnly cookie sessions

## State notes
- Build: `next build` green (Next 15.5.28, patched for CVE) — re-verified after latest fixes
- Automated E2E: 50/50 passing (36 core + 14 CRUD) via temp scripts:
  `C:\Users\Len\AppData\Local\Temp\opencode\e2e.mjs` and `e2e_crud.mjs`
  run with `E2E_PASSWORD=<pw> node <script>`; full TOTP login exercised with
  `H:/LAUNCH/PORTFOLIO/data/totp_gen.mjs`
  ⚠ RUNNING E2E RE-ENROLLS A TEST TOTP SECRET (the suite completes the enroll step).
  After any E2E run, clear it so Matt can enroll his own authenticator:
  `UPDATE admin SET totp_secret=NULL WHERE id=1`
- `tsc --noEmit` clean. `npm run lint` NOT configured (next lint wants interactive setup)
- Fixes this session: null-prototype sqlite rows (`plainRows`/`plainRow` in db.ts incl. getAdmin),
  partial settings PUT (all fields optional), avatar 4.5MB cap in settings zod schema,
  PixelCompanion 60fps setState→imperative canvas.left, companion canvas width bug (row-count*SCALE→col*SCALE)
- DB exists at `data/portfolio.db`; admin password in `data/INITIAL_CREDENTIALS.txt`
  (`95T22xgWj8o5lWde`), TOTP already enrolled (setup returns mode=verify now)
- Seeded demo content (editable from admin): MEDMINDER 2.0 project, 3 updates, 2 certs, 1 seminar
- .env.local has a random SESSION_SECRET (do not commit/delete unless rotating sessions)
- sharp install-script is blocked by npm allowlist — harmless (no next/image used)

## TODO — next session
1. Visual browser pass (what automation cannot check):
   - http://localhost:3000 → layout/companion/tabs/heatmap on desktop AND a narrow window
   - /request → real submit, watch shrink→courier→mailbox→SUBMITTED animation end-to-end
   - /login → password `95T22xgWj8o5lWde` → TOTP code from authenticator → admin renders
   - admin: log activity, add a project, change profile pic, live visitors vs incognito window
2. Fix anything the visual pass surfaces (pixel art tuning, small-screen spacing)
3. Replace placeholders in admin settings: instagram URL, linkedin URL, real email, bio
4. Optional extras (not requested, ask first): deploy (Vercel needs a real DB swap —
   SQLite is local-disk, so VPS/local is the natural host), favicon polish, README,
   configure ESLint (`next lint` interactive prompt was skipped)

## Project map
H:\LAUNCH\PORTFOLIO\
  src/app/{page,login,page,request,admin,api/...}     routes
  src/components/{public,admin,request,login,...}     UI
  src/lib/{db,session,auth,totp,tracker}.ts           backend core
  data/                                              db + credentials (gitignored, created on first run)
