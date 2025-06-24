export const ITEM_TYPES_BE = [
  'recovery_compass'
]

export const ENCHANTMENTS_OVERRIDE = {
  curse_of_vanishing: {
    max_level: 1,
    weight: 4,
    compatible_item: ['pickaxe', 'shovel', 'axe', 'fishing_rod', 'helmet', 'chestplate', 'leggings', 'boots', 'sword', 'bow', 'hoe', 'shears', 'flint_and_steel', 'brush', 'carrot_on_a_stick', 'warped_fungus_on_a_stick', 'shield', 'trident', 'elytra', 'crossbow', 'mace', 'carved_pumpkin', 'heads', 'compass', 'recovery_compass'],
    incompatible_enchantments: []
  },
  impaling: {
    max_level: 5,
    weight: 1,
    compatible_item: ['trident'],
    incompatible_enchantments: []
  },
  silk_touch: {
    max_level: 1,
    weight: 4,
    compatible_item: ['pickaxe', 'axe', 'shovel', 'hoe', 'shears'],
    incompatible_enchantments: ['fortune']
  },
  sweeping_edge: {
    max_level: 3,
    weight: 2,
    compatible_item: [],
    incompatible_enchantments: []
  }
};
