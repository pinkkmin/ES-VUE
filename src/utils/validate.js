/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'root', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
/** :/analysis/index.vue
 *  返回数据王 数据
 */
export function validScoreData() {
  const scoreData = [{
      value: 28.8,
      name: '利拉德'
    },
    {
      name: '努尔基奇',
      value: 14.4
    },
    {
      name: '西蒙斯',
      value: 10.4
    },
    {
      name: '特伦托',
      value: 11.5
    },
    {
      name: '扎克',
      value: 9.8
    },
    {
      name: '白边',
      value: 15.4
    },
    {
      name: '库里',
      value: 7.1
    },
    {
      name: '麦科勒姆',
      value: 22.1
    },
  ]
  const scoreTable = [{
      number: 5,
      name: '利拉德',
      playerId: 'cba2020004',
      data: 22.5,
      position: 'PG',
    },
    {
      number: 5,
      name: '利拉德',
      playerId: 'cba2020004',
      data: 22.5,
      position: 'PG',
    },
    {
      number: 5,
      name: '麦科勒姆',
      playerId: 'cba2020004',
      data: 22.5,
      position: 'PF',
    },
    {
      number: 5,
      name: '努尔基奇',
      playerId: 'cba2020004',
      data: 22.5,
      position: 'SG',
    },
  ]
  const playerID = 'cba2020016'
  const playerName = '陈明富'
  const playerNum = 15
  const Playerposition = 'PF'
  const playerData = 28.7
  return {
    playerId: playerID,
    name: playerName,
    number: playerNum,
    position: Playerposition,
    data: playerData,
    tabPane: scoreData,
    tableData: scoreTable
  }
}

export function validBoundData() {
  /*数据王 */
  const scoreData = [{
      value: 28.8,
      name: '利拉德'
    },
    {
      name: '努尔基奇',
      value: 14.4
    },
    {
      name: '西蒙斯',
      value: 10.4
    },
    {
      name: '特伦托',
      value: 11.5
    },
    {
      name: '扎克',
      value: 9.8
    },
    {
      name: '白边',
      value: 15.4
    },
    {
      name: '库里',
      value: 7.1
    },
    {
      name: '麦科勒姆',
      value: 22.1
    },
  ]
  const scoreTable = [{
      number: 5,
      name: '利拉德',
      playerId: 'cba2020004',
      data: 22.5,
      position: 'PG',
    },
    {
      number: 5,
      name: '利拉德',
      playerId: 'cba2020004',
      data: 22.5,
      position: 'PG',
    },
    {
      number: 5,
      name: '麦科勒姆',
      playerId: 'cba2020004',
      data: 22.5,
      position: 'PF',
    },
    {
      number: 5,
      name: '努尔基奇',
      playerId: 'cba2020004',
      data: 22.5,
      position: 'SG',
    },
  ]
  const playerID = 'cba2020017'
  const playerName = '阿伟'
  const playerNum = 15
  const Playerposition = 'SG'
  const playerData = 15.7
  return {
    playerId: playerID,
    name: playerName,
    number: playerNum,
    position: Playerposition,
    data: playerData,
    tabPane: scoreData,
    tableData: scoreTable
  }
}

export function validAssistData() {
  /*数据王 */
  const scoreData = [{
      value: 8.8,
      name: '利拉德'
    },
    {
      name: '努尔基奇',
      value: 4.0
    },
    {
      name: '西蒙斯',
      value: 1.4
    },
    {
      name: '特伦托',
      value: 2.5
    },
    {
      name: '扎克',
      value: 2.8
    },
    {
      name: '白边',
      value: 5.4
    },
    {
      name: '库里',
      value: 0.1
    },
    {
      name: '麦科勒姆',
      value: 4.1
    },
  ]
  const scoreTable = [{
      number: 5,
      name: '利拉德',
      playerId: 'cba2020014',
      data: 22.5,
      position: 'PG',
    },
    {
      number: 5,
      name: '利拉德',
      playerId: 'cba2020008',
      data: 8.5,
      position: 'C',
    },
    {
      number: 5,
      name: '麦科勒姆',
      playerId: 'cba2020004',
      data: 1.5,
      position: 'PF',
    },
    {
      number: 5,
      name: '努尔基奇',
      playerId: 'cba2020004',
      data: 22.5,
      position: 'SG',
    },
  ]
  const playerID = 'cba2020009'
  const playerName = '利拉德'
  const playerNum = 0
  const Playerposition = 'PF'
  const playerData = 8.8
  return {
    playerId: playerID,
    name: playerName,
    number: playerNum,
    position: Playerposition,
    data: playerData,
    tabPane: scoreData,
    tableData: scoreTable
  }
}

