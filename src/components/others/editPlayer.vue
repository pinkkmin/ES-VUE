<!--
 * @Descripttion: 
 * @Date: 2020-08-09 17:29:04
-->
<template>
  <div :id="elId">
    <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
      <el-form-item label="姓 名" prop="name">
        <el-input clearable style="font-size:17px;" placeholder="输入姓名" v-model="editForm.name" />
      </el-form-item>
      <el-form-item label="出生日期" required>
        <el-col :span="11">
          <el-form-item prop="brith">
            <el-date-picker v-model="editForm.brith" placeholder="选择日期" type="date" style="width: 50%;" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="球衣号码" prop="position" style="width: 50%;">
        <el-select clearable v-model="editForm.number" placeholder="请选择球衣号码">
          <el-option v-for="index in 101" :key = index  :disabled="index%2 === 0" :label="index" :value="index" />
        </el-select>
      </el-form-item>
      <el-form-item label="司职位置" prop="position" style="width: 50%;">
        <el-select clearable v-model="editForm.position" placeholder="请选择司职位置">
          <el-option label="控球后卫(PG)" value="PG" />
          <el-option label="得分后卫(SG)" value="SG" />
          <el-option label="小前锋(SF)" value="SF" />
          <el-option label="大前锋(PF)" value="PF" />
          <el-option label="中锋(C)" value="C" />
        </el-select>
      </el-form-item>
       <el-form-item label="身高(cm)">
        <el-col :span="15">
          <div class="height-class">
            <el-slider clearable v-model="editForm.height" :min="100" :max="250" :step="0.1" show-input />
          </div>
        </el-col>
      </el-form-item>
      <el-form-item label="体重(kg)">
        <el-col :span="15">
          <div class="height-class">
            <el-slider clearable v-model="editForm.weight" :min="50" :max="200" :step="0.1" show-input />
          </div>
        </el-col>
      </el-form-item>
       <el-form-item label="臂展(cm)">
        <el-col :span="15">
          <div class="height-class">
            <el-slider v-model="editForm.wingspan" :min="150" :max="300" :step="0.1" show-input />
          </div>
        </el-col>
      </el-form-item>
    </el-form>
    <div style="margin-bottom:70px;">
      <el-button
        round
        style="float:right;margin-right:10px;"
        type="warning"
        @click="submitForm('editForm')"
      >{{ title }}</el-button>
       <el-button
        round
        style="float:right;margin-right:10px;"
        type="primary"
        @click="onResetForm()"
      >重 置</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: '',
    data: {
      playerId: '',
      name: '',
      brith: '',
      height: 0.0,
      weight: 0.0,
      wingspan: 0.0,
      number: 0,
      positon: '',
    },
  },
  data() {
    return {
      elId: '',
      editForm: {
        playerId: '',
        name: '',
        brith: '',
        height: 0.0,
        weight: 0.0,
        wingspan: 0.0,
        number: 0,
        positon: '',
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
    onResetForm() {
        this.editForm = this.data
    },
    setForm(data) {
        //
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
