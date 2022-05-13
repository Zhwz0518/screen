<template>
  <div class="basic-container">
    <vab-query-form>
      <el-form
        ref="form"
        :model="queryForm"
        :inline="true"
        @submit.native.prevent
      >
        <el-form-item label="名称:" prop="deviceName">
          <el-input v-model="queryForm.deviceName" placeholder="名称" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            v-model="queryForm.type"
            placeholder="请选择类型"
            clearable
          >
            <el-option
              v-for="(item, index) in typeOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="queryForm.isHandle"
            placeholder="请选择状态"
            clearable
          >
            <el-option
              v-for="(item, index) in statusOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
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
        label="设备名称"
        prop="deviceName"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="设备编码"
        prop="deviceCode"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="设备位置"
        prop="deviceLocation"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="报警时间"
        prop="alarmTime"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="设备类型">
        <template #default="{ row }">
          {{
            row.type == 1
              ? '熏蒸库'
              : row.type == 2
              ? 'X光机'
              : row.type == 3
              ? '喷淋核辐射'
              : row.type == 4
              ? '无人机'
              : 'CT机'
          }}
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip label="状态">
        <template #default="{ row }">
          {{ row.isHandle == 0 ? '未处理' : '已处理' }}
        </template>
      </el-table-column>

      <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-button type="text" @click="handleDetail(row)">详情</el-button>
          <el-button type="text" @click="handleEdit(row)">处理</el-button>
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
  import { getList, doDelete } from '@/api/warningManagement'
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
          deviceName: '',
          type: undefined,
          isHandle: undefined,
        },
        typeOptions: [
          {
            label: '全部',
            value: null,
          },
          {
            label: '熏蒸库',
            value: 1,
          },
          {
            label: 'X光机',
            value: 2,
          },
          {
            label: '喷淋核辐射',
            value: 3,
          },
          {
            label: '无人机',
            value: 4,
          },
          {
            label: 'CT机',
            value: 5,
          },
        ],
        statusOptions: [
          {
            label: '全部',
            value: null,
          },
          {
            label: '未处理',
            value: 0,
          },
          {
            label: '已处理',
            value: 2,
          },
        ],
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