export function validStealData() {
  /*数据王 */
  const scoreData = [{
      value: 1.7,
      name: '刘树生'
    },
    {
      name: '努尔基奇',
      value: 1.4
    },
    {
      name: '西蒙斯',
      value: 0.4
    },
    {
      name: '特伦托',
      value: 1.5
    },
    {
      name: '扎克',
      value: 0.8
    },
    {
      name: '白边',
      value: 0.4
    },
    {
      name: '库里',
      value: 0.1
    },
    {
      name: '麦科勒姆',
      value: 0.8
    },
  ]
  const scoreTable = [{
      number: 5,
      name: '利拉德',
      playerId: 'cba2020004',
      data: 2.5,
      position: 'PG',
    },
    {
      number: 5,
      name: '利拉德',
      playerId: 'cba2020004',
      data: 2.5,
      position: 'PG',
    },
    {
      number: 5,
      name: '麦科勒姆',
      playerId: 'cba2020004',
      data: 22.5,
      position: 'SF',
    },
    {
      number: 5,
      name: '努尔基奇',
      playerId: 'cba2020004',
      data: 0.5,
      position: 'SG',
    },
  ]
  const playerID = 'cba2020019'
  const playerName = '刘树生'
  const playerNum = 17
  const Playerposition = 'C'
  const playerData = 1.7
  return {
    playerId: playerID,
    name: playerName,
    number: playerNum,
    position: Playerposition,
    data: playerData,
    tabPane: scoreData,
    tableData: scoreTable
  }
}
export function validBlockData() {
  /*数据王 */
  const scoreData = [{
      value: 1.8,
      name: '利拉德'
    },
    {
      name: '努尔基奇',
      value: 3.7
    },
    {
      name: '西蒙斯',
      value: 0.4
    },
    {
      name: '特伦托',
      value: 1.5
    },
    {
      name: '扎克',
      value: 0.8
    },
    {
      name: '白边',
      value: 3.0
    },
    {
      name: '库里',
      value: 0.1
    },
    {
      name: '麦科勒姆',
      value: 1.1
    },
  ]
  const scoreTable = [{
      number: 5,
      name: '利拉德',
      playerId: 'cba2020004',
      data: 2.5,
      position: 'PG',
    },
    {
      number: 15,
      name: '利拉德',
      playerId: 'cba2020004',
      data: 2.5,
      position: 'PG',
    },
    {
      number: 45,
      name: '麦科勒姆',
      playerId: 'cba2020004',
      data: 0.5,
      position: 'PF',
    },
    {
      number: 75,
      name: '努尔基奇',
      playerId: 'cba2020004',
      data: 0.5,
      position: 'SG',
    },
  ]
  const playerID = 'cba2020004'
  const playerName = '努尔基奇'
  const playerNum = 7
  const Playerposition = 'SF'
  const playerData = 3.7
  return {
    playerId: playerID,
    name: playerName,
    number: playerNum,
    position: Playerposition,
    data: playerData,
    tabPane: scoreData,
    tableData: scoreTable
  }
}

