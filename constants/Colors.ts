export const Colors = {
  // --- Backgrounds ---
  background: {
    app: "rgb(18, 18, 20)", // Overall app screen background (very dark)
    card: "rgb(30, 30, 35)", // Background for cards, sections, etc. (slightly lighter dark)
    tabBar: "rgb(30, 30, 35)", // Background for the tab bar itself (matches card for consistency)
    modal: "rgb(40, 40, 45)", // Background for modals, pop-ups (slightly darker than card)
    overlay: "rgba(0, 0, 0, 0.7)", // Transparent black for overlays (e.g., when a modal is open)
    active: "rgb(1, 180, 162)", // Progress bar fill color
    inActive: "rgb(0, 7, 6)", // Progress bar fill color
  },

  // --- Headings ---
  heading: {
    primary: "rgb(255, 255, 255)", // Main titles and prominent headings (pure white)
    secondary: "rgb(230, 230, 235)", // Secondary headings, sub-titles (off-white)
  },

  // --- Text Colors ---
  text: {
    body: "rgb(230, 230, 235)", // General body text, descriptions (very light grey)
    artist: "rgb(175, 175, 180)", // Specific color for artist names (muted grey)
    subtle: "rgb(120, 120, 125)", // Very subtle text, timestamps, secondary info (medium grey)
    button: "rgb(255, 255, 255)", // Text color on primary buttons (white for contrast)
    placeholder: "rgb(90, 90, 95)", // Placeholder text in input fields
    link: "rgb(0, 190, 255)", // Hyperlinks or actionable text (slightly brighter blue)
  },

  // --- Buttons ---
  button: {
    primaryBackground: "rgb(0, 170, 255)", // Background for main call-to-action buttons (vibrant blue)
    secondaryBackground: "rgb(50, 50, 55)", // Background for secondary action buttons (medium dark grey)
    textPrimary: "rgb(255, 255, 255)", // Text color on primary buttons (pure white)
    textSecondary: "rgb(230, 230, 235)", // Text color on secondary buttons (off-white)
    disabledBackground: "rgb(40, 40, 45)", // Background for disabled buttons
    disabledText: "rgb(90, 90, 95)", // Text color on disabled buttons
  },

  // --- Icons ---
  icon: {
    default: "rgb(120, 120, 125)", // Default icon color (inactive)
    active: "rgb(0, 170, 255)", // Active/selected icon color (vibrant blue)
    disabled: "rgb(65, 65, 70)", // Color for disabled icons
  },

  // --- Tab Bar Specifics ---
  tabBar: {
    tint: "rgb(0, 170, 255)", // Tint for selected tab icon (often same as icon.active)
    labelDefault: "rgb(120, 120, 125)", // Default label color for tabs
    labelActive: "rgb(255, 255, 255)", // Active label color for tabs (bright white)
  },

  // --- General Active/Highlight ---
  active: {
    highlight: "rgb(0, 170, 255)", // General highlight for active states, selected items
    progress: "rgb(0, 170, 255)", // Progress bar fill color
  },

  // --- Dividers & Borders ---
  divider: "rgb(55, 55, 60)", // Darker, subtle dividers
  border: "rgb(70, 70, 75)", // General border color for elements like inputs or cards

  // --- System/Base Colors (for generic use or unique cases) ---
  system: {
    deepBlack: "rgb(0, 0, 0)",
    darkGrey: "rgb(25, 25, 30)",
    lightDarkGrey: "rgb(45, 45, 50)", // Slightly lighter than darkGrey
    mediumGrey: "rgb(90, 90, 95)",
    lightGrey: "rgb(210, 210, 215)",
    pureWhite: "rgb(255, 255, 255)",
    redAlert: "rgb(255, 80, 80)", // For error messages or destructive actions
    greenSuccess: "rgb(0, 200, 100)", // For success messages
  },
};
