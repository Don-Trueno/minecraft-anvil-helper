export const i18n = {
  title: "Minecraft 铁砧合并计算器",
  notFound: "未找到结果，请检查输入",

  leastXP: "最少经验值",
  leastLvl: "最少经验等级",
  useBedrock: "使用基岩版机制",
  compatibleCheckEachItem: "检查每个物品内魔咒的兼容性",

  addEnch: "添加魔咒",
  removeEnch: "移除魔咒",
  addBook: "添加附魔书",
  removeBook: "移除附魔书",

  updateResult: "显示/更新结果",
  empty: "有未选择的魔咒",
  incompatible: "有不兼容的魔咒",
  incompatibleEnch: "不兼容",

  resultItem: "预期结果",
  resultStep: "合并步骤",
  leftItem: "左侧物品",
  rightItem: "右侧物品",

  resultUnused: "未使用的物品",

  item: "装备",
  book: "附魔书",

  merge: "合并",
  cost: "消耗",
  totalCost: "总消耗",
  xp: "经验值",
  lvl: "经验等级",
  step: "步骤",
  penaltyCount: "累积惩罚次数：",

  and: "和",
  comma: "，",
  leftbracket: "（",
  rightbracket: "）",
  semicolon: "：",
  // enchantments
  enchantment: "魔咒",
  protection: "保护",
  fire_protection: "火焰保护",
  feather_falling: "摔落缓冲",
  blast_protection: "爆炸保护",
  projectile_protection: "弹射物保护",
  thorn: "荆棘",
  respiration: "水下呼吸",
  depth_strider: "深海探索者",
  aqua_affinity: "水下速掘",
  sharpness: "锋利",
  smite: "亡灵杀手",
  bane_of_arthropods: "节肢杀手",
  knockback: "击退",
  fire_aspect: "火焰附加",
  looting: "抢夺",
  efficiency: "效率",
  silk_touch: "精准采集",
  unbreaking: "耐久",
  fortune: "时运",
  power: "力量",
  punch: "冲击",
  flame: "火矢",
  infinity: "无限",
  luck_of_the_sea: "海之眷顾",
  lure: "饵钓",
  froze_walker: "冰霜行者",
  mending: "经验修补",
  curse_of_binding: "绑定诅咒",
  curse_of_vanishing: "消失诅咒",
  impaling: "穿刺",
  riptide: "激流",
  loyalty: "忠诚",
  channeling: "引雷",
  multishot: "多重射击",
  piercing: "穿透",
  quick_charge: "快速装填",
  soul_speed: "灵魂疾行",
  swift_sneak: "迅捷潜行",
  wind_burst: "风爆",
  density: "致密",
  breach: "破甲",
  sweeping_edge: "横扫之刃",
  // levels
  0: "",
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
  6: "VI",
  7: "VII",
  8: "VIII",
  9: "IX",
  10: "X",
  //items
  helmet: "头盔",
  chestplate: "胸甲",
  leggings: "护腿",
  boots: "靴子",
  turtle_helmet: "海龟壳",

  sword: "剑",
  axe: "斧",
  mace: "重锤",

  bow: "弓",
  crossbow: "弩",

  pickaxe: "镐",
  shovel: "锹",
  hoe: "锄",
  shears: "剪刀",

  trident: "三叉戟",

  fishing_rod: "钓鱼竿",
  elytra: "鞘翅",
  shield: "盾牌",

  brush: "刷子",
  flint_and_steel: "打火石",
  carrot_on_a_stick: "胡萝卜钓竿",
  warped_fungus_on_a_stick: "诡异菌钓竿",
  carved_pumpkin: "雕刻南瓜",
  compass: "指南针",
  recovery_compass: "磁石指针",
  heads: "生物头颅",
};

export const ITEM_TYPES = [
  'helmet',
  'chestplate',
  'leggings',
  'boots',
  //'turtle_helmet'
  'sword',
  'axe',
  'mace',

  'bow',
  'crossbow',

  'pickaxe',
  'shovel',
  'hoe',
  'shears',

  'trident',

  'fishing_rod',
  'elytra',
  'shield',

  'brush',
  'flint_and_steel',
  'carrot_on_a_stick',
  'warped_fungus_on_a_stick',
  'carved_pumpkin',
  'compass',
  //'recovery_compass',
  'heads',
]

