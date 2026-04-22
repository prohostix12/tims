# Requirements Document

## Introduction

The TIMS home page requires a professional UI redesign to better reflect the brand's position as a premium educational consultancy. The current page has a solid structure (hero, stats, services, trust section, CTA) but lacks the visual polish, accessibility, and responsiveness expected of a modern institutional website. This redesign will elevate the visual quality, improve content hierarchy, ensure full mobile responsiveness, and maintain performance — all without changing the underlying Next.js routing or data layer.

## Glossary

- **Home_Page**: The root route (`/`) of the TIMS Next.js application rendered by `src/app/page.tsx`
- **Hero_Section**: The full-viewport introductory section at the top of the Home_Page
- **Stats_Section**: The section displaying key metrics (alumni count, partner universities, success rate, accreditation)
- **Services_Section**: The bento-grid section showcasing the three core service offerings
- **Trust_Section**: The two-column section communicating brand values and a student success image
- **CTA_Section**: The bottom call-to-action section prompting users to contact an expert
- **Design_System**: The set of CSS custom properties (colors, typography, spacing) defined in `globals.css` and `page.module.css`
- **Viewport**: The visible area of the browser window
- **WCAG**: Web Content Accessibility Guidelines, version 2.1

---

## Requirements

### Requirement 1: Hero Section Visual Upgrade

**User Story:** As a prospective student visiting the site, I want to see a compelling, professional hero section, so that I immediately understand TIMS's value proposition and feel confident in the brand.

#### Acceptance Criteria

1. THE Hero_Section SHALL display a full-viewport background with a high-quality image and a dark overlay that ensures text contrast meets WCAG 2.1 AA standards (minimum 4.5:1 contrast ratio for normal text).
2. WHEN the Home_Page loads, THE Hero_Section SHALL animate the headline into view using a smooth entrance animation completing within 1.5 seconds.
3. THE Hero_Section SHALL display a primary headline, a supporting subtitle, and at least two CTA buttons ("Explore Programs" and "Consult an Expert").
4. THE Hero_Section SHALL include a visible scroll-down indicator (chevron or arrow) anchored to the bottom of the viewport.
5. WHEN a user views the Home_Page on a screen narrower than 768px, THE Hero_Section SHALL stack all content vertically and scale the headline font size to remain readable without horizontal scrolling.
6. WHERE the browser supports `prefers-reduced-motion`, THE Hero_Section SHALL disable entrance animations and display content in its final state immediately.

---

### Requirement 2: Stats Section Redesign

**User Story:** As a prospective student, I want to see key trust metrics displayed clearly, so that I can quickly assess TIMS's credibility.

#### Acceptance Criteria

1. THE Stats_Section SHALL display exactly four metric cards: "15K+ Global Alumni", "25+ Partner Universities", "98% Success Rate", and "100% Accreditation".
2. WHEN a user hovers over a stat card on a pointer device, THE Stats_Section SHALL apply a visible elevation or border highlight transition completing within 300ms.
3. THE Stats_Section SHALL use a four-column grid layout on screens 1024px and wider, and a two-column grid on screens narrower than 1024px.
4. THE Stats_Section SHALL render each metric number in a font size no smaller than 2.5rem and each label in uppercase with letter-spacing for visual hierarchy.
5. WHEN the Stats_Section enters the Viewport during scroll, THE Stats_Section SHALL trigger a fade-in animation for each card with a staggered delay of 100ms per card.

---

### Requirement 3: Services Section Redesign

**User Story:** As a prospective student, I want to browse the available services in a visually engaging layout, so that I can quickly identify which service is relevant to me and navigate to it.

#### Acceptance Criteria

