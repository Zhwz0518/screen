<template>
  <el-scrollbar
    :class="{ 'is-collapse': collapse, 'side-bar-common': layout === 'common' }"
    class="side-bar-container"
  >
    <el-menu
      :active-text-color="variables['menu-color-active']"
      :background-color="variables['menu-background']"
      :collapse="collapse"
      :collapse-transition="false"
      :default-active="activeMenu"
      :default-openeds="defaultOpens"
      :text-color="variables['menu-color']"
      :unique-opened="uniqueOpened"
      menu-trigger="click"
      mode="vertical"
    >
      <template v-for="route in handleRoutes">
        <vab-menu v-if="!route.hidden" :key="route.path" :item="route" />
      </template>
    </el-menu>
  </el-scrollbar>
</template>
<script>
  import variables from '@/config/variables.scss'
  import { mapGetters } from 'vuex'
  import { defaultOpeneds, uniqueOpened } from '@/config'

  export default {
    name: 'SideBar',
    props: {
      layout: {
        type: String,
        default: 'vertical',
      },
    },
    data() {
      return {
        uniqueOpened,
        variables: variables,
      }
    },
    computed: {
      ...mapGetters({
        collapse: 'settings/collapse',
        routes: 'routes/routes',
      }),
      defaultOpens() {
        return defaultOpeneds
      },
      activeMenu() {
        const route = this.$route
        const { meta, path } = route
        if (meta.activeMenu) return meta.activeMenu
        return path
      },
      handleRoutes() {
        return this.routes.flatMap((route) => {
          return route.menuHidden === true && route.children
            ? route.children
            : route
        })
      },
    },
    methods: {
      goShiyong() {
        this.$router.push('/systemSetting/instructions')
      },
    },
  }
</script>
<style lang="scss" scoped>
  @mixin active {
    &:hover {
      margin: 0 3px;
      border-radius: 40px;
      color: #2e71ff !important;
      background-color: $menu-background-color-active !important;
    }

    &.is-active {
      border-radius: 40px;
      margin: 0 3px;
      color: #2e71ff !important;
      background-color: $menu-background-color-active !important;
    }
  }
  .el-submenu {
    margin: 0 3px;
  }
  .side-bar-container {
    position: fixed;
    top: $base-nav-bar-height;
    bottom: 0;
    left: 0;
    z-index: $base-z-index;
    width: $base-left-menu-width;
    height: calc(100vh - #{$base-nav-bar-height});
    padding-bottom: $base-nav-bar-height;
    overflow: hidden;
    background: #2e71ff;
    box-shadow: $base-box-shadow;
    // box-shadow: 4px 0px 6px 0px rgba(56, 68, 108, 0.14);
    transition: width $base-transition-time;

    &.side-bar-common {
      top: $base-top-bar-height;
      height: calc(100vh - #{$base-top-bar-height});
    }

    &.is-collapse {
      width: $base-left-menu-width-min;
      border-right: 0;

      ::v-deep {
        .el-menu--collapse.el-menu {
          > .el-menu-item,
          > .el-submenu {
            text-align: center;
            transition: width $base-transition-time;

            .vab-fas-icon {
              padding-right: 0;
            }

            .vab-remix-icon {
              padding-right: 0;
            }
          }
        }

        .el-menu-item,
        .el-submenu {
          text-align: left;
        }

        .el-menu--collapse {
          border-right: 0;

          .el-submenu__icon-arrow {
            right: 10px;
            margin-top: -3px;
            color: #fff;
          }
        }
      }
    }

    ::v-deep {
      .el-menu--vertical {
        .el-menu--popup {
          max-height: 200px;
          overflow: auto;
        }
      }

      .el-submenu__title {
        &:hover {
          // border-radius: 40px;
          color: #2e71ff !important;
          background-color: #fff !important;
        }
      }
      .el-scrollbar__wrap {
        overflow-x: hidden;
        background-color: #2e71ff !important;
      }

      .el-menu {
        border: 0;

        .vab-fas-icon {
          padding-right: 3px;
          font-size: $base-font-size-default;
        }

        .vab-remix-icon {
          padding-right: 3px;
          font-size: $base-font-size-default + 2;
        }
      }
      .el-menu-item,
      .el-submenu__title {
        height: $base-menu-item-height;
        overflow: hidden;
        line-height: $base-menu-item-height;
        color: #fff !important;
        vertical-align: middle;

        .iconfont {
          margin-right: 10px;
          font-size: 18px;
          color: inherit;
        }
        span {
          // margin-left: 10px;
        }
        .el-submenu__icon-arrow {
          color: #fff;
        }
      }
      .el-menu-item {
        margin: 0 3px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .el-menu-item {
        @include active;
      }
    }
    .shiyong {
      z-index: $base-z-index;
      width: $base-left-menu-width;
      height: 40px;
      color: #fff;
      // padding: 0 20px;
      text-align: center;
      line-height: 40px;
      position: fixed;
      bottom: 0;
      cursor: pointer;
      .icon-shiyongshuoming {
        // margin-right: 18px;
      }
    }
  }
</style>
