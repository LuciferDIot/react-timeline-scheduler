# Release Report: React Timeline Scheduler v1.1.11

## 🚀 Release Summary: Version 1.1.11

**Version 1.1.11** focuses on **stability, deep customization, and developer experience**. We've refined the core styling architecture to allow pixel-perfect control over every element, from scrollbars to tooltips, while ensuring the library is robust and bug-free.

### 🌟 Key Highlights

- **Advanced Tooltip System**:
  - **Portals**: Tooltips now render into `document.body` using React Portals, completely solving positioning issues ensuring they never get clipped or misplaced by parent container styles.
  - **Customization**: Full control over tooltip content via the `tooltipComponent` prop, plus granular styling for the default tooltip wrapper (backgrounds, borders, text).
- **Deep Theme Customization**:
  - **Scrollbars**: You can now style the timeline's scrollbar (thumb, track, hover states) directly via `theme.scrollbar`.
  - **Buttons**: Granular control over the "Today" and "Lock" buttons, including specific styles for locked vs. unlocked states.
  - **Tasks**: Enhanced `extendedStyles` support for individual task bars, allowing for complex per-task styling overrides.
- **Developer Experience**:
  - **TypeScript**: strict type exports and type safety improvements.
  - **Documentation**: A complete overhaul of the documentation website with interactive examples, cleaner copy, and expanded configuration details.
- **Bug Fixes**:
  - **Fixed "Drifting Tasks"**: Resolved an issue where task times strictly depended on the time-of-day execution; tasks now consistently start at 08:00-11:00 and end at 13:00-18:00 via standardized randomization.
  - Resolved `Element type is invalid` specific import errors.
  - Fixed dark mode inconsistencies in tooltips.
