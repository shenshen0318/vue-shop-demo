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
        <el-card>
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
        <el-card>
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
        <el-card>
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

    </el-row>

    <!-- 图表区 -->
    <el-row>

    </el-row>

    <!-- 表格区 -->
    <el-row>

    </el-row>

  </div>
</template>

<script>
import countTo from 'vue-count-to';

export default {
  name: 'Welcome',
  // 引用组件
  components: { countTo },
  data(){
    return {
      hover: false,
      hover1: false,
      hover2: false,
      hover3: false,
    }
  }
}
</script>

<style lang="postcss" scoped>
.icon-wrap, .icon-wrap-hover, .icon-wrap-hover1, .icon-wrap-hover2, .icon-wrap-hover3, .des-wrap {
  display: inline-block;
}

.icon-wrap {
  height: 80px;
  width: 80px;
  text-align: center;
  margin-right: 40px;
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
</style>