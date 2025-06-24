<script setup>
import { main } from './work.js'
import { i18n, ITEM_TYPES } from './data.js'

import SelectEnchantments from './components/SelectEnchantments.vue'
import ResultPanel from './components/ResultPanel.vue'

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { CirclePlus, Delete } from '@element-plus/icons-vue'

const isNarrow = ref(false)
function handleResize() {
  isNarrow.value = window.innerWidth < 900
}
onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const mode = ref('xp')
const useBedrock = ref(false)
const compatibleCheckEachItem = ref(true)

const itemType = ref('helmet')
const input = ref([
  { name: 'item', ench: [] },
  { name: 'book', ench: [] },
  { name: 'book', ench: [] },
])

const resultStatusArr = ref([
  { disable: false, reason: '' },
  { disable: false, reason: '' },
  { disable: false, reason: '' },
])

function onEnchantStatus(idx, status) {
  resultStatusArr.value[idx] = status
}

const disableUpdateResult = computed(() => resultStatusArr.value.some((s) => s.disable))
const errorMsg = computed(() => {
  const first = resultStatusArr.value.find((s) => s.disable)
  if (!first) return ''
  if (first.reason === 'empty') return i18n.empty
  if (first.reason === 'incompatible') return i18n.incompatible
  return ''
})

function addBook() {
  input.value.push({
    name: 'book',
    ench: [],
  })
  resultStatusArr.value.push({ disable: false, reason: '' })
}
function removeBook(idx) {
  if (input.value.filter((i) => i.name === 'book').length > 1) {
    input.value.splice(idx, 1)
    resultStatusArr.value.splice(idx, 1)
  }
}

const result = ref([])
function updateResult() {
  const arr = input.value.map((i) => {
    const obj = { name: i.name }
    i.ench
      .filter((e) => e.name)
      .forEach((e) => {
        obj[e.name] = e.level
      })
    return obj
  })
  result.value = main(arr, mode.value, useBedrock.value)
}
</script>

<template>
  <el-header class="box">
    <div class="page-title">{{ i18n.title }}</div>
  </el-header>
  <el-container class="box">
    <el-aside
      :width="isNarrow ? '100%' : '28em'"
      :style="isNarrow ? 'min-width:0;width:100%;max-width:100%;' : ''"
      style="background: #f9f9f9"
    >
      <el-space fill wrap direction="vertical" style="width: 100%">
        <el-card shadow="hover">
          <template #header>
            <el-select v-model="itemType">
              <el-option v-for="type in ITEM_TYPES" :key="type" :label="i18n[type]" :value="type" />
            </el-select>
          </template>
          <SelectEnchantments
            v-model:ench="input[0].ench"
            :itemType="itemType"
            :minEnchCount="0"
            :useBedrock="useBedrock"
            :compatibleCheckEachItem="compatibleCheckEachItem"
            @status="onEnchantStatus(0, $event)"
          />
        </el-card>
        <el-card v-for="(book, idx) in input.slice(1)" :key="idx" shadow="hover">
          <template #header>
            <span>{{ i18n.book }}{{ idx + 1 }}</span>
            <el-button
              style="float: right"
              color="red"
              @click="removeBook(idx + 1)"
              :disabled="input.length <= 2"
              :icon="Delete"
              plain
              alt="{{ i18n.removeBook }}"
              size="small"
            />
          </template>
          <SelectEnchantments
            v-model:ench="book.ench"
            :itemType="itemType"
            :minEnchCount="1"
            :useBedrock="useBedrock"
            :compatibleCheckEachItem="compatibleCheckEachItem"
            @status="onEnchantStatus(idx + 1, $event)"
          />
        </el-card>
      </el-space>
      <el-row>
        <div style="margin-left: 1em; margin-bottom: 1em; padding: 0.5em">
          <el-button @click="addBook" :icon="CirclePlus">{{ i18n.addBook }}</el-button>
        </div>
      </el-row>
      <template v-if="isNarrow">
        <ResultPanel
          :mode="mode"
          :useBedrock="useBedrock"
          :compatibleCheckEachItem="compatibleCheckEachItem"
          :i18n="i18n"
          :updateResult="updateResult"
          :disableUpdateResult="disableUpdateResult"
          :errorMsg="errorMsg"
          :result="result"
          @update:mode="mode = $event"
          @update:useBedrock="useBedrock = $event"
          @update:compatibleCheckEachItem="compatibleCheckEachItem = $event"
        />
      </template>
    </el-aside>
    <el-main v-if="!isNarrow" style="margin-left: 1em">
      <ResultPanel
        :mode="mode"
        :useBedrock="useBedrock"
        :compatibleCheckEachItem="compatibleCheckEachItem"
        :i18n="i18n"
        :updateResult="updateResult"
        :disableUpdateResult="disableUpdateResult"
        :errorMsg="errorMsg"
        :result="result"
        @update:mode="mode = $event"
        @update:useBedrock="useBedrock = $event"
        @update:compatibleCheckEachItem="compatibleCheckEachItem = $event"
      />
    </el-main>
  </el-container>
</template>

<style scoped>
.page-title {
  font-size: 1.5em;
  font-weight: bold;
  margin: auto;
  padding: 0.5em 0;
}
.box {
  margin-left: 3em;
  margin-right: 3em;
  margin-top: 1em;
  box-shadow: var(--el-border-color) 0 0 10px;
  height: auto;
}
@media (max-width: 900px) {
  .box {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0.5em;
  }
}
.el-card {
  --el-card-padding: 1em;
}
.el-main {
  --el-card-padding: 0;
}
</style>
