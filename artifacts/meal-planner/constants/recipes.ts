export type MealType = "breakfast" | "lunch" | "dinner";
export type RecipeTag = "vegetarian" | "vegan" | "gf" | "df";
export type Difficulty = "Beginner" | "Intermediate" | "Confident";
export type CostTier = 1 | 2 | 3;

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  category: "Produce" | "Dairy" | "Pantry" | "Protein" | "Frozen" | "Other";
}

export interface Recipe {
  id: string;
  name: string;
  mealType: MealType;
  tags: RecipeTag[];
  difficulty: Difficulty;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  costTier: CostTier;
  ingredients: Ingredient[];
  steps: string[];
  icon: string;
}

export const recipes: Recipe[] = [
  {
    id: "r1",
    name: "Peanut Butter Banana Toast",
    mealType: "breakfast",
    tags: ["vegetarian", "vegan", "df"],
    difficulty: "Beginner",
    prepMinutes: 5,
    cookMinutes: 2,
    servings: 1,
    costTier: 1,
    icon: "coffee",
    ingredients: [
      { name: "Whole wheat bread", quantity: 2, unit: "slices", category: "Pantry" },
      { name: "Peanut butter", quantity: 2, unit: "tbsp", category: "Pantry" },
      { name: "Banana", quantity: 1, unit: "whole", category: "Produce" },
    ],
    steps: [
      "Toast the bread to your liking.",
      "Spread 1 tbsp of peanut butter on each slice.",
      "Slice the banana and arrange on top.",
    ],
  },
  {
    id: "r2",
    name: "Overnight Oats",
    mealType: "breakfast",
    tags: ["vegetarian", "gf"],
    difficulty: "Beginner",
    prepMinutes: 5,
    cookMinutes: 0,
    servings: 1,
    costTier: 1,
    icon: "sun",
    ingredients: [
      { name: "Rolled oats", quantity: 0.5, unit: "cup", category: "Pantry" },
      { name: "Milk", quantity: 0.5, unit: "cup", category: "Dairy" },
      { name: "Chia seeds", quantity: 1, unit: "tbsp", category: "Pantry" },
      { name: "Honey", quantity: 1, unit: "tbsp", category: "Pantry" },
    ],
    steps: [
      "In a jar, combine oats, milk, chia seeds, and honey.",
      "Stir well, cover, and refrigerate overnight.",
      "Enjoy cold in the morning.",
    ],
  },
  {
    id: "r3",
    name: "Avocado Toast with Egg",
    mealType: "breakfast",
    tags: ["vegetarian", "df"],
    difficulty: "Beginner",
    prepMinutes: 5,
    cookMinutes: 5,
    servings: 1,
    costTier: 2,
    icon: "sunrise",
    ingredients: [
      { name: "Sourdough bread", quantity: 1, unit: "slice", category: "Pantry" },
      { name: "Avocado", quantity: 0.5, unit: "whole", category: "Produce" },
      { name: "Egg", quantity: 1, unit: "whole", category: "Protein" },
      { name: "Everything bagel seasoning", quantity: 1, unit: "tsp", category: "Pantry" },
    ],
    steps: [
      "Toast the sourdough bread.",
      "Mash the avocado onto the toast.",
      "Fry or poach the egg and place it on top of the avocado.",
      "Sprinkle with seasoning.",
    ],
  },
  {
    id: "r4",
    name: "Turkey & Cheese Wrap",
    mealType: "lunch",
    tags: [],
    difficulty: "Beginner",
    prepMinutes: 5,
    cookMinutes: 0,
    servings: 1,
    costTier: 1,
    icon: "briefcase",
    ingredients: [
      { name: "Tortilla wrap", quantity: 1, unit: "whole", category: "Pantry" },
      { name: "Deli turkey", quantity: 4, unit: "slices", category: "Protein" },
      { name: "Cheddar cheese", quantity: 1, unit: "slice", category: "Dairy" },
      { name: "Lettuce", quantity: 1, unit: "handful", category: "Produce" },
    ],
    steps: [
      "Lay the tortilla flat.",
      "Layer turkey, cheese, and lettuce.",
      "Roll tightly and slice in half.",
    ],
  },
  {
    id: "r5",
    name: "Caprese Salad",
    mealType: "lunch",
    tags: ["vegetarian", "gf"],
    difficulty: "Beginner",
    prepMinutes: 10,
    cookMinutes: 0,
    servings: 1,
    costTier: 2,
    icon: "wind",
    ingredients: [
      { name: "Tomatoes", quantity: 2, unit: "whole", category: "Produce" },
      { name: "Fresh mozzarella", quantity: 4, unit: "oz", category: "Dairy" },
      { name: "Fresh basil", quantity: 0.25, unit: "cup", category: "Produce" },
      { name: "Balsamic glaze", quantity: 1, unit: "tbsp", category: "Pantry" },
    ],
    steps: [
      "Slice the tomatoes and mozzarella.",
      "Arrange on a plate, alternating tomato and cheese.",
      "Top with fresh basil leaves and drizzle with balsamic glaze.",
    ],
  },
  {
    id: "r6",
    name: "Tuna Salad Sandwich",
    mealType: "lunch",
    tags: ["df"],
    difficulty: "Beginner",
    prepMinutes: 10,
    cookMinutes: 0,
    servings: 1,
    costTier: 1,
    icon: "anchor",
    ingredients: [
      { name: "Canned tuna", quantity: 1, unit: "can", category: "Pantry" },
      { name: "Mayo", quantity: 2, unit: "tbsp", category: "Pantry" },
      { name: "Bread", quantity: 2, unit: "slices", category: "Pantry" },
      { name: "Celery (diced)", quantity: 0.25, unit: "cup", category: "Produce" },
    ],
    steps: [
      "Drain the tuna and mix with mayo and celery in a bowl.",
      "Serve between two slices of bread.",
    ],
  },
  {
    id: "r7",
    name: "Sheet Pan Chicken Fajitas",
    mealType: "dinner",
    tags: ["gf", "df"],
    difficulty: "Beginner",
    prepMinutes: 15,
    cookMinutes: 25,
    servings: 2,
    costTier: 2,
    icon: "flame",
    ingredients: [
      { name: "Chicken breast", quantity: 0.5, unit: "lb", category: "Protein" },
      { name: "Bell peppers", quantity: 2, unit: "whole", category: "Produce" },
      { name: "Onion", quantity: 1, unit: "whole", category: "Produce" },
      { name: "Fajita seasoning", quantity: 2, unit: "tbsp", category: "Pantry" },
      { name: "Olive oil", quantity: 1, unit: "tbsp", category: "Pantry" },
    ],
    steps: [
      "Preheat oven to 400°F (200°C).",
      "Slice chicken, peppers, and onions into strips.",
      "Toss with olive oil and seasoning on a sheet pan.",
      "Bake for 20-25 minutes until chicken is cooked through.",
    ],
  },
  {
    id: "r8",
    name: "Pesto Pasta",
    mealType: "dinner",
    tags: ["vegetarian"],
    difficulty: "Beginner",
    prepMinutes: 5,
    cookMinutes: 15,
    servings: 2,
    costTier: 1,
    icon: "droplet",
    ingredients: [
      { name: "Pasta", quantity: 8, unit: "oz", category: "Pantry" },
      { name: "Pesto sauce", quantity: 0.5, unit: "cup", category: "Pantry" },
      { name: "Cherry tomatoes", quantity: 1, unit: "cup", category: "Produce" },
      { name: "Parmesan cheese", quantity: 0.25, unit: "cup", category: "Dairy" },
    ],
    steps: [
      "Boil pasta according to package directions.",
      "Drain, reserving a splash of pasta water.",
      "Toss hot pasta with pesto, adding a little pasta water if needed.",
      "Stir in halved cherry tomatoes and top with parmesan.",
    ],
  },
  {
    id: "r9",
    name: "Easy Beef Tacos",
    mealType: "dinner",
    tags: ["gf"],
    difficulty: "Beginner",
    prepMinutes: 10,
    cookMinutes: 15,
    servings: 2,
    costTier: 2,
    icon: "moon",
    ingredients: [
      { name: "Ground beef", quantity: 0.5, unit: "lb", category: "Protein" },
      { name: "Taco seasoning", quantity: 1, unit: "tbsp", category: "Pantry" },
      { name: "Taco shells", quantity: 4, unit: "whole", category: "Pantry" },
      { name: "Salsa", quantity: 0.25, unit: "cup", category: "Pantry" },
      { name: "Shredded cheese", quantity: 0.5, unit: "cup", category: "Dairy" },
    ],
    steps: [
      "Brown the ground beef in a skillet over medium heat.",
      "Drain excess fat, stir in taco seasoning and a splash of water, simmer for 2 minutes.",
      "Serve in taco shells with cheese and salsa.",
    ],
  },
  {
    id: "r10",
    name: "Microwave Ramen Upgrade",
    mealType: "dinner",
    tags: ["df"],
    difficulty: "Beginner",
    prepMinutes: 5,
    cookMinutes: 5,
    servings: 1,
    costTier: 1,
    icon: "zap",
    ingredients: [
      { name: "Instant ramen", quantity: 1, unit: "pack", category: "Pantry" },
      { name: "Frozen mixed vegetables", quantity: 0.5, unit: "cup", category: "Frozen" },
      { name: "Egg", quantity: 1, unit: "whole", category: "Protein" },
      { name: "Soy sauce", quantity: 1, unit: "tbsp", category: "Pantry" },
    ],
    steps: [
      "Cook ramen according to package instructions, adding frozen veggies during the last minute.",
      "Stir in soy sauce and half the seasoning packet.",
      "Crack an egg into the hot broth, cover, and let sit for 2 minutes until cooked.",
    ],
  }
];