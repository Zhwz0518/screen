/**
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import VabProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/pageTitle'
import {
  authentication,
  loginInterception,
  recordRoute,
  routesWhiteList,
} from '@/config'

VabProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
})
router.beforeEach(async (to, from, next) => {
  // 获取进度条是否显示状态 是 -> 开始
  const { showProgressBar } = store.getters['settings/theme']
  if (showProgressBar) VabProgress.start()
  // 首先判断是否存在token
  let hasToken = store.getters['user/accessToken']
  // 是否配置了登录拦截 否 -> 直接token校验通过
  if (!loginInterception) hasToken = true
  // 首先判断要访问的路径是否在白名单中 是 ->
  if (routesWhiteList.includes(to.path)) {
    // 判断访问的路径是登录且token存在 是 -> 跳转 首页
    if (to.path === '/login' && hasToken) next({ path: '/' })
    // 否 -> 跳转放行
    else next()
  } else {
    // 不是白名单的路由 则判断token是否存在
    if (hasToken) {
      const hasAccess =
        store.getters['acl/admin'] ||
        store.getters['acl/role'].length > 0 ||
        store.getters['acl/ability'].length > 0
      if (hasAccess) {
        // 如果只要有一个字段符合条件就放行
        next()
      } else {
        try {
          if (loginInterception) await store.dispatch('user/getUserInfo')
          //settings.js loginInterception为false（关闭登录拦截时）时，创建虚拟角色
          else await store.dispatch('user/setVirtualRoles')
          //根据路由模式添加路由
          router.addRoutes(
            await store.dispatch('routes/setRoutes', authentication)
          )
          next({ ...to, replace: true })
        } catch {
          await store.dispatch('user/resetAll')
          if (recordRoute && to.path !== '/')
            next({
              path: '/login',
              query: { redirect: to.path },
              replace: true,
            })
          else next({ path: '/login', replace: true })
        }
      }
    } else {
      if (recordRoute && to.path !== '/')
        next({ path: '/login', query: { redirect: to.path }, replace: true })
      else next({ path: '/login', replace: true })
    }
  }
})
router.afterEach((to) => {
  document.title = getPageTitle(to.meta.title)
  if (VabProgress.status) VabProgress.done()
})
