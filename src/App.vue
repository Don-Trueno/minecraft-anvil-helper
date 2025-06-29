<script setup>
import { main } from '@/work.js'
import { ITEM_TYPES } from './data.js'

import SelectEnchantments from './components/SelectEnchantments.vue'
import ResultPanel from './components/ResultPanel.vue'

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Picture as IconPicture, CirclePlus, Delete } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import LanguageSelector from './components/LanguageSelector.vue'

const { t, locale } = useI18n()
const isNarrow = ref(false)
function handleResize() {
  isNarrow.value = window.innerWidth < 900
}
onMounted(() => {
  document.title = t('title')
  handleResize()
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const mode = ref('xp')
const useBedrock = ref(false)
const compatibleCheckEachItem = ref(true)

const highlightedId = ref(null)

function getIconUrl(iconName) {
  if (iconName === 'book') {
    return new URL('./assets/enchanted_book.gif', import.meta.url).href
  }
  return new URL(`./assets/${iconName}.png`, import.meta.url).href
}

const itemType = ref('helmet')
let id = 0
const input = ref([
  { name: 'item', ench: [], id: id++ },
  { name: 'book', ench: [], id: id++ },
  { name: 'book', ench: [], id: id++ },
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
  return first.reason
})

function addBook() {
  input.value.push({
    name: 'book',
    ench: [],
    id: id++,
  })
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
    const obj = { name: i.name, id: i.id }
    i.ench
      .filter((e) => e.name)
      .forEach((e) => {
        obj[e.name] = e.level
      })
    return obj
  })
  const res = main(arr, mode.value, useBedrock.value)
  result.value = Array.isArray(res)
    ? res.concat(Array(4 - res.length).fill(null))
    : [{}, [], [], []]
}

const currentLocale = ref(locale.value)
</script>

<template>
  <el-header class="box">
    <div class="page-title">{{ t('title') }}</div>
  </el-header>
  <el-container class="box">
    <el-aside
      :width="isNarrow ? '100%' : '28em'"
      :style="isNarrow ? 'min-width: 0; width: 100%; max-width: 100%;' : ''"
    >
      <el-space fill wrap direction="vertical" style="width: 100%">
        <el-card
          shadow="hover"
          :id="'item' + input[0].id"
          :class="[
            'itemSelection',
            'item' + input[0].id,
            { highlight: highlightedId === input[0].id },
          ]"
          style="margin-top: 1.5em"
        >
          <template #header class="itembox-header">
            <el-select :show-arrow="false" :offset="0" v-model="itemType">
              <template #label="{ label, value }">
                <span style="margin-right: 1.5em; margin-bottom: 1.5em">
                  <el-image :src="getIconUrl(value)" alt="item" class="pixelated">
                    <template #error>
                      <div class="image-slot">
                        <el-icon><icon-picture /></el-icon>
                      </div>
                    </template>
                  </el-image>
                  <span>{{ t(label) }}</span>
                </span>
              </template>
              <el-option v-for="type in ITEM_TYPES" :key="type" :value="type">
                <el-image :src="getIconUrl(type)" alt="item" class="pixelated">
                  <template #error>
                    <div class="image-slot">
                      <el-icon><icon-picture /></el-icon>
                    </div>
                  </template>
                </el-image>
                {{ t(type) }}
              </el-option>
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
        <el-card
          v-for="(book, idx) in input.slice(1)"
          :key="idx"
          :id="'item' + book.id"
          :class="['itemSelection', 'item' + book.id, { highlight: highlightedId === book.id }]"
          shadow="hover"
        >
          <template #header>
            <div class="itembox-header" style="margin-left: 0.75em">
              <div style="display: flex; align-items: center">
                <el-image :src="getIconUrl('book')" alt="item" class="pixelated">
                  <template #error>
                    <div class="image-slot">
                      <el-icon><icon-picture /></el-icon>
                    </div>
                  </template>
                </el-image>
                <span>{{ t('book') }} {{ idx + 1 }}</span>
              </div>
              <el-button
                style="margin-left: auto"
                color="red"
                @click="removeBook(idx + 1)"
                :disabled="input.length <= 2"
                :icon="Delete"
                plain
                alt="{{ t('removeBook') }}"
              />
            </div>
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
          <el-button @click="addBook" :icon="CirclePlus">{{ t('addBook') }}</el-button>
        </div>
      </el-row>
      <template v-if="isNarrow">
        <ResultPanel
          :disableUpdateResult="disableUpdateResult"
          :errorMsg="errorMsg"
          :input="input"
          :itemType="itemType"
          :highlightedId="highlightedId"
          :mode="mode"
          :useBedrock="useBedrock"
          :compatibleCheckEachItem="compatibleCheckEachItem"
          :result="result"
          @updateResult="updateResult"
          @update:highlightedId="(val) => (highlightedId = val)"
          @update:mode="(val) => (mode = val)"
          @update:useBedrock="(val) => (useBedrock = val)"
          @update:compatibleCheckEachItem="(val) => (compatibleCheckEachItem = val)"
        />
      </template>
    </el-aside>
    <el-main style="margin-left: 1em">
      <ResultPanel
        v-if="!isNarrow"
        :disableUpdateResult="disableUpdateResult"
        :errorMsg="errorMsg"
        :input="input"
        :itemType="itemType"
        :highlightedId="highlightedId"
        :mode="mode"
        :useBedrock="useBedrock"
        :compatibleCheckEachItem="compatibleCheckEachItem"
        :result="result"
        @updateResult="updateResult"
        @update:highlightedId="(val) => (highlightedId = val)"
        @update:mode="(val) => (mode = val)"
        @update:useBedrock="(val) => (useBedrock = val)"
        @update:compatibleCheckEachItem="(val) => (compatibleCheckEachItem = val)"
      />
    </el-main>
  </el-container>
  <el-footer class="box">
    <div style="display: flex">
      <el-link href="https://github.com/Don-Trueno/minecraft-anvil-helper"> Source Code </el-link>
      <LanguageSelector
        :currentLocale="currentLocale"
        @update:currentLocale="(val) => (currentLocale = val)"
        style="margin-left: auto"
      />
    </div>
  </el-footer>
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
  min-height: 3em;
}
@media (max-width: 900px) {
  .box {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0.5em;
  }
}
.itembox-header {
  padding: 0.25em;
  display: flex;
}
.pixelated {
  image-rendering: pixelated;
  width: 1.5em;
  height: 1.5em;
  margin-right: 0.5em;
  vertical-align: middle;
}
.el-card,
.el-main,
.el-card__body {
  --el-card-padding: 0;
}
.highlight {
  border-left: 5px var(--el-color-primary) solid !important;
}
.itemSelection {
  margin-left: 1.5em;
  margin-right: 1.5em;
  margin-top: 0.5em;
}
</style>
