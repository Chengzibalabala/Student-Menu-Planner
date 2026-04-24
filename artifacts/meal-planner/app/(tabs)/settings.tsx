import React from "react";
import { ScrollView, StyleSheet, Text, View, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { useColors } from "@/hooks/useColors";
import { useSettings } from "@/context/SettingsContext";
import { LOCALES, Locale } from "@/i18n";
import { THEME_KEYS, ThemeColorKey, themes } from "@/constants/themes";

export default function SettingsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t, locale, setLocale, themeColor, setThemeColor } = useSettings();

  const onLanguagePress = (next: Locale) => {
    Haptics.selectionAsync();
    setLocale(next);
  };

  const onThemePress = (next: ThemeColorKey) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setThemeColor(next);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{
        paddingTop: Platform.OS === "web" ? 67 + 20 : 20,
        paddingBottom: insets.bottom + 100,
        paddingHorizontal: 16,
      }}
    >
      <Text style={[styles.headerTitle, { color: colors.foreground }]}>{t("settings.title")}</Text>

      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{t("settings.language")}</Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {LOCALES.map((opt, i) => {
          const active = locale === opt.value;
          return (
            <View key={opt.value}>
              <Pressable
                style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
                onPress={() => onLanguagePress(opt.value)}
              >
                <Text style={[styles.rowLabel, { color: colors.foreground }]}>{opt.label}</Text>
                {active && <Feather name="check" size={20} color={colors.primary} />}
              </Pressable>
              {i < LOCALES.length - 1 && (
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
              )}
            </View>
          );
        })}
      </View>

      <Text style={[styles.sectionTitle, { color: colors.foreground, marginTop: 24 }]}>
        {t("settings.theme")}
      </Text>
      <Text style={[styles.hint, { color: colors.mutedForeground }]}>{t("settings.themeHint")}</Text>
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, padding: 20 }]}>
        <View style={styles.swatchRow}>
          {THEME_KEYS.map((key) => {
            const active = themeColor === key;
            const swatchColor = themes[key].light.primary;
            return (
              <Pressable
                key={key}
                onPress={() => onThemePress(key)}
                style={({ pressed }) => [pressed && { opacity: 0.7 }]}
              >
                <View
                  style={[
                    styles.swatch,
                    {
                      backgroundColor: swatchColor,
                      borderColor: active ? colors.foreground : "transparent",
                      borderWidth: active ? 3 : 0,
                    },
                  ]}
                >
                  {active && <Feather name="check" size={20} color="#fff" />}
                </View>
                <Text style={[styles.swatchLabel, { color: colors.mutedForeground }]}>
                  {t(`theme.${key}`)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Text style={[styles.footer, { color: colors.mutedForeground }]}>
        {t("app.tagline")}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerTitle: { fontSize: 28, fontWeight: "700", marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  hint: { fontSize: 13, marginBottom: 12 },
  card: { borderRadius: 16, borderWidth: 1, overflow: "hidden" },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16 },
  rowLabel: { fontSize: 16, fontWeight: "500" },
  divider: { height: 1, marginLeft: 16 },
  swatchRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 12 },
  swatch: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  swatchLabel: { fontSize: 12, textAlign: "center", fontWeight: "500" },
  footer: { fontSize: 12, textAlign: "center", marginTop: 32 },
});