/****************球队赛季数据对比 */
export function validSeasonData_1() {
  const dataX = ['2019-2020', '2018-2019', '2017-2018', '2016-2017', '2015-2016',
    '2014-2015', '2013-2014', '2012-2013', '2011-2012', '2010-2011'
  ]
  const dataY = [111, 125.2, 102, 108, 131.1, 101.2, 111.0, 114.2, 115.2, 106.5]
  return {
    name: dataX,
    data: dataY
  }

}
export function validSeasonData_2() {
  const dataX = ['2019-2020', '2018-2019', '2017-2018', '2016-2017', '2015-2016',
    '2014-2015', '2013-2014', '2012-2013', '2011-2012', '2010-2011'
  ]
  const dataY = [24.3, 25.2, 18.2, 18.5, 31.1, 21.2, 21.0, 24.2, 25.2, 26.5]
  return {
    name: dataX,
    data: dataY
  }

}
export function validAllTeamSeasonData_1() {
  const dataX = ['开拓者', '掘金', '奇才', '湖人', '爵士', '森林狼', '鹈鹕', '太阳', '雷霆', '马刺',
    '勇士', '76人', '快艇', '火箭', '篮网', '雄鹿', '步行者', '凯尔特人', '灰熊', '小牛'
  ]
  const dataY = [111, 125.2, 102, 108, 131.1, 101.2, 111.0, 114.2, 115.2, 106.5,
    105.2, 117.5, 109.5, 129.5, 113.5, 121.5, 129.5, 109.5, 134.5, 128.5, 124.5
  ]
  return {
    name: dataX,
    data: dataY
  }
  return {
    name: dataX,
    data: dataY
  }
}
export function validAllTeamSeasonData_2() {
  const dataX = ['开拓者', '掘金', '奇才', '湖人', '爵士', '森林狼', '鹈鹕', '太阳', '雷霆', '马刺',
    '勇士', '76人', '快艇', '火箭', '篮网', '雄鹿', '步行者', '凯尔特人', '灰熊', '小牛'
  ]
  const dataY = [24.3, 25.2, 18.2, 18.5, 31.1, 21.2, 21.0, 24.2, 25.2, 26.5,
    15.2, 17.5, 19.5, 29.5, 23.5, 21.5, 19.5, 19.5, 34.5, 28.5, 24.5
  ]
  return {
    name: dataX,
    data: dataY
  }
  return {
    name: dataX,
    data: dataY
  }
}
export function validseasonTable() {
  const data = [{
      season: '2019-2020',
      score: 130.3,
      bound: 51.4,
      block: 8.9,
      assist: 22.2,
      steal: 13.5,
      foul: 24.8,
      turnover: 12,
      free: 23
    },
    {
      season: '2019-2020',
      score: 130.3,
      bound: 51.4,
      block: 8.9,
      assist: 22.2,
      steal: 13.5,
      foul: 24.8,
      turnover: 12,
      free: 23
    },
    {
      season: '2019-2020',
      score: 130.3,
      bound: 51.4,
      block: 8.9,
      assist: 22.2,
      steal: 13.5,
      foul: 24.8,
      turnover: 12,
      free: 23
    },
    {
      season: '2019-2020',
      score: 130.3,
      bound: 51.4,
      block: 8.9,
      assist: 22.2,
      steal: 13.5,
      foul: 24.8,
      turnover: 12,
      free: 23
    },
    {
      season: '2019-2020',
      score: 130.3,
      bound: 51.4,
      block: 8.9,
      assist: 22.2,
      steal: 13.5,
      foul: 24.8,
      turnover: 12,
      free: 23
    }
  ]
  return data
}

/**  mock notice/index -> notice list 
 *   主页-公告显示  && 公告管理-列表/编辑
 */
