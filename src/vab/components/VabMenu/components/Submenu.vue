<template>
  <el-submenu
    ref="subMenu"
    :index="itemOrMenu.path"
    :popper-append-to-body="false"
  >
    <template slot="title">
      <vab-remix-icon
        v-if="itemOrMenu.meta && itemOrMenu.meta.remixIcon"
        :is-custom-svg="itemOrMenu.meta.isCustomSvgIcon"
        :icon="itemOrMenu.meta.remixIcon"
        class="vab-remix-icon"
      />
      <i
        v-if="itemOrMenu.meta && itemOrMenu.meta.iconfont"
        class="iconfont"
        :class="itemOrMenu.meta.iconfont"
      ></i>
      <span>{{ translateTitle(itemOrMenu.meta.title) }}</span>
    </template>
    <slot />
  </el-submenu>
</template>

<script>
  import { translateTitle } from '@/utils/i18n'

  export default {
    name: 'Submenu',
    props: {
      itemOrMenu: {
        type: Object,
        default() {
          return null
        },
      },
    },
    methods: {
      translateTitle,
    },
  }
</script>
