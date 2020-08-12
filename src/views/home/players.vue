<template>
  <div>
    <div class="players-header">
      <el-card>
        <span style="margin-right:2px;">姓名:</span>
        <el-input
          v-model="data.name"
          placeholder="请输入内容"
          maxlength="20"
          prefix-icon="el-icon-search"
          style="width:200px; margin-right:15px"
          clearable
        />
        <el-select v-model="data.team" clearable placeholder="球队" style="margin-right:15px; width:120px">
          <el-option
            v-for="item in teams"
            :key="item.team"
            :label="item.team"
            :value="item.id"
            style="height:57px"
          >
            <el-avatar :size="40" :src="item.icon" />
            <span style="font-size=17px;">{{ item.team }}</span>
          </el-option>
        </el-select>
        <el-select v-model="data.number" clearable placeholder="球衣号码" style="margin-right:15px; width:120px">
          <el-option
            v-for="index in 100"
            :key="index"
            :label="index-1"
            :value="index-1"
          />
        </el-select>
        <el-select v-model="data.position" clearable placeholder="司职位置" style="width:130px">
          <el-option
            v-for="item in positions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-card>
    </div>
    <el-container>
    <el-aside width="350px" style="margin-right:0px; margin-top:20px">
       <el-card style="height: 50px;">
      <i class="el-icon-message-solid" style="font-size: 25px; color: #89177D" />
      <span style=" margin-left:10px;font-size: 18px; color: #89177D">场均得分</span>          
    </el-card>
      <el-table
      class="table"
      :data="tableData"
      height="46+10"
      style="width: 100%;margin-top:2px"
    >
     <el-table-column prop="sort" label="排名" width="80"/>
      <el-table-column prop="date" width="75">
        <el-link href="https://element.eleme.io" target="_blank" :underline="false">
          <el-avatar :size="50" :src="circleUrl" />
        </el-link>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80" />
      <el-table-column prop="team" label="球队" width="80" />
      <el-table-column prop="number" label="号码" width="80" />
      </el-table>
    </el-aside>
    <el-main style="margin-left:30px">
    <el-table
      class="table"
      :data="tableData"
      height="46+10"
      style="width: 100%;"
    >
      <el-table-column prop="date" width="80">
        <el-link href="https://element.eleme.io" target="_blank" :underline="false">
          <el-avatar :size="50" :src="circleUrl" />
        </el-link>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100" />
      <el-table-column prop="team" label="球队" width="100" />
      <el-table-column prop="number" label="号码" width="80" />
      <el-table-column prop="position" label="位置" width="80" />
      <el-table-column prop="height" label="身高(cm)" width="100" />
      <el-table-column prop="weight" label="体重(kg)" width="100" />
      <el-table-column prop="age" label="年龄" width="100" />
      <el-table-column prop="age" label="在役" width="100" />
    </el-table>
    </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    const pos = [
      {
        name: '控球后卫',
        value: 'PG'
      },
      {
        name: '得分后卫',
        value: 'PF'
      },
      {
        name: '小前锋',
        value: 'SF'
      },
      {
        name: '大前锋',
        value: 'PF'
      },
      {
        name: '中锋',
        value: 'C'
      }
    ]
    const team = [
      {
        team: '开拓者',
        id: '1',
        icon: 'http://mat1.gtimg.com/sports/nba/logo/1602/14.png'
      },
      {
        team: '掘金',
        id: '2',
        icon: 'http://mat1.gtimg.com/sports/nba/logo/1602/26.png'
      },
      {
        team: '湖人',
        id: '3',
        icon: 'http://mat1.gtimg.com/sports/nba/logo/1602/22.png'
      }
    ]
    const tableData = [
      {
        date: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        name: '王小虎',
        team: '开拓者',
        number: 5,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        name: '王小虎',
        team: '开拓者',
        number: 15,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        name: '王小虎',
        team: '开拓者',
        number: 25,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: '2016-05-01',
        name: '王虎',
        team: '开拓者',
        number: 5,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: '2016-05-08',
        name: '厄桑-伊厄桑-伊利亚索瓦',
        number: 57,
        team: '开拓者',
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: '2016-05-06',
        name: '王小虎',
        team: '开拓者',
        number: 7,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: '2016-05-07',
        name: '王小虎',
        team: '开拓者',
        number: 45,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: '2016-05-07',
        name: '王小虎',
        team: '开拓者',
        number: 5,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: '2016-05-07',
        name: '王小虎',
        team: '开拓者',
        number: 5,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: '2016-05-07',
        name: '王小虎',
        team: '开拓者',
        number: 5,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      },
      {
        date: '2016-05-07',
        name: '王小虎',
        team: '开拓者',
        number: 5,
        position: '前锋',
        weight: '100.2',
        height: '205.3'
      }
    ]
    return {
      positions: pos,
      teams: team,
      tableData: tableData,
      circleUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      data: {
        name: '',
        team: '',
        number: '',
        positon: ''
      }
    }
  }
}
</script>

<style>
.players-head{
      height: 70px;
  }
</style>
