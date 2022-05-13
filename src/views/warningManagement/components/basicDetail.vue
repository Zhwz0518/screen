<template>
  <el-dialog
    :title="title"
    :visible.sync="outerVisible"
    width="25%"
    :close-on-click-modal="false"
    :before-close="close"
  >
    <el-descriptions :column="1">
      <el-descriptions-item label="	设备名称">
        {{ form.deviceName }}
      </el-descriptions-item>
      <el-descriptions-item label="设备编码">
        {{ form.deviceCode }}
      </el-descriptions-item>
      <el-descriptions-item label="设备类型">
        {{
          form.type == 1
            ? '熏蒸库'
            : form.type == 2
            ? 'X光机'
            : form.type == 3
            ? '喷淋核辐射'
            : form.type == 4
            ? '无人机'
            : 'CT机'
        }}
      </el-descriptions-item>
      <el-descriptions-item label="设备位置">
        {{ form.deviceLocation }}
      </el-descriptions-item>
      <el-descriptions-item label="警报时间">
        {{ form.alarmTime }}
      </el-descriptions-item>
      <el-descriptions-item label="警报原因">
        {{ form.alarmReason }}
      </el-descriptions-item>
      <el-descriptions-item label="处理意见">
        {{ form.handleOpinion }}
      </el-descriptions-item>
      <el-descriptions-item label="	处理时间">
        {{ form.handleTime }}
      </el-descriptions-item>
      <el-descriptions-item label="处理人姓名">
        {{ form.handleUserName }}
      </el-descriptions-item>
    </el-descriptions>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getDetail } from '@/api/warningManagement'
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

        this.outerVisible = true
        getDetail({ id: row.id }).then((res) => {
          if (res.code == 200) {
            this.form = res.data
          } else {
            this.$message.error(res.message)
          }
        })
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
