<template>
  <div>
    <!-- card-panel 区域 -->
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6">
        <el-card class="card-panel">
          <div class="icon-wrap">
            <i class="iconfont icon-yonghuguanli"></i>
          </div>
          <div class="des-wrap">
            <span>New Visits</span>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <el-card>
          <div class="icon-wrap">
            <i class="iconfont icon-yonghuguanli"></i>
          </div>
          <div class="des-wrap">

          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <el-card>
          <div class="icon-wrap">
            <i class="iconfont icon-yonghuguanli"></i>
          </div>
          <div class="des-wrap">
            
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <el-card>
          <div class="icon-wrap">
            <i class="iconfont icon-yonghuguanli"></i>
          </div>
          <div class="des-wrap">

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
export default {
  name: 'Welcome',
}
</script>

<style lang="postcss" scoped>
.icon-wrap, .des-wrap {
  display: inline-block;
}

.icon-wrap {
  /* padding: 9px; */
  height: 80px;
  width: 80px;
  text-align: center;
  margin-right: 40px;
}

.iconfont {
  font-size: 40px;
  line-height: 80px;
}
.icon-yonghuguanli{
  color: #40c9c6;
}
</style>