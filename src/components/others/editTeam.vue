<template>
  <div :id="elId">
    <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
      <el-form-item label="队名" prop="name">
        <el-input style="font-size:17px;" placeholder="输入队名" v-model="editForm.name"></el-input>
      </el-form-item>
      <el-form-item label="主教练" prop="coach">
        <el-input style="font-size:17px;" placeholder="输入主教练" v-model="editForm.coach"></el-input>
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-input style="font-size:17px;" placeholder="输入城市" v-model="editForm.city"></el-input>
      </el-form-item>
      <el-form-item label="主场球馆" prop="home">
        <el-input style="font-size:17px;" placeholder="输入主场球馆" v-model="editForm.home"></el-input>
      </el-form-item>
      <el-form-item label="俱乐部名称" prop="club">
        <el-input style="font-size:17px;" placeholder="输入俱乐部名称" v-model="editForm.club"></el-input>
      </el-form-item>
    </el-form>
    <div style="margin-bottom:70px;">
      <el-button
        round
        style="float:right;margin-right:10px;"
        type="primary"
        @click="submitForm('editForm')"
      >{{ title }}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: '',
    data: {
      teamId: '',
      name: '',
      coach: '',
      city: '',
      home: '',
      club: '',
    },
  },
  data() {
    return {
      elId: '',
      editForm: {
        teamId: '',
        name: '',
        coach: '',
        city: '',
        home: '',
        club: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入正确内容' },
          {
            min: 3,
            max: 45,
            message: '长度在 3 到45个字符',
            trigger: 'blur',
          },
        ],
        coach: [
          { required: true, message: '请输入正确内容' },
        ],
        city: [
          { required: true, message: '请输入正确内容' },
        ],
        home: [
          { required: true, message: '请输入正确内容' },
          {
            min: 3,
            max: 45,
            message: '长度在 3 到45个字符',
            trigger: 'blur',
          },
        ],
         club: [
          { required: true, message: '请输入正确内容' },
          {
            min: 3,
            max: 45,
            message: '长度在 3 到45个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created() {
    this.elId = Math.random().toString(36).slice(-8)
  this.setForm(this.data)
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    setForm(data) {
       this.editForm = Object.assign({}, data)  
    },
    resetForm() {
      this.editForm = {}
    },
  },
}
</script>
<style>
</style>