export function validNoticeList() {
  const notice_ = {
    count: 10,
    data: [{
        noticeId: 'notice15454545',
        authId: 'user124578DC',
        auth: '陈明富',
        date: '\t' + new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
        title: '标题测试',
        content: '简化流程：设计简洁直观的操作流程' +
          '清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；' +
          '帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。',
        home: {
          teamName: '爵士',
          teamId: '',
        },
        away: {
          teamName: '者',
          teamId: 'cba455',
        },
        player: {
          playerName: '德',
          playerId: '',
        },
      },
      {
        noticeId: 'notice154545',
        authId: 'user1278DC',
        title: '标题测试1',
        date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
        content: '简化流程：设计简洁直观的操作流程' +
          '清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；' +
          '帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。',
        auth: '陈明富',
        home: {
          teamName: '爵士',
          teamId: '',
        },
        away: {
          teamName: '者',
          teamId: '',
        },
        player: {
          playerName: '利',
          playerId: '12324',
        },
      },
      {
        noticeId: 'notice54545',
        authId: 'user4578DC',
        title: 'CBA官方公布常规赛MVP：易建联力压周琦第五度当选',
        date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
        content: 'CBA此前公布的常规赛MVP候选人共有易建联、周琦、王哲林、韩德君和胡金秋5人。在这5人之中，易建联本赛季出战39场，场均上场30分钟，只用12.8次出手就能贡献20.1分10.4篮板以及1.5盖帽，率领广东以44胜2负的优异战绩领跑全联盟。本赛季回归CBA的周琦则一共出战41场，场均砍下22.2分13.3篮板2.3盖帽，统治力十足，他领衔的新疆队最终也获得了36胜10负，联盟第二的成绩。其余三位候选人，王哲林场均26.1分11.6篮板，但福建队只排名常规赛第12，韩德君44战场均17.6分11篮板，辽宁队32胜14负联盟第三，胡金秋46场全勤，场均19.3分10篮板，广厦30胜16负排在常规赛第五名。',
        auth: '陈明富',
        home: {
          teamName: '爵士',
          teamId: 'cba1545',
        },
        away: {
          teamName: '者',
          teamId: 'cba455',
        },
        player: {
          playerName: '',
          playerId: '',
        },
      },
      {
        noticeId: 'note15454545',
        authId: 'user1578DC',
        title: '标题测试2',
        date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
        content: '简化流程：设计简洁直观的操作流程' +
          '清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；' +
          '帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。',
        auth: '陈明富',
        home: {
          teamName: '爵士',
          teamId: 'cba1545',
        },
        away: {
          teamName: '者',
          teamId: 'cba455',
        },
        player: {
          playerName: '利拉',
          playerId: '12324',
        },
      },
      {
        noticeId: 'notice454545',
        authId: 'user124578DC',
        title: '标题测试4',
        date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
        content: '简化流程：设计简洁直观的操作流程' +
          '清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；' +
          '帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。',
        auth: '陈明富',
        home: {
          teamName: '爵士',
          teamId: 'cba1545',
        },
        away: {
          teamName: '者',
          teamId: 'cba455',
        },
        player: {
          playerName: '利德',
          playerId: '12324',
        },
      },
      {
        noticeId: 'noti454545',
        authId: 'user124578DC',
        title: '标题测试dsds',
        date: '\t' +
          new Date().toLocaleDateString() +
          new Date().toLocaleTimeString(),
        content: '简化流程：设计简洁直观的操作流程' +
          '清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；' +
          '帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。',
        auth: '陈明富',
        home: {
          teamName: '爵士',
          teamId: '',
        },
        away: {
          teamName: '者',
          teamId: 'cba455',
        },
        player: {
          playerName: '德',
          playerId: '',
        },
      },
      {
        noticeId: 'notce1545',
        authId: 'user124578DC',
        title: '标题测试sdsd1',
        date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
        content: '简化流程：设计简洁直观的操作流程' +
          '清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；' +
          '帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。',
        auth: '陈明富',
        home: {
          teamName: '爵士',
          teamId: '',
        },
        away: {
          teamName: '者',
          teamId: '',
        },
        player: {
          playerName: '利',
          playerId: '12324',
        },
      },
      {
        noticeId: 'notice1545',
        authId: 'user124578DC',
        title: 'dsCBA官方公布常规赛MVP：易建联力压周琦第五度当选',
        date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
        content: 'CBA此前公布的常规赛MVP候选人共有易建联、周琦、王哲林、韩德君和胡金秋5人。在这5人之中，易建联本赛季出战39场，场均上场30分钟，只用12.8次出手就能贡献20.1分10.4篮板以及1.5盖帽，率领广东以44胜2负的优异战绩领跑全联盟。本赛季回归CBA的周琦则一共出战41场，场均砍下22.2分13.3篮板2.3盖帽，统治力十足，他领衔的新疆队最终也获得了36胜10负，联盟第二的成绩。其余三位候选人，王哲林场均26.1分11.6篮板，但福建队只排名常规赛第12，韩德君44战场均17.6分11篮板，辽宁队32胜14负联盟第三，胡金秋46场全勤，场均19.3分10篮板，广厦30胜16负排在常规赛第五名。',
        auth: '陈明富',
        home: {
          teamName: '爵士',
          teamId: 'cba1545',
        },
        away: {
          teamName: '者',
          teamId: 'cba455',
        },
        player: {
          playerName: '',
          playerId: '',
        },
      },
      {
        noticeId: 'notce4545',
        authId: 'user124578DC',
        title: '标题测试2sds',
        date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
        content: '简化流程：设计简洁直观的操作流程' +
          '清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；' +
          '帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。',
        auth: '陈明富',
        home: {
          teamName: '爵士',
          teamId: 'cba1545',
        },
        away: {
          teamName: '者',
          teamId: 'cba455',
        },
        player: {
          playerName: '利拉',
          playerId: '12324',
        },
      },
      {
        noticeId: 'notce154545',
        authId: 'user124578DC',
        title: '标题测试dsd4',
        date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
        content: '简化流程：设计简洁直观的操作流程' +
          '清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；' +
          '帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。',
        auth: '陈明富',
        home: {
          teamName: '爵士',
          teamId: 'cba1545',
        },
        away: {
          teamName: '者',
          teamId: 'cba455',
        },
        player: {
          playerName: '利德',
          playerId: '12324',
        },
      },
    ]
  }
  return notice_
}
export function validNoticeList2() {
  const notice_ = {
    count: 8,
    data: [{
        noticeId: 'notice154545',
        authId: 'user1245DC',
        title: '标题测试',
        date: '\t' +
          new Date().toLocaleDateString() +
          new Date().toLocaleTimeString(),
        content: '简化流程：设计简洁直观的操作流程' +
          '清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；' +
          '帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。',
        auth: '陈明富',
        home: {
          teamName: '爵士',
          teamId: '',
        },
        away: {
          teamName: '者',
          teamId: 'cba455',
        },
        player: {
          playerName: '德',
          playerId: '',
        },
      },
      {
        noticeId: 'notice154545',
        authId: 'user1278DC',
        title: '标题测试1',
        date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
        content: '简化流程：设计简洁直观的操作流程' +
          '清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；' +
          '帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。',
        auth: '陈明富',
        home: {
          teamName: '爵士',
          teamId: '',
        },
        away: {
          teamName: '者',
          teamId: '',
        },
        player: {
          playerName: '利',
          playerId: '12324',
        },
      },
      {
        noticeId: 'noic15545',
        authId: 'user14578DC',
        title: 'CBA官方公布常规赛MVP：易建联力压周琦第五度当选',
        date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
        content: 'CBA此前公布的常规赛MVP候选人共有易建联、周琦、王哲林、韩德君和胡金秋5人。在这5人之中，易建联本赛季出战39场，场均上场30分钟，只用12.8次出手就能贡献20.1分10.4篮板以及1.5盖帽，率领广东以44胜2负的优异战绩领跑全联盟。本赛季回归CBA的周琦则一共出战41场，场均砍下22.2分13.3篮板2.3盖帽，统治力十足，他领衔的新疆队最终也获得了36胜10负，联盟第二的成绩。其余三位候选人，王哲林场均26.1分11.6篮板，但福建队只排名常规赛第12，韩德君44战场均17.6分11篮板，辽宁队32胜14负联盟第三，胡金秋46场全勤，场均19.3分10篮板，广厦30胜16负排在常规赛第五名。',
        auth: '陈明富',
        home: {
          teamName: '爵士',
          teamId: 'cba1545',
        },
        away: {
          teamName: '者',
          teamId: 'cba455',
        },
        player: {
          playerName: '',
          playerId: '',
        },
      },
      {
        noticeId: 'noice14545',
        authId: 'user1278DC',
        title: '标题测试2',
        date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
        content: '简化流程：设计简洁直观的操作流程' +
          '清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；' +
          '帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。',
        auth: '陈明富',
        home: {
          teamName: '爵士',
          teamId: 'cba1545',
        },
        away: {
          teamName: '者',
          teamId: 'cba455',
        },
        player: {
          playerName: '利拉',
          playerId: '12324',
        },
      },
      {
        noticeId: 'notice4545',
        authId: 'user124578DC',
        title: '标题测试4',
        date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
        content: '简化流程：设计简洁直观的操作流程' +
          '清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；' +
          '帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。',
        auth: '陈明富',
        home: {
          teamName: '爵士',
          teamId: 'cba1545',
        },
        away: {
          teamName: '者',
          teamId: 'cba455',
        },
        player: {
          playerName: '利德',
          playerId: '12324',
        },
      },
      {
        title: '标题测试dsds',
        date: '\t' +
          new Date().toLocaleDateString() +
          new Date().toLocaleTimeString(),
        content: '简化流程：设计简洁直观的操作流程' +
          '清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；' +
          '帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。',
        auth: '陈明富',
        home: {
          teamName: '爵士',
          teamId: '',
        },
        away: {
          teamName: '者',
          teamId: 'cba455',
        },
        player: {
          playerName: '德',
          playerId: '',
        },
      },
      {
        noticeId: 'notce15545',
        authId: 'user4578DC',
        title: '标题测试sdsd1',
        date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
        content: '简化流程：设计简洁直观的操作流程' +
          '清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；' +
          '帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。',
        auth: '陈明富',
        home: {
          teamName: '爵士',
          teamId: '',
        },
        away: {
          teamName: '者',
          teamId: '',
        },
        player: {
          playerName: '利',
          playerId: '12324',
        },
      }
    ]
  }
  return notice_
}
/** /manager/team/manager
 * 
 */
