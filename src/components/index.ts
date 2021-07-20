import type { App } from 'vue'

import JiTable from './Table'
import JiButton from './Button'

const components: {[pathname:string]:any} = {
  JiTable,
  JiButton
}

const install = function (Vue:App) {
  // tslint:disable-next-line: forin
  // for (const component in components) {
  //   // @ts-expect-error
  //   Vue.component(components[component].name, components[component])
  // }
  // if (install?.installed) return
  // components.map(component => Vue.component(component.name, component))
  Object.keys(components).forEach(key => {
    Vue.component(components[key].name, components[key])
  })
}

if (!!window && window?.Vue) {
  install(window.Vue)
}

export default {
  install
}
export { JiTable, JiButton }
