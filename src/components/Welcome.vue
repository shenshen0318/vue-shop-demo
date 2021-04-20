<template>
  <div>
    <!-- card-panel 区域 -->
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6">
        <el-card class="card-panel">
          <div :class="!hover ? 'icon-wrap' : 'icon-wrap-hover'">
            <i class="iconfont icon-yonghuguanli" @mouseover="hover = true" @mouseleave="hover = false"></i>
          </div>
          <div class="des-wrap">
            <span class="card-panel-text">New Visits</span>
            <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num"></count-to> 
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <el-card class="card-panel">
          <div :class="!hover1 ? 'icon-wrap' : 'icon-wrap-hover1'">
            <i class="iconfont icon-xiaoxi" @mouseover="hover1 = true" @mouseleave="hover1 = false"></i>
          </div>
          <div class="des-wrap">
            <span class="card-panel-text">Messages</span>
            <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num"></count-to>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <el-card class="card-panel">
          <div :class="!hover2 ? 'icon-wrap' : 'icon-wrap-hover2'">
            <i class="iconfont icon-qian" @mouseover="hover2 = true" @mouseleave="hover2 = false"></i>
          </div>
          <div class="des-wrap">
            <span class="card-panel-text">Purchases</span>
            <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num"></count-to>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <el-card class="card-panel">
          <div :class="!hover3 ? 'icon-wrap' : 'icon-wrap-hover3'">
            <i class="iconfont icon-gouwuche" @mouseover="hover3 = true" @mouseleave="hover3 = false"></i>
          </div>
          <div class="des-wrap">
            <span class="card-panel-text">Shoppings</span>
            <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num"></count-to>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 曲线图表区 -->
    <el-row>
      <el-card class="plot-wrap">
        <div id="container"></div>
      </el-card>
    </el-row>

    <!-- 图表区 -->
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="chart-wrap">
          <div id="piechart"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="chart-wrap">
          <div id="barchart"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="chart-wrap">
          <div id="radarchart"></div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 表格区 -->
    <el-row :gutter="8" class="footer-wrap">
      <!-- 交易表格 -->
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <el-card>
          <!-- 交易表格区 -->
          <el-table
            :data="transactionData"
            style="width: 100%">
            <el-table-column
              prop="no"
              label="交易订单号"
              min-width="200">
            </el-table-column>
            
            <el-table-column prop="price" label="价格" width="195" align="center"></el-table-column>

            <el-table-column label="状态" width="100" align="center">
              <template slot-scope="scope">
                <el-button v-show="scope.row.status" plain :type="scope.row.status | statusFilter" size="small">{{scope.row.status}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      
      <!-- tidolist -->
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <el-card>
          <span>todo-list</span>
          留个坑 这个实现起来比较麻烦...
        </el-card>
      </el-col>

      <!-- 卡片展示 -->
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <el-card>
          <!-- 卡片头部图片 -->
          <div slot="header" class="box-card-header">
            <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
          </div>

          <!-- 卡片body区 -->
          <div style="position:relative">
            <pan-thumb image="data:image/jpeg;base64,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" class="panThumb" />
            <mallki class-name="mallki-text" text="vue-shop-demo" />
            <div class="progress-item" style="padding-top:35px">
              <span>Vue</span>
              <el-progress :percentage="70"></el-progress>
            </div>
            <div class="progress-item">
              <span>JavaScript</span>
              <el-progress :percentage="18"></el-progress>
            </div>
            <div class="progress-item">
              <span>CSS</span>
              <el-progress :percentage="12"></el-progress>
            </div>
            <div class="progress-item">
              <span>ESLint</span>
              <el-progress :percentage="100" status="success"></el-progress>
            </div>
          </div>
          
          
          
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import countTo from 'vue-count-to';
import { Line, Pie, Column, Radar } from '@antv/g2plot';
import PanThumb from './PanThumb/index';
import Mallki from './TextHoverEffect/Mallki';


export default {
  name: 'Welcome',
  // 引用组件
  components: { 
    countTo,
    Line,
    Pie,
    Column,
    Radar,
    PanThumb,
    Mallki
  },
  // 自定义过滤器
  filters: {
    statusFilter(status){
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    }
  },
  data(){
    return {
      hover: false,
      hover1: false,
      hover2: false,
      hover3: false,
      // 交易数据
      transactionData: [
        {no: 'd5a8F7d0-3ff5-9fB4-f4FE-4EBcc8', price: '¥6,070.8', status: 'success'},
        {no: 'cCBEFD8E-86A0-ED58-EAdf-E8cA92', price: '¥8,115', status: 'success'},
        {no: 'ca702381-aD99-4F17-Cf12-039aFD', price: '¥4,748.55', status: 'success'},
        {no: 'E4FFdfc8-ed06-cAef-AeF9-cA768F', price: '¥2,907.8', status: 'pending'},
        {no: 'CC21f2f8-dAe0-7d6d-18DD-4eE8eD', price: '¥2,469.46', status: 'success'},
        {no: '6e1679DF-Ccf4-ae69-1E48-5Ab577', price: '¥14,980.9', status: 'success'},
        {no: '9AFdC25f-c7B0-E8eB-fAaf-820Dee', price: '¥6,070.8', status: 'pending'},
        {no: '2f01F4b1-59FE-727b-9219-06d4Ff', price: '¥2,225.04', status: 'pending'}
      ]
    }
  },
  methods: {
    // 折线图
    getLine(){
      const data = [
        { week: 'Mon', value: 200, type: 'expected' },
        { week: 'Tue', value: 192, type: 'expected' },
        { week: 'Wed', value: 120, type: 'expected' },
        { week: 'Thu', value: 144, type: 'expected' },
        { week: 'Fri', value: 160, type: 'expected' },
        { week: 'Sat', value: 130, type: 'expected' },
        { week: 'Sun', value: 140, type: 'expected' },
        { week: 'Mon', value: 180, type: 'actual' },
        { week: 'Tue', value: 160, type: 'actual' },
        { week: 'Wed', value: 151, type: 'actual' },
        { week: 'Thu', value: 106, type: 'actual' },
        { week: 'Fri', value: 145, type: 'actual' },
        { week: 'Sat', value: 150, type: 'actual' },
        { week: 'Sun', value: 130, type: 'actual' },
      ];
      
      const line = new Line('container', {
        data,
        xField: 'week',
        yField: 'value',
        seriesField: 'type',
        smooth: true,
        height: 300,
        color: ['#ff015b', '#3888fa'],
      });

      line.render();
    },
    // 饼图
    getPie(){
      const data = [
        { type: '分类一', value: 27 },
        { type: '分类二', value: 25 },
        { type: '分类三', value: 18 },
        { type: '分类四', value: 15 },
        { type: '分类五', value: 10 },
        { type: '其他', value: 5 },
      ];

      const piePlot = new Pie('piechart', {
        // appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        height: 260,
        label: {
          type: 'outer',
          content: '{name} {percentage}',
        },
        interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
      });

      piePlot.render();

    },
    // 柱状图
    getBar(){
      const data = [
        {
          "year": "1991",
          "value": 3,
          "type": "Lon"
        },
        {
          "year": "1992",
          "value": 4,
          "type": "Lon"
        },
        {
          "year": "1993",
          "value": 3.5,
          "type": "Lon"
        },
        {
          "year": "1994",
          "value": 5,
          "type": "Lon"
        },
        {
          "year": "1995",
          "value": 4.9,
          "type": "Lon"
        },
        {
          "year": "1996",
          "value": 6,
          "type": "Lon"
        },
        {
          "year": "1997",
          "value": 7,
          "type": "Lon"
        },
        {
          "year": "1998",
          "value": 9,
          "type": "Lon"
        },
        {
          "year": "1999",
          "value": 13,
          "type": "Lon"
        },
        {
          "year": "1991",
          "value": 3,
          "type": "Bor"
        },
        {
          "year": "1992",
          "value": 4,
          "type": "Bor"
        },
        {
          "year": "1993",
          "value": 3.5,
          "type": "Bor"
        },
        {
          "year": "1994",
          "value": 5,
          "type": "Bor"
        },
        {
          "year": "1995",
          "value": 4.9,
          "type": "Bor"
        },
        {
          "year": "1996",
          "value": 6,
          "type": "Bor"
        },
        {
          "year": "1997",
          "value": 7,
          "type": "Bor"
        },
        {
          "year": "1998",
          "value": 9,
          "type": "Bor"
        },
        {
          "year": "1999",
          "value": 13,
          "type": "Bor"
        }
      ];
      const stackedColumnPlot = new Column('barchart', {
        data,
        isStack: true,
        xField: 'year',
        yField: 'value',
        seriesField: 'type',
        height: 270,
        label: {
          // 可手动配置 label 数据标签位置
          position: 'middle', // 'top', 'bottom', 'middle'
        },
        interactions: [{ type: 'active-region', enable: false }],
        columnBackground: {
          style: {
            fill: 'rgba(0,0,0,0.1)',
          },
        },
      });

      stackedColumnPlot.render();
    },
    // 雷达图
    getRadar(){
      const data = [
        { name: 'G2', star: 10371 },
        { name: 'G6', star: 7380 },
        { name: 'F2', star: 7414 },
        { name: 'L7', star: 2140 },
        { name: 'X6', star: 660 },
        { name: 'AVA', star: 885 },
        { name: 'G2Plot', star: 1626 },
      ];
      const radarPlot = new Radar('radarchart', {
        data: data.map((d) => ({ ...d, star: Math.sqrt(d.star) })),
        xField: 'name',
        yField: 'star',
        height: 260,
        meta: {
          star: {
            alias: 'star 数量',
            min: 0,
            nice: true,
            formatter: (v) => Number(v).toFixed(2),
          },
        },
        xAxis: {
          tickLine: null,
        },
        yAxis: {
          label: false,
          grid: {
            alternateColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
        // 开启辅助点
        point: {
          size: 2,
        },
        area: {},
      });
      radarPlot.render();
    }
  },
  mounted() {
    this.getLine();
    this.getPie();
    this.getBar();
    this.getRadar();
  }
}
</script>

<style lang="less" scoped>
.icon-wrap, .icon-wrap-hover, .icon-wrap-hover1, .icon-wrap-hover2, .icon-wrap-hover3, .des-wrap {
  display: inline-block;
}

.icon-wrap {
  height: 80px;
  width: 80px;
  text-align: center;
  margin-right: 40px;
}
.card-panel{
  margin-bottom: 15px;
}
.iconfont {
  font-size: 50px;
  line-height: 80px;
}
.icon-yonghuguanli{
  color: #40c9c6;
}
.icon-yonghuguanli:hover {
  color: #fff;
}
.icon-wrap-hover {
  height: 80px;
  width: 80px;
  text-align: center;
  margin-right: 40px;
  border-radius: 5px;
  background-color: #40c9c6;
}
.icon-xiaoxi {
  color: #36a3f7;
}
.icon-xiaoxi:hover {
  color: #fff;
}
.icon-wrap-hover1 {
  height: 80px;
  width: 80px;
  text-align: center;
  margin-right: 40px;
  border-radius: 5px;
  background-color: #36a3f7;
}
.icon-qian {
  color: #f4516c;
}
.icon-qian:hover {
  color: #fff;
}
.icon-wrap-hover2 {
  height: 80px;
  width: 80px;
  text-align: center;
  margin-right: 40px;
  border-radius: 5px;
  background-color: #f4516c;
}
.icon-gouwuche {
  color: #34bfa3;
}
.icon-gouwuche:hover {
  color: #fff;
}
.icon-wrap-hover3 {
  height: 80px;
  width: 80px;
  text-align: center;
  margin-right: 40px;
  border-radius: 5px;
  background-color: #34bfa3;
}
.card-panel-text {
  line-height: 18px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  display: block;
  margin: 12px 0;
  font-weight: 700;
}
.card-panel-num {
  font-size: 20px;
  display: block;
  color: #666;
  font-weight: 700;
}
.plot-wrap {
  margin-bottom: 15px;
  height: 350px;
}
.chart-wrap {
  margin-bottom: 15px;
  height: 300px;
}
.footer-wrap {
  margin-bottom: 15px;
}
.status .el-button .el-button--default {
  width: 66px;
  height: 28px;
}
.box-card-header {
  position: relative;
  height: 220px;
  img {
    width: 100%;
    height: 100%;
    transition: all 0.2s linear;
    &:hover {
      transform: scale(1.1, 1.1);
      filter: contrast(130%);
    }
  }
}

.progress-item {
  margin-bottom: 10px;
  font-size: 16px;
}
.panThumb {
  height: 70px !important;
  width: 70px !important;
  position: absolute;
  top: -45px;
  z-index: 999;
  border: 5px solid #fff;
  background-color: #fff;
  box-shadow: none !important;
  ::v-deep .pan-info {
    box-shadow: none!important;
  }
}
.mallki-text{
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 20px;
  font-weight: bold;
}
</style>