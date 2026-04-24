import { Recipe } from "@/constants/recipes";
import { Locale } from "./index";

type RecipeI18n = { name: string; steps: string[] };

const recipeTranslations: Record<string, Record<Locale, RecipeI18n>> = {
  r1: {
    en: {
      name: "Peanut Butter Banana Toast",
      steps: [
        "Toast the bread to your liking.",
        "Spread 1 tbsp of peanut butter on each slice.",
        "Slice the banana and arrange on top.",
      ],
    },
    "zh-Hans": {
      name: "花生酱香蕉吐司",
      steps: [
        "把面包烤到你喜欢的程度。",
        "在每片面包上抹一汤匙花生酱。",
        "把香蕉切片，整齐地铺在上面。",
      ],
    },
    "zh-Hant": {
      name: "花生醬香蕉吐司",
      steps: [
        "把麵包烤到你喜歡的程度。",
        "在每片麵包上抹一湯匙花生醬。",
        "把香蕉切片，整齊地鋪在上面。",
      ],
    },
  },
  r2: {
    en: {
      name: "Overnight Oats",
      steps: [
        "In a jar, combine oats, milk, chia seeds, and honey.",
        "Stir well, cover, and refrigerate overnight.",
        "Enjoy cold in the morning.",
      ],
    },
    "zh-Hans": {
      name: "隔夜燕麦",
      steps: [
        "在玻璃罐中放入燕麦、牛奶、奇亚籽和蜂蜜。",
        "搅拌均匀，盖好放冰箱冷藏一夜。",
        "第二天早上直接冷食即可。",
      ],
    },
    "zh-Hant": {
      name: "隔夜燕麥",
      steps: [
        "在玻璃罐中放入燕麥、牛奶、奇亞籽和蜂蜜。",
        "攪拌均勻，蓋好放冰箱冷藏一夜。",
        "第二天早上直接冷食即可。",
      ],
    },
  },
  r3: {
    en: {
      name: "Avocado Toast with Egg",
      steps: [
        "Toast the sourdough bread.",
        "Mash the avocado onto the toast.",
        "Fry or poach the egg and place it on top of the avocado.",
        "Sprinkle with seasoning.",
      ],
    },
    "zh-Hans": {
      name: "牛油果鸡蛋吐司",
      steps: [
        "把酸种面包烤香。",
        "把牛油果压成泥铺在吐司上。",
        "煎一个或水煮一个鸡蛋，放在牛油果上。",
        "撒上调味料。",
      ],
    },
    "zh-Hant": {
      name: "酪梨雞蛋吐司",
      steps: [
        "把酸種麵包烤香。",
        "把酪梨壓成泥鋪在吐司上。",
        "煎一個或水煮一個雞蛋，放在酪梨上。",
        "撒上調味料。",
      ],
    },
  },
  r4: {
    en: {
      name: "Turkey & Cheese Wrap",
      steps: [
        "Lay the tortilla flat.",
        "Layer turkey, cheese, and lettuce.",
        "Roll tightly and slice in half.",
      ],
    },
    "zh-Hans": {
      name: "火鸡芝士卷饼",
      steps: [
        "把卷饼皮平铺在案板上。",
        "依次铺上火鸡片、芝士片和生菜。",
        "卷紧后从中间切成两半。",
      ],
    },
    "zh-Hant": {
      name: "火雞起司捲餅",
      steps: [
        "把捲餅皮平鋪在砧板上。",
        "依序鋪上火雞片、起司片和生菜。",
        "捲緊後從中間切成兩半。",
      ],
    },
  },
  r5: {
    en: {
      name: "Caprese Salad",
      steps: [
        "Slice the tomatoes and mozzarella.",
        "Arrange on a plate, alternating tomato and cheese.",
        "Top with fresh basil leaves and drizzle with balsamic glaze.",
      ],
    },
    "zh-Hans": {
      name: "卡普雷塞沙拉",
      steps: [
        "把西红柿和马苏里拉芝士切成厚片。",
        "在盘中交替摆放，番茄一片、芝士一片。",
        "撒上新鲜罗勒叶，淋上巴萨米克醋汁。",
      ],
    },
    "zh-Hant": {
      name: "卡布里沙拉",
      steps: [
        "把番茄和莫札瑞拉起司切成厚片。",
        "在盤中交替擺放，番茄一片、起司一片。",
        "撒上新鮮羅勒葉，淋上巴薩米克醋汁。",
      ],
    },
  },
  r6: {
    en: {
      name: "Tuna Salad Sandwich",
      steps: [
        "Drain the tuna and mix with mayo and celery in a bowl.",
        "Serve between two slices of bread.",
      ],
    },
    "zh-Hans": {
      name: "金枪鱼沙拉三明治",
      steps: [
        "金枪鱼罐头沥干水分，与蛋黄酱、芹菜丁在碗里拌匀。",
        "夹在两片面包中间即可享用。",
      ],
    },
    "zh-Hant": {
      name: "鮪魚沙拉三明治",
      steps: [
        "鮪魚罐頭瀝乾水分，與美乃滋、芹菜丁在碗裡拌勻。",
        "夾在兩片麵包中間即可享用。",
      ],
    },
  },
  r7: {
    en: {
      name: "Sheet Pan Chicken Fajitas",
      steps: [
        "Preheat oven to 400°F (200°C).",
        "Slice chicken, peppers, and onions into strips.",
        "Toss with olive oil and seasoning on a sheet pan.",
        "Bake for 20-25 minutes until chicken is cooked through.",
      ],
    },
    "zh-Hans": {
      name: "烤盘鸡肉法吉塔",
      steps: [
        "烤箱预热至 200°C。",
        "把鸡胸、彩椒和洋葱都切成长条。",
        "倒入烤盘，淋上橄榄油和调味料拌匀。",
        "烤 20–25 分钟，直到鸡肉熟透。",
      ],
    },
    "zh-Hant": {
      name: "烤盤雞肉法士達",
      steps: [
        "烤箱預熱至 200°C。",
        "把雞胸、甜椒和洋蔥都切成長條。",
        "倒入烤盤，淋上橄欖油和調味料拌勻。",
        "烤 20–25 分鐘，直到雞肉熟透。",
      ],
    },
  },
  r8: {
    en: {
      name: "Pesto Pasta",
      steps: [
        "Boil pasta according to package directions.",
        "Drain, reserving a splash of pasta water.",
        "Toss hot pasta with pesto, adding a little pasta water if needed.",
        "Stir in halved cherry tomatoes and top with parmesan.",
      ],
    },
    "zh-Hans": {
      name: "青酱意面",
      steps: [
        "按包装说明煮意面。",
        "捞出沥干，留少许煮面水备用。",
        "把热意面与青酱拌匀，必要时加一点煮面水。",
        "拌入对半切的小番茄，撒上帕马森芝士。",
      ],
    },
    "zh-Hant": {
      name: "青醬義大利麵",
      steps: [
        "依包裝說明煮義大利麵。",
        "撈出瀝乾，留少許煮麵水備用。",
        "把熱義大利麵與青醬拌勻，必要時加一點煮麵水。",
        "拌入對半切的小番茄，撒上帕馬森起司。",
      ],
    },
  },
  r9: {
    en: {
      name: "Easy Beef Tacos",
      steps: [
        "Brown the ground beef in a skillet over medium heat.",
        "Drain excess fat, stir in taco seasoning and a splash of water, simmer for 2 minutes.",
        "Serve in taco shells with cheese and salsa.",
      ],
    },
    "zh-Hans": {
      name: "简易牛肉塔可",
      steps: [
        "用中火在平底锅中将牛肉末炒至变色。",
        "倒掉多余油脂，加入塔可调料和少许水，煨煮约 2 分钟。",
        "装进塔可饼壳中，撒上芝士、淋上莎莎酱即可。",
      ],
    },
    "zh-Hant": {
      name: "簡易牛肉墨西哥脆餅",
      steps: [
        "用中火在平底鍋中將牛絞肉炒至變色。",
        "倒掉多餘油脂，加入塔可調料和少許水，煨煮約 2 分鐘。",
        "裝進塔可餅殼中，撒上起司、淋上莎莎醬即可。",
      ],
    },
  },
  r10: {
    en: {
      name: "Microwave Ramen Upgrade",
      steps: [
        "Cook ramen according to package instructions, adding frozen veggies during the last minute.",
        "Stir in soy sauce and half the seasoning packet.",
        "Crack an egg into the hot broth, cover, and let sit for 2 minutes until cooked.",
      ],
    },
    "zh-Hans": {
      name: "升级版速食拉面",
      steps: [
        "按包装说明煮拉面，最后一分钟加入冷冻杂菜。",
        "拌入酱油和半包调味粉。",
        "把一个鸡蛋打入热汤中，盖上盖子焖 2 分钟即可。",
      ],
    },
    "zh-Hant": {
      name: "升級版速食拉麵",
      steps: [
        "依包裝說明煮拉麵，最後一分鐘加入冷凍蔬菜。",
        "拌入醬油和半包調味粉。",
        "把一個雞蛋打入熱湯中，蓋上蓋子燜 2 分鐘即可。",
      ],
    },
  },
};

