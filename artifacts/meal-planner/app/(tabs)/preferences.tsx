import React from "react";
import { ScrollView, StyleSheet, Text, View, Pressable, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { useColors } from "@/hooks/useColors";
import { usePlan, BudgetTier, MealsPerDay, SkillLevel } from "@/context/PlanContext";
import { RecipeTag } from "@/constants/recipes";
import { useSettings } from "@/context/SettingsContext";

const DIETARY: RecipeTag[] = ["vegetarian", "vegan", "gf", "df"];
const SKILLS: SkillLevel[] = ["Beginner", "Intermediate", "Confident"];
const BUDGETS: BudgetTier[] = ["Tight", "Moderate", "Comfortable"];
const MEALS: MealsPerDay[] = ["Dinner", "Lunch+Dinner", "All"];

export default function PreferencesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { preferences, updatePreferences, isHydrated } = usePlan();
  const { t } = useSettings();

  if (!isHydrated) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: colors.mutedForeground, fontWeight: "500" }}>{t("common.loading")}</Text>
      </View>
    );
  }

  const toggleDietary = (tag: RecipeTag) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newTags = preferences.dietary.includes(tag)
      ? preferences.dietary.filter(x => x !== tag)
      : [...preferences.dietary, tag];
    updatePreferences({ dietary: newTags });
  };

  const tap = <T,>(setter: (v: T) => void, value: T) => () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setter(value);
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
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>{t("prefs.title")}</Text>
        <Text style={[styles.headerSubtitle, { color: colors.mutedForeground }]}>{t("prefs.subtitle")}</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{t("prefs.dietary")}</Text>
        <View style={styles.chipContainer}>
          {DIETARY.map(tag => {
            const isSelected = preferences.dietary.includes(tag);
            return (
              <Pressable
                key={tag}
                style={({ pressed }) => [
                  styles.chip,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.card,
                    borderColor: isSelected ? colors.primary : colors.border,
                  },
                  pressed && { opacity: 0.8 }
                ]}
                onPress={() => toggleDietary(tag)}
              >
                {isSelected && <Feather name="check" size={14} color={colors.primaryForeground} style={{ marginRight: 6 }} />}
                <Text style={[styles.chipText, { color: isSelected ? colors.primaryForeground : colors.foreground }]}>
                  {t(`diet.${tag}`)}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Section title={t("prefs.meals")} colors={colors}>
        {MEALS.map(opt => (
          <Segment
            key={opt}
            label={t(`meals.${opt}`)}
            active={preferences.mealsPerDay === opt}
            onPress={tap((v) => updatePreferences({ mealsPerDay: v }), opt)}
            colors={colors}
          />
        ))}
      </Section>

      <Section title={t("prefs.budget")} colors={colors}>
        {BUDGETS.map(opt => (
          <Segment
            key={opt}
            label={t(`budget.${opt}`)}
            active={preferences.budget === opt}
            onPress={tap((v) => updatePreferences({ budget: v }), opt)}
            colors={colors}
          />
        ))}
      </Section>

      <Section title={t("prefs.skill")} colors={colors}>
        {SKILLS.map(opt => (
          <Segment
            key={opt}
            label={t(`skill.${opt}`)}
            active={preferences.skill === opt}
            onPress={tap((v) => updatePreferences({ skill: v }), opt)}
            colors={colors}
          />
        ))}
      </Section>
    </ScrollView>
  );
}

function Section({ title, colors, children }: any) {
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{title}</Text>
      <View style={[styles.segmentedControl, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {children}
      </View>
    </View>
  );
}

function Segment({ label, active, onPress, colors }: any) {
  return (
    <Pressable
      style={[styles.segment, active && { backgroundColor: colors.accent }]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.segmentText,
          { color: active ? colors.primary : colors.mutedForeground, fontWeight: active ? "600" : "500" },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { marginBottom: 32 },
  headerTitle: { fontSize: 28, fontWeight: "700", marginBottom: 4 },
  headerSubtitle: { fontSize: 16 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 16 },
  chipContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 24, borderWidth: 1 },
  chipText: { fontSize: 14, fontWeight: "500" },
  segmentedControl: { flexDirection: "row", borderRadius: 12, borderWidth: 1, overflow: "hidden", padding: 4 },
  segment: { flex: 1, paddingVertical: 12, alignItems: "center", justifyContent: "center", borderRadius: 8 },
  segmentText: { fontSize: 13, textAlign: "center" },
});
