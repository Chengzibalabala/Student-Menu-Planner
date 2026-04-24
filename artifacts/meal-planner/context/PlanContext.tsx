import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { recipes, Recipe, RecipeTag } from "../constants/recipes";

export type SkillLevel = "Beginner" | "Intermediate" | "Confident";
export type BudgetTier = "Tight" | "Moderate" | "Comfortable";
export type MealsPerDay = "Dinner" | "Lunch+Dinner" | "All";

export interface Preferences {
  dietary: RecipeTag[];
  skill: SkillLevel;
  budget: BudgetTier;
  mealsPerDay: MealsPerDay;
}

export interface PlanSlot {
  id: string; // unique slot id
  date: string; // YYYY-MM-DD
  dayOfWeek: number; // 0-6
  mealType: "breakfast" | "lunch" | "dinner";
  recipeId: string;
}

export interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  checked: boolean;
}

interface PlanContextState {
  preferences: Preferences;
  plan: PlanSlot[];
  groceryItems: GroceryItem[];
  isHydrated: boolean;
  updatePreferences: (prefs: Partial<Preferences>) => void;
  generatePlan: () => void;
  swapMeal: (slotId: string) => void;
  toggleGroceryItem: (itemId: string) => void;
  clearCheckedGroceries: () => void;
}

const defaultPreferences: Preferences = {
  dietary: [],
  skill: "Beginner",
  budget: "Moderate",
  mealsPerDay: "All",
};

const PlanContext = createContext<PlanContextState | null>(null);

function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [plan, setPlan] = useState<PlanSlot[]>([]);
  const [groceryState, setGroceryState] = useState<Record<string, boolean>>({});
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const storedPrefs = await AsyncStorage.getItem("prefs");
        const storedPlan = await AsyncStorage.getItem("plan");
        const storedGroceries = await AsyncStorage.getItem("groceries");

        if (storedPrefs) setPreferences(JSON.parse(storedPrefs));
        if (storedPlan) setPlan(JSON.parse(storedPlan));
        if (storedGroceries) setGroceryState(JSON.parse(storedGroceries));
      } catch (e) {
        console.error("Failed to load state", e);
      } finally {
        setIsHydrated(true);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    AsyncStorage.setItem("prefs", JSON.stringify(preferences));
    AsyncStorage.setItem("plan", JSON.stringify(plan));
    AsyncStorage.setItem("groceries", JSON.stringify(groceryState));
  }, [preferences, plan, groceryState, isHydrated]);

  const updatePreferences = (prefs: Partial<Preferences>) => {
    setPreferences((prev) => ({ ...prev, ...prefs }));
  };

  const generatePlan = () => {
    const newPlan: PlanSlot[] = [];
    const today = new Date();
    
    // Simple mock generation
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];
      const dayOfWeek = date.getDay();

      if (preferences.mealsPerDay === "All") {
        newPlan.push({ id: generateId(), date: dateStr, dayOfWeek, mealType: "breakfast", recipeId: getRandomRecipe("breakfast") });
      }
      if (preferences.mealsPerDay === "All" || preferences.mealsPerDay === "Lunch+Dinner") {
        newPlan.push({ id: generateId(), date: dateStr, dayOfWeek, mealType: "lunch", recipeId: getRandomRecipe("lunch") });
      }
      newPlan.push({ id: generateId(), date: dateStr, dayOfWeek, mealType: "dinner", recipeId: getRandomRecipe("dinner") });
    }
    setPlan(newPlan);
    setGroceryState({});
  };

  const getRandomRecipe = (type: "breakfast" | "lunch" | "dinner") => {
    const available = recipes.filter(r => r.mealType === type);
    if (available.length === 0) return recipes[0].id;
    return available[Math.floor(Math.random() * available.length)].id;
  };

  const swapMeal = (slotId: string) => {
    setPlan(prev => prev.map(slot => {
      if (slot.id === slotId) {
        return { ...slot, recipeId: getRandomRecipe(slot.mealType) };
      }
      return slot;
    }));
  };

  const toggleGroceryItem = (itemId: string) => {
    setGroceryState(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const clearCheckedGroceries = () => {
    setGroceryState(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => {
        if (next[k]) delete next[k];
      });
      return next;
    });
  };

  const groceryItems = plan.reduce((acc, slot) => {
    const recipe = recipes.find(r => r.id === slot.recipeId);
    if (!recipe) return acc;
    
    recipe.ingredients.forEach(ing => {
      const existing = acc.find(i => i.name === ing.name && i.unit === ing.unit);
      if (existing) {
        existing.quantity += ing.quantity;
      } else {
        acc.push({
          id: `${ing.name}-${ing.unit}`,
          name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit,
          category: ing.category,
          checked: !!groceryState[`${ing.name}-${ing.unit}`]
        });
      }
    });
    return acc;
  }, [] as GroceryItem[]);

  return (
    <PlanContext.Provider value={{
      preferences, plan, groceryItems, isHydrated,
      updatePreferences, generatePlan, swapMeal, toggleGroceryItem, clearCheckedGroceries
    }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
