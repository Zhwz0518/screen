<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12">
        <div class="imgbox">
          <img :src="imgSrc" alt="" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="formbox">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            class="login-form"
            label-position="left"
          >
            <div class="title">综合查验监管平台后台系统</div>
            <el-form-item prop="account" style="margin-top: 40px">
              <el-input
                v-model.trim="form.account"
                :placeholder="translateTitle('用户名')"
                tabindex="1"
                type="text"
              >
                <vab-remix-icon slot="prefix" icon="user-fill" />
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                :key="passwordType"
                ref="password"
                v-model.trim="form.password"
                :placeholder="translateTitle('密码')"
                :type="passwordType"
                tabindex="2"
                @keyup.enter.native="handleLogin"
              >
                <vab-remix-icon slot="prefix" icon="lock-fill" />
              </el-input>
            </el-form-item>
            <el-button
              class="login-btn"
              type="primary"
              round
              style="
                background: linear-gradient(257deg, #70a0f8, #276af6);
                border-radius: 10px;
              "
              @click="handleLogin"
            >
              {{ translateTitle('登录') }}
            </el-button>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { translateTitle } from '@/utils/i18n'
  import { isPassword } from '@/utils/validate'

  export default {
    name: 'Login',
    directives: {
      focus: {
        inserted(el) {
          el.querySelector('input').focus()
        },
      },
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.timer)
      next()
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        if ('' === value) {
          callback(new Error(this.translateTitle('用户名不能为空')))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!isPassword(value)) {
          callback(new Error(this.translateTitle('密码不能少于6位')))
        } else {
          callback()
        }
      }
      return {
        imgSrc: require('@/assets/login_images/img.png'),
        nodeEnv: process.env.NODE_ENV,
        form: {
          account: '',
          password: '',
        },
        rules: {
          account: [
            {
              required: true,
              trigger: 'blur',
              validator: validateUsername,
            },
          ],
          password: [
            {
              required: true,
              trigger: 'blur',
              validator: validatePassword,
            },
          ],
        },
        passwordType: 'password',
        redirect: undefined,
        timer: 0,
      }
    },
    computed: {
      ...mapGetters({
        title: 'settings/title',
      }),
    },
    watch: {
      $route: {
        handler(route) {
          this.redirect = (route.query && route.query.redirect) || '/'
        },
        immediate: true,
      },
    },

    created() {
      console.log('版本：20220408')
      document.body.style.overflow = 'hidden'
    },
    beforeDestroy() {
      document.body.style.overflow = 'auto'
    },
    mounted() {
      // this.form.username = 'admin'
      // this.form.password = '123456'
      // this.form.platform = ''
    },
    methods: {
      ...mapActions({
        login: 'user/login',
      }),
      translateTitle,
      handlePassword() {
        this.passwordType === 'password'
          ? (this.passwordType = '')
          : (this.passwordType = 'password')
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleRoute() {
        return this.redirect === '/404' || this.redirect === '/403'
          ? '/'
          : this.redirect
      },
      handleLogin() {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            try {
              // this.loading = true
              await this.login(this.form)
              await this.$router.push(this.handleRoute())
            } finally {
              // this.loading = false
            }
          } else {
            return false
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep {
    .el-row {
      padding: 0 10vw;
      padding-top: 130px;
      height: 100vh;
    }
    .el-col {
      height: 70vh;
    }
  }
  .login-container {
    position: relative;
    width: 100%;
    height: 100%;
    // background: linear-gradient(139deg, #5c68ff 0%, #2777cb 100%);
    background: url('~@/assets/login_images/background.png') center center
      no-repeat;
    background-size: 100% 100%;
  }

  .imgbox {
    width: 100%;
    height: 100%;
    text-align: center;
    background: #5278ff;
    padding-top: 8vh;
    img {
      height: 80%;
    }
  }
  .formbox {
    padding: 10vh;
    height: 100%;
    background: #fff;
  }
  .login-form .el-form-item {
    border-color: #2e71ff;
  }
  .login-form {
    position: relative;
    overflow: hidden;
    .title {
      text-align: center;
      font-size: 38px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #377df7;
      letter-spacing: 5px;
    }

    .title-tips {
      margin-top: 29px;
      font-size: 26px;
      font-weight: 400;
      color: $base-color-white;
    }

    .login-btn {
      width: 100%;
      height: 70px;
      font-size: 25px;

      border: none !important;
      // margin-top: 8%;
      margin-bottom: 6vh;
      background: linear-gradient(257deg, #70a0f8, #276af6) !important;
      border-radius: 10px !important;
      &:hover {
        opacity: 0.9;
      }

      .forget-passwordword {
        width: 100%;
        margin-top: 40px;
        text-align: left;

        .forget-password {
          width: 129px;
          height: 19px;
          font-size: 20px;
          font-weight: 400;
          color: rgba(92, 102, 240, 1);
        }
      }
    }

    .blur {
      width: 95%;
      height: 20px;
      margin: 0 auto;
      margin-top: -17px;
      background: #fff;
      filter: blur(8px);
      border-radius: 10px;
    }

    .tips {
      margin-bottom: 10px;
      font-size: $base-font-size-default;
      color: $base-color-white;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 40px auto;
        font-size: 34px;
        font-weight: bold;
        color: $base-color-blue;
        text-align: center;
      }
    }

    i {
      position: absolute;
      top: 4px;
      left: 3px;
      z-index: $base-z-index;
      padding-right: 8px;
      font-size: 26px;
      color: #aaaaaa;
      cursor: pointer;
      user-select: none;
    }

    .show-password {
      position: absolute;
      right: 25px;
      left: -35px;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    ::v-deep {
      .login-btn {
        background: linear-gradient(257deg, #70a0f8, #276af6) !important;
        border-radius: 10px !important;
        span {
          display: inline-block;
          letter-spacing: 5px;
        }
      }
      .el-form-item {
        padding-right: 0;
        margin: 70px 0;
        color: #454545;
        background: transparent;
        border: 1px solid #2e71ff;
        border-radius: 5px;

        &__content {
          min-height: $base-input-height;
          line-height: $base-input-height;
        }

        &__error {
          position: absolute;
          top: 100%;
          left: 18px;
          font-size: $base-font-size-small;
          line-height: 18px;
          color: $base-color-red;
        }
      }
      .el-input__prefix {
        width: 50px;
        height: 50px;
        line-height: 50px;
      }
      .el-input {
        box-sizing: border-box;
        border: 1px solid #fff;
        border-radius: 6px;

        input {
          height: 60px;
          padding-left: 48px;
          font-size: $base-font-size-default;
          line-height: 60px;
          color: $base-font-color;
          // background: #f6f4fc;
          border: 0;
          color: #aaaaaa;
          border-radius: 6px;
          font-size: 20px;
          caret-color: $base-font-color;
        }
      }
    }
  }
</style>