const ingredientNames: Record<string, Record<Locale, string>> = {
  "Whole wheat bread": { en: "Whole wheat bread", "zh-Hans": "全麦面包", "zh-Hant": "全麥麵包" },
  "Peanut butter": { en: "Peanut butter", "zh-Hans": "花生酱", "zh-Hant": "花生醬" },
  "Banana": { en: "Banana", "zh-Hans": "香蕉", "zh-Hant": "香蕉" },
  "Rolled oats": { en: "Rolled oats", "zh-Hans": "燕麦片", "zh-Hant": "燕麥片" },
  "Milk": { en: "Milk", "zh-Hans": "牛奶", "zh-Hant": "牛奶" },
  "Chia seeds": { en: "Chia seeds", "zh-Hans": "奇亚籽", "zh-Hant": "奇亞籽" },
  "Honey": { en: "Honey", "zh-Hans": "蜂蜜", "zh-Hant": "蜂蜜" },
  "Sourdough bread": { en: "Sourdough bread", "zh-Hans": "酸种面包", "zh-Hant": "酸種麵包" },
  "Avocado": { en: "Avocado", "zh-Hans": "牛油果", "zh-Hant": "酪梨" },
  "Egg": { en: "Egg", "zh-Hans": "鸡蛋", "zh-Hant": "雞蛋" },
  "Everything bagel seasoning": { en: "Everything bagel seasoning", "zh-Hans": "贝果调味料", "zh-Hant": "貝果調味料" },
  "Tortilla wrap": { en: "Tortilla wrap", "zh-Hans": "卷饼皮", "zh-Hant": "捲餅皮" },
  "Deli turkey": { en: "Deli turkey", "zh-Hans": "火鸡片", "zh-Hant": "火雞片" },
  "Cheddar cheese": { en: "Cheddar cheese", "zh-Hans": "切达芝士", "zh-Hant": "切達起司" },
  "Lettuce": { en: "Lettuce", "zh-Hans": "生菜", "zh-Hant": "生菜" },
  "Tomatoes": { en: "Tomatoes", "zh-Hans": "番茄", "zh-Hant": "番茄" },
  "Fresh mozzarella": { en: "Fresh mozzarella", "zh-Hans": "新鲜马苏里拉", "zh-Hant": "新鮮莫札瑞拉" },
  "Fresh basil": { en: "Fresh basil", "zh-Hans": "新鲜罗勒", "zh-Hant": "新鮮羅勒" },
  "Balsamic glaze": { en: "Balsamic glaze", "zh-Hans": "巴萨米克醋汁", "zh-Hant": "巴薩米克醋汁" },
  "Canned tuna": { en: "Canned tuna", "zh-Hans": "金枪鱼罐头", "zh-Hant": "鮪魚罐頭" },
  "Mayo": { en: "Mayo", "zh-Hans": "蛋黄酱", "zh-Hant": "美乃滋" },
  "Bread": { en: "Bread", "zh-Hans": "面包", "zh-Hant": "麵包" },
  "Celery (diced)": { en: "Celery (diced)", "zh-Hans": "芹菜丁", "zh-Hant": "芹菜丁" },
  "Chicken breast": { en: "Chicken breast", "zh-Hans": "鸡胸肉", "zh-Hant": "雞胸肉" },
  "Bell peppers": { en: "Bell peppers", "zh-Hans": "彩椒", "zh-Hant": "甜椒" },
  "Onion": { en: "Onion", "zh-Hans": "洋葱", "zh-Hant": "洋蔥" },
  "Fajita seasoning": { en: "Fajita seasoning", "zh-Hans": "法吉塔调料", "zh-Hant": "法士達調料" },
  "Olive oil": { en: "Olive oil", "zh-Hans": "橄榄油", "zh-Hant": "橄欖油" },
  "Pasta": { en: "Pasta", "zh-Hans": "意面", "zh-Hant": "義大利麵" },
  "Pesto sauce": { en: "Pesto sauce", "zh-Hans": "青酱", "zh-Hant": "青醬" },
  "Cherry tomatoes": { en: "Cherry tomatoes", "zh-Hans": "小番茄", "zh-Hant": "小番茄" },
  "Parmesan cheese": { en: "Parmesan cheese", "zh-Hans": "帕马森芝士", "zh-Hant": "帕馬森起司" },
  "Ground beef": { en: "Ground beef", "zh-Hans": "牛肉末", "zh-Hant": "牛絞肉" },
  "Taco seasoning": { en: "Taco seasoning", "zh-Hans": "塔可调料", "zh-Hant": "塔可調料" },
  "Taco shells": { en: "Taco shells", "zh-Hans": "塔可饼壳", "zh-Hant": "塔可餅殼" },
  "Salsa": { en: "Salsa", "zh-Hans": "莎莎酱", "zh-Hant": "莎莎醬" },
  "Shredded cheese": { en: "Shredded cheese", "zh-Hans": "芝士碎", "zh-Hant": "起司絲" },
  "Instant ramen": { en: "Instant ramen", "zh-Hans": "速食拉面", "zh-Hant": "速食拉麵" },
  "Frozen mixed vegetables": { en: "Frozen mixed vegetables", "zh-Hans": "冷冻杂菜", "zh-Hant": "冷凍蔬菜" },
  "Soy sauce": { en: "Soy sauce", "zh-Hans": "酱油", "zh-Hant": "醬油" },
};

