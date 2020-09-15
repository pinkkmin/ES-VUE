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
    <el-table v-loading="loading" :data="userData.data" style="width: 100%">
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="userEmail" label="邮箱" />
      <el-table-column label="类型">
        <template slot-scope="scope">
          <span v-if="userData.data[scope.$index].type === 1">管理员</span>
          <span v-else>普通用户</span>
        </template>
      </el-table-column>
      <el-table-column prop="team.teamName" label="管理球队 / 球迷主队" />
      <el-table-column label="  操 作 " width="180px;">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="medium"
            round
            style="float：left;"
            @click="dialogUser=true,editIndex = scope.$index, handleEditUser(userData.data[scope.$index])"
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
      :current-page.sync="queryForm.page"
      layout="total,prev, pager, next,jumper"
      :total="userData.count"
      :page-size="1"
    />
    <el-dialog title="用户管理" :visible.sync="dialogUser" :before-close="handleClose">
      <el-form :model="editForm" :rules="rules" ref="editUserForm" style="margin-top:20px;">
        <el-form-item label=" 邮  箱 ：" prop="email">
          <el-input
            style="font-size:17px;width:80%;"
            disabled
            v-model="editForm.email"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户类型" style="margin-top:20px;" prop="type">
          <el-select v-model="editForm.type" clearable placeholder="管理权限">
            <el-option label="管理员" :value="1" />
            <el-option label="普通用户" :value="0" />
          </el-select>
          <el-form-item v-if="editForm.type === 1" label="球 队" style="margin-top:25px;" prop="teamId">
            <el-select v-model="editForm.teamId" clearable filterable placeholder="管理权限">
              <el-option
                v-for="(item,index) in teamList"
                :key="'team-'+index"
                :label="item.teamName"
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
import { getTeamList } from '@/api/global'
import { queryUsers } from '@/api/manager'
export default {
  data() {
    return {
      loading: false,
      dialogUser: false,
      //data
      teamList: [],
      userData: {
        count: 100,
        data: [],
      },
      editIndex: 0,
      editForm: {
        userId: '',
        email:'',
        type: 0,
        teamId:'',
      },
      queryForm: { // 查询提交表单
        userName: '',
        userType: '',
        email: '',
        page: 0,
        pageSize: 10,
      },
      rules: {
        type: [{ required: true, message: '请选择用户类型' }],
        teamId: [{ required: true, message: '请选择管理球队' }],
      },
    }
  },
  created() {
    getTeamList().then((res) => {
      this.teamList = res.data.data
    })
    this.loading = true
    queryUsers(this.queryForm)
        .then((qs) => {
          this.userData = qs.data
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
  },
  methods: {
      handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
    },
     handleCurrentChange() {
      this.loading = true
      this.query()
    },
    handlePreChange() {
      this.queryForm.page -= 1
      this.loading = true
      this.query()
    },
    handleNextChange() {
      this.queryForm.page += 1
      this.loading = true
      this.query()
    },
    query() {
      this.loading = true
      queryUsers(this.queryForm)
        .then((qs) => {
          this.userData = qs.data
          this.loading = false
          this.$notify({
            title: '查询提示',
            message: '查询结果返回成功,共计' + qs.data.count + '条结果',
            type: 'success',
            duration: 1700,
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    submitForm(formName) {
     //  console.log(this.editForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认提交, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then((_) => {              
              this.$notify({
                title: '提示',
                message: '修改成功',
                type: 'success',
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
    handleEditUser(data) {
      this.editForm.userId  = data.userId
      this.editForm.email  = data.userEmail
      this.editForm.type  =  data.role
      this.editForm.teamId  = data.team.teamId
    },
  },
}
</script>

<style>
</style>