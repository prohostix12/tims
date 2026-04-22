# Tasks: Home Page UI Redesign

## Task List

- [x] 1. Configure Next.js 16 image settings
  - [x] 1.1 Add `remotePatterns` for Unsplash to `next.config.ts`
  - [x] 1.2 Add `qualities` allowlist to `next.config.ts` (required in Next.js 16)

- [x] 2. Update Design System tokens in `globals.css`
  - [x] 2.1 Add any missing CSS custom properties needed by the redesign (e.g. `--white`, `--shadow-xl`, `--radius-lg`) to `globals.css`
  - [x] 2.2 Verify all color values used in `page.module.css` reference `var(--token)` — no hardcoded hex values outside design system files

- [x] 3. Redesign Hero Section
  - [x] 3.1 Add scroll-down chevron indicator anchored to the bottom of the viewport
  - [x] 3.2 Add `prefers-reduced-motion` media query to `page.module.css` that disables all Hero entrance animations
  - [x] 3.3 Add mobile responsive styles: stack content vertically, scale headline font below 768px, remove `background-attachment: fixed` on mobile
  - [x] 3.4 Ensure the hero background gradient overlay provides sufficient contrast for WCAG 2.1 AA (minimum 4.5:1 for normal text)
  - [x] 3.5 Verify `<h1>` is the single top-level heading and CTA buttons have accessible focus indicators

- [x] 4. Redesign Stats Section
  - [x] 4.1 Implement IntersectionObserver in `useEffect` to trigger staggered fade-in animation (100ms delay per card) when section enters viewport
  - [x] 4.2 Add `prefers-reduced-motion` fallback: skip observer and show all cards immediately if motion is reduced
  - [x] 4.3 Ensure stat number font size is at least `2.5rem` and labels are uppercase with `letter-spacing`
  - [x] 4.4 Add hover transition (elevation or border highlight) completing within 300ms
  - [x] 4.5 Add responsive grid: 4-column at ≥1024px, 2-column below 1024px

- [x] 5. Redesign Services Section
  - [x] 5.1 Replace `<img>` tags with `<Image fill style={{ objectFit: 'cover' }}>` from `next/image`; wrap each card in a `position: relative` container
  - [x] 5.2 Add descriptive `alt` text to all service card images
  - [x] 5.3 Ensure bento-grid layout: Distance Learning card spans 2 rows at ≥1024px
  - [x] 5.4 Add hover scale transition on card background image (110%, completing within 500ms)
  - [x] 5.5 Add responsive styles: single-column stacked layout with 350px card height below 1024px
  - [x] 5.6 Ensure gradient overlay on each card maintains WCAG 2.1 AA text contrast
  - [x] 5.7 Verify section heading (`<h2>`) and subtitle are present and centered above the grid

- [x] 6. Redesign Trust and Values Section
  - [x] 6.1 Move Trust section inline styles to `page.module.css` using CSS custom properties
  - [x] 6.2 Replace `<img>` with `<Image width={600} height={700} alt="Student Success">` from `next/image`; use `preload={true}` (not deprecated `priority`)
  - [x] 6.3 Add pull-quote card overlapping the student image with brand quote and attribution
  - [x] 6.4 Add responsive styles: two-column layout at ≥1024px, single-column (value props above image) below 1024px
  - [x] 6.5 Ensure section uses `var(--primary)` background with white text

- [x] 7. Redesign CTA Section
  - [x] 7.1 Move CTA section inline styles to `page.module.css`
  - [x] 7.2 Add visually distinct background (gradient or light color) that separates it from the Trust section
  - [x] 7.3 Add hover transition on CTA button (color or shadow change, completing within 200ms)
  - [x] 7.4 Ensure section is fully readable and usable at 375px viewport width

- [x] 8. Accessibility and semantic HTML audit
  - [x] 8.1 Verify the rendered page has exactly one `<h1>` element (in the Hero section) and a logical `h2` → `h3` heading hierarchy in subsequent sections
  - [x] 8.2 Ensure all interactive elements (buttons, links) have visible focus indicators via CSS `:focus-visible`
  - [x] 8.3 Verify all `<Image>` components have non-empty, descriptive `alt` attributes

- [x] 9. Remove remaining inline styles from `page.tsx`
  - [x] 9.1 Audit `page.tsx` for any remaining `style={{ ... }}` props that contain color values and move them to `page.module.css` using CSS custom properties
  - [x] 9.2 Confirm no hardcoded hex values remain in `page.tsx` outside of the design system definition files

- [x] 10. Build verification
  - [x] 10.1 Run `next build` and confirm zero TypeScript errors and zero build warnings related to the Image component or deprecated props
  - [x] 10.2 Run `next lint` and confirm no ESLint errors in `page.tsx` or `page.module.css`
