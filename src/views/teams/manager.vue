<template>
  <div>
    <el-card v-loading="loading" class="analysis-card" style="height: 200px">
      <div style="float: left">
        <el-image
          style="width: 170px; height: 170px"
          :src="teamUrl + team.teamId + '.png'"
        ></el-image>
      </div>
      <div style="float: left; margin-left: 20px">
        <div style="color: #2ec7ee; font-size: 30px; font-weight: bolder">
          {{ team.name }}
        </div>
        <ul style="list-style: none; margin-left: -13%">
          <li>
            <span style="font-size: 20px">教练:</span>
            <el-tag style="font-size: 16px; margin-bottom: 2px">{{
              team.coach
            }}</el-tag>
          </li>
          <li style="margin-bottom: 3px">
            <span style="font-size: 20px">城市:</span>
            <span style="font-size: 17px">{{ team.city }}</span>
          </li>
          <li style="margin-bottom: 4px">
            <span style="font-size: 20px">主场:</span>
            <span style="font-size: 17px">{{ team.home }}</span>
          </li>
          <li style="margin-bottom: 2px">
            <span style="font-size: 20px">俱乐部:</span>
            <span style="font-size: 17px">{{ team.club }}</span>
          </li>
        </ul>
      </div>
      <el-button
        style="float: right; font-size: 18px"
        type="danger"
        size="medium"
        @click="(dialogVisible = true)"
        >编 辑</el-button
      > 
        <editTeam  :dialogVisible="dialogVisible" title="修 改" @my-event="updateTeamForm" :data="team" />
    </el-card>
    <el-card
      v-loading="loading"
      style="
        vertical-align: middle;
        float: left;
        margin: 10px 10px 10px 20px;
        width: 97%;
      "
    >
      <el-table :data="playerTable" style="width: 100%">
        <el-table-column prop="date" width="80">
          <template slot-scope="scope">
            <router-link
              target="_blank"
              :underline="false"
              :to="{
                name: 'public_player',
                params: { playerId: playerTable[scope.$index].playerId },
              }"
            >
              <el-image
                style="width: 75px; height: 70px; background-color: #fff"
                :src="
                  baseUrl +
                  getLogoUrl(
                    playerTable[scope.$index].logo,
                    playerTable[scope.$index].playerId
                  ) +
                  '.png'
                "
              />
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="number" label="号码" />
        <el-table-column prop="birth" label="出生日期" />
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
              @click="
                ;(dialogPlayer = true),
                  (editIndex = scope.$index),
                  handleEditPlayer()
              "
              >编 辑</el-button
            >
            <el-button
              type="warning"
              size="medium"
              round
              style="float：left;margin-left:10px;"
              @click="dialogDealPlayer = true"
              >操 作</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <editPlayer
        :dialogVisible="dialogPlayer"
        @my-player="updateEditForm"
        :numberData="numberList"
        title="修 改"
        :data="playerForm"
      />
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
          style="margin-top: 20px"
        >
          <el-form-item label="交易至" prop="awayId">
            <el-select
              v-model="dealForm.awayId"
              clearable
              placeholder="请选择球队"
            >
              <el-option
                v-for="(item, index) in teamList"
                :key="'team' + index"
                :disabled="item.teamId === team.teamId"
                :label="item.teamName"
                :value="item.teamId"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div style="height: 30px">
          <el-button
            round
            style="float: right; margin0: 0px 10px 50px 0px"
            @click="submitDealPlayer()"
            type="success"
            >提 交</el-button
          >
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
import { getNumberList } from '@/api/global'
import { getTeamInfo, getTeamList, getPlayersByTeamId } from '@/api/team'
import { getToken } from '@/utils/auth'
import { dealPlayer } from '@/api/manager'
import { getInfo, altInfo } from '@/api/user'
export default {
  components: {
    editTeam,
    editPlayer,
  },
  data() {
    return {
      dialogVisible: false,
      dialogPlayer: false,
      dialogDealPlayer: false,
      loading: true,
      baseUrl: 'https://es-1301702299.cos.ap-nanjing.myqcloud.com/player/',
      teamUrl: 'https://es-1301702299.cos.ap-nanjing.myqcloud.com/team/',
      teamId: 'cba2020019',
      playerTable: [],
      teamList: [],
      numberList: [],
      editIndex: 0,
      selectPlayer: 0, // 选中为球员的下标
      radioSelect: '解约',
      team: {
        teamId: 'cba2020019',
        teamName: '',
        coach: '',
        city: '',
        home: '',
        club: '',
      },
      queryForm: {
        // 查询提交表单
        teamId: '',
        page: 0,
        pageSize: 10,
      },
      playerForm: {
        playerId: '',
        teamId: '',
        name: '',
        brith: '',
        height: 0.0,
        weight: 0.0,
        wingspan: 0.0,
        number: 0,
        positon: '',
      },
      dealForm: {
        playerId: '',
        option: '', // 选择 解约 交易 退役
        homeId: '',
        awayId: '',
      },
      dealRules: {
        awayId: [{ required: true, message: '请输入选择球队' }],
      },
    }
  },
  created() {
    getTeamList().then((res) => {
      this.teamList = res.data
    })
    var token = getToken()
    getInfo(token).then((res) => {
      this.teamId = res.data.team.teamId
      this.queryForm.teamId = this.teamId
      this.queryForm.page = 0
      this.queryForm.pageSize = 100
      getTeamInfo(this.queryForm).then((res) => {
        this.team = res.data
      })
      getPlayersByTeamId(this.queryForm).then((res) => {
        this.playerTable = res.data.data
        this.loading = false
      })
    })
  },
  methods: {
    getLogoUrl(logo, playerId) {
      if (logo === 1) return playerId
      return '0'
    },
    handleEditPlayer() {
      this.playerForm = Object.assign({}, this.playerTable[this.editIndex])
      getNumberList(this.playerForm).then((res) => {
        this.numberList = res.data.data
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },  
    updateTeamForm(data) {
      this.$set(this.team, data)
      this.dialogVisible = false
    },
    updateEditForm(data) {
      //编辑完成更新数据
      this.$set(this.playerTable, this.editIndex, data)
      getPlayersByTeamId(this.queryForm).then((res) => {
        this.playerTable = res.data.data
        this.loading = false
      })
      this.dialogPlayer = false
    },
    handleClosePlayer(done) {
      this.$confirm('确认关闭？').then((_) => {
        done()
      })
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