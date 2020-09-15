<template>
  <div>
    <el-card class="analysis-card" style="height:200px;">
      <div style="float:left;">
        <el-image
          style="width: 170px; height: 170px"
          :src="'team/' + team.teamId +'.png'"
          :fit="fit"
        ></el-image>
      </div>
      <div style="float:left;margin-left:20px;">
        <div style="color: #2ec7ee;font-size:30px;font-weight: bolder;">{{ team.teamName }}</div>
        <ul style="list-style: none;margin-left:-13%;">
          <li>
            <span style="font-size:20px;">教练:</span>
            <el-tag style="font-size:16px;margin-bottom:2px;">{{ team.coach }}</el-tag>
          </li>
          <li style="margin-bottom:3px;">
            <span style="font-size:20px;">城市:</span>
            <span style="font-size:17px;">{{ team.city }}</span>
          </li>
          <li style="margin-bottom:4px;">
            <span style="font-size:20px;">主场:</span>
            <span style="font-size:17px;">{{ team.home }}</span>
          </li>
          <li style="margin-bottom:2px;">
            <span style="font-size:20px;">俱乐部:</span>
            <span style="font-size:17px;">{{ team.club }}</span>
          </li>
        </ul>
      </div>
      <el-button
        style="float:right;font-size:18px;"
        type="danger"
        size="medium"
        @click="dialogVisible=true, handleEdit()"
      >编 辑</el-button>
      <el-dialog title="球队信息-编辑" :visible.sync="dialogVisible" :before-close="handleClose">
        <editTeam ref="editForm" title="修 改" :data="team" />
      </el-dialog>
    </el-card>
    <el-card style="vertical-align:middle;float: left;margin:10px 10px 10px 20px;width: 97%;">
      <el-table :data="playerTable" style="width: 100%">
        <el-table-column prop="date" width="80">
          <template slot-scope="scope">
            <el-link href="https://element.eleme.io" target="_blank" :underline="false">
              <el-avatar
                style="background-color:#fff;"
                :size="55"
                :src="'team/' + playerTable[scope.$index].playerId +'.png'"
              />
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="number" label="号码" />
        <el-table-column prop="brith" label="出生日期" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="position" label="位置" />
        <el-table-column prop="wingspan" label="臂展(kg)" />
        <el-table-column prop="height" label="身高(cm)" />
        <el-table-column prop="weight" label="体重(kg)" />
        <el-table-column label="  操 作 " width="180px;">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="medium"
              round
              style="float：left;"
              @click="dialogPlayer=true, handleEditPlayer(scope.$index)"
            >编 辑</el-button>
            <el-button
              type="warning"
              size="medium"
              round
              style="float：left;margin-left:10px;"
              @click="dialogDealPlayer=true"
            >操 作</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="球员管理-编辑球员" :visible.sync="dialogPlayer" :before-close="handleClosePlayer">
        <editPlayer ref="editPlayerForm" title="修 改" :data="playerForm" />
      </el-dialog>
      <el-dialog
        title="球员管理-处理球员"
        :visible.sync="dialogDealPlayer"
        :before-close="handleClosePlayer"
      >
        <el-radio-group v-model="radioSelect">
          <el-radio-button label="解约"></el-radio-button>
          <el-radio-button label="退役"></el-radio-button>
          <el-radio-button label="交易"></el-radio-button>
        </el-radio-group>
        <el-form
          v-if="radioSelect === '交易'"
          :model="dealForm"
          :rules="dealRules"
          ref="dealPlayerForm"
          style="margin-top:20px;"
        >
          <el-form-item label="交易至" prop="awayId">
            <el-select v-model="dealForm.awayId" clearable placeholder="请选择球队">
              <el-option
                v-for=" item in teamList"
                :key="item"
                :disabled="item.teamId === team.teamId"
                :label="item.name"
                :value="item.teamId"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div style="height:30px;">
          <el-button
            round
            style="float:right;margin0:0px 10px 50px 0px "
            @click="submitDealPlayer()"
            type="success"
          >提 交</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
/** editTeam --- 编辑球队组件
 *  editPlayer---编辑球员信息组件
 */
import editTeam from '@/components/others/editTeam.vue'
import editPlayer from '@/components/others/editPlayer.vue'
import { getCurSeason } from '@/api/global'
import { getTeamInfo } from '@/api/team'
import { validManagerPlayerList, validManagerTeamList } from '@/utils/validate'
export default {
  components: {
    editTeam,
    editPlayer,
  },
  data() {
    const playerList = validManagerPlayerList()
    const teamList_ = validManagerTeamList()
    return {
      dialogVisible: false,
      dialogPlayer: false,
      dialogDealPlayer: false,
      teamId:'cba2020019',
      playerTable: playerList,
      teamList: teamList_,
      radioSelect: '解约',
      team: {
        teamId: 'cba2020019',
        teamName: '',
        coach: '',
        city: '',
        home: '',
        club: '',
      },
      playerForm: {
        playerId: '',
        name: '',
        brith: '',
        height: 0.0,
        weight: 0.0,
        wingspan: 0.0,
        number: 0,
        positon: '',
      },
      dealForm: {
        playerId:'',
        option: '',  // 选择 解约 交易 退役
        homeId: '',
        awayId: '',
      },
      dealRules: {
        awayId: [{ required: true, message: '请输入选择球队' }],
      },
    }
  },
  created() {
     getCurSeason().then((res) => {
        var parse = res.data
        parse.teamId = this.teamId
        this.info = Object.assign({}, parse)
        getTeamInfo(parse).then((res)=>{
        this.team = res.data
        console.log(this.team)
        })
        this.loading = false
      })
  },
  methods: {
    handleEdit() {
      this.$refs.editForm.setForm(this.team)
    },
    handleEditPlayer(index) {
      this.playerForm = this.playerTable[index]
      this.$refs.editPlayerForm.setForm(this.playerForm)
    },
     handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    handleClosePlayer(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    submitDealPlayer() {
      if (this.radioSelect === '解约') this.$message('解约')
      else if (this.radioSelect === '退役') this.$message('退役')
      else { 
        this.$refs['dealPlayerForm'].validate((valid) => {
          if (valid) {
            this.$message('交易')
          } else {
            this.$message('交易error')
            return false
          }
        })
      }
    },
  },
}
</script>

<style>
.analysis-card {
  float: left;
  margin-left: 20px;
  margin-right: 10px;
  margin-top: 10px;
  width: 97%;
  background: url(/background/back5.png);
}
</style>