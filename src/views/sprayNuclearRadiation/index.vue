<template>
  <div class="basic-container">
    <vab-query-form>
      <el-form
        ref="form"
        :model="queryForm"
        :inline="true"
        @submit.native.prevent
      >
        <el-form-item label="通道号:" prop="channelNumber">
          <el-input v-model="queryForm.channelNumber" placeholder="通道号" />
        </el-form-item>
        <el-form-item label="通行状态:" prop="passStatus">
          <el-input v-model="queryForm.passStatus" placeholder="通行状态" />
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-refresh"
            type="primary"
            native-type="submit"
            @click="handleReset"
          >
            重置
          </el-button>
          <el-button
            icon="el-icon-search"
            type="primary"
            native-type="submit"
            @click="handleQuery"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
    </vab-query-form>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="标题"
        prop="messageName"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="消息时间"
        prop="messageTime"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="本底计数率"
        prop="backCountingRate"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="通道号"
        prop="channelNumber"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="剂量率"
        prop="doseRate"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="伽马计数率"
        prop="gammaCountingRate"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="中子计数率"
        prop="neutionCountingRate"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="通行状态"
        prop="passStatus"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-button type="text" @click="handleDetail(row)">详情</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :background="background"
      :current-page="queryForm.pageNum"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <edit ref="edit" @fetch-data="fetchData"></edit>
    <detail ref="detail"></detail>
  </div>
</template>

<script>
  import { getList, doDelete } from '@/api/sprayNuclearRadiation'
  import Edit from './components/basicEdit'
  import Detail from './components/basicDetail'
  export default {
    name: 'Basic',
    components: { Edit, Detail },
    data() {
      return {
        imgShow: true,
        list: [],
        imageList: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNum: 1,
          pageSize: 10,
          channelNumber: '',
        },
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },
    created() {
      this.fetchData()
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      //选中
      setSelectRows(val) {
        this.selectRows = val
      },
      //重置
      handleReset() {
        this.$refs.form.resetFields()
      },
      //新增
      handleAdd() {
        this.$refs['edit'].showEdit()
      },
      //编辑
      handleEdit(row) {
        this.$refs['edit'].showEdit(row)
      },
      //查看详情
      handleDetail(row) {
        this.$refs['detail'].showDetail(row)
      },
      //删除
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            this.$baseMessage(msg, 'success')
            this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids: ids })
              this.$baseMessage(msg, 'success')
              this.fetchData()
            })
          } else {
            this.$baseMessage('未选中任何行', 'error')
            return false
          }
        }
      },
      //更改每页数量
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      //更改页码
      handleCurrentChange(val) {
        this.queryForm.pageNum = val
        this.fetchData()
      },
      //查询
      handleQuery() {
        this.queryForm.pageNum = 1
        this.fetchData()
      },
      //获取数据
      async fetchData() {
        this.listLoading = true
        const { data } = await getList(this.queryForm)
        this.list = data.records
        this.total = data.total

        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
    },
  }
</script>
<style lang="scss" scoped></style>
