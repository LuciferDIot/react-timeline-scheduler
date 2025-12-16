# Contributing to React Timeline Scheduler

Thank you for your interest in contributing! We welcome improvements and bug fixes. Please follow the guidelines below to ensure a smooth collaboration.

## 🛠 Development Workflow

The repository includes a `test-install` application which serves as the development environment and playground.

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/luciferdiot/react-timeline-scheduler.git
    cd react-timeline-scheduler
    ```

2.  **Install Dependencies**:
    You need to install dependencies for both the library and the test application.

    ```bash
    # Root (Library)
    npm install

    # Test Application
    cd test-install
    npm install
    ```

3.  **Start Development**:
    Typically, you will want to run the library in watch mode or simply relying on the monorepo structure if configured.

    To run the test playground:

    ```bash
    cd test-install
    npm run dev
    ```

    This will start a Vite server at `http://localhost:5173`. Any changes to `src` (the library) should be reflected here (you may need to rebuild or rely on Vite's HMR if configured for alias paths).

4.  **Testing Updates**:
    - **Visual Verification**: Use the `Examples` page in the `test-install` app to visually verify your changes.
    - **New Features**: If adding a feature, please add a demonstrating example in `test-install/src/data/examples.tsx` or `Examples.tsx`.

## 📝 Pull Request Guidelines

When you are ready to submit your changes:

1.  **Target Branch**:

    - All Pull Requests must be targeted to the **`debug`** branch.
    - Do NOT submit PRs directly to `main`.

2.  **PR Description Requirements**:
    Your Pull Request description **MUST** include an **Ordered List** of updates/changes.

    **Example Format**:

    ```markdown
    ## Updates

    1. Fixed tooltip positioning bug using React Portals.
    2. Added `theme.scrollbar` customization option.
    3. Updated `Docs.tsx` with new API details.
    4. Removed unused `App.tsx` from root.
    ```

3.  **Docs**:
    - If you change the API or add features, you **must** update `Docs.tsx` and/or `README.md`.

## 🧹 Code Quality

- Ensure there are no ESLint errors.
- Remove any `console.log` used for debugging.
- Keep the repository structure clean.

Thank you for helping build a better scheduler!

## 🧪 Manual Verification Checklist

Before submitting, please run through this checklist in the `test-install` environment:

- [ ] **Component Renders**: The Timeline loads without crashing.
- [ ] **Tasks Visible**: Task bars appear in the correct rows and dates.
- [ ] **Interaction**:
  - [ ] **Drag**: Can resize tasks left and right?
  - [ ] **Move**: (If enabled) Can move tasks?
  - [ ] **Click**: `onTaskClick` fires correctly?
- [ ] **Styling**:
  - [ ] **Theme**: Check both Light and Dark modes.
  - [ ] **Responsive**: Check on different screen sizes.
- [ ] **Console**: No errors or warnings in the browser console.
