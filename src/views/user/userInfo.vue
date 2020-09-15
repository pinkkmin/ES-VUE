<template>
  <el-card style="margin:10px 10px 10px 10px;">
    <el-form ref="form" :model="userForm" :rules="rules" label-width="120px">
      <el-form-item>
        <h1 class="header">2020年6月23日你来到这里，今天是你加入中心的第{{ userForm.date }}天！</h1>
      </el-form-item>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userForm.name" :disabled="isEdit" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email" :disabled="isEdit" />
      </el-form-item>
      <el-form-item label="用户类型" prop="type">
        <el-select v-model="userForm.type" disabled placeholder>
          <el-option label="普通用户" :value="0"></el-option>
          <el-option label="管理员" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="userForm.type===1" label="管理对象" prop="team">
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
        <div style="float:right;margin-right:5%">
          <el-button type="primary" @click="edit" round>修改</el-button>
          <el-button type="success" @click="submitForm('form')" round>提交</el-button>
          <el-button type="danger" @click="onCancel" round>取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getTeamList } from '@/api/team'
export default {
  data() {
    return {
      isEdit: true,
      teamList: '',
      userForm: {
        name: '',
        email: '',
        type: 0,
        date: '250',
        team: {
          teamName: '南京大圣',
          teamId: 'cba2020005',
        },
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名' },
          {
            min: 3,
            max: 45,
            message: '长度在 3 到45个字符',
            trigger: 'blur',
          },
        ],
        email: [{ required: true, message: '请输入邮箱地址' }],
        type: [{ required: true, message: '用户类型' }],
      },
    }
  },
  created() {
    this.init()
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
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning',
      })
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

