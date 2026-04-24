import React from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { useColors } from "@/hooks/useColors";
import { usePlan } from "@/context/PlanContext";
import { recipes } from "@/constants/recipes";
import { useSettings } from "@/context/SettingsContext";
import { getLocalizedRecipe } from "@/i18n/recipes";

export default function RecipeScreen() {
  const { id, slotId } = useLocalSearchParams<{ id: string; slotId?: string }>();
  const router = useRouter();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { swapMeal } = usePlan();
  const { t, locale } = useSettings();

  const baseRecipe = recipes.find(r => r.id === id);

  if (!baseRecipe) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: colors.foreground, fontWeight: "500" }}>{t("recipe.notFound")}</Text>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            { backgroundColor: colors.primary, marginTop: 16 },
            pressed && { opacity: 0.8 }
          ]}
          onPress={() => router.back()}
        >
          <Text style={{ color: colors.primaryForeground, fontWeight: "600" }}>{t("recipe.goBack")}</Text>
        </Pressable>
      </View>
    );
  }

  const recipe = getLocalizedRecipe(baseRecipe, locale);

  const handleSwap = () => {
    if (!slotId) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    swapMeal(slotId);
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        <View style={[styles.heroBlock, { backgroundColor: colors.accent }]}>
          <Feather name={recipe.icon as any} size={80} color={colors.primary} />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.recipeName, { color: colors.foreground }]}>{recipe.name}</Text>

            <View style={styles.metaRow}>
              <View style={[styles.metaBadge, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Feather name="clock" size={14} color={colors.mutedForeground} />
                <Text style={[styles.metaText, { color: colors.mutedForeground }]}>
                  {t("recipe.minutes", { n: recipe.prepMinutes + recipe.cookMinutes })}
                </Text>
              </View>
              <View style={[styles.metaBadge, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Feather name="users" size={14} color={colors.mutedForeground} />
                <Text style={[styles.metaText, { color: colors.mutedForeground }]}>
                  {recipe.servings} {t(recipe.servings > 1 ? "common.servings" : "common.serving")}
                </Text>
              </View>
              <View style={[styles.metaBadge, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Feather name="bar-chart" size={14} color={colors.mutedForeground} />
                <Text style={[styles.metaText, { color: colors.mutedForeground }]}>
                  {t(`skill.${recipe.difficulty}`)}
                </Text>
              </View>
            </View>

            {recipe.tags.length > 0 && (
              <View style={styles.tagsRow}>
                {recipe.tags.map(tag => (
                  <View key={tag} style={[styles.tag, { backgroundColor: colors.secondary }]}>
                    <Text style={[styles.tagText, { color: colors.secondaryForeground }]}>
                      {t(`diet.${tag}`)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{t("recipe.ingredients")}</Text>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {recipe.ingredients.map((ing, index) => (
                <View key={index} style={styles.ingredientRow}>
                  <Text style={[styles.ingredientQuantity, { color: colors.primary }]}>
                    {ing.quantity} {ing.unit}
                  </Text>
                  <Text style={[styles.ingredientName, { color: colors.foreground }]}>{ing.name}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{t("recipe.instructions")}</Text>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {recipe.steps.map((step, index) => (
                <View key={index} style={styles.stepRow}>
                  <View style={[styles.stepNumber, { backgroundColor: colors.accent }]}>
                    <Text style={[styles.stepNumberText, { color: colors.primary }]}>{index + 1}</Text>
                  </View>
                  <Text style={[styles.stepText, { color: colors.foreground }]}>{step}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {slotId && (
        <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.border, paddingBottom: insets.bottom || 16 }]}>
          <Pressable
            style={({ pressed }) => [
              styles.swapButton,
              { backgroundColor: colors.secondary },
              pressed && { opacity: 0.8 }
            ]}
            onPress={handleSwap}
          >
            <Feather name="refresh-cw" size={20} color={colors.secondaryForeground} />
            <Text style={[styles.swapButtonText, { color: colors.secondaryForeground }]}>
              {t("recipe.swap")}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroBlock: { height: 200, alignItems: "center", justifyContent: "center" },
  content: { padding: 20, marginTop: -24, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  header: { marginBottom: 32 },
  recipeName: { fontSize: 28, fontWeight: "700", marginBottom: 16 },
  metaRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  metaBadge: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, gap: 6 },
  metaText: { fontSize: 13, fontWeight: "500" },
  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  tagText: { fontSize: 12, fontWeight: "600" },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: "600", marginBottom: 16 },
  card: { borderRadius: 16, borderWidth: 1, padding: 16 },
  ingredientRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 12 },
  ingredientQuantity: { fontSize: 15, fontWeight: "600", width: 90 },
  ingredientName: { flex: 1, fontSize: 15 },
  stepRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 16, gap: 12 },
  stepNumber: { width: 28, height: 28, borderRadius: 14, alignItems: "center", justifyContent: "center", marginTop: 2 },
  stepNumberText: { fontSize: 14, fontWeight: "700" },
  stepText: { flex: 1, fontSize: 15, lineHeight: 24 },
  footer: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 16, paddingTop: 16, borderTopWidth: 1 },
  swapButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 16, borderRadius: 16, gap: 8 },
  swapButtonText: { fontSize: 16, fontWeight: "600" },
  backButton: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
});
