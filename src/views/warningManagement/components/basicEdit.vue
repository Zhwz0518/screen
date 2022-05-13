<template>
  <el-dialog
    :title="title"
    :visible.sync="outerVisible"
    width="25%"
    :close-on-click-modal="false"
    :before-close="close"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="medium"
      label-width="80px"
    >
      <el-form-item label="性别" prop="isHandle">
        <el-radio-group v-model="form.isHandle" size="medium">
          <el-radio
            v-for="(item, index) in isHandleOptions"
            :key="index"
            :label="item.value"
            :disabled="item.disabled"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit } from '@/api/warningManagement'

  export default {
    name: 'TableEdit',
    props: {
      fetchData: {
        type: Function,
        default: () => {
          return ''
        },
      },
    },
    data() {
      return {
        outerVisible: false,
        title: '',
        form: {
          isHandle: undefined,
        },
        rules: {
          isHandle: [
            {
              required: true,
              message: '性别不能为空',
              trigger: 'change',
            },
          ],
        },
        isHandleOptions: [
          {
            label: '已处理',
            value: 1,
          },
          {
            label: '未处理',
            value: 0,
          },
        ],
        isEdit: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = '新增'
          this.$nextTick(() => {
            this.$refs['form'].resetFields()
          })
        } else {
          this.title = '处理'
          this.isEdit = true
          this.$nextTick(() => {
            this.$refs['form'].resetFields()
          })
          this.form = Object.assign({}, row)
        }
        this.outerVisible = true
      },
      //取消新增
      close() {
        this.$nextTick(() => {
          this.$refs['form'].resetFields()
        })
        this.form = this.$options.data().form
        this.outerVisible = false
        this.$emit('fetch-data')
      },

      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { msg } = await doEdit(this.form)
            this.$baseMessage(msg, 'success')
            this.$nextTick(() => {
              this.$refs['form'].resetFields()
            })
            this.outerVisible = false
            this.$emit('fetch-data')
            this.form = this.$options.data().form
          } else {
            return false
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped></style>
