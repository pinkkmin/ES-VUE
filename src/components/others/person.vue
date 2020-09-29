<!--
 * @Descripttion: 
 * @Date: 2020-08-28 19:55:59
-->
<template>
  <div class="block" :id="elId">
    <el-divider>
      <i class="el-icon-basketball" />
    </el-divider>
    <el-timeline style="margin-top:20px;margin-left:2%;">
      <el-timeline-item
        v-for="(item, index) in data"
        :key="index"
        :icon="iconGroup[index%9].icon"
        color="#67C23A"
        size="large"
        type="succuss"
        :timestamp="item.date"
        placement="top"
      >
        <el-card style="width:70%;">
          <div class="card-person">
            <div class="link-person">
             <router-link
              target="_blank"
              :underline="false"
              :to="{name: 'public_player', params:{ playerId:item.playerId}}"
            >
                <el-avatar v-if="item.logo===0" icon="el-icon-user-solid" />
                <el-avatar v-else shape="square" :size="55" :src="baseUrl+item.playerId+'.png'" style="background-color:#ffff;" />
             </router-link>
            </div>
            <div class="msg-person">
              <h4>{{ getSatus(item) }}.</h4>
            </div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
import { teamService } from '@/api/team'
import { getTeamId } from '@/utils/auth'
export default {
  data() {
    return {
      elId: '',
      baseUrl: 'https://es-1301702299.cos.ap-nanjing.myqcloud.com/player/',
      queryForm:{
          teamId:'',
          page:0,
          pageSize:100
      },
      iconGroup: [
        {
          icon: 'el-icon-basketball',
        },
        {
          icon: 'el-icon-sunny',
        },
        {
          icon: 'el-icon-sunrise-1',
        },
        {
          icon: 'el-icon-cloudy',
        },
        {
          icon: 'el-icon-moon',
        },
        {
          icon: 'el-icon-lightning',
        },
        {
          icon: 'el-icon-sugar',
        },
        {
          icon: 'el-icon-grape',
        },
        {
          icon: 'el-icon-lollipop',
        },
      ],
      data: [],
      count:0,
    }
  },
  created() {
    this.elId = Math.random().toString(36).slice(-8)
    this.queryForm.teamId = getTeamId()
    teamService(this.queryForm).then((res)=>{
      this.data = res.data.data
      this.count = res.data.count
      console.log(this.data)
    })
  },
  methods: {
    getSatus(item) {
      if (item.status === 0) return item.playerName + '退役'
      else if (item.status === 1) return '签约' + item.playerName
      else if (item.status === 3) return '解约' + item.playerName
    },
  },
}
</script>
<style lang="scss">
.card-person {
  height: 55px;
}
.link-person {
  float: left;
  margin-right: 20px;
}
.msg-person {
  margin-left: 10px;
  font-size: 15px;
  float: left;
}
</style>
