# Formación y trayectoria · tarjetas académicas

## Direction
- Local extension of TM, Experience mode. Preserve palette, Portfolio Sans, native scroll, Lenis and surrounding sections.
- Two distinct academic surfaces, 1:1.22 columns on desktop and compact stacked mobile cards. Engineering has the wider, blue-tinted surface. No parent card, no third graduation card.
- Visible border, 12px radius and subtle diffuse shadow explicitly requested; narrowly exempt from generic taste lint for this section only. Hover increases shadow and accent border while all text stays stable. Only links have pointer cursors.

## Content and assets
- CBTis 147, 2019–2022; Programming Technician; professional license 15938245.
- Technical description shortened to its existing first factual sentence. No new claims.
- ITM / TecNM, 2022–present, in progress ninth semester; existing approved academic description unchanged; specialty, 94/100, expected completion 2027 integrated in degree facts.
- Data from education.ts and site.ts. Future data entry remains source for expected year, never a degree obtained.
- Existing authentic logos reused unmodified with contain and white logo wells; source provenance remains public/ASSET-CREDITS.md. CBTis source is the official header emblem; ITM source is the joint TecNM/ITM header image.
- License link goes to the existing government consultation portal, not a direct personalized verification or PDF. Portal returned 403 during external check. Degree page returned 502; curriculum PDF loaded. Preserve real official destinations, do not claim license independently verified.

## Motion and interaction
- Heading line masks and transforms from local useScroll/useTransform. Card slot offsets start .96 to start .48; main translation 24px and scale .96→1 end at .78 progress, opacity at .65. Legible before midpoint; no reverse exit on continuing down.
- Three internal groups (logo/period/status, copy, facts/actions) begin .04/.14/.24, complete in .28 progress. Blue top stroke scaleX accompanies reveal.
- No timers, React state per frame, sticky, scroll locks, new library or extra scroll distance. Logo object-fit contain, no image filters.
- Reduced motion uses identical DOM and final opacity/transform; all content remains selectable and semantic.

## Verification and evidence
- Browser validation in .tmp/education/validation.json: 1440 and 390px, ES/EN, dark/light; scroll interpolation, unchanged transform while paused, final before midpoint, no exit hiding, loaded original logos with sufficient source pixels, keyboard Tab/focus outline, hover shadow with stable transform, live reduced motion. 320px resize no cuts/overflow, console errors 0.
- App snapshot comparison proves only education heading moved into Journey; research/credentials/languages and all other section markup intact. No global CSS, dependencies or other component edited for this task.
- Targeted functional test updated from obsolete station tabs to two cards, locale, license, milestone and links. Test passes. TypeScript, Vite build and scoped ESLint pass.
- docs/screenshots/education/{desktop,mobile}-{es,en}-{dark,light}.png: eight final-layout stills, captured with reduced motion to show complete section. They are static layout evidence; normal progress independently exercised in the browser script.
- Reference marketplace/preview and Motion docs available. Preview visually inspected, no code copied, bought or migrated.
- Impeccable engine unavailable (curl missing); direct project context used, detect CLI unavailable. Taste lint passes with narrowly documented user-requested border/shadow exceptions.

## Visual assessment
- Academic identity and study hierarchy lead; two independent surfaces contain concise content, useful facts and real actions. Engineering receives additional area and subtle blue fill rather than inflated empty height.
- Full final stills reviewed at both sizes/themes/locales; mobile engineering title wraps naturally over two lines at 390px. No stretched logo or clipped content.
- Preserve global product/design documents; pre-existing documentation drift outside this section remains out of scope.

## Review correction
- Independent review requested replacing Unicode external-link glyphs with the existing 24px-viewBox arrow SVG family. Journey now reuses Icon with a 14px display size; link labels and destinations unchanged.
- All eight corrected stills were recaptured in .tmp/education/corrected-review and docs/screenshots/education. Independent reviewer marked the sole finding resolved and returned a ship disposition for these academic cards, not for the full portfolio.

## Documentation boundary
- Independent source pass checked Journey.tsx, Journey.css, education.ts, App.tsx and site.ts against PRODUCT.md, DESIGN.md and .impeccable/design.json, plus the existing validation report and screenshot inventory. This documentation pass did not rerun browser or build checks.
- This ordinary extension retains the global palette, Portfolio Sans and theme variables. Local card dimensions, title sizes, border/shadow exceptions and scroll reveal do not become global tokens or rules.
- Existing global documentation drift is recorded, not repaired: DESIGN.md still describes education tabs and the earlier page order, and the sidecar narrative still refers to the retired interactive badge. Global documentation's earlier lack-of-browser-evidence statements describe its original extraction; they do not invalidate the local evidence recorded here.

