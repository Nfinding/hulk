import type { App } from 'vue'
import JiButton from './JiButton.vue'

JiButton.install = function(app: App ) {
  app.component(JiButton.name, JiButton)
}

export default JiButton