const unitNames: Record<string, Record<Locale, string>> = {
  slices: { en: "slices", "zh-Hans": "片", "zh-Hant": "片" },
  slice: { en: "slice", "zh-Hans": "片", "zh-Hant": "片" },
  tbsp: { en: "tbsp", "zh-Hans": "勺", "zh-Hant": "湯匙" },
  tsp: { en: "tsp", "zh-Hans": "茶匙", "zh-Hant": "茶匙" },
  cup: { en: "cup", "zh-Hans": "杯", "zh-Hant": "杯" },
  whole: { en: "whole", "zh-Hans": "个", "zh-Hant": "個" },
  oz: { en: "oz", "zh-Hans": "盎司", "zh-Hant": "盎司" },
  lb: { en: "lb", "zh-Hans": "磅", "zh-Hant": "磅" },
  pack: { en: "pack", "zh-Hans": "包", "zh-Hant": "包" },
  can: { en: "can", "zh-Hans": "罐", "zh-Hant": "罐" },
  handful: { en: "handful", "zh-Hans": "把", "zh-Hant": "把" },
};

export function localizeIngredient(name: string, locale: Locale): string {
  return ingredientNames[name]?.[locale] ?? name;
}

export function localizeUnit(unit: string, locale: Locale): string {
  return unitNames[unit]?.[locale] ?? unit;
}

export interface LocalizedRecipe extends Omit<Recipe, "name" | "steps" | "ingredients"> {
  name: string;
  steps: string[];
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
    category: Recipe["ingredients"][number]["category"];
  }[];
}

export function getLocalizedRecipe(
  recipe: Recipe,
  locale: Locale,
): LocalizedRecipe {
  const tr = recipeTranslations[recipe.id]?.[locale];
  return {
    ...recipe,
    name: tr?.name ?? recipe.name,
    steps: tr?.steps ?? recipe.steps,
    ingredients: recipe.ingredients.map((ing) => ({
      ...ing,
      name: localizeIngredient(ing.name, locale),
      unit: localizeUnit(ing.unit, locale),
    })),
  };
}

export function getLocalizedRecipeName(recipeId: string, fallback: string, locale: Locale): string {
  return recipeTranslations[recipeId]?.[locale]?.name ?? fallback;
}
