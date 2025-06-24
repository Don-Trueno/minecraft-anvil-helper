<script setup>
import { ref, watch } from 'vue'
const props = defineProps([
  'mode',
  'useBedrock',
  'compatibleCheckEachItem',
  'i18n',
  'updateResult',
  'disableUpdateResult',
  'errorMsg',
  'result',
])
const emit = defineEmits(['update:mode', 'update:useBedrock', 'update:compatibleCheckEachItem'])

const localMode = ref(props.mode)
const localUseBedrock = ref(props.useBedrock)
const localCompatible = ref(props.compatibleCheckEachItem)

watch(
  () => props.mode,
  (v) => (localMode.value = v),
)
watch(
  () => props.useBedrock,
  (v) => (localUseBedrock.value = v),
)
watch(
  () => props.compatibleCheckEachItem,
  (v) => (localCompatible.value = v),
)

watch(localMode, (v) => emit('update:mode', v))
watch(localUseBedrock, (v) => emit('update:useBedrock', v))
watch(localCompatible, (v) => emit('update:compatibleCheckEachItem', v))
</script>

<template>
  <el-card style="margin-bottom: 16px" shadow="never">
    <el-radio-group v-model="localMode">
      <el-radio value="xp">{{ i18n.leastXP }}</el-radio>
      <el-radio value="lvl">{{ i18n.leastLvl }}</el-radio>
    </el-radio-group>
    <div>
      <el-checkbox v-model="localUseBedrock">{{ i18n.useBedrock }}</el-checkbox>
      <el-checkbox v-model="localCompatible">
        {{ i18n.compatibleCheckEachItem }}
      </el-checkbox>
    </div>
    <el-button @click="updateResult" :disabled="disableUpdateResult">
      {{ i18n.updateResult }}
    </el-button>
    <span v-if="disableUpdateResult" style="color: red">{{ errorMsg }}</span>
  </el-card>

  <el-card v-if="result.length" shadow="hover" style="margin-bottom: 16px">
    <template #header>
      <span>{{ i18n.resultItem }}</span>
    </template>
    <div>
      <span>{{ result[0].name }}</span>
      <span v-for="e in result[0].ench" :key="e.name" style="margin-left: 8px">
        {{ e.name }} {{ e.level }}
      </span>
      <span style="margin-left: 8px"> {{ i18n.penaltyCount }}{{ result[0].penaltyCount }} </span>
    </div>
  </el-card>

  <el-card
    v-if="Array.isArray(result[1]) && result[1].length"
    shadow="hover"
    style="margin-bottom: 16px"
  >
    <template #header>
      <span>{{ i18n.resultStep }}</span>
    </template>
    <el-table :data="result[1]">
      <el-table-column prop="0" :label="i18n.step" width="60" />
      <el-table-column prop="1" :label="i18n.leftItem" />
      <el-table-column prop="2" :label="i18n.rightItem" />
      <el-table-column prop="3" :label="i18n.cost" width="100" />
    </el-table>
  </el-card>

  <el-card v-if="Array.isArray(result[2]) && result[2].length" shadow="hover">
    {{ i18n.resultUnused }}
    <div v-for="(item, idx) in result[2]" :key="idx">
      <span>
        {{ item.name }}{{ i18n.leftbracket }}
        <span v-for="e in item.ench" :key="e.name">{{ e.name }}{{ e.level }}</span>
        {{ i18n.rightbracket }}
      </span>
    </div>
  </el-card>
</template>
