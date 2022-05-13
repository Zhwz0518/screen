<template>
  <div class="nav-bar-container">
    <el-row :gutter="15">
      <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="4">
        <div class="left-panel">
          <logo />
          <!-- <fold /> -->
          <el-tabs
            v-if="layout === 'comprehensive'"
            v-model="firstMenu"
            tab-position="top"
            @tab-click="handleTabClick"
          >
            <el-tab-pane
              v-for="item in handleRoutes"
              :key="item.path"
              :name="item.path"
            >
              <div slot="label">
                <vab-remix-icon
                  v-if="item.meta.remixIcon"
                  :icon="item.meta.remixIcon"
                  class="vab-remix-icon"
                />

                {{ translateTitle(item.meta.title) }}
              </div>
            </el-tab-pane>
          </el-tabs>
          <!-- <breadcrumb v-else class="hidden-xs-only"></breadcrumb> -->
        </div>
      </el-col>
      <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="20">
        <div class="right-panel">
          <error-log />
          <!-- <search /> -->
          <notice />
          <full-screen />
          <!-- <language /> -->
          <!-- <theme class="hidden-xs-only"></theme> -->
          <refresh />
          <avatar />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { translateTitle } from '@/utils/i18n'
  import { mapActions, mapGetters } from 'vuex'
  import { openFirstMenu } from '@/config'

  export default {
    name: 'NavBar',
    props: {
      layout: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        firstMenu: '',
      }
    },
    computed: {
      ...mapGetters({
        routes: 'routes/routes',
      }),
      handleRoutes() {
        return this.routes.filter((item) => item.hidden !== true && item.meta)
      },
    },
    watch: {
      $route: {
        handler(route) {
          const firstMenu = route.matched[0].path || '/'
          if (this.firstMenu !== firstMenu) {
            this.firstMenu = firstMenu
            this.handleTabClick({ name: firstMenu }, true)
          }
        },
        immediate: true,
      },
    },
    methods: {
      translateTitle,
      ...mapActions({
        setPartialRoutes: 'routes/setPartialRoutes',
      }),
      handleTabClick(tab, mounted) {
        const childrenArr = this.routes.find(
          (item) => item.path === tab.name
        ).children
        this.setPartialRoutes(childrenArr)
        if (mounted !== true && openFirstMenu)
          this.$router.push(childrenArr[0].path)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .nav-bar-container {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 998;
    height: $base-nav-bar-height;
    padding-right: $base-padding;
    padding-left: 0px;
    overflow: hidden;
    user-select: none;
    // background: $base-color-default;
    background: #fff;
    box-shadow: 0px 2px 10px 1px rgba(67, 180, 152, 0.1);
    // box-shadow: $base-box-shadow;

    .left-panel {
      display: flex;
      align-items: center;
      justify-items: center;
      height: $base-nav-bar-height;

      ::v-deep {
        .breadcrumb-container {
          margin-left: $base-padding;
        }

        .el-tabs {
          margin-left: $base-padding;

          .el-tabs__header {
            margin: 0;
          }

          .el-tabs__item {
            > div {
              display: flex;
              align-items: center;

              i {
                margin-right: 3px;
              }
            }
          }
        }

        .el-tabs__nav-wrap::after {
          display: none;
        }
      }
    }

    .right-panel {
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: flex-end;
      height: $base-nav-bar-height;
      color: #333 !important;
      ::v-deep {
        [class*='ri-'] {
          margin-left: $base-padding;
          // color: $base-color-white;
          cursor: pointer;
        }

        button {
          [class*='ri-'] {
            margin-left: 0;
            color: $base-color-white;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  .el-dropdown-menu__item {
    display: flex;
    align-content: center;
    align-items: center;

    svg {
      margin-right: 3px;
    }
  }
</style>
