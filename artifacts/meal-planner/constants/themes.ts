export type ThemeColorKey =
  | "red"
  | "orange"
  | "yellow"
  | "cyan"
  | "blue"
  | "purple"
  | "pink";

export interface ThemeTokens {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  tint: string;
}

export interface ThemeVariant {
  light: ThemeTokens;
  dark: ThemeTokens;
}

export const themes: Record<ThemeColorKey, ThemeVariant> = {
  red: {
    light: {
      primary: "#ef4444",
      primaryForeground: "#ffffff",
      secondary: "#ffe4e1",
      secondaryForeground: "#b91c1c",
      accent: "#ffe4e1",
      accentForeground: "#b91c1c",
      tint: "#ef4444",
    },
    dark: {
      primary: "#f87171",
      primaryForeground: "#ffffff",
      secondary: "#3f1d1d",
      secondaryForeground: "#fca5a5",
      accent: "#3f1d1d",
      accentForeground: "#fca5a5",
      tint: "#f87171",
    },
  },
  orange: {
    light: {
      primary: "#f97316",
      primaryForeground: "#ffffff",
      secondary: "#ffedd5",
      secondaryForeground: "#c2410c",
      accent: "#ffedd5",
      accentForeground: "#c2410c",
      tint: "#f97316",
    },
    dark: {
      primary: "#fb923c",
      primaryForeground: "#1a0f00",
      secondary: "#3d1f0a",
      secondaryForeground: "#fdba74",
      accent: "#3d1f0a",
      accentForeground: "#fdba74",
      tint: "#fb923c",
    },
  },
  yellow: {
    light: {
      primary: "#eab308",
      primaryForeground: "#1a1500",
      secondary: "#fef9c3",
      secondaryForeground: "#854d0e",
      accent: "#fef9c3",
      accentForeground: "#854d0e",
      tint: "#eab308",
    },
    dark: {
      primary: "#facc15",
      primaryForeground: "#1a1500",
      secondary: "#3d3408",
      secondaryForeground: "#fde68a",
      accent: "#3d3408",
      accentForeground: "#fde68a",
      tint: "#facc15",
    },
  },
  cyan: {
    light: {
      primary: "#06b6d4",
      primaryForeground: "#ffffff",
      secondary: "#cffafe",
      secondaryForeground: "#0e7490",
      accent: "#cffafe",
      accentForeground: "#0e7490",
      tint: "#06b6d4",
    },
    dark: {
      primary: "#22d3ee",
      primaryForeground: "#001016",
      secondary: "#0c2f38",
      secondaryForeground: "#a5f3fc",
      accent: "#0c2f38",
      accentForeground: "#a5f3fc",
      tint: "#22d3ee",
    },
  },
  blue: {
    light: {
      primary: "#3b82f6",
      primaryForeground: "#ffffff",
      secondary: "#dbeafe",
      secondaryForeground: "#1d4ed8",
      accent: "#dbeafe",
      accentForeground: "#1d4ed8",
      tint: "#3b82f6",
    },
    dark: {
      primary: "#60a5fa",
      primaryForeground: "#001029",
      secondary: "#152846",
      secondaryForeground: "#bfdbfe",
      accent: "#152846",
      accentForeground: "#bfdbfe",
      tint: "#60a5fa",
    },
  },
  purple: {
    light: {
      primary: "#8b5cf6",
      primaryForeground: "#ffffff",
      secondary: "#ede9fe",
      secondaryForeground: "#6d28d9",
      accent: "#ede9fe",
      accentForeground: "#6d28d9",
      tint: "#8b5cf6",
    },
    dark: {
      primary: "#a78bfa",
      primaryForeground: "#1a0c33",
      secondary: "#2a1a47",
      secondaryForeground: "#ddd6fe",
      accent: "#2a1a47",
      accentForeground: "#ddd6fe",
      tint: "#a78bfa",
    },
  },
  pink: {
    light: {
      primary: "#ec4899",
      primaryForeground: "#ffffff",
      secondary: "#fce7f3",
      secondaryForeground: "#be185d",
      accent: "#fce7f3",
      accentForeground: "#be185d",
      tint: "#ec4899",
    },
    dark: {
      primary: "#f472b6",
      primaryForeground: "#2a0a1a",
      secondary: "#3d152a",
      secondaryForeground: "#fbcfe8",
      accent: "#3d152a",
      accentForeground: "#fbcfe8",
      tint: "#f472b6",
    },
  },
};

export const THEME_KEYS: ThemeColorKey[] = [
  "red",
  "orange",
  "yellow",
  "cyan",
  "blue",
  "purple",
  "pink",
];
