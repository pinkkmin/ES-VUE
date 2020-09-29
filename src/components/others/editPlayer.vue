<!--
 * @Descripttion: 
 * @Date: 2020-08-09 17:29:04
-->
<template>
  <div :id="elId">
     <el-dialog title="编辑球员" :visible.sync="closed" :before-close="handleClose">
    <el-form
      :model="editForm"
      :rules="rules"
      ref="editForm"
      label-width="100px"
    >
      <el-form-item label="姓 名" prop="name">
        <el-input
          clearable
          style="font-size: 17px"
          placeholder="输入姓名"
          v-model="editForm.name"
        />
      </el-form-item>
      <el-form-item label="出生日期" required>
        <el-col :span="11">
          <el-form-item prop="brith">
            <el-date-picker
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              v-model="editForm.birth"
              placeholder="选择日期"
              type="date"
              style="width: 70%"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="球衣号码" prop="position" style="width: 50%">
        <el-select
          clearable
          v-model="editForm.number"
          placeholder="请选择球衣号码"
        >
          <el-option
            v-for="(item,index) in numberList"
            :key="'number'+index"
            :disabled="item.exist === 1"
            :label="item.number"
            :value="item.number"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="司职位置" prop="position" style="width: 50%">
        <el-select
          clearable
          v-model="editForm.position"
          placeholder="请选择司职位置"
        >
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
            <el-slider
              clearable
              v-model="editForm.height"
              :min="100"
              :max="250"
              :step="0.1"
              show-input
            />
          </div>
        </el-col>
      </el-form-item>
      <el-form-item label="体重(kg)">
        <el-col :span="15">
          <div class="height-class">
            <el-slider
              clearable
              v-model="editForm.weight"
              :min="50"
              :max="200"
              :step="0.1"
              show-input
            />
          </div>
        </el-col>
      </el-form-item>
      <el-form-item label="臂展(cm)">
        <el-col :span="15">
          <div class="height-class">
            <el-slider
              v-model="editForm.wingspan"
              :min="150"
              :max="300"
              :step="0.1"
              show-input
            />
          </div>
        </el-col>
      </el-form-item>
    </el-form>
    <div style="margin-bottom: 70px">
      <el-button
        round
        style="float: right; margin-right: 10px"
        type="warning"
        @click="submitForm('editForm')"
        >{{ title }}</el-button
      >
      <el-button
        round
        style="float: right; margin-right: 10px"
        type="primary"
        @click="onResetForm()"
        >重 置</el-button
      >
    </div>
     </el-dialog>
  </div>
</template>
<script>
import { editPlayer } from '@/api/manager'
export default {
  props: {
    title: '',
    dialogVisible: '',
    numberData:'',
    data: {
      playerId: '',
      teamId:'',
      name: '',
      birth: '', 
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
      closed: false,
      numberList:[],
      editForm: {
        playerId: '',
        teamId:'',
        name: '',
        birth: '',
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
            min: 2,
            max: 20,
            message: '长度在 3 到20个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  watch:{
    data:{
      handler(newValue, oldValue) {
        this.editForm = Object.assign({},this.data)
        this.closed = this.dialogVisible
        this.numberList = this.numberData
      },
      immediate: true,
      deep: true,
    }
  },
  created() {
    this.elId = Math.random().toString(36).slice(-8)  
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
            editPlayer(this.editForm).then((res)=>{
             var birth = new Date(this.editForm.birth)
              this.editForm.age =  new Date().getUTCFullYear() -  birth.getUTCFullYear() 
              this.$emit('my-player', this.editForm)
              this.$notify({
            title: '修改提示',
            message: '修改成功',
            type: 'success',
            duration: 1700,
          })
              this.closed = false
            })
            
          })
        } else {       
          return false
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
    },
    onResetForm() {
     this.editForm = Object.assign({},this.data)
    },
  },
}
</script>
<style>
</style>
