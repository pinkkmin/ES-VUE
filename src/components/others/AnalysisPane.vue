<template>
  <div :id="elId">
    <div style="float:left;margin-left:10px;width:110px;">
      <el-link href="https://element.eleme.io" target="_blank" :underline="false">
        <el-avatar
          style="background-color: #FFF;"
          :fit="fit"
          shape="square"
          :size="90"
          :src="'team/' + AnalysisData.playerId + '.png'"
        />
      </el-link>
      <el-tag style="font-size:18px;">{{ AnalysisData.name }}</el-tag>
      <el-tag
        type="success"
        style="margin-top:10px;margin-bottom:30px;font-size:18px;"
      >#{{ AnalysisData.number }} {{ getPosition(AnalysisData.position) }}</el-tag>

      <span style="color:#515151;font-size:35px;font-weight:bolder;">{{ AnalysisData.data }}</span>
    </div>
    <div style="float:left;margin-left:70px;width:450px;">
      <tabpane :tabPaneData="AnalysisData.tabPane" />
    </div>
    <el-table :data="AnalysisData.tableData" style="width:500px">
      <el-table-column prop="number" label width="100">
        <template slot-scope="scope">
          <el-tag color="#2ec7c9" effect="dark">{{ scope.$index + 2 }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label width="300">
        <template slot-scope="scope">
          <div style="float:left;">
            <span style="font-size:20px;">{{ AnalysisData.tableData[scope.$index].name }}</span>
            <el-tag
              effect="plain"
              style="margin-left:7px;"
              size="mini"
            >#{{ AnalysisData.tableData[scope.$index].number}}</el-tag>
            <el-tag
              effect="plain"
              type="success"
              style="margin-left:7px;"
              size="mini"
            >#{{ getPosition(AnalysisData.tableData[scope.$index].position)}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="data" label width="100" />
    </el-table>
  </div>
</template>

<script>
import bareChart from '@/components/echart/barEchart.vue'
import tabpane from '@/components/others/tabPane.vue'
import analysisPane from '@/components/others/AnalysisPane.vue'
export default {
  props: {
      AnalysisData:'',
      elId: ''
  },
  created() {
    this.elId = Math.random().toString(36).slice(-8)
  },
  methods: {
    getPosition(value) {
      if (value === 'PG') return '控球后卫'
      else if (value === 'SG') return '得分后卫'
      else if (value === 'PF') return '大前锋'
      else if (value === 'SF') return '小前锋'
      else return '中锋'
    }
  },
  components: {
    bareChart,
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