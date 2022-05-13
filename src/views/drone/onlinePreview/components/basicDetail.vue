<template>
  <el-dialog
    :title="title"
    :visible.sync="outerVisible"
    width="25%"
    :close-on-click-modal="false"
    :before-close="close"
  >
    <el-descriptions column="2">
      <el-descriptions-item label="用户名">
        {{ form.name }}
      </el-descriptions-item>
      <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
      <el-descriptions-item label="性别">女</el-descriptions-item>
    </el-descriptions>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'BasicDetail',
    data() {
      return {
        outerVisible: false,
        title: '',
        form: {},
        rules: [],
      }
    },
    created() {},
    methods: {
      showDetail(row) {
        this.title = '详细信息'
        this.form = Object.assign({}, row)
        this.outerVisible = true
      },
      //取消新增
      close() {
        this.outerVisible = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  ::v-deep {
    .el-dialog__footer {
      border-top: none;
    }
  }
</style>