export const ENCHANTMENTS = {
  protection: {
    max_level: 4,
    weight: 1,
    compatible_item: ['helmet', 'chestplate', 'leggings', 'boots'],
    incompatible_enchantments: ['blast_protection', 'fire_protection', 'projectile_protection']
  },
  fire_protection: {
    max_level: 4,
    weight: 1,
    compatible_item: ['helmet', 'chestplate', 'leggings', 'boots'],
    incompatible_enchantments: ['blast_protection', 'projectile_protection', 'protection',]
  },
  feather_falling: {
    max_level: 4,
    weight: 1,
    compatible_item: ['helmet', 'chestplate', 'leggings', 'boots'],
    incompatible_enchantments: []
  },
  blast_protection: {
    max_level: 4,
    weight: 2,
    compatible_item: ['helmet', 'chestplate', 'leggings', 'boots'],
    incompatible_enchantments: ['fire_protection', 'projectile_protection', 'protection']
  },
  projectile_protection: {
    max_level: 4,
    weight: 1,
    compatible_item: ['helmet', 'chestplate', 'leggings', 'boots'],
    incompatible_enchantments: ['blast_protection', 'fire_protection', 'protection']
  },
  thorn: {
    max_level: 3,
    weight: 4,
    compatible_item: ['helmet', 'chestplate', 'leggings', 'boots'],
    incompatible_enchantments: []
  },
  respiration: {
    max_level: 3,
    weight: 2,
    compatible_item: ['helmet'],
    incompatible_enchantments: []
  },
  depth_strider: {
    max_level: 3,
    weight: 2,
    compatible_item: ['boots'],
    incompatible_enchantments: ['frost_walker']
  },
  aqua_affinity: {
    max_level: 1,
    weight: 2,
    compatible_item: ['helmet'],
    incompatible_enchantments: []
  },
  sharpness: {
    max_level: 5,
    weight: 1,
    compatible_item: ['sword', 'axe'],
    incompatible_enchantments: ['bane_of_arthropods', 'smite', 'density', 'breach']
  },
  smite: {
    max_level: 5,
    weight: 1,
    compatible_item: ['sword', 'axe', 'mace'],
    incompatible_enchantments: ['sharpness', 'bane_of_arthropods', 'density', 'breach']
  },
  bane_of_arthropods: {
    max_level: 5,
    weight: 1,
    compatible_item: ['sword', 'axe', 'mace'],
    incompatible_enchantments: ['sharpness', 'smite', 'density', 'breach']
  },
  knockback: {
    max_level: 2,
    weight: 1,
    compatible_item: ['sword'],
    incompatible_enchantments: []
  },
  fire_aspect: {
    max_level: 2,
    weight: 2,
    compatible_item: ['sword', 'mace'],
    incompatible_enchantments: []
  },
  looting: {
    max_level: 3,
    weight: 2,
    compatible_item: ['sword'],
    incompatible_enchantments: []
  },
  efficiency: {
    max_level: 5,
    weight: 1,
    compatible_item: ['pickaxe', 'axe', 'shovel', 'hoe', 'shears'],
    incompatible_enchantments: []
  },
  silk_touch: {
    max_level: 1,
    weight: 4,
    compatible_item: ['pickaxe', 'axe', 'shovel', 'hoe'],
    incompatible_enchantments: ['fortune']
  },

  unbreaking: {
    max_level: 3,
    weight: 1,
    compatible_item: ['pickaxe', 'shovel', 'axe', 'fishing_rod', 'helmet', 'chestplate', 'leggings', 'boots', 'sword', 'bow', 'hoe', 'shears', 'flint_and_steel', 'brush', 'carrot_on_a_stick', 'warped_fungus_on_a_stick', 'shield', 'trident', 'elytra', 'crossbow', 'mace'],
    incompatible_enchantments: []
  },
  fortune: {
    max_level: 3,
    weight: 2,
    compatible_item: ['pickaxe', 'axe', 'shovel', 'hoe'],
    incompatible_enchantments: ['silk_touch']
  },
  power: {
    max_level: 5,
    weight: 1,
    compatible_item: ['bow'],
    incompatible_enchantments: []
  },
  punch: {
    max_level: 2,
    weight: 2,
    compatible_item: ['bow'],
    incompatible_enchantments: []
  },
  flame: {
    max_level: 1,
    weight: 2,
    compatible_item: ['bow'],
    incompatible_enchantments: []
  },
  infinity: {
    max_level: 1,
    weight: 4,
    compatible_item: ['bow'],
    incompatible_enchantments: ['mending']
  },
  luck_of_the_sea: {
    max_level: 3,
    weight: 2,
    compatible_item: ['fishing_rod'],
    incompatible_enchantments: []
  },
  lure: {
    max_level: 3,
    weight: 2,
    compatible_item: ['fishing_rod'],
    incompatible_enchantments: []
  },
  froze_walker: {
    max_level: 2,
    weight: 2,
    compatible_item: ['boots'],
    incompatible_enchantments: ['depth_strider']
  },
  mending: {
    max_level: 1,
    weight: 2,
    compatible_item: ['pickaxe', 'shovel', 'axe', 'fishing_rod', 'helmet', 'chestplate', 'leggings', 'boots', 'sword', 'bow', 'hoe', 'shears', 'flint_and_steel', 'brush', 'carrot_on_a_stick', 'warped_fungus_on_a_stick', 'shield', 'trident', 'elytra', 'crossbow', 'mace'],
    incompatible_enchantments: ['infinity']
  },
  curse_of_binding: {
    max_level: 1,
    weight: 4,
    compatible_item: ['helmet', 'chestplate', 'leggings', 'boots', 'elytra', 'carved_pumpkin', 'heads'],
    incompatible_enchantments: []
  },
  curse_of_vanishing: {
    max_level: 1,
    weight: 4,
    compatible_item: ['pickaxe', 'shovel', 'axe', 'fishing_rod', 'helmet', 'chestplate', 'leggings', 'boots', 'sword', 'bow', 'hoe', 'shears', 'flint_and_steel', 'brush', 'carrot_on_a_stick', 'warped_fungus_on_a_stick', 'shield', 'trident', 'elytra', 'crossbow', 'mace', 'carved_pumpkin', 'heads', 'compass'],
    incompatible_enchantments: []
  },
  impaling: {
    max_level: 5,
    weight: 2,
    compatible_item: ['trident'],
    incompatible_enchantments: []
  },
  riptide: {
    max_level: 3,
    weight: 2,
    compatible_item: ['trident'],
    incompatible_enchantments: ['channeling', 'loyalty']
  },
  loyalty: {
    max_level: 3,
    weight: 1,
    compatible_item: ['trident'],
    incompatible_enchantments: ['channeling', 'riptide']
  },
  channeling: {
    max_level: 3,
    weight: 4,
    compatible_item: ['trident'],
    incompatible_enchantments: ['loyalty', 'riptide']
  },
  multishot: {
    max_level: 1,
    weight: 2,
    compatible_item: ['crossbow'],
    incompatible_enchantments: ['piercing']
  },
  piercing: {
    max_level: 4,
    weight: 1,
    compatible_item: ['crossbow'],
    incompatible_enchantments: ['multishot']
  },
  quick_charge: {
    max_level: 3,
    weight: 1,
    compatible_item: ['crossbow'],
    incompatible_enchantments: []
  },
  soul_speed: {
    max_level: 3,
    weight: 4,
    compatible_item: ['boots'],
    incompatible_enchantments: []
  },
  swift_sneak: {
    max_level: 3,
    weight: 4,
    compatible_item: ['leggings'],
    incompatible_enchantments: []
  },
  wind_burst: {
    max_level: 1,
    weight: 2,
    compatible_item: ['mace'],
    incompatible_enchantments: []
  },
  density: {
    max_level: 5,
    weight: 1,
    compatible_item: ['mace'],
    incompatible_enchantments: ['sharpness', 'smite', 'bane_of_arthropods', 'breach']
  },
  breach: {
    max_level: 4,
    weight: 2,
    compatible_item: ['mace'],
    incompatible_enchantments: ['sharpness', 'smite', 'bane_of_arthropods', 'density']
  },
  sweeping_edge: {
    max_level: 3,
    weight: 2,
    compatible_item: ['sword'],
    incompatible_enchantments: []
  }
};
