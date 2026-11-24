# NXT Financial Group: design notes

The site is built around one idea: **one day stands for one working life.** The home page opens
at sunrise, the visitor drags the sun through five life moments, and every page closes on the
same landscape at night with the house lights on.

## Look

- **Style:** flat illustration. Solid colours, a 2 to 3px ink outline, hard offset blocks instead
  of soft shadows, no gradients or glows. All graphics are drawn in code (SVG and CSS); the only
  photographs left are real people and article images.
- **Palette** (`app/globals.css`, `@theme`): midnight `#080e28` (ink), navy `#1b3272`,
  sunrise gold `#e8b820`, sky `#dbe5ff`, cream `#fbf7ef`. Sky colours for each hour live in
  `lib/sky.ts`.
- **Type:** Bricolage Grotesque (headings), Plus Jakarta Sans (body), DM Mono (labels). The fonts
  are bundled with the site through `@fontsource` packages, imported in `app/layout.tsx`.
- **Building blocks** (classes in `globals.css`): `.flat` card, `.flat-hover`, `.flat-gold`,
  `.chip`, `.hl` (gold highlight), `.btn-primary`, `.btn-outline`, `.round-btn`.

## The landscape

- `components/scene/parts.tsx`: sun, moon, cloud, house, trees, car, mailbox, envelope, balloon, heart.
- `components/scene/Landscape.tsx`: hills, road and the parts above, anchored to the bottom of its
  parent. It reads its colours from CSS variables (`--hill-a`, `--hill-b`, `--tree`, `--glow`,
  `--ground`), so one drawing works at any hour. `data-active` (0 to 4) plays one small story.
- `lib/sky.ts`: sky and hill colours by time (0 sunrise, 1 sunset), plus the time each inner page
  sits at (`PAGE_TIME`, keyed by the page's eyebrow label) and each solution (`SOLUTION_TIME`).

Where it appears:

| Place | Component | Notes |
|---|---|---|
| Home hero | `SunHero.tsx` | Draggable sun, arrows, dots, arrow keys. Moments are in `MOMENTS`. |
| Inner page openers | `PageHero.tsx` | Sky and sun position from the page's time of day. |
| A statement band | `SceneBand.tsx` | Used for the vision statement on About. |
| Above the footer | `NightStrip.tsx` | Night, lights on. Added once in `app/layout.tsx`. |
| Not found | `app/not-found.tsx` | The same night scene. |

## Home page sections (`app/page.tsx`)

1. `SunHero`: the five moments, each linked to a solution page.
2. `Manifesto`: the introduction paragraph; words fill in as it scrolls.
3. `CrossBands`: carriers and solutions sliding in opposite directions.
4. `SolutionsRail`: on wide screens the section pins and scrolling moves the cards sideways.
   On phones, tablets and with reduced motion it is a plain grid. Cards are `SolutionPanel`.
5. `PlanBoard` (+ `MeetingClock`), carriers, `CarrierDots` comparison, testimonials, FAQ, insights.

Solution illustrations are in `components/illos/SolutionIllos.tsx`, one function per solution slug.

## Wording added with the design

These lines were written with the redesign and should be reviewed like any other copy:

- Hero moments in `SunHero.tsx` (`MOMENTS`): "You are still earning." and the four that follow.
- Labels inside the illustrations in `SolutionIllos.tsx` (for example "Initial enrollment window",
  "Where you receive care", "Savings protected", "Bundled").
- The six bullet points in the captive-agent comparison in `app/page.tsx`. They paraphrase the
  original site's paragraph on the same point; the three about captive agents go beyond it.
- Captions under the carrier dots in `CarrierDots.tsx`.
- Labels on the plan board in `PlanBoard.tsx` ("Your plan", "Income", "Legacy" and so on).
- Small interface labels: "Drag the sun", "Keep scrolling", "Who we are".

The rest of the home page copy is carried over from the original site.

## Motion and accessibility

- All looping animation is CSS and stops under `prefers-reduced-motion`; the rail un-pins and the
  hero skips its sunrise.
- The sun is a real slider (`role="slider"`): arrow keys, Home and End move it.
- Decorative graphics are `aria-hidden`; text is real text, including the hero headline.
