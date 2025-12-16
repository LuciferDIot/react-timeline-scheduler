# Theme Customization Guide

React Timeline Scheduler v1.2.0+ includes a comprehensive theme system that allows you to customize all colors to match your application's design language. Themes support both light and dark modes with separate color configurations.

## Quick Start

### Using Preset Themes

```tsx
import { Timeline } from 'react-timeline-scheduler';
import { lightTheme, darkTheme } from 'react-timeline-scheduler/dist';
import 'react-timeline-scheduler/dist/style.css';

// Light theme (default)
<Timeline
  config={{
    label: "My Timeline",
    data: tasks,
    theme: { mode: 'light', light: lightTheme }
  }}
/>

// Dark theme
<Timeline
  config={{
    label: "My Timeline",
    data: tasks,
    theme: { mode: 'dark', dark: darkTheme }
  }}
/>
```

## Complete Theme Structure

The `SchedulerTheme` interface includes all customizable colors:

```typescript
interface SchedulerTheme {
  // Primary and secondary colors
  primary: string;        // Primary action color
  secondary: string;      // Secondary accent color

  // Text colors
  text: {
    primary: string;      // Primary text color
    secondary: string;    // Secondary/muted text color
  };

  // Background colors
  background: {
    primary: string;      // Main background
    secondary: string;    // Secondary background (alternating rows, cards)
  };

  // Borders
  border: string;         // Border color for dividers and outlines

  // Row styling
  row: {
    even: string;         // Even row background
    odd: string;          // Odd row background
    hover: string;        // Row hover state
  };

  // Grid styling
  grid: {
    color: string;        // Grid line color
    currentDateLine?: string; // Current date indicator color
  };

  // Header styling
  header: {
    background: string;   // Header background
    text: string;         // Header text color
  };

  // Task styling
  task: {
    even: string;         // Even task color
    odd: string;          // Odd task color
    hover: string;        // Task hover color
    text: string;         // Task label text color
    border?: string;      // Task border color
  };

  // Toolbar (optional)
  toolbar?: {
    icon?: string;        // Toolbar icon color
    background?: string;  // Toolbar background
    text?: string;        // Toolbar text color
  };

  // Progress bar
  progressBar?: {
    background?: string;  // Progress bar fill color
  };

  // Tooltip
  tooltip?: {
    background?: string;  // Tooltip background
    text?: string;        // Tooltip text color
    border?: string;      // Tooltip border color
  };

  // Resize handles
  resize?: {
    handleBackground?: string;        // Resize handle color
    handleHoverBackground?: string;   // Resize handle hover color
  };

  // Interactive elements
  interactive?: {
    focus?: string;       // Focus/active state color
  };
}
```

## Light Theme (Default)

```typescript
export const lightTheme: SchedulerTheme = {
  primary: "#3b82f6",              // Blue 500
  secondary: "#64748b",            // Slate 500
  text: {
    primary: "#1e293b",            // Slate 800
    secondary: "#64748b",          // Slate 500
  },
  background: {
    primary: "#ffffff",
    secondary: "#f8fafc",          // Slate 50
  },
  border: "#e2e8f0",               // Slate 200
  row: {
    even: "#ffffff",
    odd: "#f8fafc",                // Slate 50
    hover: "#f1f5f9",              // Slate 100
  },
  header: {
    background: "#ffffff",
    text: "#0f172a",               // Slate 900
  },
  task: {
    even: "#3b82f6",               // Blue 500
    odd: "#0ea5e9",                // Sky 500
    hover: "#2563eb",              // Blue 600
    text: "#ffffff",
    border: "#e2e8f0",             // Slate 200
  },
  toolbar: {
    icon: "#1e293b",
    background: "#ffffff",
    text: "#1e293b",
  },
  grid: {
    color: "#e2e8f0",              // Slate 200
    currentDateLine: "#ef4444",    // Red 500
  },
  progressBar: {
    background: "#10b981",         // Emerald 500
  },
  tooltip: {
    background: "#ffffff",
    text: "#1e293b",
    border: "#e2e8f0",
  },
  resize: {
    handleBackground: "#64748b",
    handleHoverBackground: "#475569", // Slate 600
  },
  interactive: {
    focus: "#3b82f6",
  },
};
```

## Dark Theme

