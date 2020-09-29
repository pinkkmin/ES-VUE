<template>
  <el-card style="margin:10px 10px 10px 10px;">
      <el-form ref="form" :model="form" :rules="Rules" style="margin-left:5%;width:50%;" auto-complete="on">
        <el-form-item prop="oldPasswd" label=" 原 密 码  :">
          <el-input
            type="password"
            placeholder="请输入密码"
            :show-password="true"
            style="width: 70%;"
            v-model="form.oldPasswd"
          />
        </el-form-item>
        <el-form-item prop="newPasswd" label=" 新 密 码 :">
          <el-input
            v-model="form.newPasswd"
            type="password"
            placeholder="请输入新的密码"
            :show-password="true"
            style="width: 70%;"
          />
        </el-form-item>
        <el-form-item prop="againPasswd" label="确认密码:">
          <el-input
            v-model="form.againPasswd"
            type="password"
            placeholder="确认新的密码"
            :show-password="true"
            style="width: 70%;"
          />
        </el-form-item>
        <el-form-item>
          <el-button style="float:right;margin-right:17%;" type="primary" round plain @click="onSubmit">确认</el-button>
        </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getInfo, altPwd } from '@/api/user'
export default {
  data() {
    var validatePasssWd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (value.length < 6 || value.length > 16) {
          callback(new Error('长度至少6位,不超过16位'))
        }
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (value.length < 6 || value.length > 16) {
          callback(new Error('长度至少6位,不超过16位'))
        } else {
          if (this.form.againPasswd !== '') {
            this.$refs.form.validateField('againPasswd')
          }
        }
        callback()
      }
    }
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPasswd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        userId:'',
        oldPasswd: '',
        newPasswd: '',
        againPasswd: '',
      },
      Rules: {
        oldPasswd: [
          { required: true, trigger: 'blur', validator: validatePasssWd },
        ],
         newPasswd: [
          { required: true, trigger: 'blur', validator: validatePass },
        ],
         againPasswd: [
          { required: true, trigger: 'blur', validator: validateCheckPass },
        ],
      },
      loading: false,
    }
  },
  created(){
    var token = getToken()
    getInfo(token).then((res) => {
      this.form.userId = res.data.userId
    })
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {  
            altPwd(this.form).then((res) => {
              if (res.code == 200) {
                this.form.oldPasswd = ''
                this.form.newPasswd =''
                this.form.againPasswd =''
                this.$notify({
                  type: 'success',
                  message: '修改成功',
                })
              }
            })
        } else {
           this.$message({
             type:'error',
             message:'请输入密码'
           })
        }
      })
    }
  },
}
</script>

<style lang="scss">
$cursor: #fff;
.passwd-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 70%;
  }
  span {
    &:first-of-type {
      margin-right: 16px;
    }
  }
}
</style>

