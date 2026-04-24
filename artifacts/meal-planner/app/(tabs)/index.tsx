import React from "react";
import { StyleSheet, Text, View, Pressable, Platform, RefreshControl, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

import { useColors } from "@/hooks/useColors";
import { PlanSlot, usePlan } from "@/context/PlanContext";
import { recipes } from "@/constants/recipes";
import { useSettings } from "@/context/SettingsContext";
import { getDayLabel, getMealTypeLabel } from "@/i18n";
import { getLocalizedRecipeName } from "@/i18n/recipes";

export default function ThisWeekScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { plan, generatePlan, isHydrated } = usePlan();
  const { t, locale } = useSettings();
  const [refreshing, setRefreshing] = React.useState(false);
  const router = useRouter();

  const handleGenerate = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    generatePlan();
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleGenerate();
    setTimeout(() => setRefreshing(false), 500);
  }, []);

  if (!isHydrated) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: colors.mutedForeground, fontWeight: "500" }}>{t("common.loading")}</Text>
      </View>
    );
  }

  if (plan.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
        <View style={[styles.iconCircle, { backgroundColor: colors.accent }]}>
          <Feather name="calendar" size={48} color={colors.primary} />
        </View>
        <Text style={[styles.emptyTitle, { color: colors.foreground }]}>{t("week.empty.title")}</Text>
        <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
          {t("week.empty.text")}
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.generateButton,
            { backgroundColor: colors.primary },
            pressed && { opacity: 0.8 }
          ]}
          onPress={handleGenerate}
        >
          <Feather name="zap" size={20} color={colors.primaryForeground} />
          <Text style={[styles.generateButtonText, { color: colors.primaryForeground }]}>
            {t("week.generate")}
          </Text>
        </Pressable>
      </View>
    );
  }

  const groupedPlan: Record<string, PlanSlot[]> = {};
  plan.forEach(slot => {
    if (!groupedPlan[slot.date]) groupedPlan[slot.date] = [];
    groupedPlan[slot.date].push(slot);
  });

  const dates = Object.keys(groupedPlan).sort();
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{
        paddingTop: Platform.OS === "web" ? 67 + 20 : 20,
        paddingBottom: insets.bottom + 100,
        paddingHorizontal: 16,
      }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>{t("week.title")}</Text>
        <Pressable
          style={({ pressed }) => [
            styles.headerButton,
            { backgroundColor: colors.accent },
            pressed && { opacity: 0.7 }
          ]}
          onPress={handleGenerate}
        >
          <Feather name="refresh-cw" size={16} color={colors.primary} />
        </Pressable>
      </View>

      {dates.map((date) => {
        const slots = groupedPlan[date];
        const dateObj = new Date(date + "T12:00:00Z");
        const dayOfWeek = dateObj.getUTCDay();
        const isToday = date === todayStr;
        const dayLabel = getDayLabel(locale, dayOfWeek, isToday);
        const monthDay = `${dateObj.getUTCMonth() + 1}/${dateObj.getUTCDate()}`;

        return (
          <View key={date} style={styles.dayContainer}>
            <View style={styles.dayHeader}>
              <Text style={[styles.dayTitle, { color: colors.foreground }]}>
                {dayLabel}
                <Text style={[styles.dayDate, { color: colors.mutedForeground }]}>  {monthDay}</Text>
              </Text>
              {isToday && (
                <View style={[styles.todayBadge, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.todayText, { color: colors.primaryForeground }]}>{t("common.current")}</Text>
                </View>
              )}
            </View>

            <View style={[styles.dayCard, { backgroundColor: colors.card, borderColor: isToday ? colors.primary : colors.border }]}>
              {slots.map((slot, index) => {
                const recipe = recipes.find(r => r.id === slot.recipeId);
                if (!recipe) return null;
                const localizedName = getLocalizedRecipeName(recipe.id, recipe.name, locale);

                return (
                  <View key={slot.id}>
                    <Pressable
                      style={({ pressed }) => [
                        styles.mealRow,
                        pressed && { opacity: 0.6 }
                      ]}
                      onPress={() => router.push(`/recipe/${recipe.id}?slotId=${slot.id}`)}
                    >
                      <View style={[styles.mealIcon, { backgroundColor: colors.accent }]}>
                        <Feather name={recipe.icon as any} size={20} color={colors.primary} />
                      </View>
                      <View style={styles.mealInfo}>
                        <Text style={[styles.mealType, { color: colors.mutedForeground }]}>
                          {getMealTypeLabel(locale, slot.mealType)}
                        </Text>
                        <Text style={[styles.mealName, { color: colors.foreground }]} numberOfLines={1}>
                          {localizedName}
                        </Text>
                      </View>
                      <Feather name="chevron-right" size={20} color={colors.mutedForeground} />
                    </Pressable>
                    {index < slots.length - 1 && (
                      <View style={[styles.divider, { backgroundColor: colors.border }]} />
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  iconCircle: { width: 96, height: 96, borderRadius: 48, alignItems: "center", justifyContent: "center", marginBottom: 24 },
  emptyTitle: { fontSize: 24, fontWeight: "700", marginBottom: 8, textAlign: "center" },
  emptyText: { fontSize: 16, textAlign: "center", marginBottom: 32, lineHeight: 24 },
  generateButton: { flexDirection: "row", alignItems: "center", paddingHorizontal: 24, paddingVertical: 16, borderRadius: 16, gap: 8 },
  generateButtonText: { fontSize: 16, fontWeight: "600" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24 },
  headerTitle: { fontSize: 28, fontWeight: "700" },
  headerButton: { padding: 10, borderRadius: 12 },
  dayContainer: { marginBottom: 24 },
  dayHeader: { flexDirection: "row", alignItems: "baseline", marginBottom: 12, gap: 8 },
  dayTitle: { fontSize: 18, fontWeight: "600" },
  dayDate: { fontSize: 14 },
  todayBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  todayText: { fontSize: 10, fontWeight: "600", textTransform: "uppercase" },
  dayCard: { borderRadius: 16, borderWidth: 1, overflow: "hidden" },
  mealRow: { flexDirection: "row", alignItems: "center", padding: 16, gap: 12 },
  mealIcon: { width: 48, height: 48, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  mealInfo: { flex: 1, justifyContent: "center" },
  mealType: { fontSize: 12, fontWeight: "500", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 },
  mealName: { fontSize: 16, fontWeight: "600" },
  divider: { height: 1, marginLeft: 76 },
});
