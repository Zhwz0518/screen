<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="40%"
    :close-on-click-modal="false"
    @close="close"
  >
    <el-form
      ref="Addform"
      :model="Addform"
      :rules="rules"
      size="medium"
      label-width="80px"
    >
      <el-form-item label="角色名称" prop="title">
        <el-input
          v-model="Addform.title"
          placeholder="请输入角色名称"
          :maxlength="10"
          show-word-limit
          clearable
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="remark">
        <el-input
          v-model="Addform.remark"
          type="textarea"
          placeholder="请输入角色描述"
          :maxlength="100"
          show-word-limit
          :autosize="{ minRows: 4, maxRows: 4 }"
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜单权限" prop="permissionIdList">
        <el-tree
          ref="menutree"
          node-key="id"
          :data="menus"
          :props="defaultProps"
          show-checkbox
          @check-change="handleCheckChange"
        ></el-tree>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { AddRole, EditRole } from '@/api/roleManagement'
  import { PermissionTree } from '@/api/permission'
  export default {
    name: 'RoleManagementEdit',
    props: {
      fetchData: {
        type: Function,
        default: null,
      },
    },
    data() {
      return {
        Addform: {
          title: undefined,
          remark: undefined,
          permissionIdList: [],
        },
        rules: {
          title: [
            {
              required: true,
              message: '请输入角色名称',
              trigger: 'blur',
            },
          ],
          remark: [
            {
              required: true,
              message: '请输入角色描述',
              trigger: 'blur',
            },
          ],
          // permissionIdList: [
          //   {
          //     required: true,
          //     type: 'array',
          //     message: '请至少选择一个菜单',
          //     trigger: 'change',
          //   },
          // ],
        },
        title: '新增角色',
        dialogFormVisible: false,
        menus: [],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
        checkdata: [],
        idAdd: false,
        childrenlist: [],
      }
    },
    created() {
      this.GetMenus()
    },
    methods: {
      //获取权限树
      async GetMenus() {
        this.menus = []

        const { data } = await PermissionTree()
        data.forEach((item) => {
          this.childrenlist = []
          let menu = { id: item.id, label: item.title }
          if (item.children.length >= 1) {
            item.children.forEach((it) => {
              let children = { id: it.id, label: it.title }
              this.childrenlist.push(children)
            })
            menu.children = []
            menu.children = this.childrenlist
          }
          this.menus.push(menu)
        })
      },
      showEdit(row) {
        if (!row) {
          this.title = '添加'
          this.idAdd = true
        } else {
          this.title = '编辑'
          this.idAdd = false
          this.Addform = Object.assign({}, row)
          this.$nextTick(function () {
            this.$refs.menutree.setCheckedKeys(row.permissionIdList)
          })
        }
        this.dialogFormVisible = true
      },
      close() {
        this.Addform = this.$options.data().Addform
        this.$nextTick(function () {
          this.$refs.menutree.setCheckedKeys([])
        })
        this.$refs['Addform'].resetFields()
        this.dialogFormVisible = false
      },
      //选择菜单
      handleCheckChange(data) {
        this.Addform.permissionIdList = []
        this.checkdata = this.$refs.menutree.getCheckedNodes()
        this.checkdata.forEach((item) => {
          this.Addform.permissionIdList.push(item.id)
        })
      },
      save() {
        this.$refs['Addform'].validate(async (valid) => {
          if (valid) {
            if (this.Addform.permissionIdList.length <= 0) {
              this.$message.error('请至少选择一个菜单!')
              return false
            } else {
              if (this.idAdd) {
                AddRole(this.Addform).then((res) => {
                  if (res.code == 0) {
                    this.$message.success('添加成功！')
                    this.fetchData()
                    this.close()
                  } else {
                    this.$message.error(res.message)
                  }
                })
              } else {
                EditRole(this.Addform).then((res) => {
                  if (res.code == 0) {
                    this.$message.success('修改成功！')
                    this.fetchData()
                    this.close()
                  } else {
                    this.$message.error(res.message)
                  }
                })
              }
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
    .el-dialog__body {
      width: 100% !important;
    }
    .el-form {
      width: 90%;
    }
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #409eff;
      border-color: #409eff;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #409eff;
      border-color: #409eff;
    }
  }
</style>
