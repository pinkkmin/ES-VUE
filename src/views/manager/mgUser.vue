<!--
 * @Descripttion: 
 * @Date: 2020-07-28 19:59:09
-->
<template>
  <el-card style="margin: 10px 15px 100px 15px;">
    <el-form style="margin-top:15px;" ref="queryForm" :model="queryForm" :inline="true">
      <el-form-item label="用户类型">
        <el-select v-model="queryForm.userType" clearable filterable placeholder="选择类型">
          <el-option label="管理员" value="admin" />
          <el-option label="普通用户" value="user" />
        </el-select>
      </el-form-item>
      <el-form-item label="用户名：" style="margin-left:5%;">
        <el-input
          style="font-size:17px;"
          clearable
          placeholder="输入用户名"
          v-model="queryForm.userName"
        />
      </el-form-item>
      <el-form-item label="邮箱：" style="margin-left:5%;">
        <el-input style="font-size:17px;" clearable placeholder="输入邮箱" v-model="queryForm.email" />
      </el-form-item>
      <el-form-item style="margin-left:5%;">
        <el-button type="primary" @click="query()">查 询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userTable" style="width: 100%">
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <span v-if="userTable[scope.$index].type === 1">管理员</span>
          <span v-else>普通用户</span>
        </template>
      </el-table-column>
      <el-table-column prop="team.name" label="管 理 球 队" />
      <el-table-column label="  操 作 " width="180px;">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="medium"
            round
            style="float：left;"
            @click="dialogUser=true, handleEditUser(scope.$index)"
          >编 辑</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
        style="margin:50px 0px 20px 0px; margin-left:30%;"
        background
        @current-change="handleCurrentChange"
        @prev-click="handlePreChange"
        @next-click="handleNextChange"
        :hide-on-single-page="true"
        layout="total,prev, pager, next,jumper"
        :total="count"
        :page-size="10"
      />
    <el-dialog title="用户管理-编辑" :visible.sync="dialogUser" :before-close="handleClose">
      <el-form :model="editForm" :rules="rules" ref="editUserForm" style="margin-top:20px;">
        <el-form-item label="用 户 名:" prop="userName">
          <el-input
            clearable
            style="font-size:17px;width:80%;"
            placeholder="输入用户名"
            v-model="editForm.userName"
          ></el-input>
        </el-form-item>
        <el-form-item label=" 邮  箱 ：" prop="email">
          <el-input
            clearable
            style="font-size:17px;width:80%;"
            placeholder="输入邮箱"
            v-model="editForm.email"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户类型" style="margin-top:20px;" prop="type">
          <el-select v-model="editForm.type" clearable placeholder="管理权限">
            <el-option label="管理员" :value="1" />
            <el-option label="普通用户" :value="0" />
          </el-select>
          <el-form-item
            v-if="editForm.type === 1"
            label="管理球队"
            style="margin-top:25px;"
            prop="team"
          >
            <el-select
              v-model="editForm.team.teamId"
              clearable
              filterable="true"
              placeholder="管理权限"
            >
              <el-option
                v-for="item in teamList"
                :key="item.teamId"
                :label="item.name"
                :value="item.teamId"
              />
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button
            round
            style="float:right;margin-right:10px;"
            type="success"
            @click="submitForm('editUserForm')"
          >提 交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
import { validUserList, validManagerTeamList } from '@/utils/validate'
export default {
  data() {
    const user_ = validUserList()
    const teamList_ = validManagerTeamList()
    return {
      loading: false,
      dialogUser: false,
      //data
      count: user_.count,
      teamList: teamList_,
      userTable: user_.data,
      editIndex: 0,
      editForm: {
        userId:'',
        type: 0,
        email: '',
        userName: '',
        team: {
          teamId: '',
          name: '',
        },
      },
      queryForm: {
        // 查询提交表单
        userName: '',
        userType: '',
        email: '',
      },
      rules: {
        userName: [{ required: true, message: '请输入用户名' }],
        email: [{ required: true, message: '请输入邮箱地址' }],
        type: [{ required: true, message: '请选择用户类型' }],
        team: [{ required: true, message: '请选择管理球队' }],
      },
    }
  },
  methods: {
    query() {
      alert('submit!')
    },
    getTeamName(id) {
      for (var index = 0; index < this.teamList.length; index++)
        if (id === this.teamList[index].teamId) {
          /// this.$message("提交----" + this.teamList[index].name)
          return this.teamList[index].name
        }
      return ''
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认提交, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then((_) => {
              if (this.editForm.type === 1)
                this.editForm.team.name = this.getTeamName(
                  this.editForm.team.teamId
                )
              this.userTable[this.editIndex] = Object.assign({}, this.editForm)
              if (this.editForm.type === 0) {
                this.userTable[this.editIndex].team.teamId = ''
                this.userTable[this.editIndex].team.name = ''
              }
             
              this.$message("--+"+this.userTable[this.editIndex].userName)
              this.$notify({
                title: '提示',
                message: '修改成功',
                duration: 1000,
              })
              this.dialogUser = false
            })
            .catch((_) => {})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleEditUser(index) {
      this.editIndex = index
      this.editForm = Object.assign({}, this.userTable[index])
    },
    handleCurrentChange() {
      this.loading = false
      this.$message('now')
      // this.update()
    },
    handlePreChange() {
      this.$message('pre')
      this.update()
    },
    handleNextChange() {
      this.update()
      this.$message('next')
    },
  },
}
</script>

<style>
</style>