/**
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import { asyncRoutes } from '@/router'
import { getRouterList } from '@/api/router'
import { convertRouter, filterRoutes } from '@/utils/routes'

const state = { routes: [], partialRoutes: [] }
const getters = {
  routes: (state) => state.routes,
  partialRoutes: (state) => state.partialRoutes,
}
const mutations = {
  setRoutes(state, routes) {
    state.routes = routes
  },
  setPartialRoutes(state, routes) {
    state.partialRoutes = routes
  },
}
const actions = {
  /**
   * @description 多模式设置路由
   * @param {*} { commit }
   * @param mode
   * @returns
   */
  async setRoutes({ commit }, mode = 'intelligence') {
    let routes
    if (mode === 'intelligence') routes = [...asyncRoutes]
    if (mode === 'all') {
      let { data } = await getRouterList()
      if (data[data.length - 1].path !== '*')
        data.push({ path: '*', redirect: '/404', hidden: true })
      // data.push({
      //   id: 7000,
      //   alwaysShow: false,
      //   path: '/instructions',
      //   component: Layout,
      //   redirect: '/instructions',
      //   hidden: true,
      //   meta: {
      //     title: '使用说明',
      //   },
      //   children: [
      //     {
      //       path: 'instructions',
      //       hidden: true,
      //       name: 'Instructions',
      //       component: '/views/instructions/index',
      //       meta: {
      //         title: '使用说明',
      //         affix: false,
      //         noKeepAlive: true,
      //       },
      //     },
      //   ],
      // })
      // console.log(data)

      routes = convertRouter(data)
    }

    const accessedRoutes = filterRoutes(routes)
    commit('setRoutes', accessedRoutes)
    return accessedRoutes
  },
  /**
   * @description 画廊布局、综合布局设置路由
   * @param {*} { commit }
   * @param accessedRoutes 画廊布局、综合布局设置路由
   */
  setPartialRoutes({ commit }, accessedRoutes) {
    commit('setPartialRoutes', accessedRoutes)
  },
}
export default { state, getters, mutations, actions }
