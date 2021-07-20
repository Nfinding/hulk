import type { App } from 'vue'
import JiTable from './JiTable.vue'

JiTable.install = function(app: App ) {
  app.component(JiTable.name, JiTable)
}

type SearchType = 'input' | 'select' | 'time'

export type ColumnType = {
  title: string
  dataIndex: string
  key: string
  [key:string]: any
  search?: { type: SearchType, options?:any[] }
  id?: string
}

export default JiTable
