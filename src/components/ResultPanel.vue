<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  i18n: Object,
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
  const arr = Array.isArray(props.result?.[3]) ? props.result[3] : []
  return arr.find((item) => item.id === id)
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
      <el-radio value="xp">{{ i18n.leastXP }}</el-radio>
      <el-radio value="lvl">{{ i18n.leastLvl }}</el-radio>
    </el-radio-group>
    <div>
      <el-checkbox
        :model-value="props.useBedrock"
        @update:modelValue="(val) => emit('update:useBedrock', val)"
      >
        {{ i18n.useBedrock }}
      </el-checkbox>
      <el-checkbox
        :model-value="props.compatibleCheckEachItem"
        @update:modelValue="(val) => emit('update:compatibleCheckEachItem', val)"
      >
        {{ i18n.compatibleCheckEachItem }}
      </el-checkbox>
    </div>
    <el-button @click="handleUpdateResult" :disabled="props.disableUpdateResult">
      {{ i18n.updateResult }}
    </el-button>
    <span v-if="props.disableUpdateResult" style="color: red; margin-left: 1.5em">{{
      props.errorMsg
    }}</span>
  </el-card>

  <el-card v-if="props.result.length" shadow="hover" style="margin-bottom: 1em">
    <template #header>
      <span>{{ i18n.resultItem }}</span>
    </template>
    <div>
      <span> {{ props.result[0].name === 'item' ? i18n[props.itemType] : i18n['book'] }}</span>
      <span v-for="e in props.result[0].ench" :key="e.name" style="margin-left: 0.5em">
        {{ i18n[e.name] }} {{ i18n[e.level] }}
      </span>
      <span style="margin-left: 0.5em" class="penalty">
        {{ i18n.penaltyCount }}{{ props.result[0].penaltyCount }}
      </span>
    </div>
  </el-card>

  <el-card
    v-if="Array.isArray(props.result[1]) && props.result[1].length"
    shadow="hover"
    style="margin-bottom: 1em"
  >
    <template #header>
      <span>{{ i18n.resultStep }}</span>
    </template>
    <el-table :data="props.result[1]">
      <el-table-column prop="step" :label="i18n.step" width="60" type="index" />
      <el-table-column :label="i18n.leftItem">
        <template #default="scope">
          <span
            :class="['item' + scope.row.leftId]"
            @mouseenter="handleHighlight(scope.row.leftId)"
            @mouseleave="handleHighlight(scope.row.leftId)"
            style="cursor: pointer"
          >
            {{
              getItemById(scope.row.leftId)?.name === 'item' ? i18n[props.itemType] : i18n['book']
            }}
            <span
              v-for="e in getItemById(scope.row.leftId)?.ench"
              :key="e.name"
              style="font-size: 90%"
            >
              <br />
              {{ i18n[e.name] }}{{ i18n[e.level] }}
            </span>
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="i18n.rightItem">
        <template #default="scope">
          <span
            :class="['item' + scope.row.rightId]"
            @mouseenter="handleHighlight(scope.row.rightId)"
            @mouseleave="handleHighlight(scope.row.rightId)"
            style="cursor: pointer"
          >
            {{ i18n[getItemById(scope.row.rightId)?.name] }}
            <span
              v-for="e in getItemById(scope.row.rightId)?.ench"
              :key="e.name"
              style="font-size: 90%"
            >
              <br />
              {{ i18n[e.name] }}{{ i18n[e.level] }}
            </span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="cost" :label="i18n.cost">
        <template #default="scope"> {{ scope.row.cost }} {{ i18n[displayMode] }} </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style>
.penalty {
  color: red;
}
</style>
