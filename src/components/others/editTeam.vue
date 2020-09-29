<template>
  <div :id="elId">
    <el-dialog :title="title" :visible.sync="closed" :before-close="handleClose">
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
    </el-dialog>
  </div>
</template>
<script>
import { editTeamInfo } from '@/api/manager'
export default {
  props: {
    title: '',
    dialogVisible: '',
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
      closed: false,
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
            min: 2,
            max: 45,
            message: '长度在 2 到45个字符',
            trigger: 'blur',
          },
        ],
        coach: [{ required: true, message: '请输入正确内容' }],
        city: [{ required: true, message: '请输入正确内容' }],
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
  },
  watch: {
    dialogVisible: {
      handler(newValue, oldValue) {
        this.editForm = this.data
        this.closed = this.dialogVisible
      },
    },
    immediate: true,
    deep: true,
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('修改确认, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then((_) => {
            editTeamInfo(this.editForm).then((res) => {
              this.closed = false
              this.$emit('my-event', this.editForm)
              this.$notify({
                title: '编辑提示',
                message: '编辑球队信息成功',
                type: 'success',
                duration: 1700,
              })
            })
          })
        }
      })
    },
    resetForm() {
      this.editForm = {}
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
  },
}
</script>
<style>
</style>
