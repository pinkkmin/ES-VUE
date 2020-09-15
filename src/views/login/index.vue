<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h1 class="title">C&L篮球球员管理系统</h1>
      </div>
      <el-form-item prop="username" class="form-item_">
        <i class="el-icon-user" style="margin-left:7px;font-size:25px;" />
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          class="input_"
        />
      </el-form-item>
      <el-form-item prop="password" class="form-item_">
        <i class="el-icon-lock" style="margin-left:7px;font-size:25px;" />
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          class="input_"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="font-size:20px;width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登 录</el-button>
      <el-form-item style="margin-bottom:20px;background-color:#defff0;">
        <el-button type="success" style="float:left;" plain round @click="dialogVisible = true">立即注册</el-button>
        <el-button type="primary" plain style="float:right;" round @click="passwdDdialog = true">找回密码</el-button>
      </el-form-item>
    </el-form>
    <footer class="es-footer">
      <div>
        <i class="el-icon-basketball" style="color:#409EFF;font-size:28px;">Copyright © 2020</i>
        <i style="color:#303133;">power by</i>
        <i class="el-icon-user" style="color:#67C23A;font-size:28px;">CMF & LSS</i>
      </div>
    </footer>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="35%">
      <el-button
        v-show="!show"
        type="success"
        @click="show=true,title='普通用户注册'"
        style="font-size:18px;margin-left:20%;"
      >普通用户</el-button>
      <el-tooltip effect="dark" content="需审核授权">
        <el-button
          v-show="!show"
          type="danger"
          @click="show=true,title='管理员注册'"
          style="font-size:18px;float:right;margin-right:20%;"
        >管理员申请</el-button>
      </el-tooltip>
      <transition name="el-zoom-in-center">
        <div v-show="show" style="margin-bottom:50px;">
          <el-page-header title @back="show = false" style="margin-bottom:22px;" />
          <el-form
            ref="regForm"
            :rules="regRules"
            :model="regForm"
            label-position="left"
            label-width="120px"
          >
            <el-form-item prop="userName" label="用户名">
              <el-input placeholder="输入用用户" clearable v-model="regForm.userName" />
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
              <el-input placeholder="填写邮箱地址" clearable v-model="regForm.email">
                <el-button slot="append" @click="getKeyNumber(regForm,0)">获取验证码</el-button>
              </el-input>
            </el-form-item>
            <el-form-item prop="keyNumber" label="验证码">
              <el-input placeholder v-model="regForm.keyNumber">
                <span slot="suffix">秒后可重发</span>
              </el-input>
            </el-form-item>
            <el-form-item prop="passwd" label="密码">
              <el-input type="password" placeholder="填写密码" v-model="regForm.passwd" />
            </el-form-item>
            <el-form-item prop="checkPass" label="确认密码">
              <el-input
                type="password"
                placeholder="再次确认密码"
                v-model="regForm.checkPass"
                autocomplete="on"
              />
            </el-form-item>
            <el-form-item prop="teamId" label="主队">
              <el-select v-model="regForm.teamId" filterable placeholder="选择球队">
                <el-option
                  v-for="(item,index) in teamList"
                  :key="'home'+index"
                  :label="item.teamName"
                  :value="item.teamId"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" style="float:right;">
            <el-button type="success" round @click="handleReg">注 册</el-button>
          </span>
        </div>
      </transition>
    </el-dialog>
    <el-dialog title="找回密码" :visible.sync="passwdDdialog" width="35%">
      <transition name="el-zoom-in-center">
        <el-form
          ref="passForm"
          :rules="passRules"
          :model="passForm"
          label-position="left"
          label-width="120px"
        >
          <el-form-item prop="email" label="邮箱">
            <el-input placeholder="填写邮箱地址" clearable v-model="passForm.email">
              <el-button slot="append" @click="getKeyNumber(passForm,1)">获取验证码</el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="keyNumber" label="验证码">
            <el-input placeholder v-model="passForm.keyNumber">
              <span slot="suffix">秒后可重发</span>
            </el-input>
          </el-form-item>
          <el-form-item prop="passwd" label="新密码">
            <el-input type="password" placeholder="填写密码" v-model="passForm.passwd" />
          </el-form-item>
          <el-form-item prop="checkPass" label="确认密码">
            <el-input
              type="password"
              placeholder="再次确认密码"
              v-model="passForm.checkPass"
              autocomplete="on"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round style="float:right;" @click="handleReset">找 回</el-button>
          </el-form-item>
        </el-form>
      </transition>
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { getTeamList } from '@/api/team'
import { doKeyNumber,regKeyNumber,resetPwd,register } from '@/api/global'
export default {
  name: 'Login',
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
        callback(new Error('请输入密码'))
      } else {
        if (value.length < 6 || value.length > 16) {
          callback(new Error('长度至少6位,不超过16位'))
        } else {
          if (this.regForm.checkPass !== '') {
            this.$refs.regForm.validateField('checkPass')
          }
        }
        callback()
      }
    }
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.regForm.passwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var resetPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (value.length < 6 || value.length > 16) {
          callback(new Error('长度至少6位,不超过16位'))
        } else {
          if (this.passForm.checkPass !== '') {
            this.$refs.passForm.validateField('checkPass')
          }
        }
        callback()
      }
    }
    var resetCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passForm.passwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      title:'用户注册',
      show: false,
      show2: true,
      passwdDdialog: false,
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      teamList: [
        {
          teamId: 'cba2020001',
          teamName: '广东华南虎',
        },
      ],
      loginForm: {
        username: 'root',
        password: '123456',
      },
      regForm: {
        userName: '',
        passwd: '',
        checkPass: '',
        email: '',
        role: '',
        teamId: 'cba2020001',
        keyNumber: '',
      },
      passForm: {
        passwd: '',
        checkPass: '',
        email: '',
        keyNumber: '',
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
        ],
        password: [
          { validator: validatePasssWd, required: true, trigger: 'blur' },
        ],
      },
      regRules: {
        userName: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
        ],
        passwd: [{ validator: validatePass, required: true, trigger: 'blur' }],
        checkPass: [
          { validator: validateCheckPass, required: true, trigger: 'blur' },
        ],
        email: [
          {
            required: true,
            trigger: 'blur',
            type: 'email',
            message: '请输入正确的邮箱地址',
          },
        ],
        teamId: [{ required: true, trigger: 'blur', message: '请选择主队' }],
        keyNumber: [
          { required: true, trigger: 'blur', message: '请输入验证码' },
        ],
      },
      passRules: {
        passwd: [{ validator: resetPass, required: true, trigger: 'blur' }],
        checkPass: [
          { validator: resetCheckPass, required: true, trigger: 'blur' },
        ],
        email: [
          {
            required: true,
            trigger: 'blur',
            type: 'email',
            message: '请输入正确的邮箱地址',
          },
        ],
        keyNumber: [
          { required: true, trigger: 'blur', message: '请输入验证码' },
        ],
      },
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true,
    },
  },
  created() {
    getTeamList().then((res) => {
      this.teamList = res.data
    })
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleReset() {
      this.$refs.passForm.validate((valid) => {
        if (valid) {       
        resetPwd(this.passForm).then((res)=>{
          this.notice('success', res.message)
        }) 
        } else {
          return false
        }
      })
    },
    handleReg() {
      this.$refs.regForm.validate((valid) => {
        if (valid) {
          this.notice('success', '注册请求')
        } else {
          return false
        }
      })
    },
    checkEmail(value) {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      if (reg.test(value)) {
        return true
      } else {
        return false
      }
    },
    getKeyNumber(form,type) {
      var parse = Object.assign({},form)
      parse.type = type 
      if (this.checkEmail(form.email)) {
        if(type === 0){ //注册
          regKeyNumber(parse).then((res)=>{
          if(res.code === 200) {
              this.notice('success', '验证码已发送, 5分钟内有效, 请留意邮箱查收')
          }
        })
        }
        else {  // 找回
          doKeyNumber(parse).then((res)=>{
          if(res.code === 200) {
              this.notice('success', '验证码已发送, 5分钟内有效, 请留意邮箱查收')
          }
        })
        }
        
      } else {
        this.notice('error', '请填写正确的邮箱地址')
      }
    },
    notice(type_, message_) {
      this.$notify({
        title: '提示',
        type: type_,
        message: message_,
        offset: 100,
      })
    },
  },
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

/* reset element-ui css */
.login-container {
  .input_ {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: black;
      height: 47px;
      font-size: 23px;
    }
  }
  .form-item_ {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #f1e4ff;
    border-radius: 5px;
  } 
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background: url(/background/login.png);
  .login-form {
    position: relative;
    width: 600px;
    max-width: 100%;
    padding: 25px 35px 0;
    margin: 0 auto;
    margin-top: 180px;
    overflow: hidden;
    border-radius: 25px;
    background-color: #defff0; //#ffddf3;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;

    .title {
      font-size: 50px;
      color: #37a2da;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
.es-footer {
  font-size: 25px;
  line-height: 21px;
  text-align: center;
  text-shadow: 0 1px 2px #999;
  padding-bottom: 20px;
  width: 100%;
  margin-top: 7.8%;
}
</style>
