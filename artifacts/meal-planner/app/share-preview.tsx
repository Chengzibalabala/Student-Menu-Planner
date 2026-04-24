import React, { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import ViewShot, { captureRef } from "react-native-view-shot";
import { useRouter } from "expo-router";

import { useColors } from "@/hooks/useColors";
import { usePlan, PlanSlot, GroceryItem } from "@/context/PlanContext";
import { recipes } from "@/constants/recipes";
import { useSettings } from "@/context/SettingsContext";
import { themes } from "@/constants/themes";
import { getDayLabel, getMealTypeLabel } from "@/i18n";
import {
  getLocalizedRecipeName,
  localizeIngredient,
} from "@/i18n/recipes";

const PREVIEW_WIDTH = 360;

export default function SharePreviewScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { plan, groceryItems } = usePlan();
  const { t, locale, themeColor } = useSettings();
  const viewRef = useRef<View>(null);
  const [busy, setBusy] = useState(false);

  const isWeb = Platform.OS === "web";
  const accent = themes[themeColor].light.primary;
  const accentSoft = themes[themeColor].light.secondary;
  const accentDark = themes[themeColor].light.secondaryForeground;

  const groupedPlan: Record<string, PlanSlot[]> = {};
  plan.forEach(slot => {
    if (!groupedPlan[slot.date]) groupedPlan[slot.date] = [];
    groupedPlan[slot.date].push(slot);
  });
  const dates = Object.keys(groupedPlan).sort();
  const startDate = dates[0];
  const endDate = dates[dates.length - 1];

  const fmtDate = (d?: string) => {
    if (!d) return "";
    const dt = new Date(d + "T12:00:00Z");
    return `${dt.getUTCMonth() + 1}/${dt.getUTCDate()}`;
  };

  const groceryByCat: Record<string, GroceryItem[]> = {};
  groceryItems.forEach(g => {
    if (!groceryByCat[g.category]) groceryByCat[g.category] = [];
    groceryByCat[g.category].push(g);
  });

  const flatGrocery = groceryItems.slice(0, 9);
  const remaining = Math.max(0, groceryItems.length - flatGrocery.length);
  const todayStr = new Date().toISOString().split("T")[0];

  const showAlert = (msg: string) => {
    if (Platform.OS === "web") {
      try { window.alert(msg); } catch {}
    } else {
      Alert.alert(t("app.name"), msg);
    }
  };

  const handleSave = async () => {
    if (isWeb) return;
    try {
      setBusy(true);
      const perm = await MediaLibrary.requestPermissionsAsync();
      if (!perm.granted) {
        showAlert(t("share.permission"));
        return;
      }
      const uri = await captureRef(viewRef, { format: "png", quality: 1 });
      await MediaLibrary.saveToLibraryAsync(uri);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      showAlert(t("share.saved"));
    } catch {
      showAlert(t("share.savedFail"));
    } finally {
      setBusy(false);
    }
  };

  const handleShare = async () => {
    try {
      setBusy(true);
      if (isWeb) {
        const text = `${t("share.preview.header")} - ${t("app.name")}`;
        if (typeof navigator !== "undefined" && (navigator as any).share) {
          await (navigator as any).share({ title: t("app.name"), text });
        } else {
          showAlert(t("share.webOnly"));
        }
        return;
      }
      const uri = await captureRef(viewRef, { format: "png", quality: 1 });
      const available = await Sharing.isAvailableAsync();
      if (!available) {
        showAlert(t("share.shareFail"));
        return;
      }
      await Sharing.shareAsync(uri, { mimeType: "image/png", dialogTitle: t("share.title") });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      showAlert(t("share.shareFail"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={[styles.topBar, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={({ pressed }) => [pressed && { opacity: 0.6 }]}>
          <Feather name="x" size={24} color={colors.foreground} />
        </Pressable>
        <Text style={[styles.topTitle, { color: colors.foreground }]}>{t("share.title")}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 120, alignItems: "center" }}
      >
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          {t("share.subtitle")}
        </Text>

        <ViewShot ref={viewRef as any} style={styles.previewWrap}>
          <View style={[styles.preview, { width: PREVIEW_WIDTH, backgroundColor: "#ffffff" }]}>
            <View style={[styles.previewHeader, { backgroundColor: accent }]}>
              <View style={styles.previewHeaderTop}>
                <Feather name="coffee" size={18} color="#fff" />
                <Text style={styles.previewBrand}>{t("app.name")}</Text>
              </View>
              <Text style={styles.previewTitle}>{t("share.preview.header")}</Text>
              {startDate && (
                <Text style={styles.previewDates}>
                  {fmtDate(startDate)} – {fmtDate(endDate)}
                </Text>
              )}
            </View>

            <View style={styles.previewBody}>
              {dates.map((date) => {
                const slots = groupedPlan[date];
                const dt = new Date(date + "T12:00:00Z");
                const dayOfWeek = dt.getUTCDay();
                const isToday = date === todayStr;
                const dayLabel = getDayLabel(locale, dayOfWeek, isToday);

                return (
                  <View key={date} style={[styles.dayRow, { borderBottomColor: "#f1f1f1" }]}>
                    <View style={[styles.dayPill, { backgroundColor: accentSoft }]}>
                      <Text style={[styles.dayPillText, { color: accentDark }]}>{dayLabel}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      {slots.map(slot => {
                        const r = recipes.find(x => x.id === slot.recipeId);
                        if (!r) return null;
                        return (
                          <Text key={slot.id} style={styles.dayMeal} numberOfLines={1}>
                            <Text style={{ color: "#999", fontSize: 11 }}>
                              {getMealTypeLabel(locale, slot.mealType)}  ·  
                            </Text>
                            {getLocalizedRecipeName(r.id, r.name, locale)}
                          </Text>
                        );
                      })}
                    </View>
                  </View>
                );
              })}

              <View style={[styles.grocerySection, { backgroundColor: accentSoft }]}>
                <View style={styles.groceryHeader}>
                  <Feather name="shopping-bag" size={14} color={accentDark} />
                  <Text style={[styles.groceryTitle, { color: accentDark }]}>
                    {t("share.preview.grocery")}
                  </Text>
                  <Text style={[styles.groceryCount, { color: accentDark }]}>
                    {t("share.preview.items", { n: groceryItems.length })}
                  </Text>
                </View>
                <View style={styles.groceryGrid}>
                  {flatGrocery.map(item => (
                    <Text key={item.id} style={[styles.groceryItem, { color: "#444" }]} numberOfLines={1}>
                      • {localizeIngredient(item.name, locale)}
                    </Text>
                  ))}
                </View>
                {remaining > 0 && (
                  <Text style={[styles.groceryMore, { color: accentDark }]}>
                    {t("share.preview.more", { n: remaining })}
                  </Text>
                )}
              </View>

              <Text style={styles.previewFooter}>{t("share.preview.footer")}</Text>
            </View>
          </View>
        </ViewShot>
      </ScrollView>

      <View style={[styles.actionBar, { paddingBottom: insets.bottom || 16, backgroundColor: colors.background, borderTopColor: colors.border }]}>
        {!isWeb && (
          <Pressable
            disabled={busy}
            onPress={handleSave}
            style={({ pressed }) => [
              styles.actionButton,
              { backgroundColor: colors.secondary },
              pressed && { opacity: 0.8 },
              busy && { opacity: 0.5 },
            ]}
          >
            <Feather name="download" size={18} color={colors.secondaryForeground} />
            <Text style={[styles.actionText, { color: colors.secondaryForeground }]}>
              {t("share.save")}
            </Text>
          </Pressable>
        )}
        <Pressable
          disabled={busy}
          onPress={handleShare}
          style={({ pressed }) => [
            styles.actionButton,
            { backgroundColor: colors.primary, flex: 1 },
            pressed && { opacity: 0.85 },
            busy && { opacity: 0.6 },
          ]}
        >
          {busy ? (
            <ActivityIndicator color={colors.primaryForeground} />
          ) : (
            <>
              <Feather name="share-2" size={18} color={colors.primaryForeground} />
              <Text style={[styles.actionText, { color: colors.primaryForeground }]}>
                {t("share.send")}
              </Text>
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  topTitle: { fontSize: 16, fontWeight: "600" },
  subtitle: { fontSize: 13, marginBottom: 16, textAlign: "center" },
  previewWrap: { borderRadius: 20, overflow: "hidden", elevation: 4, shadowColor: "#000", shadowOpacity: 0.12, shadowRadius: 16, shadowOffset: { width: 0, height: 6 } },
  preview: { borderRadius: 20, overflow: "hidden" },
  previewHeader: { padding: 20, paddingBottom: 18 },
  previewHeaderTop: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  previewBrand: { color: "#fff", fontSize: 13, fontWeight: "600", letterSpacing: 0.3 },
  previewTitle: { color: "#fff", fontSize: 22, fontWeight: "700", marginTop: 2 },
  previewDates: { color: "rgba(255,255,255,0.85)", fontSize: 12, marginTop: 4, fontWeight: "500" },
  previewBody: { padding: 16, paddingTop: 14 },
  dayRow: { flexDirection: "row", alignItems: "flex-start", paddingVertical: 8, gap: 10, borderBottomWidth: 1 },
  dayPill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, minWidth: 48, alignItems: "center" },
  dayPillText: { fontSize: 11, fontWeight: "700" },
  dayMeal: { fontSize: 12, color: "#222", marginBottom: 2, fontWeight: "500" },
  grocerySection: { marginTop: 16, padding: 12, borderRadius: 12 },
  groceryHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
  groceryTitle: { fontSize: 13, fontWeight: "700", flex: 1 },
  groceryCount: { fontSize: 11, fontWeight: "600" },
  groceryGrid: { flexDirection: "row", flexWrap: "wrap" },
  groceryItem: { width: "50%", fontSize: 11, marginBottom: 3, paddingRight: 6 },
  groceryMore: { fontSize: 11, fontWeight: "600", marginTop: 4 },
  previewFooter: { fontSize: 10, color: "#aaa", textAlign: "center", marginTop: 12 },
  actionBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: "row",
    gap: 10,
    borderTopWidth: 1,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    paddingHorizontal: 20,
  },
  actionText: { fontSize: 15, fontWeight: "600" },
});
