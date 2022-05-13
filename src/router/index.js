/**
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，pro版只支持remixIcon图标
 * hidden:true                        是否显示在菜单中显示路由（默认值：false）
 * alwaysShow:true                    当只有一级子路由时是否显示父路由是否显示在菜单中显示路由（默认值：false）
 * name:"Demo"                        首字母大写，一定要与vue文件的name对应起来，用于noKeepAlive缓存控制（该项特别重要）
 * menuHidden:true                    常规/横向/纵向模式中，隐藏根布局，仅适用于第一层路由
 * meta:{
    title:"title"                     菜单、面包屑、多标签页显示的名称
    roles:["admin","..."]             当config/settings.js中rolesControl配置开启时，用于控制角色
    roles: {
      role: ["admin"],                role: ["admin"]
      ability: ["READ","WRITE"],      ability: ["READ","WRITE"],
      mode: "allOf"                   allOf: 数组内所有角色都拥有，返回True
                                      oneOf: 数组内拥有任一角色，返回True(等价第1种数据)
                                      except: 不拥有数组内任一角色，返回True(取反)
    }
    remixIcon:""                      remix图标
    isCustomSvgIcon:false,            是否是自定义svg图标（默认值：false，如果设置true，那么需要把你的svg拷贝到icon/remixIcon下，然后remixIcon字段配置上你的图标名）
    noKeepAlive:true                  当前路由是否不缓存（默认值：false）
    affix:true                        当前路由是否固定多标签页
    badge:"New"                       badge小标签（只支持子级）
    tagHidden:true                    当前路由是否不显示多标签页
   }
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/vab/layouts'
import Empty from '@/vab/Empty'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页中心',
      iconfont: 'icon-index',
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页中心',
          iconfont: 'icon-shouye',
          noKeepAlive: true,
        },
      },
    ],
  },
  //设备管理
  {
    path: '/equipmentSetting',
    component: Layout,
    alwaysShow: true,
    redirect: '/equipmentSetting/equipmentList',
    meta: {
      title: '设备管理',
      iconfont: 'icon-shebei',
    },
    children: [
      {
        path: 'equipmentList',
        name: 'EquipmentList',
        component: () => import('@/views/equipmentSetting/equipmentList/index'),
        meta: {
          title: '设备列表',
          noKeepAlive: true,
        },
      },
      {
        path: 'equipmentSetting',
        name: 'EquipmentSetting',
        component: () =>
          import('@/views/equipmentSetting/equipmentSetting/index'),
        meta: {
          title: '设备管理',
          noKeepAlive: true,
        },
      },
    ],
  },
  //大屏监控
  {
    path: '/screenMonitoring',
    component: Layout,
    alwaysShow: true,
    redirect: '/screenMonitoring/equipmentList',
    meta: {
      title: '大屏监控',
      iconfont: 'icon-shujudaping',
    },
    children: [
      {
        path: 'screenMonitoring',
        name: 'ScreenMonitoring',
        component: () =>
          import('@/views/screenMonitoring/screenMonitoring/index'),
        meta: {
          title: '大屏展示',
          noKeepAlive: true,
        },
      },
      {
        path: 'screenParameters',
        name: 'ScreenParameters',
        component: () =>
          import('@/views/screenMonitoring/screenParameters/index'),
        meta: {
          title: '大屏参数',
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/screen',
    component: Empty,
    redirect: '/screen',
    hidden: true,
    meta: {
      title: '大屏展示',
      iconfont: 'icon-shujudaping',
    },
    children: [
      {
        path: 'screen',
        name: 'Screen',
        component: () => import('@/views/screen/index'),
        meta: {
          title: '大屏展示',
          iconfont: 'icon-shujudaping',
          noKeepAlive: true,
        },
      },
    ],
  },
  //视频监控
  {
    path: '/videoSurveillance',
    component: Layout,
    redirect: '/videoSurveillance',
    meta: {
      title: '视频监控',
      iconfont: 'icon-jiankongshexiangtou-xianxing',
    },
    children: [
      {
        path: 'videoSurveillance',
        name: 'VideoSurveillance',
        component: () => import('@/views/videoSurveillance/index'),
        meta: {
          title: '视频监控',
          iconfont: 'icon-jiankongshexiangtou-xianxing',
          noKeepAlive: true,
        },
      },
    ],
  },
  // 告警管理
  {
    path: '/warningManagement',
    component: Layout,
    redirect: '/warningManagement/warningManagement',
    meta: {
      title: '告警管理',
      iconfont: 'icon-gaojing',
    },
    children: [
      {
        path: 'warningManagement',
        name: 'WarningManagement',
        component: () => import('@/views/warningManagement/index'),
        meta: {
          title: '告警管理',
          iconfont: 'icon-gaojing',
          noKeepAlive: true,
        },
      },
    ],
  },
  //熏蒸库
  {
    path: '/fumigationLibrary',
    component: Layout,
    redirect: '/fumigationLibrary/fumigationLibrary',
    meta: {
      title: '熏蒸库',
      iconfont: 'icon-cangku_zhongzhuanchuzhan',
    },
    children: [
      {
        path: 'fumigationLibrary',
        name: 'fumigationLibrary',
        component: () => import('@/views/fumigationLibrary/index'),
        meta: {
          title: '熏蒸库',
          iconfont: 'icon-cangku_zhongzhuanchuzhan',
          noKeepAlive: true,
        },
      },
    ],
  },
  //X光机
  {
    path: '/XrayMachine',
    component: Layout,
    alwaysShow: true,
    redirect: '/XrayMachine/roleManagement',
    meta: {
      title: 'X光机',
      iconfont: 'icon--control',
    },
    children: [
      {
        path: 'uploadPicture',
        name: 'UploadPicture',
        component: () => import('@/views/XrayMachine/uploadPicture/index'),
        meta: {
          title: '图片上传',
        },
      },
      {
        path: 'imageManagement',
        name: 'ImageManagement',
        component: () => import('@/views/XrayMachine/ImageManagement/index'),
        meta: {
          title: '图片管理',
        },
      },
    ],
  },
  //喷淋核辐射
  {
    path: '/sprayNuclearRadiation',
    component: Layout,
    redirect: '/sprayNuclearRadiation/sprayNuclearRadiation',
    meta: {
      title: '喷淋核辐射',
      iconfont: 'icon-penlin',
    },
    children: [
      {
        path: 'sprayNuclearRadiation',
        name: 'sprayNuclearRadiation',
        component: () => import('@/views/sprayNuclearRadiation/index'),
        meta: {
          title: '喷淋核辐射',
          iconfont: 'icon-penlin',
          noKeepAlive: true,
        },
      },
    ],
  },
  //无人机
  {
    path: '/drone',
    component: Layout,
    alwaysShow: true,
    redirect: '/drone/roleManagement',
    meta: {
      title: '无人机',
      iconfont: 'icon-wurenji',
    },
    children: [
      {
        path: 'onlinePreview',
        name: 'OnlinePreview',
        component: () => import('@/views/drone/onlinePreview/index'),
        meta: {
          title: '在线预览',
        },
      },
      {
        path: 'videoPlayback',
        name: 'VideoPlayback',
        component: () => import('@/views/drone/videoPlayback/index'),
        meta: {
          title: '视频回放',
        },
      },
    ],
  },
  //安检机
  {
    path: '/securityMachine',
    component: Layout,
    redirect: '/securityMachine/sprayNuclearRadiation',
    meta: {
      title: '安检机',
      iconfont: 'icon--scan',
    },
    children: [
      {
        path: 'securityMachine',
        name: 'securityMachine',
        component: () => import('@/views/securityMachine/index'),
        meta: {
          title: '安检机',
          iconfont: 'icon--scan',
          noKeepAlive: true,
        },
      },
    ],
  },
  //参数设置
  {
    path: '/parameterSettings',
    component: Layout,
    alwaysShow: true,
    redirect: '/parameterSettings/roleManagement',
    meta: {
      title: '参数设置',
      iconfont: 'icon-_canshu_canshushezhi',
    },
    children: [
      {
        path: 'switchConfiguration',
        name: 'SwitchConfiguration',
        component: () =>
          import('@/views/parameterSettings/switchConfiguration/index'),
        meta: {
          title: '开关配置',
        },
      },
      {
        path: 'timer',
        name: 'Timer',
        component: () => import('@/views/parameterSettings/timer/index'),
        meta: {
          title: '定时器',
        },
      },
    ],
  },
  // 系统设置
  {
    path: '/systemSetting',
    component: Layout,
    alwaysShow: true,
    redirect: '/systemSetting/roleManagement',
    meta: {
      title: '系统设置',

      iconfont: 'icon-shezhi',
    },
    children: [
      {
        path: 'roleManagement',
        name: 'RoleManagement',
        component: () => import('@/views/systemSetting/roleManagement/index'),
        meta: {
          title: '角色管理',
          noKeepAlive: true,
        },
      },
    ],
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}

export function resetRouter() {
  router.matcher = new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher
}

export default router
