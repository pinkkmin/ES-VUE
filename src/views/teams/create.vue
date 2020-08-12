<template>
  <div style="padding:30px;">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="个人照片" prop="icon">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="add-avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item class="add_name" label="姓名" prop="name" style="width: 50%;">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="出生日期" required>
        <el-col :span="11">
          <el-form-item prop="brith">
            <el-date-picker
              v-model="form.brith"
              placeholder="选择日期"
              type="date"
              style="width: 50%;"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="司职位置" prop="position" style="width: 50%;">
        <el-select v-model="form.position" clearable placeholder="请选择司职位置">
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
            <el-slider v-model="form.height" :min="100" :max="250" :step="0.1" show-input />
          </div>
        </el-col>
      </el-form-item>
      <el-form-item label="体重(kg)">
        <el-col :span="15">
          <div class="height-class">
            <el-slider v-model="form.weight" :min="50" :max="200" :step="0.1" show-input />
          </div>
        </el-col>
      </el-form-item>
      <el-form-item label="臂展(cm)">
        <el-col :span="15">
          <div class="height-class">
            <el-slider v-model="form.wingspan" :min="150" :max="300" :step="0.1" show-input />
          </div>
        </el-col>
      </el-form-item>
      <el-form-item class="add-button">
        <el-button icon="el-icon-s-promotion" type="primary" @click="submitForm('form')">即刻签约</el-button>
        <el-button icon="el-icon-refresh-right" class="reset-button" @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: '',
      form: {
        icon: '',
        name: '',
        brith: '',
        height: 180,
        weight: 85,
        wingspan: 200,
        position: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入球员的名字', trigger: 'blur' },
        ],
        position: [
          { required: true, message: '请选择司职位置', trigger: 'change' },
        ],
        brith: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change',
          },
        ],
      },
    }
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.form.height = 180
      this.form.weight = 85
      this.form.wingspan = 200
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
  },
}
</script>
<style lang="scss">
.height-class {
  margin-left: 10px;
}
.add-button {
  margin-left: 45%;
  margin-top: 50px;
}
.reset-button {
  margin-left: 50px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 85px;
  height: 85px;
  line-height: 85px;
  text-align: center;
}
.add-avatar {
  width: 85px;
  height: 85px;
  display: block;
}
</style>