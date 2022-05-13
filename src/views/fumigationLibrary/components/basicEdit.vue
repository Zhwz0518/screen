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
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入姓名"
          clearable
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender" size="medium">
          <el-radio
            v-for="(item, index) in genderOptions"
            :key="index"
            :label="item.value"
            :disabled="item.disabled"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="status" required>
        <el-switch
          v-model="form.status"
          active-color="#fff"
          inactive-color="#DD4545"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit } from '@/api/table'

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
          name: undefined,
          gender: undefined,
          status: 1,
        },
        rules: {
          name: [
            {
              required: true,
              message: '请输入姓名',
              trigger: 'blur',
            },
          ],
          gender: [
            {
              required: true,
              message: '性别不能为空',
              trigger: 'change',
            },
          ],
        },
        genderOptions: [
          {
            label: '男',
            value: 1,
          },
          {
            label: '女',
            value: 2,
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
          this.title = '编辑'
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
            // const { msg } = await doEdit(this.form)
            // this.$baseMessage(msg, 'success')
            //  this.$nextTick(() => {
            this.$refs['form'].resetFields()
            // })
            // this.outerVisible = false
            // this.$emit('fetch-data')
            // this.form = this.$options.data().form
          } else {
            return false
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped></style>
