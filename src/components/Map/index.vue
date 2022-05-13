<template>
  <div class="map-box">
    <div class="map-header">
      <div style="margin-right: 10px">
        <el-input v-model="longitude" placeholder="当前经度" />
      </div>
      <div style="margin-right: 10px">
        <el-input v-model="latitude" placeholder="当前纬度" />
      </div>
      <div>
        <el-input v-model="keyWords" placeholder="请输入地址">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="setPlace"
          ></el-button>
        </el-input>
      </div>
    </div>
    <div id="map" class="mapbox"></div>
    <!-- <div class="topbox"></div>-->
  </div>
</template>

<script>
  export default {
    //     props: {
    //   positionNow: {
    //     type: Function,
    //     default: () => {
    //       return ''
    //     },
    //   },
    // },
    data() {
      return {
        map: null,
        local: null,
        mk: null,
        latitude: '',
        longitude: '',
        keyWords: '',
      }
    },
    mounted() {
      this.initMap()
    },
    methods: {
      initMap() {
        this.map = new BMap.Map('map')
        let point = new BMap.Point(116.404, 39.915)
        this.map.centerAndZoom(point, 12)
        this.map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
        this.map.addControl(new BMap.NavigationControl())
      },
      // 点击定位-定位到当前位置
      fixedPos() {
        const _this = this
        const geolocation = new BMap.Geolocation()
        this.confirmLoading = true
        geolocation.getCurrentPosition(function (r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            _this.handleMarker(_this, r.point)
            let myGeo = new BMap.Geocoder()
            myGeo.getLocation(
              new BMap.Point(r.point.lng, r.point.lat),
              function (result) {
                _this.confirmLoading = false
                if (result) {
                  _this.latitude = result.point.lat
                  _this.longitude = result.point.lng
                }
              }
            )
          } else {
            _this.$message.error('failed' + this.getStatus())
          }
        })
      },
      //定位
      setPosition(data1, data2) {
        this.$nextTick(() => {
          this.map = new BMap.Map('map')
          let point = new BMap.Point(data1.lat, data1.lng)
          this.map.centerAndZoom(point, 24)
          this.handleMarker(this, point)
        })
      },
      // 搜索地址
      setPlace() {
        this.local = new BMap.LocalSearch(this.map, {
          onSearchComplete: this.searchPlace,
        })
        this.local.search(this.keyWords)
      },
      searchPlace() {
        if (this.local.getResults() != undefined) {
          this.map.clearOverlays() //清除地图上所有覆盖物
          if (this.local.getResults().getPoi(0)) {
            let point = this.local.getResults().getPoi(0).point
            console.log(point) //获取第一个智能搜索的结果
            this.map.centerAndZoom(point, 18)
            this.handleMarker(this, point)
            this.latitude = point.lat
            this.longitude = point.lng
          } else {
            this.$message.error('未匹配到地点!')
          }
        } else {
          this.$message.error('未找到搜索结果!')
        }
      },
      // 设置标注
      handleMarker(obj, point) {
        obj = this
        obj.mk = new BMap.Marker(point)
        obj.map.addOverlay(obj.mk)
        // obj.mk.enableDragging() // 可拖拽
        // obj.mk.addEventListener('dragend', function (e) {
        //   // 监听标注的拖拽，获取拖拽后的经纬度
        //   this.latitude = point.lat
        //   this.longitude = point.lng
        // })
        obj.map.panTo(point)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .map-box {
    width: 100%;
    height: 80%;
    margin: 1vh 0;
    touch-action: none;
  }
  .mapbox {
    // height: calc(50vh - 90px);
    height: 100% !important;
    touch-action: none;
  }
  .map-header {
    display: flex;
    margin-bottom: 10px;
  }
  .topbox {
    width: 100%;
    z-index: 999999;
    height: 100% !important;
    background: #000;
    position: fixed;
  }
</style>
