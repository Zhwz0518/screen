<template>
  <div class="srceenmain">
    <div class="topbox">
      <div class="toptitle">{{ title }}</div>
    </div>
    <div class="mainbox">
      <div class="menu">
        <div
          v-for="(item, index) in menu"
          :key="index"
          :class="item.id == nowId ? 'menu1' : 'menu2'"
          @click="changeMenu(item)"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="allbox">
        <div class="left">
          <div class="fumigation">
            <div class="title">
              <img :src="fumigationTitle" alt="" />
            </div>
            <div class="contentbox">
              <div class="lbox">
                <div class="nums">
                  <div>货物名称</div>
                  <div>{{ fumigation.goodsName }}</div>
                </div>
                <div class="nums">
                  <div>投药名称</div>
                  <div>{{ fumigation.disName }}</div>
                </div>
                <div class="nums">
                  <div>处理日期</div>
                  <div>{{ fumigation.doDate }}</div>
                </div>
                <div class="nums">
                  <div>投药温度(℃)</div>
                  <div>{{ fumigation.disTemp }}</div>
                </div>
                <div class="nums">
                  <div>排放浓度(g/m³)</div>
                  <div>{{ fumigation.empCct }}</div>
                </div>
              </div>
              <div class="mbox"></div>
              <div class="rbox">
                <div class="nums">
                  <div>处理状态</div>
                  <div>{{ fumigation.doState }}</div>
                </div>
                <div class="nums">
                  <div>实际投药重量(g)</div>
                  <div>{{ fumigation.disWgt }}</div>
                </div>
                <div class="nums">
                  <div>投药时间</div>
                  <div>{{ fumigation.disStTime }}</div>
                </div>
                <div class="nums">
                  <div>投药浓度(g/m³)</div>
                  <div>{{ fumigation.disCct }}</div>
                </div>
                <div class="nums">
                  <div>熏蒸库状态</div>
                  <div>
                    <div>{{ fumigation.teamState }}</div>
                    <!--  <el-switch
                    v-model="fumigation.teamState"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#2f90ed"
                    inactive-color="#666"
                  ></el-switch>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="x-ray">
            <div class="borderbox">
              <div class="title">
                <!-- <img :src="xrayTitle" alt="" />-->
                <div
                  v-for="(item, index) in menu"
                  :key="index"
                  :class="item.id == nowId ? 'menu1' : 'menu2'"
                  @click="changeMenu(item)"
                >
                  <span>{{ item.title }}</span>
                </div>
              </div>
            </div>

            <div class="contentbox">
              <!-- <img :src="xray.img" alt="" />-->
              <el-carousel
                v-show="xrayImgsGroup.length"
                height="310px"
                :interval="10000"
                arrow="hover"
                indicator-position="none"
              >
                <el-carousel-item
                  v-for="(item, index) in xrayImgsGroup"
                  :key="index"
                >
                  <img
                    v-for="(it, i) in item"
                    :key="i"
                    :src="it.fileUrl"
                    alt=""
                    @click="checkXImg(it)"
                  />
                </el-carousel-item>
              </el-carousel>
              <div v-show="!xrayImgsGroup.length" class="nonedata">
                暂无数据
              </div>
            </div>
          </div>
        </div>
        <div class="middle">
          <div class="borderbox">
            <div class="title">
              <img :src="droneTitle" alt="" />
            </div>
          </div>

          <div class="contentbox">
            <div class="map">
              <img :src="map" alt="" />
            </div>
            <div class="monitor">
              <el-carousel
                height="420px"
                :interval="10000"
                arrow="hover"
                indicator-position="none"
              >
                <el-carousel-item
                  v-for="(item, index) in droneImgsGroup"
                  :key="index"
                >
                  <div v-for="(it, i) in item" :key="i" class="monitorbox">
                    <div class="toptitle">
                      <div class="circle">
                        <img :src="circle" alt="" />
                      </div>
                      <div class="titles">
                        {{ '无人机监控' + it.id + '号机' }}
                      </div>
                      <div class="lines"><img :src="line" alt="" /></div>
                      <!-- <div class="circle">
                      <img :src="it.titleimg" alt="" />
                    </div>-->
                    </div>
                    <div class="circleimg">
                      <img :src="it.img" alt="" />
                    </div>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="borderbox">
            <div class="title">
              <img :src="sprayTitle" alt="" />
            </div>
          </div>

          <div class="contentbox">
            <div class="right1">
              <div class="statistics">
                <div class="littletitle">
                  <img :src="statisticsTitle" alt="" />
                </div>

                <div class="statisticscontent">
                  <div class="huan">
                    <div class="border border1">
                      <div id="chart-panel1"></div>
                    </div>

                    <p class="p1">通行总数量</p>
                  </div>
                  <div class="huan">
                    <div class="border border2">
                      <div id="chart-panel2"></div>
                    </div>

                    <p class="p2">告警总数量</p>
                  </div>
                </div>
              </div>
              <div class="countRate">
                <div class="littletitle">
                  <img :src="countRateTitle" alt="" />
                </div>
                <div class="piebox">
                  <div class="pei">
                    <div class="border border1">
                      <div id="container1"></div>
                    </div>

                    <p>伽马</p>
                  </div>
                  <div class="pei">
                    <div class="border border2">
                      <div id="container2"></div>
                    </div>
                    <p>中子</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="right2">
              <div class="littletitle">
                <img :src="passRecordTitle" alt="" />
              </div>
              <div class="white"></div>
              <div class="right2content">
                <div class="tabletitle">
                  <div class="titles titles0">记录编号</div>
                  <div class="titles titles2">进入时间</div>
                  <div class="titles titles2">离开时间</div>
                  <div class="titles titles1">总时间</div>
                </div>
                <div class="tablecontent">
                  <el-carousel
                    v-show="passRecordGroup.length"
                    height="162px"
                    direction="vertical"
                    :interval="5000"
                    indicator-position="none"
                  >
                    <el-carousel-item
                      v-for="(item, index) in passRecordGroup"
                      :key="index"
                    >
                      <div v-for="(it, i) in item" :key="i" class="numcontent">
                        <div class="titles0">{{ it.passRecordId }}</div>
                        <div class="titles2">{{ it.passTimeIn }}</div>
                        <div class="titles2">{{ it.passTimeOut }}</div>
                        <div class="titles1" style="color: #facc14">
                          {{ it.passTimeUse }}
                        </div>
                      </div>
                    </el-carousel-item>
                  </el-carousel>
                  <div v-show="!passRecordGroup.length" class="nonedata">
                    暂无数据
                  </div>
                </div>
              </div>
            </div>
            <div class="right3">
              <div class="littletitle">
                <img :src="graphTitle" alt="" />
              </div>
              <div class="linebox">
                <div v-show="lines.length" id="container3"></div>
                <div v-show="!lines.length" class="nonedata">暂无数据</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="XImgVisible"
      width="30%"
      top="10vh"
      class="ImgDialog"
    >
      <img :src="nowXImg" alt="" />
    </el-dialog>
  </div>