```typescript
export const darkTheme: SchedulerTheme = {
  primary: "#60a5fa",              // Blue 400
  secondary: "#94a3b8",            // Slate 400
  text: {
    primary: "#f1f5f9",            // Slate 100
    secondary: "#cbd5e1",          // Slate 300
  },
  background: {
    primary: "#0f172a",            // Slate 900
    secondary: "#1e293b",          // Slate 800
  },
  border: "#334155",               // Slate 700
  row: {
    even: "#0f172a",               // Slate 900
    odd: "#1e293b",                // Slate 800
    hover: "#334155",              // Slate 700
  },
  header: {
    background: "#1e293b",         // Slate 800
    text: "#f1f5f9",               // Slate 100
  },
  task: {
    even: "#3b82f6",               // Blue 500
    odd: "#06b6d4",                // Cyan 500
    hover: "#2563eb",              // Blue 600
    text: "#ffffff",
    border: "#334155",             // Slate 700
  },
  toolbar: {
    icon: "#f1f5f9",
    background: "#1e293b",
    text: "#f1f5f9",
  },
  grid: {
    color: "#334155",              // Slate 700
    currentDateLine: "#f87171",    // Red 400
  },
  progressBar: {
    background: "#34d399",         // Emerald 400
  },
  tooltip: {
    background: "#1e293b",
    text: "#f1f5f9",
    border: "#334155",
  },
  resize: {
    handleBackground: "#64748b",
    handleHoverBackground: "#94a3b8", // Slate 400
  },
  interactive: {
    focus: "#60a5fa",
  },
};
```

## Custom Themes

### Complete Custom Theme

```tsx
const customTheme: SchedulerTheme = {
  primary: "#9333ea",              // Purple
  secondary: "#ec4899",            // Pink
  text: {
    primary: "#1f2937",            // Dark gray
    secondary: "#6b7280",          // Medium gray
  },
  background: {
    primary: "#f9fafb",            // Light gray
    secondary: "#f3f4f6",          // Lighter gray
  },
  border: "#d1d5db",               // Gray
  row: {
    even: "#f9fafb",
    odd: "#ffffff",
    hover: "#f0fdf4",              // Light green
  },
  header: {
    background: "#ffffff",
    text: "#111827",
  },
  task: {
    even: "#9333ea",               // Purple
    odd: "#ec4899",                // Pink
    hover: "#7c3aed",              // Darker purple
    text: "#ffffff",
    border: "#d1d5db",
  },
  toolbar: {
    icon: "#374151",
    background: "#ffffff",
    text: "#374151",
  },
  grid: {
    color: "#e5e7eb",
    currentDateLine: "#f59e0b",    // Amber
  },
  progressBar: {
    background: "#8b5cf6",         // Purple
  },
  tooltip: {
    background: "#ffffff",
    text: "#1f2937",
    border: "#e5e7eb",
  },
  resize: {
    handleBackground: "#d1d5db",
    handleHoverBackground: "#9ca3af",
  },
  interactive: {
    focus: "#9333ea",
  },
};

<Timeline
  config={{
    label: "My Timeline",
    data: tasks,
    theme: customTheme
  }}
/>
```

### Partial Theme Override

Override only specific colors while keeping defaults:

```tsx
<Timeline
  config={{
    label: "My Timeline",
    data: tasks,
    theme: {
      primary: "#ec4899",      // Custom primary color
      secondary: "#8b5cf6",    // Custom secondary color
      task: {
        even: "#ec4899",       // Custom task color
      }
      // Other colors use defaults
    }
  }}
/>
```

## Dark/Light Mode Support

### Separate Themes for Dark and Light Modes

```tsx
<Timeline
  config={{
    label: "My Timeline",
    data: tasks,
    theme: {
      mode: 'dark', // Current mode
      light: {
        primary: "#3b82f6",
        background: { primary: "#ffffff", secondary: "#f8fafc" },
        text: { primary: "#1e293b", secondary: "#64748b" },
        // ... other light theme properties
      },
      dark: {
        primary: "#60a5fa",
        background: { primary: "#0f172a", secondary: "#1e293b" },
        text: { primary: "#f1f5f9", secondary: "#cbd5e1" },
        // ... other dark theme properties
      }
    }
  }}
/>
```

### Dynamic Theme Switching

