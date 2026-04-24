import React from "react";
import { StyleSheet, Text, View, Pressable, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useRouter } from "expo-router";

import { useColors } from "@/hooks/useColors";
import { GroceryItem, usePlan } from "@/context/PlanContext";
import { useSettings } from "@/context/SettingsContext";
import { localizeIngredient, localizeUnit } from "@/i18n/recipes";

export default function GroceryScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { groceryItems, toggleGroceryItem, clearCheckedGroceries, isHydrated, plan } = usePlan();
  const { t, locale } = useSettings();

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
          <Feather name="shopping-cart" size={48} color={colors.primary} />
        </View>
        <Text style={[styles.emptyTitle, { color: colors.foreground }]}>{t("grocery.empty.title")}</Text>
        <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
          {t("grocery.empty.text")}
        </Text>
      </View>
    );
  }

  const handleToggle = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleGroceryItem(id);
  };

  const handleClear = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    clearCheckedGroceries();
  };

  const handleShare = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/share-preview");
  };

  const totalItems = groceryItems.length;
  const checkedItems = groceryItems.filter(i => i.checked).length;

  const categories = ["Produce", "Dairy", "Protein", "Pantry", "Frozen", "Other"];
  const groupedItems: Record<string, GroceryItem[]> = {};

  const sortedItems = [...groceryItems].sort((a, b) => {
    if (a.checked === b.checked) return a.name.localeCompare(b.name);
    return a.checked ? 1 : -1;
  });

  categories.forEach(cat => {
    const itemsInCat = sortedItems.filter(i => i.category === cat);
    if (itemsInCat.length > 0) groupedItems[cat] = itemsInCat;
  });

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
        <View style={{ flex: 1 }}>
          <Text style={[styles.headerTitle, { color: colors.foreground }]}>{t("grocery.title")}</Text>
          <Text style={[styles.headerSubtitle, { color: colors.mutedForeground }]}>
            {t("grocery.progress", { checked: checkedItems, total: totalItems })}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
          {checkedItems > 0 && (
            <Pressable
              style={({ pressed }) => [
                styles.chipButton,
                { backgroundColor: colors.accent },
                pressed && { opacity: 0.7 }
              ]}
              onPress={handleClear}
            >
              <Text style={[styles.chipButtonText, { color: colors.primary }]}>{t("grocery.clearDone")}</Text>
            </Pressable>
          )}
          <Pressable
            style={({ pressed }) => [
              styles.shareButton,
              { backgroundColor: colors.primary },
              pressed && { opacity: 0.8 }
            ]}
            onPress={handleShare}
          >
            <Feather name="share-2" size={14} color={colors.primaryForeground} />
            <Text style={[styles.shareButtonText, { color: colors.primaryForeground }]}>
              {t("grocery.share")}
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.progressContainer, { backgroundColor: colors.border }]}>
        <View
          style={[
            styles.progressBar,
            { backgroundColor: colors.primary, width: `${totalItems === 0 ? 0 : (checkedItems / totalItems) * 100}%` }
          ]}
        />
      </View>

      {Object.keys(groupedItems).map(category => (
        <Animated.View
          key={category}
          style={styles.categorySection}
          layout={LinearTransition}
        >
          <Text style={[styles.categoryTitle, { color: colors.foreground }]}>
            {t(`category.${category}`)}
          </Text>
          <View style={[styles.categoryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {groupedItems[category].map((item, index) => {
              const isLast = index === groupedItems[category].length - 1;
              return (
                <Animated.View key={item.id} layout={LinearTransition}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.itemRow,
                      pressed && { opacity: 0.7 }
                    ]}
                    onPress={() => handleToggle(item.id)}
                  >
                    <View style={[
                      styles.checkbox,
                      {
                        borderColor: item.checked ? colors.primary : colors.border,
                        backgroundColor: item.checked ? colors.primary : "transparent"
                      }
                    ]}>
                      {item.checked && <Feather name="check" size={14} color={colors.primaryForeground} />}
                    </View>
                    <Text
                      style={[
                        styles.itemName,
                        { color: item.checked ? colors.mutedForeground : colors.foreground },
                        item.checked && styles.itemChecked
                      ]}
                    >
                      {localizeIngredient(item.name, locale)}
                    </Text>
                    <Text style={[styles.itemQuantity, { color: colors.mutedForeground }]}>
                      {item.quantity} {localizeUnit(item.unit, locale)}
                    </Text>
                  </Pressable>
                  {!isLast && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
                </Animated.View>
              );
            })}
          </View>
        </Animated.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  iconCircle: { width: 96, height: 96, borderRadius: 48, alignItems: "center", justifyContent: "center", marginBottom: 24 },
  emptyTitle: { fontSize: 24, fontWeight: "700", marginBottom: 8, textAlign: "center" },
  emptyText: { fontSize: 16, textAlign: "center", marginBottom: 32, lineHeight: 24 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 8 },
  headerTitle: { fontSize: 28, fontWeight: "700" },
  headerSubtitle: { fontSize: 14, fontWeight: "500" },
  chipButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  chipButtonText: { fontSize: 12, fontWeight: "600" },
  shareButton: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  shareButtonText: { fontSize: 12, fontWeight: "600" },
  progressContainer: { height: 8, borderRadius: 4, marginBottom: 24, overflow: "hidden" },
  progressBar: { height: "100%", borderRadius: 4 },
  categorySection: { marginBottom: 24 },
  categoryTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  categoryCard: { borderRadius: 16, borderWidth: 1, overflow: "hidden" },
  itemRow: { flexDirection: "row", alignItems: "center", padding: 16, gap: 12 },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, alignItems: "center", justifyContent: "center" },
  itemName: { flex: 1, fontSize: 16, fontWeight: "500" },
  itemChecked: { textDecorationLine: "line-through" },
  itemQuantity: { fontSize: 14 },
  divider: { height: 1, marginLeft: 52 },
});
