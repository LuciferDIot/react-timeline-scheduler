# Release Report: React Timeline Scheduler v1.1.12

## 🚀 Release Summary: Version 1.1.12

**Version 1.1.12** focuses on **improving package visibility and user onboarding** with enhanced visual documentation. This release adds a demo GIF to showcase the timeline scheduler in action, making it easier for developers to understand the library's capabilities at a glance.

### 🌟 Key Highlights

- **Visual Documentation**:
  - **Demo GIF**: Added an animated demonstration of the timeline scheduler directly in README.md
  - **Cross-Platform Display**: GIF hosted via GitHub raw URL ensures visibility on both GitHub and npm package page
  - **Better First Impression**: Potential users can immediately see the library in action before installation

- **Documentation Enhancement**:
  - **New Demo Section**: Prominent "🎬 Demo" section added to README before features
  - **Professional Presentation**: Improved README structure for better user engagement
  - **Visual Onboarding**: Reduced time-to-understanding for new developers

- **Project Maintenance**:
  - **CHANGELOG.md**: Created comprehensive changelog documenting this and previous releases
  - **Version Updates**: Consistent version numbering across main package and demo website
  - **Build Verification**: Confirmed all build outputs are correct and ready for distribution

### 📦 What's Included

- Updated README.md with demo GIF visualization
- CHANGELOG.md documenting version history
- Verified build outputs:
  - ES Module (433 KB)
  - UMD Bundle (291 KB)
  - CSS Styles (33 KB)
  - TypeScript Definitions (9 KB)

### 🎯 Impact

This release significantly improves the package's discoverability and appeal on npm. The visual demonstration helps developers quickly assess if this library fits their needs, potentially increasing adoption and reducing support questions about basic functionality.

---

## 📋 Previous Release: v1.1.11

**Version 1.1.11** focused on **stability, deep customization, and developer experience**. We refined the core styling architecture to allow pixel-perfect control over every element, from scrollbars to tooltips, while ensuring the library is robust and bug-free.

### Key Highlights

- **Advanced Tooltip System**:
  - **Portals**: Tooltips now render into `document.body` using React Portals, solving positioning issues
  - **Customization**: Full control over tooltip content via the `tooltipComponent` prop
- **Deep Theme Customization**:
  - **Scrollbars**: Style the timeline's scrollbar (thumb, track, hover states) via `theme.scrollbar`
  - **Buttons**: Granular control over the "Today" and "Lock" buttons
  - **Tasks**: Enhanced `extendedStyles` support for individual task bars
- **Developer Experience**:
  - **TypeScript**: Strict type exports and type safety improvements
  - **Documentation**: Complete overhaul of documentation website
- **Bug Fixes**:
  - Fixed "Drifting Tasks" issue with standardized randomization
  - Resolved import errors and dark mode inconsistencies
