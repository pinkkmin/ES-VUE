<!--
 * @Descripttion: 
 * @Date: 2020-08-05 20:35:39
-->
<template>
  <div v-loading="loading" :id="elId">
    <div v-loading="loading" style="float:left;margin-left:10px;width:110px;">
      <el-link href="https://element.eleme.io" target="_blank" :underline="false">
        <img style="background-color: #FFF;width:110px;" :src="logoUrl" :key="logoUrl" />
      </el-link>
      <el-tag style="font-size:18px;margin-top:10px;">{{ AnalysisData.name }}</el-tag>
      <el-tag
        type="success"
        style="margin-top:10px;margin-bottom:30px;font-size:18px;"
      >#{{ AnalysisData.number }} {{ getPosition(AnalysisData.position) }}</el-tag>

      <span style="color:#515151;font-size:35px;font-weight:bolder;">{{ AnalysisData.data }}</span>
    </div>
    <div style="float:left;margin-left:70px;width:450px;">
      <tabpane :tabPaneData="AnalysisData.tabPane" />
    </div>
    <el-table :data="tableData" style="margin-left:5%;width:auto">
      <el-table-column prop="number" label>
        <template slot-scope="scope">
          <el-tag color="#37a2da" effect="dark">{{ scope.$index + 2 }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label width="300">
        <template slot-scope="scope">
          <div style="float:left;">
            <span style="font-size:20px;">{{ tableData[scope.$index].name }}</span>
            <el-tag
              effect="plain"
              style="margin-left:7px;"
              size="mini"
            >#{{ tableData[scope.$index].number}}</el-tag>
            <el-tag
              effect="plain"
              type="success"
              style="margin-left:7px;"
              size="mini"
            >#{{ getPosition(tableData[scope.$index].position)}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="data" label />
    </el-table>
  </div>
</template>

<script>
import tabpane from '@/components/others/tabPane.vue'
export default {
  props: {
    AnalysisData: {
      playerId: '',
      name: '',
      number: 0,
      data: 0.0,
      logo: 0,
      tabPane: [],
      tableData: [],
    },
  },
  data() {
    return {
      elId: '',
      loading: true,
      tableData: [],
      playerId: '',
      logo: '', //是否有logo
      baseUrl: 'https://es-1301702299.cos.ap-nanjing.myqcloud.com/player/',
      logoUrl: '',
    }
  },
  watch: {
    AnalysisData: {
      handler(newValue, oldValue) {
        if (this.AnalysisData !== '') {
          this.tableData = this.AnalysisData.tableData
          this.loading = false
          this.logo = this.AnalysisData.logo
          this.playerId = this.AnalysisData.playerId
          if (this.logo === 1)
            this.logoUrl = this.baseUrl + this.playerId + '.png'
        }
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.elId = Math.random().toString(36).slice(-8)
    this.logoUrl = this.baseUrl + '0.png'
  },
  computed: {
    getId() {
      this.elId = Math.random().toString(36).slice(-8)
    },
  },
  methods: {
    getPosition(value) {
      if (value === 'PG') return '控球后卫'
      else if (value === 'SG') return '得分后卫'
      else if (value === 'PF') return '大前锋'
      else if (value === 'SF') return '小前锋'
      else return '中锋'
    },
  },
  components: {
    tabpane,
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
}
</style>