</template>

<script>
  import { Liquid } from '@antv/g2plot'
  import { Area } from '@antv/g2plot'
  import { Line } from '@antv/g2plot'
  import { getRight, getXZK, getX } from '@/api/screen'
  export default {
    data() {
      return {
        title: '综合查验监管平台',
        fumigationTitle: require('@/assets/screen/fumigationTitle.png'),
        xrayTitle: require('@/assets/screen/x-rayTitle.png'),
        droneTitle: require('@/assets/screen/drone.png'),
        sprayTitle: require('@/assets/screen/spray.png'),
        nowId: 1,
        menu: [
          { id: 1, title: 'X光机检测' },
          { id: 2, title: 'C T 机' },
        ],
        fumigation: {
          eamState: '无数据',
          goodsName: '无数据',
          doDate: '无数据',
          doState: '无数据',
          disName: '无数据',
          disStTime: '无数据',
          disStTime2: '无数据',
          disWgt: '无数据',
          disTemp: '无数据',
          disCct: '无数据',
          empCct: '无数据',
          teamState: '无数据',
        },
        xray: {
          img: require('@/assets/screen/xrays.png'),
        },
        xrayImgs: [
          {
            fileUrl: require('@/assets/screen/xrays1.png'),
          },
        ],
        xrayImgsGroup: [],
        map: require('@/assets/screen/map.png'),

        circle: require('@/assets/screen/circle.png'),
        line: require('@/assets/screen/line.png'),
        droneImgsGroup: [],
        drone: [
          {
            id: 1,
            titleimg: require('@/assets/screen/dronetitle1.png'),
            img: require('@/assets/screen/drone1.png'),
          },
          {
            id: 2,
            titleimg: require('@/assets/screen/dronetitle2.png'),
            img: require('@/assets/screen/drone2.png'),
          },
          {
            id: 3,
            titleimg: require('@/assets/screen/dronetitle3.png'),
            img: require('@/assets/screen/drone3.png'),
          },
          {
            id: 4,
            titleimg: require('@/assets/screen/dronetitle3.png'),
            img: require('@/assets/screen/drone3.png'),
          },
          {
            id: 5,
            titleimg: require('@/assets/screen/dronetitle2.png'),
            img: require('@/assets/screen/drone2.png'),
          },
          {
            id: 6,
            titleimg: require('@/assets/screen/dronetitle1.png'),
            img: require('@/assets/screen/drone1.png'),
          },
          {
            id: 7,
            titleimg: require('@/assets/screen/dronetitle1.png'),
            img: require('@/assets/screen/drone1.png'),
          },
          {
            id: 8,
            titleimg: require('@/assets/screen/dronetitle3.png'),
            img: require('@/assets/screen/drone3.png'),
          },
          {
            id: 9,
            titleimg: require('@/assets/screen/dronetitle2.png'),
            img: require('@/assets/screen/drone2.png'),
          },
          {
            id: 10,
            titleimg: require('@/assets/screen/dronetitle1.png'),
            img: require('@/assets/screen/drone1.png'),
          },
          {
            id: 11,
            titleimg: require('@/assets/screen/dronetitle1.png'),
            img: require('@/assets/screen/drone1.png'),
          },
        ],
        statisticsTitle: require('@/assets/screen/statistics.png'),
        countRateTitle: require('@/assets/screen/countRate.png'),
        passRecordTitle: require('@/assets/screen/passRecord.png'),
        graphTitle: require('@/assets/screen/graph.png'),
        pei1: 4633,
        pei2: 4747,
        pass: [0, 0, 0],
        Gamma: [0, 0, 0],
        Neutron: [0, 0, 0],
        speeding: [0, 0, 0],
        passRecordGroup: [],
        passRecord: [],
        lines: [
          // {
          //   type: 'a',
          //   x: 0,
          //   y: 100,
          // },
          // {
          //   type: 'b',
          //   x: 0,
          //   y: 50,
          // },
          // {
          //   type: 'a',
          //   x: 1,
          //   y: 200,
          // },
          // {
          //   type: 'b',
          //   x: 1,
          //   y: 100,
          // },
          // {
          //   type: 'a',
          //   x: 2,
          //   y: 400,
          // },
          // {
          //   type: 'b',
          //   x: 2,
          //   y: 200,
          // },
          // {
          //   type: 'a',
          //   x: 3,
          //   y: 600,
          // },
          // {
          //   type: 'b',
          //   x: 3,
          //   y: 300,
          // },
        ],
        passCounts: null,
        alarmCounts: 0,
        lastNeutionCountingRate: null,
        lastGammaCountingRate: null,
        timer: null,
        XImgVisible: false,
        nowXImg: undefined,
      }
    },
    mounted() {
      this.droneImgsGroup = []
      this.droneImgsGroup = this.againXRayGroup(this.drone, 3)
      this.getLeft()
      // this.getLeftX()
      this.xrayImgs = this.xrayImgs.slice(0, 3)
      this.xrayImgsGroup = this.againXRayGroup(this.xrayImgs, 3)
      // this.getRights()
      this.passCounts = 0
      this.alarmCounts = 0
      this.lastNeutionCountingRate = 0
      this.lastGammaCountingRate = 0
      this.passRecord = []
      this.$nextTick(() => {
        this.init1()
        this.init2()
        this.init3()
        this.init4()
        this.init5()
      })
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    methods: {
      changeMenu(item) {
        console.log(1)
        this.nowId = item.id
      },
      againXRayGroup(data, num) {
        var result = []
        for (var i = 0, len = data.length; i < len; i += num) {
          result.push(data.slice(i, i + num))
        }
        return result
      },
      getLeft() {
        getXZK().then((res) => {
          if (res.code == 200) {
            this.fumigation = res.data
          } else {
          }
        })
      },
      getLeftX() {
        this.xrayImgsGroup = []
        getX({
          pageNum: 1,
          pageSize: 10,
        }).then((res) => {
          if (res.code == 200) {
            this.xrayImgs = res.data.records
            this.xrayImgs = this.xrayImgs.slice(0, 3)
            this.xrayImgsGroup = this.againXRayGroup(this.xrayImgs, 3)
          } else {
          }
        })
      },
      getRights() {
        getRight().then((res) => {
          if (res.code == 200) {
            const data = res.data
            this.passCounts = data.passCounts
            this.alarmCounts = data.alarmCounts
            this.lastNeutionCountingRate = data.lastNeutionCountingRate
            this.lastGammaCountingRate = data.lastGammaCountingRate
            this.passRecordGroup = []
            this.passRecord = data.records
            this.passRecord = this.passRecord.slice(0, 3)
            this.passRecordGroup = this.againXRayGroup(this.passRecord, 3)
            if (data.diagramData) {
              data.diagramData.forEach((item, index) => {
                const a = {
                  type: 'a',
                  x: index,
                  y: item.gammaCountingRate,
                }
                const b = {
                  type: 'b',
                  x: index,
                  y: item.neutionCountingRate,
                }
                this.lines.push(a)
                this.lines.push(b)
              })
            }
            this.$nextTick(() => {
              this.init1()
              this.init2()
              this.init3()
              this.init4()
              this.init5()
            })
          } else {
            this.passCounts = 0
            this.alarmCounts = 0
            this.lastNeutionCountingRate = 0
            this.lastGammaCountingRate = 0
            this.passRecord = []
            this.$nextTick(() => {
              this.init1()
              this.init2()
              this.init3()
              this.init4()
              this.init5()
            })
          }
        })
      },
      init1() {
        var lastGammaCountingRate = this.lastGammaCountingRate
          ? this.lastGammaCountingRate.toString()
          : '0'
        const liquidPlot = new Liquid('container1', {
          percent: 0.55,
          statistic: {
            title: {
              formatter: () => lastGammaCountingRate,
              style: { fontSize: 34, color: '#fff' },
              offsetY: 40,
            },
            content: '',
          },
          outline: {
            border: 0,
          },
          wave: {
            length: 98,
          },
          liquidStyle: {
            stroke: '#0fc7d6',
            fill: 'l(210) 0.5:#4e76d7 1:#0fc7d6',
          },
        })
        liquidPlot.render()
      },
      init2() {
        var lastNeutionCountingRate = this.lastNeutionCountingRate
          ? this.lastNeutionCountingRate.toString()
          : '0'
        const liquidPlot = new Liquid('container2', {
          percent: 0.55,
          statistic: {
            title: {
              formatter: () => lastNeutionCountingRate,
              style: { fontSize: 34, color: '#fff' },
              offsetY: 40,
            },
            content: '',
          },
          outline: {
            border: 0,
          },
          liquidStyle: {
            stroke: '#df8924',
            fill: 'l(210)  0.5:#bf9657 1:#df8924',
          },
          wave: {
            length: 98,
          },
        })

        liquidPlot.render()
      },
      init3() {
        const data = this.lines
        const area = new Area('container3', {
          data,
          xField: 'x',
          yField: 'y',
          seriesField: 'type',
          yAxis: {
            grid: {
              line: {
                style: { stroke: '#ccc', lineWidth: 0.5, lineDash: [4, 5] },
              },
            },
            label: {
              style: {
                fontSize: 21,
                fontFamily: 'Adobe Heiti Std',
                fill: '#fff',
              },
            },
          },
          // slider: {
          //   start: 0,
          //   end: 1,
          //   textStyle: {
          //     fontSize: 21,
          //     fontFamily: 'Adobe Heiti Std',
          //     fill: '#fff',
          //   },
          // },
          color: [
            'l(270) 0:rgba(229, 181, 91, 0.31) 1:rgba(229, 181, 91, 1)',
            'l(270) 0:rgba(15, 199, 214, 0.31) 1:rgba(15, 199, 214, 1)',
          ],
          xAxis: {
            range: [0, 1],
            line: { style: { stroke: 'transparent' } },

            label: {
              style: {
                fontSize: 21,
                fontFamily: 'Adobe Heiti Std',
                fill: '#fff',
              },
            },
          },
          isStack: false,
          smooth: true,
          line: {
            color: ['#df8924', '#0fc7d6'],
          },
          tooltip: {
            showContent: false,
          },
          legend: false,
        })
        area.render()
        setInterval(() => {
          this.lines = [
            {
              type: 'a',
              x: 0,
              y: 200,
            },
            {
              type: 'b',
              x: 0,
              y: 50,
            },
          ]
          area.changeData(this.lines)
        }, 5000)
      },
      init4() {
        var echarts = require('echarts') //引入echarts
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart-panel1'))
        var passCounts = this.passCounts
        let angle = 0 //角度，用来做简单的动画效果的
        let value = 50
        let option = {
          backgroundColor: 'transparent',
          title: {
            text: '{a|' + passCounts + ' ' + '}{c|辆}',
            x: 'center',
            y: 'center',
            textStyle: {
              rich: {
                a: {
                  fontSize: 36,
                  color: '#29EEF3',
                },

                c: {
                  fontSize: 26,
                  color: '#ffffff',
                },
              },
            },
          },

          series: [
            {
              name: 'ring5',
              type: 'custom',
              coordinateSystem: 'none',
              renderItem: function (params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                    startAngle: ((0 + angle) * Math.PI) / 180,
                    endAngle: ((90 + angle) * Math.PI) / 180,
                  },
                  style: {
                    stroke: '#0CD3DB',
                    fill: 'transparent',
                    lineWidth: 1.5,
                  },
                  silent: true,
                }
              },
              data: [0],
            },
            {
              name: 'ring5',
              type: 'custom',
              coordinateSystem: 'none',
              renderItem: function (params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                    startAngle: ((180 + angle) * Math.PI) / 180,
                    endAngle: ((270 + angle) * Math.PI) / 180,
                  },
                  style: {
                    stroke: '#0CD3DB',
                    fill: 'transparent',
                    lineWidth: 1.5,
                  },
                  silent: true,
                }
              },
              data: [0],
            },
            {
              name: 'ring5',
              type: 'custom',
              coordinateSystem: 'none',
              renderItem: function (params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                    startAngle: ((270 + -angle) * Math.PI) / 180,
                    endAngle: ((40 + -angle) * Math.PI) / 180,
                  },
                  style: {
                    stroke: '#0CD3DB',
                    fill: 'transparent',
                    lineWidth: 1.5,
                  },
                  silent: true,
                }
              },
              data: [0],
            },
            {
              name: 'ring5',
              type: 'custom',
              coordinateSystem: 'none',
              renderItem: function (params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                    startAngle: ((90 + -angle) * Math.PI) / 180,
                    endAngle: ((220 + -angle) * Math.PI) / 180,
                  },
                  style: {
                    stroke: '#0CD3DB',
                    fill: 'transparent',
                    lineWidth: 1.5,
                  },
                  silent: true,
                }
              },
              data: [0],
            },
            {
              name: 'ring5',
              type: 'custom',
              coordinateSystem: 'none',
              renderItem: function (params, api) {
                let x0 = api.getWidth() / 2
                let y0 = api.getHeight() / 2
                let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65
                let point = getCirlPoint(x0, y0, r, 90 + -angle)
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4,
                  },
                  style: {
                    stroke: '#0CD3DB', //粉
                    fill: '#0CD3DB',
                  },
                  silent: true,
                }
              },
              data: [0],
            },
            {
              name: 'ring5', //绿点
              type: 'custom',
              coordinateSystem: 'none',
              renderItem: function (params, api) {
                let x0 = api.getWidth() / 2
                let y0 = api.getHeight() / 2
                let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65
                let point = getCirlPoint(x0, y0, r, 270 + -angle)
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4,
                  },
                  style: {
                    stroke: '#0CD3DB', //绿
                    fill: '#0CD3DB',
                  },
                  silent: true,
                }
              },
              data: [0],
            },
            {
              name: '',
              type: 'pie',
              radius: ['58%', '45%'],
              silent: true,
              clockwise: true,
              startAngle: 90,
              z: 0,
              zlevel: 0,
              label: {
                normal: {
                  position: 'center',
                },
              },
              data: [
                {
                  value: value,
                  name: '',
                  itemStyle: {
                    normal: {
                      color: {
                        // 完成的圆环的颜色
                        colorStops: [
                          {
                            offset: 0,
                            color: '#4FADFD', // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: '#28E8FA', // 100% 处的颜色
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  value: 100 - value,
                  name: '',
                  label: {
                    normal: {
                      show: false,
                    },
                  },
                  itemStyle: {
                    normal: {
                      color: '#173164',
                    },
                  },
                },
              ],
            },

            {
              name: '',
              type: 'gauge',
              radius: '58%',
              center: ['50%', '50%'],
              startAngle: 0,
              endAngle: 359.9,
              splitNumber: 8,
              hoverAnimation: true,
              axisTick: {
                show: false,
              },
              splitLine: {
                length: 60,
                lineStyle: {
                  width: 5,
                  color: '#061740',
                },
              },
              axisLabel: {
                show: false,
              },
              pointer: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  opacity: 0,
                },
              },
              detail: {
                show: false,
              },
              data: [
                {
                  value: 0,
                  name: '',
                },
              ],
            },
          ],
        }

        //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
        function getCirlPoint(x0, y0, r, angle) {
          let x1 = x0 + r * Math.cos((angle * Math.PI) / 180)
          let y1 = y0 + r * Math.sin((angle * Math.PI) / 180)
          return {
            x: x1,
            y: y1,
          }
        }

        function draw() {
          angle = angle + 3
          myChart.setOption(option, true)
          //window.requestAnimationFrame(draw);
        }

        setInterval(function () {
          //用setInterval做动画感觉有问题
          draw()
        }, 100)

        if (option) {
          myChart.setOption(option)
        }
      },
      init5() {
        var echarts = require('echarts') //引入echarts
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart-panel2'))
        var alarmCounts = this.alarmCounts
        let angle = 0 //角度，用来做简单的动画效果的
        let value = 50
        let option = {
          backgroundColor: 'transparent',
          title: {
            text: '{a|' + alarmCounts + ' ' + '}{c|条}',
            x: 'center',
            y: 'center',
            textStyle: {
              rich: {
                a: {
                  fontSize: 36,
                  color: '#df8924',
                },

                c: {
                  fontSize: 26,
                  color: '#ffffff',
                  // padding: [5,0]
                },
              },
            },
          },

          series: [
            {
              name: 'ring5',
              type: 'custom',
              coordinateSystem: 'none',
              renderItem: function (params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                    startAngle: ((0 + angle) * Math.PI) / 180,
                    endAngle: ((90 + angle) * Math.PI) / 180,
                  },
                  style: {
                    stroke: '#df8924',
                    fill: 'transparent',
                    lineWidth: 1.5,
                  },
                  silent: true,
                }
              },
              data: [0],
            },
            {
              name: 'ring5',
              type: 'custom',
              coordinateSystem: 'none',
              renderItem: function (params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                    startAngle: ((180 + angle) * Math.PI) / 180,
                    endAngle: ((270 + angle) * Math.PI) / 180,
                  },
                  style: {
                    stroke: '#df8924',
                    fill: 'transparent',
                    lineWidth: 1.5,
                  },
                  silent: true,
                }
              },
              data: [0],
            },
            {
              name: 'ring5',
              type: 'custom',
              coordinateSystem: 'none',
              renderItem: function (params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                    startAngle: ((270 + -angle) * Math.PI) / 180,
                    endAngle: ((40 + -angle) * Math.PI) / 180,
                  },
                  style: {
                    stroke: '#df8924',
                    fill: 'transparent',
                    lineWidth: 1.5,
                  },
                  silent: true,
                }
              },
              data: [0],
            },
            {
              name: 'ring5',
              type: 'custom',
              coordinateSystem: 'none',
              renderItem: function (params, api) {
                return {
                  type: 'arc',
                  shape: {
                    cx: api.getWidth() / 2,
                    cy: api.getHeight() / 2,
                    r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                    startAngle: ((90 + -angle) * Math.PI) / 180,
                    endAngle: ((220 + -angle) * Math.PI) / 180,
                  },
                  style: {
                    stroke: '#df8924',
                    fill: 'transparent',
                    lineWidth: 1.5,
                  },
                  silent: true,
                }
              },
              data: [0],
            },
            {
              name: 'ring5',
              type: 'custom',
              coordinateSystem: 'none',
              renderItem: function (params, api) {
                let x0 = api.getWidth() / 2
                let y0 = api.getHeight() / 2
                let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65
                let point = getCirlPoint(x0, y0, r, 90 + -angle)
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4,
                  },
                  style: {
                    stroke: '#df8924', //粉
                    fill: '#df8924',
                  },
                  silent: true,
                }
              },
              data: [0],
            },
            {
              name: 'ring5', //绿点
              type: 'custom',
              coordinateSystem: 'none',
              renderItem: function (params, api) {
                let x0 = api.getWidth() / 2
                let y0 = api.getHeight() / 2
                let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65
                let point = getCirlPoint(x0, y0, r, 270 + -angle)
                return {
                  type: 'circle',
                  shape: {
                    cx: point.x,
                    cy: point.y,
                    r: 4,
                  },
                  style: {
                    stroke: '#df8924', //绿
                    fill: '#df8924',
                  },
                  silent: true,
                }
              },
              data: [0],
            },
            {
              name: '',
              type: 'pie',
              radius: ['58%', '45%'],
              silent: true,
              clockwise: true,
              startAngle: 90,
              z: 0,
              zlevel: 0,
              label: {
                normal: {
                  position: 'center',
                },
              },
              data: [
                {
                  value: value,
                  name: '',
                  itemStyle: {
                    normal: {
                      color: {
                        // 完成的圆环的颜色
                        colorStops: [
                          {
                            offset: 0,
                            color: '#bf9657', // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: '#df8924', // 100% 处的颜色
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  value: 100 - value,
                  name: '',
                  label: {
                    normal: {
                      show: false,
                    },
                  },
                  itemStyle: {
                    normal: {
                      color: '#474f38',
                    },
                  },
                },
              ],
            },

            {
              name: '',
              type: 'gauge',
              radius: '58%',
              center: ['50%', '50%'],
              startAngle: 0,
              endAngle: 359.9,
              splitNumber: 8,
              hoverAnimation: true,
              axisTick: {
                show: false,
              },
              splitLine: {
                length: 60,
                lineStyle: {
                  width: 5,
                  color: '#091f3b',
                },
              },
              axisLabel: {
                show: false,
              },
              pointer: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  opacity: 0,
                },
              },
              detail: {
                show: false,
              },
              data: [
                {
                  value: 0,
                  name: '',
                },
              ],
            },
          ],
        }

        //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
        function getCirlPoint(x0, y0, r, angle) {
          let x1 = x0 + r * Math.cos((angle * Math.PI) / 180)
          let y1 = y0 + r * Math.sin((angle * Math.PI) / 180)
          return {
            x: x1,
            y: y1,
          }
        }

        function draw() {
          angle = angle + 3
          myChart.setOption(option, true)
          //window.requestAnimationFrame(draw);
        }

        setInterval(function () {
          //用setInterval做动画感觉有问题
          draw()
        }, 100)

        if (option) {
          myChart.setOption(option)
        }
      },
      checkXImg(it) {
        this.XImgVisible = true
        this.nowXImg = it.fileUrl
      },
    },
  }
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }
  ::v-deep {
    .ImgDialog {
      .el-dialog__body {
        padding: 0;
      }

      .el-dialog__header {
        display: none;
      }
      img {
        width: 100%;
      }
    }
  }

  .srceenmain {
    overflow: hidden;
    position: relative;
    width: 100vw;
    height: 100vh;
    background: url('~@/assets/screen/backgroundall.png') center center
      no-repeat;
    background-size: 100% 100%;
    padding-top: 8px;
  }
  .topbox {
    width: 100vw;
    height: 202px;
    // background: url('~@/assets/screen/111.png') center center no-repeat;
    background-size: 100% 100%;
    padding-top: 28px;
    padding-bottom: 101px;
    padding-left: 1462px;
    .toptitle {
      // width: 668px;
      height: 80px;
      font-size: 75px;
      font-family: MiSans;
      font-weight: 800;
      letter-spacing: 20px;
      color: #eff8fc;
      line-height: 75px;
      opacity: 0.89;
      color: transparent;
      background: linear-gradient(
        0deg,
        rgba(119, 186, 255, 1) 0%,
        rgba(233, 248, 255, 1) 73.3154296875%,
        rgba(255, 255, 255, 1) 100%
      );
      -webkit-background-clip: text;
    }
  }
  .mainbox {
    width: 100%;
    height: 1141px;
    // padding-left: 45px;
    position: relative;
    // padding-right: 40px;
  }
  .menu {
    position: absolute;
    border-right: 1px solid #63a0f5;
    width: 95px;
    height: 1250px;
    top: -70px;
    margin-right: 20px;
    text-align: center;
    .menu1 {
      cursor: pointer;
      width: 100%;
      background: #0f3362;
      color: #fff;
      font-size: 33px;
      padding: 20px 31px;
      border-bottom: 1px solid #fff;
    }
    .menu2 {
      cursor: pointer;
      width: 100%;
      color: #fff;
      padding: 10px 31px;
      padding: 20px 31px;
      font-size: 33px;
      border-bottom: 1px solid #fff;
      &:hover {
        background: #0f3362;
      }
    }
  }
  .allbox {
    width: calc(100vw - 115px);
    height: 1141px;
    display: flex;
    margin-left: 115px;
  }
  .left {
    // width: 1005px;
    width: 955px;
    margin-right: 29px;
    margin-left: 30px;
  }
  .middle {
    // width: 1435.9px;
    width: 1405.9px;
    height: 1114px;
    background: url('~@/assets/screen/fumigation.png') center center no-repeat;
    background-size: 100% 100%;
    margin-right: 29px;
    overflow: hidden;
    padding-top: 9px;
    .borderbox {
      // width: 1360px;
      width: 1330px;
      height: 61px;
      background: url('~@/assets/screen/border.png') center center no-repeat;
      background-size: 100% 100%;
      margin-left: 61px;
    }
    .title {
      width: 1700px;
      height: 50px;
      padding-left: 24px;
      padding-top: 9px;
      background: linear-gradient(
        to right,
        rgba(32, 173, 244, 0.2),
        transparent
      );
    }
    .line {
      height: 1px;
      width: 90%;
      background: rgba(32, 173, 244, 0.4);
      margin-top: 9px;
      margin-left: 42px;
    }
    .contentbox {
      width: 100%;
      height: 1023px;
      padding: 28px 44px 32px 49px;
      .map {
        width: 1343px;
        height: 573px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .monitor {
        height: 420px;
        width: 100%;
        display: flex;
        .monitorbox {
          width: 33.3%;
          height: 100%;
        }
        .el-carousel--horizontal {
          width: 100%;
        }
        .el-carousel__item {
          width: 100%;
          display: flex;
          .monitorbox:nth-child(1) {
            padding-right: 19px;
          }
          .monitorbox:nth-child(2) {
            padding: 0 19px;
          }
          .monitorbox:nth-child(3) {
            padding-left: 19px;
          }
        }
        .toptitle {
          width: 90%;
          overflow: hidden;
          display: flex;
          height: 100px;
          line-height: 100px;
          flex-wrap: nowrap;
          .circle {
            width: 30px;
            margin-right: 5px;
          }
          .titles {
            width: 70%;
            font-size: 33px;
            font-family: Adobe Heiti Std;
            font-weight: bold;
            color: #ffffff;
            line-height: 85px;
          }
          .lines {
            width: calc(30% - 30px);
            line-height: 80px;
          }
        }
      }
    }
  }
  .right {
    width: 952px;
    height: 1114px;
    background: url('~@/assets/screen/fumigation.png') center center no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    padding-top: 4px;
    padding-bottom: 21px;
    .borderbox {
      width: 890px;
      height: 61px;
      background: url('~@/assets/screen/border.png') center center no-repeat;
      background-size: 100% 100%;
      margin-left: 51px;
    }
    .title {
      width: 832px;
      height: 49px;
      padding-left: 10px;
      padding-top: 9px;
      background: linear-gradient(
        to right,
        rgba(32, 173, 244, 0.2),
        transparent
      );
    }
    .line {
      height: 1px;
      width: 90%;
      background: rgba(32, 173, 244, 0.4);
      margin-top: 9px;
      margin-left: 42px;
    }
    .contentbox {
      width: 100%;
      height: 1050px;
      padding-left: 49px;
      padding-right: 31px;
      .littletitle {
        height: 30px;
      }
      .right1 {
        height: 343px;
        padding-top: 40px;
        display: flex;
        .statistics,
        .countRate {
          width: 50%;
          height: 100%;
        }
        .tablebox {
          width: 100%;
          height: 50px;
          display: flex;
          .tablelefts {
            width: 54px;
            // height: 24px;
            font-size: 25px;
            font-family: Adobe Heiti Std;
            font-weight: normal;
            color: #c5d6ff;
          }
          .tablenums {
            width: 117px;
            height: 100%;
            font-size: 20px;
            font-family: Adobe Heiti Std;
            font-weight: normal;
            color: #c5d6ff;
            text-align: center;
          }
        }
        .white {
          position: relative;
          // border-top: 1px solid #fff;
          width: 80%;
          height: 1px;
          background: url('~@/assets/screen/white.png') center center no-repeat;
          margin-top: 20px;
        }

        .white:before {
          content: '';
          position: absolute;
          left: 0;
          top: -1px;
          width: 3%;
          height: 1px;
          background-color: #fff;
        }
        .statisticscontent {
          width: 100%;
          height: 270px;
          display: flex;
          position: relative;
          .huan {
            width: 50%;
            height: 270px;
            text-align: center;
            .border {
              margin: 0 auto;
              width: 270px;
              height: 270px;
            }
            #chart-panel1 {
              position: absolute;
              left: -20px;
            }
            #chart-panel2 {
              position: absolute;
              left: 200px;
            }
            #chart-panel1,
            #chart-panel2 {
              width: 270px;
              height: 270px;
            }
            p {
              position: absolute;
              bottom: -40px;
              font-size: 30px;
              font-family: Adobe Heiti Std;
              font-weight: normal;
              color: #fff;
              line-height: 19px;
            }
            .p1 {
              left: 35px;
            }
            .p2 {
              right: 35px;
            }
          }
        }
        .piebox {
          display: flex;
          height: 270px;
          .pei {
            width: 50%;
            text-align: center;
            height: 100%;
            p {
              font-size: 30px;
              font-family: Adobe Heiti Std;
              font-weight: normal;
              color: #fff;
              // line-height: 30px;
            }
          }
          .border {
            margin: 0 auto;
            margin-top: 50px;
            border-radius: 50%;
            width: 170px;
            height: 170px;
          }
          .border1 {
            border: 2px solid #0fc7d6;
          }
          .border2 {
            border: 2px solid #df8924;
          }
          #container1,
          #container2 {
            width: 165px;
            height: 165px;
          }
        }
      }
      .right2 {
        height: 296px;
        padding-top: 40px;
        .white {
          position: relative;
          // border-top: 1px solid #fff;
          width: 40%;
          height: 1px;
          background: url('~@/assets/screen/white.png') center center no-repeat;
          margin-top: 20px;
        }

        .white:before {
          content: '';
          position: absolute;
          left: 0;
          top: -1px;
          width: 3%;
          height: 1px;
          background-color: #fff;
        }
        .right2content {
          position: relative;
          padding-top: 14px;
          height: 228px;
          width: 100%;
          background: rgba(31, 59, 104, 0.04);
          border: 1px solid rgba(47, 92, 160, 0.27);
          box-shadow: 47px 54px 59px 0px rgba(0, 0, 0, 0.04);
          .tabletitle {
            height: 26px;
            display: flex;
            .titles {
              font-size: 28px;
              font-family: Adobe Heiti Std;
              font-weight: normal;
              color: #63a0f5;
              text-align: center;
            }
            .titles0 {
              text-align: left;
            }
            .titles1,
            .titles0 {
              width: 20%;
            }
            .titles2 {
              width: 30%;
            }
          }
          .tablecontent {
            height: 162px;
            width: 100%;
            overflow: auto;
            margin-top: 10px;
            .numcontent {
              height: 54px;
              line-height: 54px;
              font-size: 22px;
              font-family: Adobe Heiti Std;
              font-weight: normal;
              color: #c5d6ff;
              display: flex;
              text-align: center;
              .titles0 {
                text-align: left;
              }
              .titles1,
              .titles0 {
                width: 20%;
              }
              .titles2 {
                width: 30%;
              }
            }
            .nonedata {
              color: #63a0f5;
              font-size: 33px;
              font-family: Adobe Heiti Std;
              font-weight: normal;
              text-align: center;
              padding-top: 50px;
            }
          }
          .tablecontent::-webkit-scrollbar {
            display: none;
          }
        }
        .right2content:before {
          content: '';
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 3%;
          height: 1px;
          background-color: #fff;
        }
      }
      .right3 {
        height: 400px;
        padding-top: 40px;
        .linebox {
          width: 100%;
          height: 350px;
          padding-bottom: 20px;
          padding-top: 40px;
          // border: 1px solid #fff;
          #container3 {
            width: 100%;
            height: 100%;
          }
          .nonedata {
            color: #63a0f5;
            font-size: 33px;
            font-family: Adobe Heiti Std;
            font-weight: normal;
            text-align: center;
            padding-top: 70px;
          }
        }
      }
    }
  }
  .fumigation {
    // width: 1005px;
    width: 955px;
    height: 621px;
    background: url('~@/assets/screen/fumigation.png') center center no-repeat;
    background-size: 100% 100%;
    padding-top: 19px;
    margin-bottom: 28px;
    .title {
      background: url('~@/assets/screen/border.png') center center no-repeat;
      background-size: 100% 100%;
      margin-left: 50px;
      margin-right: 9px;
      width: 906px;
      height: 41px;
      // border-bottom: 1px solid rgba(32, 173, 244, 0.4);
    }
    .contentbox {
      height: 552px;
      width: 100%;
      display: flex;
      padding: 44px 47px;
      color: #fff;
      font-size: 33px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      .lbox {
        width: 48%;
        height: 100%;
      }
      .mbox {
        width: 4%;
        height: 100%;
      }
      .rbox {
        width: 48%;
        height: 100%;
      }
      .nums {
        display: flex;
        height: 20%;
        justify-content: space-between;
      }
    }
  }
  ::v-deep {
    .el-switch {
      width: 79px;
      height: 43px;
    }
    .el-switch__core {
      width: 79px !important;
      height: 43px;
      border-radius: 30px;
    }
    .el-switch__core::after {
      width: 43px;
      height: 43px;
      margin-top: -1px;
    }
    .el-switch.is-checked .el-switch__core::after {
      margin-left: -30px;
    }
  }
  .x-ray {
    // width: 1005px;
    width: 955px;
    height: 465px;
    background: url('~@/assets/screen/fumigation.png') center center no-repeat;
    background-size: 100% 100%;
    padding-top: 11px;
    overflow: hidden;
    .borderbox {
      background: url('~@/assets/screen/border.png') center center no-repeat;
      background-size: 100% 100%;
      width: 913px;
      height: 65px;
      margin-left: 42px;
    }
    .title {
      width: 1212px;
      height: 56px;
      // padding-left: 20px;
      // padding-top: 18px;
      display: flex;
      // background: linear-gradient(
      //   to right,
      //   rgba(32, 173, 244, 0.2),
      //   transparent
      // );
      .menu1 {
        font-size: 33px;
        font-family: Adobe Heiti Std;
        font-weight: bold;
        background: linear-gradient(#558df9, #0c61da) !important;
        -webkit-text-fill-color: transparent;
        margin-right: 50px;
        padding: 10px;
        border-radius: 5px;
        span {
          background: linear-gradient(
            0deg,
            rgba(44, 178, 245) 0%,
            rgba(123, 212, 250) 50%,
            rgba(188, 240, 254) 100%
          );
          -webkit-background-clip: text;
        }
      }
      .menu2 {
        border-radius: 5px;
        font-size: 33px;
        font-family: Adobe Heiti Std;
        font-weight: bold;

        -webkit-text-fill-color: transparent;
        border: 1px solid #0f5075;
        margin-right: 50px;
        padding: 10px;
        span {
          background: linear-gradient(
            0deg,
            rgba(44, 178, 245) 0%,
            rgba(123, 212, 250) 50%,
            rgba(188, 240, 254) 100%
          );
          -webkit-background-clip: text;
        }
      }
    }
    .line {
      height: 1px;
      width: 90%;
      background: rgba(32, 173, 244, 0.4);
      margin-top: 9px;
      margin-left: 42px;
    }
    .contentbox {
      width: 100%;
      height: 310px;
      margin-top: 46px;
      padding: 0 20px;
      .el-carousel__item {
        color: #fff;
        font-size: 22px;
        img:nth-child(2) {
          margin: 0 17px;
        }
      }

      img {
        width: 310px;
        height: 100%;
      }
      .nonedata {
        color: #63a0f5;
        font-size: 33px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        text-align: center;
        padding-top: 80px;
      }
    }
  }
  ::v-deep {
    .el-carousel__arrow {
      height: 70px;
      font-size: 30px;
      top: 60%;
      background-color: rgba(31, 45, 61, 0.41);
      width: 70px;
    }
  }
</style>