export function validManagerTeamList() {
  const table = [{
      teamId: 'cba2020018',
      name: '广东华南虎',
      coach: '杜峰',
      city: '广东东莞',
      home: '东莞银行篮球中心',
      club: '广东宏远华南虎俱乐部',
    },
    {
      teamId: 'cba2020016',
      name: '广东华南虎',
      coach: '杜峰',
      city: '广东东莞',
      home: '东莞银行篮球中心',
      club: '广东宏远华南虎俱乐部',
    },
    {
      teamId: 'cba2020014',
      name: '山西猛龙',
      coach: '杜峰',
      city: '广东东莞',
      home: '东莞银行篮球中心',
      club: '广东宏远华南虎俱乐部',
    },
    {
      teamId: 'cba2020004',
      name: '广东华南虎',
      coach: '杜峰',
      city: '广东东莞',
      home: '东莞银行篮球中心',
      club: '广东宏远华南虎俱乐部',
    },
    {
      teamId: 'cba2020007',
      name: '开拓者',
      coach: '杜峰',
      city: '广东东莞',
      home: '东莞银行篮球中心',
      club: '广东宏远华南虎俱乐部',
    },
    {
      teamId: 'cba2020002',
      name: '广东华南虎',
      coach: '杜峰',
      city: '广东东莞',
      home: '东莞银行篮球中心',
      club: '广东宏远华南虎俱乐部',
    },
    {
      teamId: 'cba2020006',
      name: '广东华南虎',
      coach: '杜峰',
      city: '广东东莞',
      home: '东莞银行篮球中心',
      club: '广东宏远华南虎俱乐部',
    },
    {
      teamId: 'cba2020011',
      name: '广东华南虎',
      coach: '杜峰',
      city: '广东东莞',
      home: '东莞银行篮球中心',
      club: '广东宏远华南虎俱乐部',
    },
    {
      teamId: 'cba2020013',
      name: '广东华南虎',
      coach: '杜峰',
      city: '广东东莞',
      home: '东莞银行篮球中心',
      club: '广东宏远华南虎俱乐部',
    },
    {
      teamId: 'cba2020015',
      name: '广东华南虎',
      coach: '杜峰',
      city: '广东东莞',
      home: '东莞银行篮球中心',
      club: '广东宏远华南虎俱乐部',
    },
    {
      teamId: 'cba2020019',
      name: '广东华qw',
      coach: '杜峰',
      city: '广东东莞',
      home: '东莞银行篮球中心',
      club: '广东宏远华南虎俱乐部',
    },
    {
      teamId: 'cba2020020',
      name: '广东华南虎',
      coach: '杜峰',
      city: '广东东莞',
      home: '东莞银行篮球中心',
      club: '广东宏远华南虎俱乐部',
    },
    {
      teamId: 'cba2020012',
      name: '广东华南虎',
      coach: '杜峰',
      city: '广东东莞',
      home: '东莞银行篮球中心',
      club: '广东宏远华南虎俱乐部',
    },
    {
      teamId: 'cba2020001',
      name: '广东华南虎',
      coach: '杜峰',
      city: '广东东莞',
      home: '东莞银行篮球中心',
      club: '广东宏远华南虎俱乐部',
    },
    {
      teamId: 'cba2020003',
      name: '广东华南虎',
      coach: '杜峰',
      city: '广东东莞',
      home: '东莞银行篮球中心',
      club: '广东宏远华南虎俱乐部',
    },
    {
      teamId: 'cba2020016',
      name: '广东华南虎',
      coach: '杜峰',
      city: '广东东莞',
      home: '东莞银行篮球中心',
      club: '广东宏远华南虎俱乐部',
    },
    {
      teamId: 'cba2020006',
      name: '广东华南虎',
      coach: '杜峰',
      city: '广东东莞',
      home: '东莞银行篮球中心',
      club: '广东宏远华南虎俱乐部',
    },
    {
      teamId: 'cba2020019',
      name: 'ceshi',
      coach: '杜峰',
      city: '广东东莞',
      home: '东莞银行篮球中心',
      club: '广东宏远华南虎俱乐部',
    },
    {
      teamId: 'cba2020008',
      name: '广东华南虎',
      coach: '杜sa峰',
      city: '广东东莞',
      home: '东莞银行篮球中心',
      club: '吉林九台农商银行东北虎篮球俱乐部',
    },
    {
      teamId: 'cba2020011',
      name: '广东华南虎',
      coach: '杜峰',
      city: '广东东莞',
      home: '青岛国信体育中心钻石体育馆',
      club: '广东宏远华南虎俱乐部',
    },
  ]
  return table
}
/* player/manager/index */
export function validManagerPlayerList() {
  const table = [{
      playerId: 'cba2020008',
      teamId: 'cba2020014',
      teamName: '广东华南虎',
      name: '陈明贵',
      number: 7,
      position: 'SG',
      height: 201.4,
      weight: 100,
      wingspan: 214.5,
      brith: '2000-4-16',
      age: 20,
    },
    {
      playerId: 'cba2020017',
      teamId: 'cba2020014',
      teamName: '广东华南虎',
      name: '陈明贵',
      number: 7,
      position: 'SG',
      height: 201.4,
      weight: 100,
      wingspan: 214.5,
      brith: '2000-4-16',
      age: 20,
    },
    {
      playerId: 'cba2020008',
      teamId: 'cba2020014',
      teamName: '广东华南虎',
      name: '陈明贵',
      number: 7,
      position: 'SG',
      height: 201.4,
      weight: 100,
      wingspan: 214.5,
      brith: '2000-4-16',
      age: 20,
    },
    {
      playerId: 'cba2020009',
      teamId: 'cba2020014',
      teamName: '广东华南虎',
      name: '陈明贵',
      number: 7,
      position: 'SG',
      height: 201.4,
      weight: 100,
      wingspan: 214.5,
      brith: '2000-4-16',
      age: 20,
    },
    {
      playerId: 'cba2020003',
      teamId: 'cba2020014',
      teamName: '广东虎',
      name: '陈明贵',
      number: 7,
      position: 'SG',
      height: 201.4,
      weight: 100,
      wingspan: 214.5,
      brith: '2000-4-16',
      age: 20,
    }, {
      playerId: 'cba2020004',
      teamId: 'cba2020014',
      name: '陈明贵',
      number: 7,
      position: 'SG',
      height: 201.4,
      weight: 100,
      wingspan: 214.5,
      brith: '2000-4-16',
      age: 20,
    },
    {
      playerId: 'cba2020008',
      teamId: 'cba2020014',
      name: '陈明贵',
      number: 7,
      position: 'SG',
      height: 201.4,
      weight: 100,
      wingspan: 214.5,
      brith: '2000-4-16',
      age: 20,
    },
    {
      playerId: 'cba2020014',
      teamId: 'cba2020014',
      name: '陈明贵',
      number: 7,
      position: 'SG',
      height: 201.4,
      weight: 100,
      wingspan: 214.5,
      brith: '2000-4-16',
      age: 20,
    },
    {
      playerId: 'cba2020006',
      teamId: 'cba2020001',
      name: '陈明',
      number: 7,
      position: 'SG',
      height: 201.4,
      weight: 100,
      wingspan: 214.5,
      brith: '2000-4-16',
      age: 20,
    },
    {
      playerId: 'cba2020007',
      teamId: 'cba2020011',
      name: '陈明贵',
      number: 7,
      position: 'SG',
      height: 201.4,
      weight: 100,
      wingspan: 214.5,
      brith: '2000-4-16',
      age: 20,
    },
    {
      playerId: 'cba2020018',
      teamId: 'cba2020018',
      name: '陈明贵',
      number: 7,
      position: 'SG',
      height: 201.4,
      weight: 100,
      wingspan: 214.5,
      brith: '2000-4-16',
      age: 20,
    },
  ]
  return table
}

