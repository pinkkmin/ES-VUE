<template>
  <div>
    <el-card style="vertical-align:middle;float: left;margin:10px 10px 10px 20px;width: 97%;">
      <el-form
        style="margin-top:15px;"
        :model="queryForm"
        :rules="rules"
        :inline="true"
        ref="queryForm"
        label-width="100px"
      >
        <el-form-item label="球队">
          <el-select v-model="queryForm.team" clearable filterable placeholder="选择球队">
            <el-option
              v-for="item in teamList"
              :key="item"
              :label="item.name"
              :value="item.teamId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="司职位置">
        <el-select v-model="queryForm.position" filterable clearable placeholder="请选择司职位置">
          <el-option label="控球后卫(PG)" value="PG" />
          <el-option label="得分后卫(SG)" value="SG" />
          <el-option label="小前锋(SF)" value="SF" />
          <el-option label="大前锋(PF)" value="PF" />
          <el-option label="中锋(C)" value="C" />
        </el-select>
      </el-form-item>
        <el-form-item label="球员">
          <el-input
            style="font-size:17px;"
            clearable
            placeholder="输入球员姓名"
            v-model="queryForm.playerName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left:15px;" type="primary" @click="query()">查 询</el-button>
        </el-form-item>
      </el-form>
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
         <el-table-column prop="teamName" label="球队" />
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
              @click="dialogDealPlayer=true,selectPlayer = scope.$index"
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
                :disabled="item.teamId === playerTable[selectPlayer].teamId"
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
      <el-pagination
        style="margin:50px 0px 20px 0px; margin-left:30%;"
        background
        @current-change="handleCurrentChange"
        @prev-click="handlePreChange"
        @next-click="handleNextChange"
        :hide-on-single-page="true"
        layout="total,prev, pager, next,jumper"
        :total="count"
        :page-size="10"
      />
    </el-card>
  </div>
</template>
<script>
/** editTeam --- 编辑球队组件
 *  editPlayer---编辑球员信息组件
 */
import editTeam from '@/components/others/editTeam.vue'
import editPlayer from '@/components/others/editPlayer.vue'
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
      //base
      loading: false,
      dialogPlayer: false,
      dialogDealPlayer: false,
      radioSelect: '解约',
      selectPlayer: 0, // 选中为球员的下标
      //data
      playerTable: playerList,
      teamList: teamList_,
      count: 100,
      queryForm: {
        // 查询提交表单
        playerName: '',
        team: '',
        position:'',
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
        homeId: '',
        awayId: '',
      },
      dealRules: {
        awayId: [{ required: true, message: '请输入选择球队' }],
      },
    }
  },
  methods: {
    query() {
      this.$message('茶轩')
    },
    handleEditPlayer(index) {
      this.playerForm = this.playerTable[index]
      this.$refs.editPlayerForm.setForm(this.playerForm)
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
    handleCurrentChange() {
      this.loading = false
      this.$message('now----------')
    },
    handlePreChange() {
      this.$message('pre------------')
    },
    handleNextChange() {
      this.$message('next-------------')
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