1. THE Services_Section SHALL display three service cards: "Distance Learning", "Embassy Attestation", and "Credit Transfer", each linking to its respective route.
2. THE Services_Section SHALL use a bento-grid layout where the "Distance Learning" card spans two rows on screens 1024px and wider, giving it visual prominence.
3. WHEN a user hovers over a service card, THE Services_Section SHALL scale the card's background image to 110% with a smooth transition completing within 500ms.
4. EACH service card SHALL display a colored icon, a heading, and a short description overlaid on the background image using a gradient overlay that maintains WCAG 2.1 AA text contrast.
5. WHEN a user views the Services_Section on a screen narrower than 1024px, THE Services_Section SHALL switch to a single-column stacked layout with each card at a fixed height of 350px.
6. THE Services_Section SHALL include a section heading and subtitle centered above the grid.

---

### Requirement 4: Trust and Values Section Redesign

**User Story:** As a prospective student, I want to understand TIMS's core values and approach, so that I feel confident choosing them as my educational partner.

#### Acceptance Criteria

1. THE Trust_Section SHALL display three value propositions: "Expert Counseling", "Global Reach", and "Flexible Learning", each with an icon, a heading, and a short description.
2. THE Trust_Section SHALL display a student success image alongside the value propositions in a two-column layout on screens 1024px and wider.
3. WHEN a user views the Trust_Section on a screen narrower than 1024px, THE Trust_Section SHALL stack the value propositions above the image in a single-column layout.
4. THE Trust_Section SHALL use the `--primary` color (`#00122e`) as the section background with white text to create a strong visual contrast from adjacent sections.
5. THE Trust_Section SHALL include a pull-quote card overlapping the student image, displaying a brand quote and attribution.

---

### Requirement 5: Call-to-Action Section Redesign

**User Story:** As a prospective student who has reviewed the page, I want a clear final prompt to get in touch, so that I know the next step to take.

#### Acceptance Criteria

1. THE CTA_Section SHALL display a prominent heading, a supporting paragraph, and a single primary CTA button linking to `/contact`.
2. THE CTA_Section SHALL use a visually distinct background (gradient or light color) that separates it from the Trust_Section above.
3. WHEN a user hovers over the CTA button, THE CTA_Section SHALL apply a visible color or shadow change transition completing within 200ms.
4. THE CTA_Section SHALL be fully readable and usable on screens narrower than 375px.

---

### Requirement 6: Design System Consistency

**User Story:** As a developer maintaining the site, I want the redesigned home page to use the established Design_System tokens, so that future updates to colors or typography propagate consistently.

#### Acceptance Criteria

1. THE Home_Page SHALL use only CSS custom properties defined in `globals.css` or `page.module.css` for all color values — no hardcoded hex values outside of the Design_System definition files.
2. THE Home_Page SHALL use the `Outfit` font family for all headings and `Inter` for all body text, as defined in `globals.css`.
3. THE Home_Page SHALL NOT introduce any new third-party CSS libraries or UI frameworks beyond what is already present in `package.json`.
4. IF a CSS custom property required by the Home_Page is not yet defined in `globals.css`, THEN THE Design_System SHALL define it in `globals.css` before it is used.

---

### Requirement 7: Performance and Accessibility

**User Story:** As any user visiting the site, I want the page to load quickly and be accessible, so that I can use it regardless of my device or ability.

#### Acceptance Criteria

1. THE Home_Page SHALL use Next.js `<Image>` component (or standard `<img>` with explicit `width` and `height` attributes) for all images to prevent layout shift.
2. THE Home_Page SHALL provide descriptive `alt` text for every image element.
3. THE Home_Page SHALL ensure all interactive elements (buttons, links) are keyboard-focusable and display a visible focus indicator.
4. WHEN the Home_Page is rendered, THE Home_Page SHALL produce valid semantic HTML with a single `<h1>` element in the Hero_Section and logical heading hierarchy (`h2`, `h3`) in subsequent sections.
5. THE Home_Page SHALL NOT use `background-attachment: fixed` (parallax) on mobile viewports narrower than 768px, as it causes performance issues on iOS Safari.
