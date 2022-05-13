<template>
  <div class="wang">
    <div :ref="toolId" class="toolbar"></div>
    <div :ref="editorId" class="text">
      <!--可使用 min-height 实现编辑区域自动增加高度-->
    </div>
  </div>
</template>

<script>
  import wangEditor from 'wangeditor'
  import { baseURL } from '@/config/net.config'
  import { mapGetters } from 'vuex'
  export default {
    name: 'Weditor',
    props: {
      value: {
        type: String,
        default: () => {
          return null
        },
      },
    },
    data() {
      return {
        content: '',
        editor: {},
        toolId: '',
        editorId: '',
      }
    },
    computed: {
      ...mapGetters('user', { token: 'accessToken' }),
    },
    watch: {
      value(val) {
        if (val) {
          if (val !== this.content) {
            this.setContent(val)
          }
        } else {
          this.setContent('')
        }
      },

      content(val) {
        this.$emit('input', val)
      },
    },
    mounted() {
      this.toolId = this.randomString(12)
      this.editorId = this.randomString(12)
      this.content = this.value
      this.$nextTick(() => {
        this.editor = new wangEditor(
          this.$refs[this.toolId],
          this.$refs[this.editorId]
        )
        this.editor.config.onchange = (html) => {
          // 监控变化，同步更新到 textarea
          this.content = html
        }
        // 配置行高
        this.editor.config.lineHeights = [
          '1',
          '1.15',
          '1.6',
          '2',
          '2.5',
          '3',
          '3.5',
          '4',
          '4.5',
          '5',
        ]
        //配置图片上传服务器接口
        this.editor.config.uploadImgServer = baseURL + '/api/uploadFile'
        // 文件名
        this.editor.config.uploadFileName = 'files'
        // 配置上传图片请求头部
        this.editor.config.uploadImgHeaders = {
          token: this.token,
        }
        //关闭网络上传
        this.editor.config.showLinkImg = false
        // 上传图片钩子函数
        this.editor.config.uploadImgHooks = {
          before: function (xhr, editor, files) {
            // 图片上传之前触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
            // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
            // return {
            //     prevent: true,
            //     msg: '放弃上传'
            // }
          },
          success: function (xhr, editor, result) {
            // 图片上传并返回结果，图片插入成功之后触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            // alert('成功')
          },
          fail: function (xhr, editor, result) {
            // 图片上传并返回结果，但图片插入错误时触发
            console.log(result)
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          },
          error: function (xhr, editor) {
            // 图片上传出错时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            console.log(result)
          },
          timeout: function (xhr, editor) {
            // 图片上传超时时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
          },

          // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
          // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
          customInsert: function (insertImg, result, editor) {
            // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
            // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

            // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
            // result 即服务端返回的接口
            var url = result.data[0].path
            // // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
            insertImg(url)
            // result 必须是一个 JSON 格式字符串！！！否则报错
          },
        }
        this.editor.config.emotions = [
          {
            title: 'emoji', // tab 的标题
            type: 'emoji', // 'emoji' / 'image'
            // emoji 表情，content 是一个数组即可
            content:
              '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😓 😪 😴 🙄 🤔 😬 🤐'.split(
                /\s/
              ),
          },
        ]
        this.editor.config.menus = [
          'head', // 标题
          'bold', // 粗体
          'fontSize', // 字号
          'fontName', // 字体
          'lineHeight', //行高
          'italic', // 斜体
          'underline', // 下划线
          'strikeThrough', // 删除线
          'foreColor', // 文字颜色
          'backColor', // 背景颜色
          'link', // 插入链接
          'list', // 列表
          'justify', // 对齐方式
          'quote', // 引用
          'emoticon', // 表情
          'image', // 插入图片
          'table', // 表格
          'undo', // 撤销
          'redo', // 重复
        ]
        this.editor.create()
        this.editor.txt.html(this.value)
      })
    },
    methods: {
      // 生成随机字符串id
      randomString(len) {
        len = len || 32
        let $chars =
          'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        let maxPos = $chars.length
        let pwd = ''
        for (let i = 0; i < len; i++) {
          pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
        }
        return 'a' + pwd
      },
      setContent(val) {
        this.editor.txt.html(val)
      },
      getContent() {
        console.log(1)
        this.editor.txt.html()
      },
    },
  }
</script>

<style scoped>
  .toolbar {
    border: 1px solid #ccc;
  }
  .text {
    min-height: 200px;
    border: 1px solid #ccc;
  }
</style>
