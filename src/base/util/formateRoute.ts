import { RouteRecordRaw } from 'vue-router'
import urlJoin from 'url-join'

interface MidRouteType {
  path: string
  name?: string
  parent?: string
  component?: Function
  children?: MidRouteType[]
}

interface formatedBizMenus {
  formatedMenus: RouteRecordRaw[],
  formatedBizRoutes: RouteRecordRaw[]
}
  
export  const formateBizRoutes = (bizRoutes:RouteRecordRaw[]): formatedBizMenus => {
    const output: RouteRecordRaw[] = []
    const getLeafRouteConfig = (parentConfig:MidRouteType = { path: '' }, config: RouteRecordRaw) => {
      const midRoute = config
  
      if (parentConfig.name || parentConfig.path) {
        const name = `${parentConfig.name || parentConfig.path}/${String(config.name || config.path)}`
        const path = urlJoin('/', parentConfig.path, config.path)
        midRoute.name = name
        midRoute.path = path
        midRoute.meta = {
          ...midRoute.meta,
          parent:parentConfig.path
        }
      }
  
      if(typeof midRoute.component === 'function') {
        output.push({...midRoute})
      }
  
      if(config.children) {
        config.children.forEach(item => getLeafRouteConfig(<MidRouteType>midRoute, item))
      }
    }
  
    bizRoutes.forEach(item => getLeafRouteConfig(undefined, item))

    return {
      formatedMenus: bizRoutes,
      formatedBizRoutes: output
    }
  }