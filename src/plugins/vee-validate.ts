import type { App } from 'vue'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

export default {
  install: (app: App) => {
    Object.keys(AllRules).forEach((rule) => {
      defineRule(rule, AllRules[rule])
    })

    configure({
      generateMessage: localize({ zh_TW: zhTW }),
      validateOnInput: true
    })

    setLocale('zh_TW')

    app.component('VField', Field)
    app.component('VForm', Form)
    app.component('ErrorMessage', ErrorMessage)
  }
}
