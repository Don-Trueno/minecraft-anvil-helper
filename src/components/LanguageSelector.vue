<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const props = defineProps({
  currentLocale: { type: String, required: true },
})
const emit = defineEmits(['update:currentLocale'])
const localLocale = ref(props.currentLocale)
watch(
  () => props.currentLocale,
  (val) => {
    localLocale.value = val
  },
)

function changeLocale(val) {
  locale.value = val
  document.title = t('title')
  emit('update:currentLocale', val)
}
</script>

<template>
  <el-select
    v-model="localLocale"
    style="margin-left: 2em; width: 120px"
    @change="changeLocale"
    size="small"
  >
    <el-option label="English" value="en" />
    <el-option label="大陆简体" value="zh-CN" />
    <el-option label="臺灣正體" value="zh-TW" />
    <el-option label="香港繁體" value="zh-HK" />
  </el-select>
</template>
