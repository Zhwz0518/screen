<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown">
      <img :src="avatar" alt="" class="user-avatar" />
      <div class="user-name">
        {{ username }}
        <vab-remix-icon icon="arrow-down-s-line" />
      </div>
    </span>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="logout">
        <vab-remix-icon icon="logout-circle-r-line" />
        {{ translateTitle('退出登录') }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  import { translateTitle } from '@/utils/i18n'
  import { mapActions, mapGetters } from 'vuex'
  import { recordRoute } from '@/config'

  export default {
    name: 'Avatar',
    computed: {
      ...mapGetters({
        avatar: 'user/avatar',
        username: 'user/username',
      }),
    },
    methods: {
      translateTitle,
      ...mapActions({
        _logout: 'user/logout',
      }),
      handleCommand(command) {
        switch (command) {
          case 'logout':
            this.logout()
            break
        }
      },
      personalCenter() {
        this.$router.push('/personalCenter/personalCenter')
      },
      async logout() {
        await this._logout()
        if (recordRoute) {
          const fullPath = this.$route.path
          await this.$router.push(`/login?redirect=${fullPath}`)
        } else {
          await this.$router.push('/login')
        }
      },
      // logout(){
      //   this.$router.push('/login')
      // }
    },
  }
</script>
<style lang="scss" scoped>
  .avatar-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;

    .user-avatar {
      width: 40px;
      height: 40px;
      margin-left: 15px;
      cursor: pointer;
      border-radius: 50%;
    }

    .user-name {
      position: relative;
      display: flex;
      align-content: center;
      align-items: center;
      height: 40px;
      margin-left: 6px;
      line-height: 40px;
      color: #2e71ff !important;
      cursor: pointer;

      [class*='ri-'] {
        margin-left: 0 !important;
      }
    }
  }
  .el-dropdown-menu__item {
    &:hover {
      color: #333 !important;
    }
  }
</style>
