<template>
  <div :id="elId">
    <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px">
      <el-form-item label="标题" prop="title">
        <el-input style="font-size:17px;" placeholder="输入标题" v-model="editForm.title"></el-input>
      </el-form-item>
      <el-form-item label="主队" prop="home">
        <el-select v-model="editForm.home" clearable filterable placeholder="请选择主队">
          <el-option
            v-for="item in teamList"
            :key="item.teamName"
            :label="item.teamName"
            :value="item.teamId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客队" prop="away">
        <el-select v-model="editForm.away" clearable filterable placeholder="请选择客队">
          <el-option
            v-for="item in teamList"
            :key="item.teamName"
            :label="item.teamName"
            :value="item.teamId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="球员" prop="player">
        <el-select v-model="editForm.player.playerId" clearable filterable placeholder="请选择球员">
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
          type="textarea"
          style="font-size:17px;"
          v-model="editForm.content"
        ></el-input>
      </el-form-item>
    </el-form>
    <div style="margin-bottom:70px;">
      <el-button
        round
        style="float:right;margin-right:10px;"
        type="primary"
        @click="submitForm('editForm')"
      >修 改</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      noticeId: '',
      auth: '',
      authId: '',
      date: '',
      title: '',
      content: '',
      home: {
        teamId: '',
        teamName: '',
      },
      away: {
        teamId: '',
        teamName: '',
      },
      player: {
        playerId: '',
        playerName: '',
      },
    },
  },
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
        playerId: '12324',
        playerName: '利拉德',
      },
      {
        playerId: '12224',
        playerName: '拉德',
      },
      {
        playerId: '12323224',
        playerName: '利德',
      },
    ]
    return {
      elId: '',
      teamList: team,
      playerList: player_,
      editForm: {
        // 编辑公告提交表单
        noticeId: '',
        auth: '',
        authId: '',
        title: '',
        player: {
          playerName: '',
          playerId: '',
        },
        home: {
          teamName: '',
          teamId: '',
        },
        away: {
          teamName: '',
          teamId: '',
        },
        content: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          {
            min: 3,
            max: 45,
            message: '长度在 3 到 140 个字符',
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
    this.elId = Math.random().toString(36).slice(-8)
    this.setForm(this.data)
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
        if (this.playerList[index].playerId === value)
          return this.playerList[index].playerName
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
.el-textarea__inner {
  height: 325px;
}
</style>
