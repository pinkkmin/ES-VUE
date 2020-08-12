<template>
  <div>
    <el-card style="margin-top:30px;margin-left:15px;margin-right:20px;margin-bottom:100px;">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input style="font-size:17px;" placeholder="输入标题" v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="主队"  prop="home">
          <el-select v-model="ruleForm.home" clearable filterable placeholder="请选择主队">
            <el-option
              v-for="item in teamList"
              :key="item.teamName"
              :label="item.teamName"
              :value="item.teamId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="客队" prop="away">
          <el-select v-model="ruleForm.away" clearable filterable placeholder="请选择客队">
            <el-option
              v-for="item in teamList"
              :key="item.teamName"
              :label="item.teamName"
              :value="item.teamId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="球员" prop="player">
          <el-select v-model="ruleForm.player" clearable filterable placeholder="请选择球员">
            <el-option
              v-for="item in playerList"
              :key="item.playerId"
              :label="item.playerName"
              :value="item.playerId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            placeholder="在这里输入公告内容!!"
            size="medium"
            class="content_"
            type="textarea"
            v-model="ruleForm.content"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-top:10px;margin-bottom:50px;">
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button style="margin-left:25px;" @click="resetForm('ruleForm')">重置</el-button>
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
              >{{ ruleForm.title + '\t' + new Date().toLocaleDateString() + new Date().toLocaleTimeString()}}</span>
              <el-tag
                type="success"
                effect="dark"
                size="medium"
                style="margin-left:5px"
              >发布者: {{ auth }}</el-tag>
              <el-tag
                v-if="ruleForm.home != ''"
                effect="dark"
                size="medium"
                style="margin-left:10px"
              >球队：{{ this.getTeamName(ruleForm.home) }}</el-tag>
              <el-tag
                v-if="ruleForm.away != ''"
                effect="dark"
                size="medium"
                style="margin-left:10px"
              >球队：{{ this.getTeamName(ruleForm.away) }}</el-tag>
              <el-tag
                v-if="ruleForm.player != ''"
                size="medium"
                style="margin-left:10px"
              >#{{ this.getPlayerName(ruleForm.player) }}</el-tag>
              <div>{{ ruleForm.content }}</div>
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
export default {
  data() {
    const team = [
      {
        teamName: '开拓者',
        teamId: 'cba124545',
      },
      {
        teamName: '掘金',
        teamId: 'cba455',
      },
      {
        teamName: '爵士',
        teamId: 'cba1545',
      },
    ]
    const player_ = [
        {
            playerId:'12324',
            playerName:'利拉德'
        },
         {
            playerId:'12224',
            playerName:'拉德'
        },
         {
            playerId:'12323224',
            playerName:'利德'
        },
    ]
    return {
      auth: '陈明富',
      userId: '',
      dialogVisible: false,
      teamList: team,
      playerList: player_,
      ruleForm: {
        title: '',
        player: '',
        home: '',
        away: '',
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
  methods: {
    getTeamName(value){
        var index = 0
       while(index < this.teamList.length) {
           if(this.teamList[index].teamId === value ) return this.teamList[index].teamName
           index++
       }
    return '球队1'
    },
    getPlayerName(value) {
        var index = 0
       while(index < this.playerList.length) {
           if(this.playerList[index].playerId === value ) return this.playerList[index].playerName
           index++
       }
       return '球员甲'
    },
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
    },
    handleClose(done) {
     this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
  },
}
</script>
<style >
.el-textarea__inner {
  height: 287px;
}
</style>