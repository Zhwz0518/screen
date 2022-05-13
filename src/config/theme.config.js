/**
 * @description 导出主题配置，此配置下的项修改后需清理浏览器缓存
 */
module.exports = {
  //布局种类：横向布局horizontal、纵向布局vertical、画廊布局gallery、综合布局comprehensive、常规布局common
  layout: 'vertical',
  //主题名称：默认default、海洋之心ocean、绿荫草场green、荣耀典藏glory、碰触纯白white
  themeName: 'default',
  //画廊风格（仅针对画廊布局gallery时生效）：横向风格horizontal、纵向风格vertical
  galleryStyle: 'vertical',
  //是否固定头部
  fixedHeader: true,
  //是否显示顶部进度条
  showProgressBar: true,
  //是否显示多标签页
  showTabsBar: true,
  //是否显示语言选择组件
  showLanguage: true,
  //是否显示刷新组件
  showRefresh: true,
  //是否显示搜索组件
  showSearch: true,
  //是否显示主题组件
  showTheme: true,
  //是否显示通知组件
  showNotice: true,
  //是否显示全屏组件
  showFullScreen: true,
}
