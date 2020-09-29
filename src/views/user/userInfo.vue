<template>
  <el-form ref="form" :model="userForm" :rules="rules" label-width="120px" style="margin-top:30px;">
    <el-form-item label="用户名" prop="name">
      <el-input v-model="userForm.userName" :disabled="isEdit" style="width:30%;" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="userForm.email" disabled style="width:30%;" />
    </el-form-item>
    <el-form-item label="用户类型" prop="type">
      <el-select v-model="userForm.role" disabled placeholder>
        <el-option label="普通用户" :value="0"></el-option>
        <el-option label="管理员" :value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="userForm.role===1" label="管理对象" prop="team">
      <el-select v-model="userForm.team.teamId" disabled placeholder>
        <el-option :label="userForm.team.teamName" :value="userForm.team.teamId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-else label="我的主队">
      <el-select
        v-model="userForm.team"
        clearable
        :disabled="isEdit"
        filterable
        placeholder="请选择主队"
      >
        <el-option
          v-for="(item,index) in teamList"
          :key="'team-'+index"
          :label="item.teamName"
          :value="item.teamId"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <div style="float:left;margin-left:20%">
        <el-button type="primary" @click="edit" round>修改</el-button>
        <el-button type="success" @click="submitForm('form')" round>提交</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import { getTeamList } from '@/api/team'
import { getToken } from '@/utils/auth'
import { getInfo, altInfo } from '@/api/user'
export default {
  data() {
    return {
      isEdit: true,
      teamList: '',
      userForm: {
        userName: 'username',
        email: 'example@email.com',
        role: 0,
        team: {
          teamName: '',
          teamId: '',
        },
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名' },
          {
            min: 3,
            max: 45,
            message: '长度在 3 到45个字符',
            trigger: 'blur',
          },
        ],
        email: [{ required: true, message: '请输入邮箱地址' }],
        role: [{ required: true, message: '用户类型' }],
      },
    }
  },
  created() {
    this.init()
    var token = getToken()
    getInfo(token).then((res) => {
      this.userForm = res.data
    })
  },
  methods: {
    init() {
      getTeamList().then((res) => {
        this.teamList = res.data
      })
    },
    edit() {
      this.isEdit = false
    },
    submitForm(formName) {
      if (this.isEdit === false) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            altInfo(this.userForm).then((res) => {
              if (res.code == 200) {
                 this.isEdit = true
                this.$notify({
                  type: 'success',
                  message: '修改成功',
                })
              }
            })
          } else {
            this.$message({
              type: 'error',
              message: '请输入完整内容',
            })
            return false
          }
        })
      }
      else{
        this.$notify({
              type: 'success',
              message: '未发生变更',
            })
      }
    },
  },
}
</script>

<style lang="scss">
.el-input {
  display: inline-block;
  height: 47px;
  width: 70%;
}
</style>

