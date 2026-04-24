import { useColorScheme } from "react-native";

import colors from "@/constants/colors";
import { themes } from "@/constants/themes";
import { useSettings } from "@/context/SettingsContext";

export function useColors() {
  const scheme = useColorScheme();
  const { themeColor } = useSettings();

  const isDark = scheme === "dark" && "dark" in colors;
  const basePalette = isDark
    ? (colors as Record<string, typeof colors.light>).dark
    : colors.light;
  const themeTokens = themes[themeColor][isDark ? "dark" : "light"];

  return {
    ...basePalette,
    primary: themeTokens.primary,
    primaryForeground: themeTokens.primaryForeground,
    secondary: themeTokens.secondary,
    secondaryForeground: themeTokens.secondaryForeground,
    accent: themeTokens.accent,
    accentForeground: themeTokens.accentForeground,
    tint: themeTokens.tint,
    radius: colors.radius,
  };
}
