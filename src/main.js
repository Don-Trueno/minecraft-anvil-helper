import './assets/main.css'

import { createApp, watch } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

const app = createApp(App)
const i18n = createI18n({
  legacy: false,
  locale: navigator.language || 'en',
  fallbackLocale: 'en',
  globalInjection: true,
  silentTranslationWarn: true,
  messages: {
    en: await import('./locale/en.json'),
    zh: await import('./locale/zh-cn.json'),
    'zh-CN': await import('./locale/zh-cn.json'),
    'zh-TW': await import('./locale/zh-tw.json'),
    'zh-HK': await import('./locale/zh-hk.json'),
  },
})

const localeType = ['en', 'zh', 'zh-CN', 'zh-TW']

app.use(i18n)
app.use(ElementPlus)
app.mount('#app')
