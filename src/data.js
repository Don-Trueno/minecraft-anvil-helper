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
