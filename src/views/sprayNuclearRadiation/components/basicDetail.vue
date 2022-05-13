<template>
  <el-dialog
    :title="title"
    :visible.sync="outerVisible"
    width="25%"
    :close-on-click-modal="false"
    :before-close="close"
  >
    <el-descriptions :column="1">
      <el-descriptions-item label="	本底计数率">
        {{ form.backCountingRate }}
      </el-descriptions-item>
      <el-descriptions-item label="通道号">
        {{ form.channelNumber }}
      </el-descriptions-item>
      <el-descriptions-item label="创建时间">
        {{ form.createdTime }}
      </el-descriptions-item>
      <el-descriptions-item label="剂量率">
        {{ form.doseRate }}
      </el-descriptions-item>
      <el-descriptions-item label="伽马计数率">
        {{ form.gammaCountingRate }}
      </el-descriptions-item>
      <el-descriptions-item label="消息标题">
        {{ form.messageName }}
      </el-descriptions-item>
      <el-descriptions-item label="	消息时间">
        {{ form.messageTime }}
      </el-descriptions-item>
      <el-descriptions-item label="中子计数率">
        {{ form.neutionCountingRate }}
      </el-descriptions-item>
      <el-descriptions-item label="通行记录编号">
        {{ form.passRecordId }}
      </el-descriptions-item>
      <el-descriptions-item label="通行状态">
        {{ form.passStatus }}
      </el-descriptions-item>
      <el-descriptions-item label="进入时间">
        {{ form.passTimeIn }}
      </el-descriptions-item>
      <el-descriptions-item label="离开时间">
        {{ form.passTimeOut }}
      </el-descriptions-item>
      <el-descriptions-item label="占用时间">
        {{ form.passTimeUse + '秒' }}
      </el-descriptions-item>
      <el-descriptions-item label="通讯地址">
        {{ form.remoteAddress }}
      </el-descriptions-item>
      <el-descriptions-item label="车速">
        {{ form.speed + 'km/h' }}
      </el-descriptions-item>
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
