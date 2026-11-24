# NXT Financial Group: design notes

The site is built like a product page from Apple or Tesla: film and photography carry it, the
type is one quiet typeface set large, and the motion is tied to scrolling. One device runs through
every page: **the frame**. The home page opens on a film that fills the screen and draws back into
a rounded frame as you scroll; every page ends on the same shore in evening light, where the frame
opens back up to fill the screen.

## Look

- **Palette** (`app/globals.css`, `@theme`): near-black navy `#060918` (text and dark sections),
  white, pale grey `#f5f5f7`, deep navy `#13224f`, action blue `#2c52c9` (links and the one
  coloured button). Gold is kept to check marks and hairlines: `#866a20` on light,
  `#d8bd7c` on dark.
- **Type:** Inter (variable, with its display optical size), bundled through
  `@fontsource-variable/inter` and imported in `app/layout.tsx`. Headings are weight 600 to 640
  with tight tracking; labels above headings are small, grey and in sentence case.
- **Shapes:** photographs and tiles have a 28px radius; buttons are pills; surfaces are separated
  by a hairline or by a change of background, not by outlines or drop shadows.
- **Building blocks** (classes in `globals.css`): `.display-xl`, `.display`, `.display-sm`,
  `.lead`, `.chip` (small label), `.btn` with `.btn-primary`, `.btn-cta`, `.btn-outline`,
  `.btn-ghost`, `.btn-light`, `.link`, `.tile`, `.card`, `.field`, `.on-dark`.

## Film and photographs

Everything is in `/public/videos` and `/public/media`, and `lib/media.ts` is the one list of what
is used where.

| File | What it is |
|---|---|
| `videos/hero-wide.mp4`, `hero-tall.mp4` (+ `.jpg`) | Home page opening film, 16:9 and 9:16, 10 second loop |
| `videos/dusk-wide.mp4`, `dusk-tall.mp4` (+ `.jpg`) | Closing film above the footer: the same shore, evening grade |
| `media/chapters/<solution>.jpg` + `-depth.jpg` | One 5:4 photograph per discipline, with its depth map |
| `media/<name>.jpg`, `media/depth/<name>.jpg` | The site's photographs, upscaled, with depth maps |

**How the films were made.** They are not stock footage. They are the site's own beach photograph
brought to life: the family stays still, the surf creeps in, the clouds drift and the far water
glints, on a loop whose last frame meets its first. The evening version is a tighter framing with
a colour grade. The scripts are in `tools/media/` (see the README there).

**To use real footage instead**, replace the four `.mp4` files and their `.jpg` still frames in
`/public/videos`, keeping the names. Nothing else needs to change. What works best under the
headline: a locked-off or slow shot, open sky in the top third, the subject in the middle.

**Photographs.** The originals were 640 to 1200 pixels wide. They were enlarged two times with
Real-ESRGAN, and each has a depth map from Depth Anything V2, which is what lets a still
photograph move like a slow camera (`lib/depth-gl.ts`). Two invented company names that appeared
inside the AI-made office photographs were removed (a sign on a window, text on a tablet).

## Motion

All of it follows the scroll position. Each piece has a plain fallback, listed last.

| Where | What happens | Component |
|---|---|---|
| Home, top | Headline lifts away; the film draws back into a rounded frame | `FilmHero.tsx`, `Film.tsx` |
| Home, introduction | The paragraph fills in word by word | `Manifesto.tsx` |
| Home, numbers | Count up once, when they arrive | `motion.tsx` (`Counter`) |
| Home, solutions | The section holds; the list steps through five disciplines while one photograph dissolves into the next, each with depth | `SolutionsFilm.tsx` |
| Home, independence | The headline fills in word by word; the carrier dots light in a wave | `ScrollWords.tsx`, `CarrierDots.tsx` |
| Any photograph with depth | Moves like a slow camera as it passes; leans towards the pointer | `DepthPhoto.tsx` |
| Every page, end | The evening film rises as a frame and opens to fill the screen | `ClosingFilm.tsx` |
| Header | Clear at the top, frosted once moving, dark glass over dark sections | `Nav.tsx` |

- **Reduced motion:** no film plays, nothing pins, the frames stay full size, text is solid.
- **Phones:** the solutions section becomes a row of cards to swipe; the films switch to their
  tall versions.
- **No JavaScript:** every section is a normal block and all text is visible (`<noscript>` rule in
  `app/layout.tsx`).
- **Pinned layouts** turn on from CSS media queries (`scripting`, width, height, motion); the same
  strings are in `lib/use-media.ts` so the script and the stylesheet agree.
- Scroll-linked fades use `useRamp` (`lib/ramp.ts`) rather than the array form of `useTransform`;
  the comment there explains why.
- Films have a pause button, load only when near the screen, pause when off screen, and do not
  load at all for visitors who ask for reduced motion or data saving.

## Home page sections (`app/page.tsx`)

1. `FilmHero`: the original headline, two buttons, the three assurances.
2. `Manifesto`, then four numbers.
3. `SolutionsFilm`: annuities, life, care, Medicare, disability; Home & Auto linked beneath.
4. The plan section, carriers, the captive-agent comparison, testimonials (one sideways row),
   questions, insights, the newsletter.
5. `ClosingFilm` and the footer come from `app/layout.tsx`.

## Wording added with the design

These lines were written with the design and should be reviewed like any other copy:

- "Explore annuities" and the other four link labels in the solutions section; "Also from NXT:
  Home & Auto insurance".
- The six points in the captive-agent comparison in `app/page.tsx`. They paraphrase the original
  site's paragraph on the same point; the three about captive agents go beyond it.
- "Every dot is a carrier on our list." and "One carrier." under the dots.
- Photograph descriptions (alt text) in `lib/media.ts`.
- Small labels: "Page not found", and the "Tools" heading in the footer.

The rest of the copy is carried over from the original site.

## Things to know

- The newsletter form does not send anywhere yet; it only shows its confirmation.
- Carrier counts differ between places: the copy says "70+", the list in `lib/carriers.ts` has 69.
- The Home & Auto pages still use the office atrium photograph; there is no home or car picture
  in the project.