export function validComparePlayerList() {
  const data = [{
      teamName: '开拓者',
      teamId: 'cba2020005',
      data: [{
          playerId: 'cba2020001',
          playerName: '程明福',
        },
        {
          playerId: 'cba2020005',
          playerName: '程明',
        },
        {
          playerId: 'cba2020006',
          playerName: '程dsd',
        },
        {
          playerId: 'cba2020007',
          playerName: '程明按时',
        },
      ]
    },
    {
      teamName: '马刺',
      teamId: 'cba2020005',
      data: [{
          playerId: 'cba2020011',
          playerName: '程明福',
        },
        {
          playerId: 'cba2020005',
          playerName: '程明',
        },
        {
          playerId: 'cba2020006',
          playerName: '程dsd',
        },
        {
          playerId: 'cba2020007',
          playerName: '程明按时',
        },
      ]
    },
    {
      teamName: '掘金',
      teamId: 'cba2020005',
      data: [{
          playerId: 'cba2020017',
          playerName: '程明福',
        },
        {
          playerId: 'cba2020005',
          playerName: '程明',
        },
        {
          playerId: 'cba2020006',
          playerName: '程dsd',
        },
        {
          playerId: 'cba2020007',
          playerName: '程明按时',
        },
      ]
    },
  ]
  return data
}
export function validUserList() {
  const userList = {
    count: 50,
    data: [{
        userName: '测试',
        userId: '',
        email: 'mfpinkk@nuaa.edu.cn',
        type: 1,
        team: {
          teamId: 'cba2020007',
          name: '开拓者'
        }
      },
      {
        userName: '测试',
        userId: '',
        email: 'mfpinkk@nuaa.edu.cn',
        type: 0,
        team: {
          teamId: '',
          name: ''
        }
      },
      {
        userName: '测试',
        userId: '',
        email: 'mfpinkk@nuaa.edu.cn',
        type: 0,
        team: {
          teamId: '',
          name: ''
        }
      },
      {
        userName: '测试',
        userId: '',
        email: 'mfpinkk@nuaa.edu.cn',
        type: 1,
        team: {
          teamId: 'cba2020004',
          name: '开拓者'
        }
      },
      {
        userName: '测试',
        email: 'mfpinkk@nuaa.edu.cn',
        type: 0,
        team: {
          teamId: '',
          name: ''
        }
      },
      {
        userName: '测试',
        email: 'mfpinkk@nuaa.edu.cn',
        type: 1,
        team: {
          teamId: 'cba2020001',
          name: '开拓者'
        }
      },
      {
        userName: '测试',
        email: 'mfpinkk@nuaa.edu.cn',
        type: 0,
        team: {
          teamId: '',
          name: ''
        }
      },
    ]
  }
  return userList
}
export function validMatchList() {
  const matchData = validMatchData()
  const match = {
    count: 500,
    data: [{
        match: {
          season: '2020-2021',
          matchId: 'dsds',
          date: '2020-8-15 14:00',
          home: {
            teamId: 'cba2020001',
            name: '开拓者',
          },
          away: {
            teamId: 'cba2020014',
            name: '掘金',
          },
          homeScore: 125,
          awayScore: 114,
          status: 1
        },
        homeData: matchData,
        awayData: matchData
      },
      {

        match: {
          season: '2020-2021',
          matchId: 'dsds',
          date: '2020-8-15 14:00',
          home: {
            teamId: 'cba2020001',
            name: '开拓者',
          },
          away: {
            teamId: 'cba2020007',
            name: '掘金',
          },
          homeScore: 125,
          awayScore: 114,
          status: 0
        },
        homeData: matchData,
        awayData: matchData
      },
      {
        match: {
          season: '2020-2021',
          matchId: 'dsds',
          date: '2020-8-15 14:00',
          home: {
            teamId: 'cba2020008',
            name: '开拓者',
          },
          away: {
            teamId: 'cba2020004',
            name: '掘金',
          },
          homeScore: 125,
          awayScore: 114,
          status: 1
        },
        homeData: matchData,
        awayData: matchData
      },
      {
        match: {
          season: '2020-2021',
          matchId: 'dsds',
          date: '2020-8-15 14:00',
          home: {
            teamId: 'cba2020011',
            name: '掘金',
          },
          away: {
            teamId: 'cba2020004',
            name: '湖人',
          },
          homeScore: 125,
          awayScore: 114,
          status: 0
        },
        homeData: matchData,
        awayData: matchData
      },
      {
        match: {
          season: '2020-2021',
          matchId: 'dsds',
          date: '2020-8-15 14:00',
          home: {
            teamId: 'cba2020001',
            name: '开拓者',
          },
          away: {
            teamId: 'cba2020004',
            name: '掘金',
          },
          homeScore: 125,
          awayScore: 114,
          status: 0
        },
        homeData: '',
        awayData: ''
      },
    ]
  }
  return match
}
export function validMatchData() {
  const match = [{
      playerId: 'cas',
      name: '库qwq里',
      number: 15,
      score: 12,
      bound: 4,
      assist: 8,
      turnover: 3,
      block: 1,
      foul: 2,
      time: 32,
      steal: 2,
      free: 3,

    },
    {
      playerId: 'fdfdf',
      name: '库里fddwe3',
      number: 15,
      score: 15,
      bound: 4,
      assist: 8,
      turnover: 3,
      block: 1,
      foul: 2,
      time: 32,
      steal: 2,
      free: 3,

    },
    {
      playerId: 'cgfgas',
      name: '利拉德',
      number: 15,
      score: 15,
      bound: 4,
      assist: 8,
      turnover: 3,
      block: 1,
      foul: 2,
      time: 32,
      steal: 2,
      free: 3,

    },
    {
      playerId: 'casfdf',
      name: '库里dfd发对方水电费斯蒂芬',
      number: 15,
      score: 15,
      bound: 4,
      assist: 8,
      turnover: 3,
      block: 1,
      foul: 2,
      time: 32,
      steal: 2,
      free: 3,

    },
  ]
  return match
}
