import { defineTheme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";

export const matterTheme = defineTheme({
  name: "matter",
  extends: neutralTheme,
  tokens: {
    "--color-background-body": "#101112",
    "--color-background-surface": "#17191b",
    "--color-background-card": "#17191b",
    "--color-background-popover": "#1b1d20",
    "--color-text-primary": "#eeede7",
    "--color-text-secondary": "#a5a6a8",
    "--color-accent": "#8194ff",
    "--color-text-accent": "#8194ff",
    "--color-accent-muted": "#222b4c",
    "--color-border": "#343638",
    "--color-border-emphasized": "#777b82",
    "--font-family-heading":
      "var(--font-manrope), Arial, Helvetica, sans-serif",
    "--font-family-body": "var(--font-manrope), Arial, Helvetica, sans-serif",
    "--font-family-code": '"SFMono-Regular", Consolas, monospace',
  },
});
