<template>
  <div class="campusManagement-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-form
          ref="queryForm"
          :inline="true"
          :model="queryForm"
          @submit.native.prevent
        >
          <el-form-item label="角色名称" prop="title">
            <el-input
              v-model.trim="queryForm.title"
              placeholder="请输入角色名称"
              clearable
            />
          </el-form-item>

          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="queryData">
              查询
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-refresh" type="primary" @click="reset">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-left-panel>
    </vab-query-form>
    <el-divider></el-divider>
    <vab-query-form>
      <vab-query-form-left-panel :span="24">
        <el-button icon="el-icon-plus" type="primary" @click="handleEdit">
          新增
        </el-button>
      </vab-query-form-left-panel>
    </vab-query-form>
    <div v-show="total == 0" class="nodata">还没有数据</div>
    <el-table v-show="total > 0" v-loading="listLoading" stripe :data="list">
      <el-table-column
        type="index"
        align="center"
        width="150"
        label="序号"
      ></el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="title"
        label="角色名称"
      />
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="createTime"
        label="创建时间"
      />
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="remark"
        label="备注"
      />
      <el-table-column
        align="center"
        label="操作"
        show-overflow-tooltip
        width="185"
      >
        <template #default="{ row }">
          <el-button
            type="text"
            :disabled="row.nohandle"
            @click="handleEdit(row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            :disabled="row.nohandle"
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="total > 0"
      background
      :current-page="queryForm.pageNum"
      :page-size="queryForm.pageSize"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <edit ref="edit" :fetch-data="fetchData"></edit>
  </div>
</template>

<script>
  import Edit from './components/RoleManagementEdit'
  import { getRoleList, doDeleteRole } from '@/api/roleManagement'
  export default {
    name: 'RoleManagement',
    components: { Edit },
    data() {
      return {
        list: [],
        listLoading: false,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 1,
        selectRows: '',
        queryForm: {
          pageNum: 1,
          pageSize: 10,
          title: '',
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      //增加
      handleEdit(row) {
        if (row.id) {
          this.$refs['edit'].showEdit(row)
        } else {
          this.$refs['edit'].showEdit()
        }
      },
      //删除
      handleDelete(row) {
        this.$confirm('确定要删除当前角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            console.log(row.id)
            doDeleteRole({ id: row.id }).then((res) => {
              if (res.code == 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                })
                this.fetchData()
              } else {
                this.$message.error(res.message)
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNum = val
        this.fetchData()
      },
      queryData() {
        this.queryForm.pageNum = 1
        this.fetchData()
      },
      reset() {
        this.$refs['queryForm'].resetFields()
      },
      fetchData() {
        this.listLoading = true
        getRoleList(this.queryForm).then((res) => {
          if (res.code == 0) {
            this.list = res.data.records
            this.list.forEach((item) => {
              if (item.id == 1) {
                item.nohandle = true
              }
            })
            this.total = res.data.total
            this.listLoading = false
          } else {
            this.$message.error(res.message)
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .nodata {
    text-align: center;
    font-size: 1.75rem;
    padding-top: 7%;
    color: #2e71ff;
  }
</style>
