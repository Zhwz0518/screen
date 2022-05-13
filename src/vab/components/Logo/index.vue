<template>
  <div :class="'logo-container-' + theme.layout">
    <router-link to="/">
      <span class="logo">
        <!--   <vab-remix-icon v-if="logo" :icon="logo" is-custom-svg />-->

        <!--      <img
          src="@/assets/index_images/logo6.png"
          style="height: 45px; vertical-align: middle"
        />-->
      </span>
      <span
        :class="{ 'hidden-xs-only': theme.layout === 'horizontal' }"
        class="title"
      >
        {{ title }}
      </span>
    </router-link>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Logo',
    computed: {
      ...mapGetters({
        logo: 'settings/logo',
        title: 'settings/title',
        theme: 'settings/theme',
      }),
    },
  }
</script>
<style lang="scss" scoped>
  @mixin container {
    position: relative;
    height: $base-top-bar-height;
    overflow: hidden;
    line-height: $base-top-bar-height;
    background: transparent;
  }

  @mixin logo {
    display: inline-block;
    width: 32px;
    height: 32px;
    color: #000;
    vertical-align: middle;
  }

  @mixin title {
    // display: inline-block;
    // overflow: hidden;
    font-size: 26px;
    line-height: 55px;
    color: #fff;
    // text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }

  .logo-container-horizontal,
  .logo-container-common {
    @include container;

    .logo {
      border-radius: 50%;

      svg {
        @include logo;
      }
      img {
        height: 50px !important;
        vertical-align: middle !important;
      }
    }

    .title {
      @include title;
      color: #333;
    }
  }

  .logo-container-vertical,
  .logo-container-gallery,
  .logo-container-comprehensive {
    @include container;
    color: #333 !important;
    height: $base-logo-height;
    line-height: $base-logo-height;
    text-align: center;

    .logo {
      svg {
        @include logo;
      }
    }

    .title {
      font-size: 24px !important;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 44px;
      @include title;
      max-width: calc(#{$base-left-menu-width} - 60px);
    }
  }
  .logo-container-vertical {
    width: $base-left-menu-width;
    background: #2e71ff;
  }
  .logo-container-gallery {
    background: $base-gallery-second-menu-background !important;

    .logo {
      position: fixed;
      top: 0;
      display: block;
      width: $base-left-menu-width-min;
      height: $base-logo-height;
      margin: 0;
      background: $base-gallery-first-menu-background;
    }

    .title {
      padding-right: 15px;
      padding-left: 15px;
      margin-left: $base-left-menu-width-min;
      color: $base-color-black !important;

      @include title;

      background: $base-gallery-second-menu-background !important;
    }
  }
</style>
