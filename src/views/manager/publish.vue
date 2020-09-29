<template>
  <div>
    <el-card style="margin-top:30px;margin-left:15px;margin-right:20px;margin-bottom:100px;">
      <el-form
        :model="publishForm"
        :rules="rules"
        ref="publishForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input style="font-size:17px;" placeholder="输入标题" v-model="publishForm.title"></el-input>
        </el-form-item>
        <el-form-item label="主队">
          <el-select v-model="publishForm.homeId" clearable placeholder="请选择主队">
            <el-option
              v-for="(item,index) in teamList"
              :key="'home'+index"
              :label="item.teamName"
              :value="item.teamId"
              :disabled="item.teamId===publishForm.awayId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="客队" prop="away">
          <el-select v-model="publishForm.awayId" clearable filterable placeholder="请选择客队">
            <el-option
              v-for="(item,index) in teamList"
              :key="'away'+index"
              :label="item.teamName"
              :value="item.teamId"
              :disabled="item.teamId===publishForm.homeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="球员">
          <el-select v-model="publishForm.playerId" clearable filterable placeholder="请选择球员">
            <el-option-group
              v-for="group in playerList"
              :key="group.teamId"
              :label="group.teamName"
              :disabled="(group.teamId!=publishForm.away&&publishForm.awayId!='')&&(publishForm.homeId!=''&&group.teamId!=publishForm.homeId)"
            >
              <el-option
                v-for="(item,index) in group.data"
                :key="'away'+index"
                :label="item.playerName"
                :value="item.playerId"
              ></el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            placeholder="在这里输入公告内容!!"
            size="medium"
            class="content_"
            type="textarea"
            v-model="publishForm.content"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-top:10px;margin-bottom:50px;">
          <el-button type="primary" @click="submitForm('publishForm')">立即创建</el-button>
          <el-button style="margin-left:25px;" @click="resetForm('publishForm')">重置</el-button>
          <el-button style="margin-left:25px;" type="success" @click="dialogVisible = true">预览</el-button>
          <el-dialog
            title="公告发布-预览"
            :visible.sync="dialogVisible"
            width="70%"
            :before-close="handleClose"
          >
            <el-card>
              <span
                slot="header"
              >{{ publishForm.title + '\t' + new Date().toLocaleDateString() + new Date().toLocaleTimeString()}}</span>
              <el-tag
                type="success"
                effect="dark"
                size="medium"
                style="margin-left:5px"
              >发布者: {{ auth }}</el-tag>
              <el-tag
                v-if="publishForm.homeId != ''&&publishForm.homeId!=null"
                effect="dark"
                size="medium"
                style="margin-left:10px"
              >球队：{{ this.getTeamName(publishForm.homeId) }}</el-tag>
              <el-tag
                v-if="publishForm.awayId != ''&&publishForm.awayId!=null"
                effect="dark"
                size="medium"
                style="margin-left:10px"
              >球队：{{ this.getTeamName(publishForm.awayId) }}</el-tag>
              <el-tag
                v-if="publishForm.playerId != ''&&publishForm.playerId!=null"
                size="medium"
                style="margin-left:10px"
              >#{{ this.getPlayerName(publishForm.playerId) }}</el-tag>
              <div>{{ publishForm.content }}</div>
            </el-card>
            <div style="height:50px;">
              <el-button style="margin-top:30px;float:right;" @click="dialogVisible = false">关闭</el-button>
            </div>
          </el-dialog>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { getTeamList } from '@/api/team'
import { getPlayerListByTeam } from '@/api/global'
import { publish } from '@/api/manager'
import { getToken,getUserInfo } from '@/utils/auth'
export default {
  data() {
    return {
      auth: '',
      userId: '',
      dialogVisible: false,
      teamList: [],
      playerList: [],
      LastForm: {
        authId: '',
        title: '',
        playerId: '',
        home: '',
        away: '',
        content: '',
      },
      publishForm: {
        authId: '',
        title: '',
        playerId: '',
        homeId: '',
        awayId: '',
        content: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          {
            min: 3,
            max: 45,
            message: '长度在 3 到 45 个字符',
            trigger: 'blur',
          },
        ],
        content: [
          { required: true, message: '请填写公告内容', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    var user = JSON.parse(getUserInfo())
    this.auth = user.userName
    this.userId = user.userId
    getTeamList().then((res) => {
      this.teamList = res.data
    })
    getPlayerListByTeam().then((res) => {
      this.playerList = res.data
    })
  },
  methods: {
    getTeamName(value) {
      var index = 0
      while (index < this.teamList.length) {
        if (this.teamList[index].teamId === value)
          return this.teamList[index].teamName
        index++
      }
      return '球队1'
    },
    getPlayerName(value) {
      var index = 0
      while (index < this.playerList.length) {
        for (var j = 0; j < this.playerList[index].data.length; j++)
          if (this.playerList[index].data[j].playerId === value)
            return this.playerList[index].data[j].playerName
        index++
      }
      return '球员甲'
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('修改确认, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then((_) => {
            this.publishForm.authId = this.userId
            if (!this.isTrue(this.LastForm, this.publishForm)) {
              this.LastForm = Object.assign({}, this.publishForm)
              publish(this.publishForm).then((res) => {
              this.$notify({
                title: '发公告布',
                message: '发布公告成功',
                type: 'success',
                duration: 1700,
              })
              })
            } else {
              this.$notify({
                title: '发公告布',
                message: '内容未发生更改',
                type: 'error',
                duration: 1700,
              })
            } 
          })
        }else{
           this.$message({
          message: '请填写必要的公关内容。',
          type: 'warning'
        });
        }
      })
    },
    isTrue(obj1, obj2) {
      if (obj1.title.toString() != obj2.title.toString()) return false
      if (obj1.playerId.toString() != obj2.playerId.toString()) return false
      if (obj1.homeId.toString() != obj2.homeId.toString()) return false
      if (obj1.awayId.toString() != obj2.awayId.toString()) return false
      if (obj1.content.toString() != obj2.content.toString()) return false
      return true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
<style >
.el-textarea__inner {
  height: 287px;
}
</style>