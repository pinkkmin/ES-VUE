<!--
 * @Descripttion: 
 * @Date: 2020-08-09 12:51:27
-->
<template>
  <el-card v-loading="loading" style="margin: 20px 10px 20px 10px">
    <el-button icon="el-icon-attract" style="margin-bottom:20px;" type="success" @click="dialogCreate=true">新 建 球 队</el-button>
    <el-dialog title="球队管理-新建" :visible.sync="dialogCreate" :before-close="handleCloseCreate">
      <editTeam ref="createForm" title="新 建" :data="createData" />
    </el-dialog>
    <el-table :data="teamTable" stripe style="vertical-align:middle;width:100%">
      <el-table-column prop="name" label="序号">
        <template slot-scope="scope">
          <el-tag color="#37a2da" effect="dark">{{scope.$index +1}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="队徽">
        <template slot-scope="scope">
          <el-image
            style="width: 70px; height: 70px"
            :src="'team/' + teamTable[scope.$index].teamId + '.png'"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="队名" />
      <el-table-column prop="city" label="所在城市" />
      <el-table-column prop="coach" label="主教练" />
      <el-table-column prop="home" width="250px" label="主场球馆" />
      <el-table-column prop="club" width="250px" label="俱乐部" />
      <el-table-column label="操 作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="medium"
            @click="handleEdit(scope.$index)"
          >编 辑</el-button>
        </template>
      </el-table-column>
    </el-table>
      <editTeam title="修 改" :dialogVisible="dialog" @my-event="updateEditForm" :data="editTeamData" />
  </el-card>
</template>

<script>
import editTeam from '@/components/others/editTeam.vue'
import {getTeamList} from '@/api/global'

export default {
  components: {
    editTeam,
  },
  data() {
    return {
      //base
      loading: true,
      teamTable: '',
      dialogCreate: false,
      dialog:false,
      editIndex:0,
      createData: {
        teamId: '',
        name: '',
        coach: '',
        city: '',
        home: '',
        club: '',
      },
      editTeamData: {
        teamId: '',
        name: '',
        coach: '',
        city: '',
        home: '',
        club: '',
      },
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      getTeamList().then((res)=>{
        this.teamTable = res.data.data
        this.loading = false
      }).catch(()=>{

      })
    },
    handleEdit(index) {
      this.editIndex = index
      this.editTeamData = Object.assign({},this.teamTable[index])
      this.dialog=true
    }, 
    updateEditForm(data){
      this.$set(this.teamTable,this.editIndex,data)
    },
    handleCloseCreate(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
  },
}
</script>

<style>
</style>