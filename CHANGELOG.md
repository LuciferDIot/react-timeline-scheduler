# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-11-10

### Security
- Fixed 100+ Dependabot vulnerabilities across root and demo directories in both npm and pnpm manifests.
- Upgraded `vite` to `^6.4.5` and `vitest` to `^4.1.12` resolving file read and arbitrary code execution advisories.
- Completely removed `moment` (CVE path traversal) and `lodash`.

### Performance & Architecture
- Replaced `moment` with tree-shakeable `date-fns` and `lodash` with native `deepMerge`, reducing bundle overhead by ~140 KB.
- Enforced strict ≤100 lines per file across all 83 source files.
- Memoized `handleMouseMove` and cached sorted group keys to eliminate unnecessary re-renders.
- Resolved date calculation bug in `setSchedulerData` and offset computation in `startEndDates`.

### Accessibility (a11y)
- Full WCAG 2.1 AA compliance: ARIA roles (`grid`, `row`, `rowheader`, `button`, `separator`, `menu`, `tooltip`).
- Added keyboard navigation support for task clicking (`Enter`, `Space`) and resizing (`ArrowLeft`, `ArrowRight`).
- Integrated framer-motion `<MotionConfig reducedMotion="user">` for OS-level reduced motion support.

### UX & Customizability
- Added animated skeleton loading UI (`animate-pulse`).
- Added styled error state card with warning indicator.
- Added subtle placeholder for empty rows.
- Added custom component slots: `loadingComponent`, `emptyComponent`, and `errorComponent`.

## [1.1.12] - 2025-12-17

### Added
- Demo GIF visualization in README.md showcasing the timeline scheduler in action
- Improved package visibility on npm with visual demonstration

### Changed
- Enhanced README.md with a dedicated demo section for better user onboarding

## [1.1.11] - 2025-12-16

### Changed
- Build improvements and library optimizations
- Updated documentation and examples
- Enhanced demo website deployment automation

## [1.1.10] - 2025-12-15

### Added
- Custom tooltip support with full React node customization
- Improved tooltip positioning and intelligent viewport boundary detection

### Changed
- Enhanced theme customization options
- Improved horizontal and vertical scrolling behavior
- Refined header and toolbar styling

### Fixed
- Resolved layout and scrolling issues
- Fixed toolbar visibility when disabled
- Corrected tooltip display and positioning bugs
