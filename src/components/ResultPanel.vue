<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({
  disableUpdateResult: Boolean,
  errorMsg: String,
  input: Array,
  itemType: String,
  mode: String,
  useBedrock: Boolean,
  compatibleCheckEachItem: Boolean,
  result: Array,
  highlightedId: [Number, null],
})

const emit = defineEmits([
  'update:highlightedId',
  'update:mode',
  'update:useBedrock',
  'update:compatibleCheckEachItem',
  'updateResult',
])

function getItemById(id) {
  const inputArr = Array.isArray(props.input) ? props.input : []
  let found = inputArr.find((item) => item && item.id === id)
  if (found) return found
  const arr = Array.isArray(props.result?.[3]) ? props.result[3] : []
  return arr.find((item) => item && item.id === id)
}

function handleHighlight(id) {
  emit('update:highlightedId', props.highlightedId === id ? null : id)
}

const displayMode = ref(props.mode)

watch(
  () => props.mode,
  (val, oldVal) => {
    if (oldVal === undefined) displayMode.value = val
  },
)

function handleUpdateResult() {
  displayMode.value = props.mode
  emit('updateResult')
}
</script>

<template>
  <el-card style="margin-bottom: 1em" shadow="never">
    <el-radio-group
      :model-value="props.mode"
      @update:modelValue="(val) => emit('update:mode', val)"
    >
      <el-radio value="xp">{{ t('leastXP') }}</el-radio>
      <el-radio value="lvl">{{ t('leastLvl') }}</el-radio>
    </el-radio-group>
    <div>
      <el-checkbox
        :model-value="props.useBedrock"
        @update:modelValue="(val) => emit('update:useBedrock', val)"
      >
        {{ t('useBedrock') }}
      </el-checkbox>
      <el-checkbox
        :model-value="props.compatibleCheckEachItem"
        @update:modelValue="(val) => emit('update:compatibleCheckEachItem', val)"
      >
        {{ t('compatibleCheckEachItem') }}
      </el-checkbox>
    </div>
    <el-button
      @click="handleUpdateResult"
      :disabled="props.disableUpdateResult"
      style="margin-bottom: 0.5em"
    >
      {{ t('updateResult') }}
    </el-button>
    <span v-if="props.disableUpdateResult" style="color: red">
      <br />
      {{ t(props.errorMsg) }}
    </span>
  </el-card>

  <el-card
    v-if="props.result && props.result.length && props.result[0]"
    shadow="hover"
    style="margin-bottom: 1em"
  >
    <template #header>
      <span>{{ t('resultItem') }}</span>
    </template>
    <div>
      <span>
        {{ props.result[0] && props.result[0].name === 'item' ? t(props.itemType) : t('book') }}
      </span>
      <br />
      <span
        v-for="e in props.result[0]?.ench || []"
        :key="e.name"
        style="margin-left: 0.5em; font-size: 90%"
      >
        {{ t(e.name) }} {{ t(String(e.level ?? 1)) }}
      </span>
      <br />
      <span v-if="props.result[0]" class="penalty" style="margin-left: 0.5em; font-size: 90%">
        {{ t('penaltyCount') }}{{ props.result[0].penaltyCount }}
      </span>
    </div>
  </el-card>

  <el-card
    v-if="Array.isArray(props.result?.[1]) && props.result[1].length"
    shadow="hover"
    style="margin-bottom: 1em"
  >
    <template #header>
      <span>{{ t('resultStep') }}</span>
    </template>
    <el-table :data="props.result[1]">
      <el-table-column prop="step" :label="t('step')" width="60" type="index" />
      <el-table-column :label="t('leftItem')">
        <template #default="scope">
          <span
            :class="['item' + scope.row.leftId]"
            @mouseenter="handleHighlight(scope.row.leftId)"
            @mouseleave="handleHighlight(scope.row.leftId)"
            style="cursor: pointer"
          >
            {{ getItemById(scope.row.leftId)?.name === 'item' ? t(props.itemType) : t('book') }}
            <span
              v-for="e in getItemById(scope.row.leftId)?.ench || []"
              :key="e.name"
              style="font-size: 90%"
            >
              <br />
              {{ t(e.name) }} {{ t(String(e.level ?? 1)) }}
            </span>
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="t('rightItem')">
        <template #default="scope">
          <span
            :class="['item' + scope.row.rightId]"
            @mouseenter="handleHighlight(scope.row.rightId)"
            @mouseleave="handleHighlight(scope.row.rightId)"
            style="cursor: pointer"
          >
            {{ t(getItemById(scope.row.rightId)?.name) }}
            <span
              v-for="e in getItemById(scope.row.rightId)?.ench"
              :key="e.name"
              style="font-size: 90%"
            >
              <br />
              {{ t(e.name) }}{{ t(String(e.level ?? 1)) }}
            </span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="cost" :label="t('cost')">
        <template #default="scope"> {{ scope.row.cost }} {{ t(displayMode) }} </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style>
.penalty {
  color: red;
}
</style>
