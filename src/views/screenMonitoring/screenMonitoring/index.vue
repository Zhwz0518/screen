<template>
  <div></div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data() {
      return {}
    },
    computed: {
      ...mapGetters({
        visitedRoutes: 'tabsBar/visitedRoutes',
        routes: 'routes/routes',
      }),
    },
    created() {
      window.open('#/screen/screen')
      this.handleTabRemove()
    },
    methods: {
      ...mapActions({
        delVisitedRoute: 'tabsBar/delVisitedRoute',
      }),
      //点击取消，退出页面
      async handleTabRemove() {
        const fullPath = '/screenMonitoring/screenMonitoring' //当前path
        await this.delVisitedRoute(fullPath) //删除当前标签
      },
    },
  }
</script>

<style lang="scss" scoped></style>