```tsx
import { useState } from 'react';
import { Timeline } from 'react-timeline-scheduler';
import { lightTheme, darkTheme } from 'react-timeline-scheduler/dist';

export function SchedulerWithThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        Toggle Theme
      </button>
      
      <Timeline
        config={{
          label: "My Timeline",
          data: tasks,
          theme: {
            mode: isDarkMode ? 'dark' : 'light',
            light: lightTheme,
            dark: darkTheme
          }
        }}
      />
    </>
  );
}
```

## Color Properties Reference

### Primary Colors
- `primary`: Used for buttons, active states, and highlights
- `secondary`: Used for secondary elements and accents

### Text Colors
- `text.primary`: Main text in headers, labels, and content
- `text.secondary`: Muted text, tooltips, and secondary labels

### Backgrounds
- `background.primary`: Main timeline background
- `background.secondary`: Alternating row colors, cards

### Borders
- `border`: Dividing lines, borders between elements

### Rows
- `row.even`: Background for even-indexed rows
- `row.odd`: Background for odd-indexed rows
- `row.hover`: Highlight color when hovering over rows

### Grid
- `grid.color`: Grid lines
- `grid.currentDateLine`: Indicator for today's date

### Header
- `header.background`: Top header background
- `header.text`: Header text color

### Tasks
- `task.even`: Color for tasks in even positions
- `task.odd`: Color for tasks in odd positions
- `task.hover`: Highlight when hovering over tasks
- `task.text`: Text inside task bars
- `task.border`: Task border (optional)

### Components
- `toolbar.icon`: Toolbar button icons
- `toolbar.background`: Toolbar background
- `toolbar.text`: Toolbar text/labels
- `progressBar.background`: Task progress bar fill
- `tooltip.background`: Tooltip background
- `tooltip.text`: Tooltip text
- `tooltip.border`: Tooltip border
- `resize.handleBackground`: Resize handle color
- `resize.handleHoverBackground`: Resize handle on hover
- `interactive.focus`: Focus/active state color

## Accessibility Considerations

When creating custom themes, ensure:

1. **Contrast**: Text should have sufficient contrast with backgrounds
   - WCAG AA requires minimum 4.5:1 contrast ratio for text
   - WCAG AAA requires 7:1 contrast ratio

2. **Color Blindness**: Don't rely only on color to convey information
   - Use patterns or labels in addition to colors
   - Consider using a tool like Contrast Ratio to verify accessibility

3. **Focus Indicators**: Ensure interactive elements have visible focus states
   - Use `interactive.focus` for keyboard navigation

## Performance Tips

1. **Memoize Theme Objects**: Avoid recreating theme objects on every render

   ```tsx
   const theme = useMemo(() => ({
     primary: "#3b82f6",
     // ... rest of theme
   }), []);
   ```

2. **Use CSS Variables**: For advanced customization, leverage CSS custom properties

   ```css
   :root {
     --scheduler-primary: #3b82f6;
     --scheduler-text: #1e293b;
   }
   ```

## Examples

### E-commerce Order Timeline
```tsx
const ecommerceTheme = {
  primary: "#10b981",      // Green for positive actions
  background: { primary: "#ffffff", secondary: "#f0fdf4" },
  task: {
    even: "#10b981",
    odd: "#059669"
  }
};
```

### Project Management
```tsx
const projectTheme = {
  primary: "#8b5cf6",      // Purple
  task: {
    even: "#8b5cf6",
    odd: "#06b6d4"
  },
  grid: {
    currentDateLine: "#dc2626" // Red for deadlines
  }
};
```

### Medical/Healthcare
```tsx
const medicalTheme = {
  primary: "#0891b2",      // Cyan/medical blue
  background: { primary: "#ffffff", secondary: "#ecf0f1" },
  task: {
    even: "#0891b2",
    odd: "#0369a1"
  }
};
```

## Troubleshooting

### Colors Not Applying
- Ensure you're passing the complete theme object
- Check that color values are valid CSS colors (hex, rgb, hsl)
- Verify the `theme` prop is passed in the `config` object

### Dark Mode Not Switching
- Ensure `mode` property is set correctly
- Verify both `light` and `dark` objects are provided when using mode-based themes

### Tooltip Colors Wrong
- Make sure `tooltip` object is properly defined in theme
- Check tooltip text has sufficient contrast with background

## Color Tools

- **Tailwind Color Reference**: https://tailwindcss.com/docs/customizing-colors
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Color Palette Generator**: https://coolors.co/
- **Material Design Colors**: https://material.io/design/color/
