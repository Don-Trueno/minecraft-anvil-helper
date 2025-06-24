<script setup>
import { i18n } from '@/data.js'
import { ENCHANTMENTS } from '@/data.js'
import { ENCHANTMENTS_OVERRIDE } from '@/data-bedrock.js'
import { computed, watch } from 'vue'
import { CirclePlus, Delete } from '@element-plus/icons-vue'

const props = defineProps({
  ench: { type: Array, required: true },
  itemType: { type: String, required: true },
  minEnchCount: { type: Number, default: 0 },
  useBedrock: { type: Boolean, default: false },
  compatibleCheckEachItem: { type: Boolean, default: true },
})
const emit = defineEmits(['update:ench', 'status'])

const mergedEnchantments = computed(() => {
  if (!props.useBedrock) return ENCHANTMENTS
  return {
    ...ENCHANTMENTS,
    ...ENCHANTMENTS_OVERRIDE,
  }
})

function getAvailableEnch(ench, currentId = null) {
  const selected = ench.filter((e) => e.id !== currentId).map((e) => e.name)
  return Object.entries(mergedEnchantments.value)
    .filter(([name, info]) => {
      if (!info.compatible_item.includes(props.itemType)) return false
      if (selected.includes(name)) return false
      return true
    })
    .map(([name]) => name)
}

const hasEmptyEnchant = computed(
  () => props.ench.some((e) => !e.name) || (props.minEnchCount > 0 && props.ench.length === 0),
)

function getIncompatibleSet() {
  const all = props.ench.filter((e) => e.name).map((e) => e.name)
  const incompatible = new Set()
  all.forEach((name) => {
    const info = mergedEnchantments.value[name]
    if (!info) return
    info.incompatible_enchantments.forEach((inc) => {
      if (all.includes(inc)) {
        incompatible.add(name)
        incompatible.add(inc)
      }
    })
  })
  return incompatible
}
const incompatibleSet = computed(() =>
  props.compatibleCheckEachItem ? getIncompatibleSet() : new Set(),
)

const disableReason = computed(() => {
  if (hasEmptyEnchant.value) return 'empty'
  if (incompatibleSet.value.size > 0) return 'incompatible'
  return ''
})
const disableUpdateResult = computed(() => disableReason.value !== '')

watch(
  [disableUpdateResult, disableReason],
  () => {
    emit('status', { disable: disableUpdateResult.value, reason: disableReason.value })
  },
  { immediate: true },
)

function addEnch() {
  // emit 新数组
  emit('update:ench', [...props.ench, { id: Date.now() + Math.random(), name: '', level: 1 }])
}
function removeEnch(idx) {
  const newArr = props.ench.slice()
  newArr.splice(idx, 1)
  emit('update:ench', newArr)
}
</script>

<template>
  <el-space fill flex wrap direction="vertical" style="width: 100%">
    <div class="enchantselection" v-for="(e, eidx) in ench" :key="e.id">
      <el-select v-model="e.name">
        <el-option
          v-for="name in getAvailableEnch(ench, e.id)"
          :key="name"
          :label="i18n[name]"
          :value="name"
        >
          <div>
            <span>{{ i18n[name] }}</span>
          </div>
        </el-option>
      </el-select>

      <el-input-number
        min="1"
        max="5"
        v-model="e.level"
        controls-position="right"
        value-on-clear="min"
      />
      <el-button
        style="float: right"
        color="red"
        @click="removeEnch(eidx)"
        :disabled="ench.length <= minEnchCount"
        :icon="Delete"
        plain
        alt=" {{ i18n.removeEnch }}"
      />
    </div>
    <div>
      <el-button text @click="addEnch" :icon="CirclePlus">{{ i18n.addEnch }}</el-button>
    </div>
  </el-space>
</template>

<style scoped>
.enchantselection {
  border: 1px aqua solid;
  display: inline-flex;
  align-items: center;
}
</style>
