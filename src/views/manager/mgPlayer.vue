<template>
  <div>
    <el-card
      style="
        vertical-align: middle;
        float: left;
        margin: 10px 10px 10px 20px;
        width: 97%;
      "
    >
      <el-form
        style="margin-top: 15px"
        :model="queryForm"
        :inline="true"
        ref="queryForm"
        label-width="100px"
      >
        <el-form-item label="球队">
          <el-select
            v-model="queryForm.teamId"
            clearable
            filterable
            placeholder="选择球队"
          >
            <el-option
              v-for="(item, index) in teamList"
              :key="'team-' + index"
              :label="item.teamName"
              :value="item.teamId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="司职位置">
          <el-select
            v-model="queryForm.position"
            filterable
            clearable
            placeholder="请选择司职位置"
          >
            <el-option label="控球后卫(PG)" value="PG" />
            <el-option label="得分后卫(SG)" value="SG" />
            <el-option label="小前锋(SF)" value="SF" />
            <el-option label="大前锋(PF)" value="PF" />
            <el-option label="中锋(C)" value="C" />
          </el-select>
        </el-form-item>
        <el-form-item label="球员">
          <el-input
            style="font-size: 17px"
            clearable
            placeholder="输入球员姓名"
            v-model="queryForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left: 15px" type="primary" @click="query()"
            >查 询</el-button
          >
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="playerData.data" style="width: 100%">
        <el-table-column width="80">
          <template slot-scope="scope">
            <router-link
              target="_blank"
              :underline="false"
              :to="{
                name: 'public_player',
                params: { playerId: playerData.data[scope.$index].playerId },
              }"
            >
              <el-image
                v-if="playerData.data[scope.$index].logo === 0"
                style="background-color: #fff"
                :size="55"
                :src="baseUrl + '0.png'"
              />
              <el-image
                v-else
                style="width: 70px; height: 67px; background-color: #fff"
                :src="baseUrl + playerData.data[scope.$index].playerId + '.png'"
              />
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="teamName" label="球队" />
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
              @click=";(dialogDealPlayer = true), (selectPlayer = scope.$index)"
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
                :key="'to-team-' + index"
                :disabled="item.teamId === playerData.data[selectPlayer].teamId"
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
      <el-pagination
        style="margin: 50px 0px 20px 0px; margin-left: 30%"
        background
        @current-change="handleCurrentChange"
        @prev-click="handlePreChange"
        @next-click="handleNextChange"
        :hide-on-single-page="true"
        :current-page.sync="queryForm.page"
        layout="total,prev, pager, next,jumper"
        :total="playerData.count"
        :page-size="10"
      />
    </el-card>
  </div>
</template>
<script>
import editPlayer from '@/components/others/editPlayer.vue'
import { getTeamList } from '@/api/team'
import { queryPlayers,dealPlayer } from '@/api/manager'
import { getNumberList } from '@/api/global'
export default {
  components: {
    editPlayer, 
  },
  data() {
    return {
      //base
      loading: true,
      dialogPlayer: false,
      dialogDealPlayer: false,
      radioSelect: '解约',
      editIndex: 0,
      selectPlayer: 0, // 选中为球员的下标
      baseUrl: 'https://es-1301702299.cos.ap-nanjing.myqcloud.com/player/',
      //data
      teamList: [],
      numberList: [],
      playerData: {
        count: 0,
        data: [],
      },
      queryForm: {
        // 查询提交表单
        name: '',
        teamId: '',
        position: '',
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
        homeId: '',
        awayId: '',
        playerId: '',
        type:'',
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
    var parse = Object.assign({}, this.queryForm)
    queryPlayers(parse).then((qs) => {
      this.playerData = qs.data
      this.loading = false
    })
  },
  methods: {
    handleCurrentChange() {
      this.loading = true
      this.query()
    },
    handlePreChange() {
      this.queryForm.page -= 1
      this.loading = true
      this.query()
    },
    handleNextChange() {
      this.queryForm.page += 1
      this.loading = true
      this.query()
    },
    query() {
      this.loading = true
      var parse = Object.assign({}, this.queryForm)
      parse.page -= 1
      queryPlayers(parse).then((qs) => {
        this.playerData = qs.data
        this.loading = false
        this.$notify({
          title: '查询提示',
          message: '查询结果返回成功,共计' + qs.data.count + '条结果',
          type: 'success',
          duration: 1700,
        })
      })
      this.loading = false
    },
    handleEditPlayer() {
      this.playerForm = Object.assign({}, this.playerData.data[this.editIndex])
      getNumberList(this.playerForm).then((res) => {
        this.numberList = res.data.data
      })
    },
    updateEditForm(data) {
      //编辑完成更新数据
      ///console.log(this.playerData.data[this.editIndex])
      this.$set(this.playerData.data, this.editIndex, data)
      this.query()
      this.dialogPlayer = false
    },
    handleClosePlayer(done) {
      this.$confirm('确认关闭？').then((_) => {
        done()
      })
    },
    submitDealPlayer() {
      var sign = true
      this.dealForm.playerId = this.playerData.data[this.selectPlayer].playerId
      this.dealForm.homeId = this.playerData.data[this.selectPlayer].teamId
      if (this.radioSelect === '解约') {
        this.dealForm.type = 4 //解约
      } else if (this.radioSelect === '退役') {
        this.dealForm.type = 5 //退役
      } else {
        this.$refs['dealPlayerForm'].validate((valid) => {
          if (valid) {
            this.dealForm.type = 3 //交易
          } else {
            sign = false
          }
        })
      }
      if (sign) {
        this.$confirm('确定执行该操作吗?').then((_) => {
        //  console.log(this.dealForm)
          dealPlayer(this.dealForm).then((res)=>{
              this.$notify({
            title: '操作提示',
            message: '操作成功',
            type: 'success',
            duration: 1700,
          })
          })
          this.dialogDealPlayer = false
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