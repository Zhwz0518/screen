/**
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */
import Vue from 'vue'
import { getUserInfo, login, logout } from '@/api/user'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/utils/accessToken'
import { resetRouter } from '@/router'
import { isArray } from '@/utils/validate'
import { title, tokenName } from '@/config'

const state = {
  accessToken: getAccessToken(),
  username: '',
  avatar: '',
}
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
}
const mutations = {
  /**
   * @description 设置accessToken
   * @param {*} state
   * @param {*} accessToken
   */
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  /**
   * @description 设置用户名
   * @param {*} state
   * @param {*} username
   */
  setUsername(state, username) {
    state.username = username
  },
  /**
   * @description 设置头像
   * @param {*} state
   * @param {*} avatar
   */
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
}
const actions = {
  /**
   * @description 登录拦截放行时，设置虚拟角色
   * @param {*} { commit, dispatch }
   */
  setVirtualRoles({ commit, dispatch }) {
    dispatch('acl/setFull', true, { root: true })
    commit(
      'setAvatar',
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    )
    commit('setUsername', 'admin(未开启登录拦截)')
  },
  /**
   * @description 登录
   * @param {*} { commit }
   * @param {*} userInfo
   */
  async login({ commit }, userInfo) {
    const { data } = await login(userInfo)
    const accessToken = data
    if (accessToken) {
      commit('setAccessToken', accessToken)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      // Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
      Vue.prototype.$baseNotify(`欢迎登录综合查验监管平台`, `${thisTime}！`)
    } else {
      Vue.prototype.$baseMessage(
        `登录接口异常，未正确返回${tokenName}...`,
        'error'
      )
      return Promise.reject()
    }
  },
  /**
   * @description 获取用户信息接口 这个接口非常非常重要，如果没有明确底层前逻辑禁止修改此方法，错误的修改可能造成整个框架无法正常使用
   * @param {*} { commit, dispatch, state }
   * @returns
   */
  async getUserInfo({ commit, dispatch, state }) {
    const { data } = await getUserInfo()
    // let { data } = await getRouterList()
    // data = {
    //   ability: ['READ', 'WRITE', 'DELETE'],
    //   avatar: 'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
    //   roles: [],
    //   username: '',
    // }
    data.roles = ['admin']
    data.ability = ['READ', 'WRITE', 'DELETE']
    data.avatar =
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    data.username = data.name
    const { username, avatar, roles, ability } = data
    // 必须携带username和avatar
    if (
      username &&
      avatar &&
      (!roles || isArray(roles)) &&
      (!ability || isArray(ability))
    ) {
      commit('setUsername', username)
      commit('setAvatar', avatar)
      // 当不传递roles或ability时,默认使用管理员权限,可查看所有路由和按钮
      if (!roles && !ability) dispatch('acl/setFull', true, { root: true })
      // 当返回数据包含roles(角色)或ability(权限),保存至vuex
      // 如不使用roles权限控制,请不要传递roles,可删除以下代码
      if (roles) dispatch('acl/setRole', roles, { root: true })
      // 如不使用ability权限控制,请不要传递ability,可删除以下代码
      if (ability) dispatch('acl/setAbility', ability, { root: true })
    } else {
      Vue.prototype.$baseMessage(
        'getUserInfo核心接口异常，请检查返回JSON格式是否正确',
        'error'
      )
      return Promise.reject()
    }
  },

  /**
   * @description 退出登录
   * @param {*} { dispatch }
   */
  async logout({ dispatch }) {
    await logout(state.accessToken)
    await dispatch('resetAll')
  },
  /**
   * @description 重置accessToken、roles、ability、router等
   * @param {*} { commit, dispatch }
   */
  async resetAll({ dispatch }) {
    await dispatch('setAccessToken', '')
    await dispatch('acl/setFull', false, { root: true })
    await dispatch('acl/setRole', [], { root: true })
    await dispatch('acl/setAbility', [], { root: true })
    await resetRouter()
    removeAccessToken()
  },
  /**
   * @description 设置token
   */
  setAccessToken({ commit }, accessToken) {
    commit('setAccessToken', accessToken)
  },
}
export default { state, getters, mutations, actions }
