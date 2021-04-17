<template>
  <el-container class="home-container">
    <el-aside :style= "{'width' : (fullSideBar ? '210px':'64px')}">
      <!-- 侧边栏 -->
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409eff"
        unique-opened
        :collapse = "!fullSideBar"
        :collapse-transition = "false"
        :router="true"
      >
        <!-- 一级菜单 -->
        <el-submenu :index="item.id + ''" v-for="(item, i) in menuList" :key="item.id">
          <template slot="title">
            <i :class="menuIcons[i]"></i>
            <span>{{item.authName}}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id">
            <i class="el-icon-menu"></i>
            {{subItem.authName}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 右侧 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <i :class="fullSideBar === true? 'iconfont icon-cebianlan' : 'iconfont icon-cebianlan-you'" @click="triggleSideBar"></i>
        <div class="right-header">
          <i :class=" fullScreen ? 'iconfont icon-tuichuquanping' : 'iconfont icon-fullScreen'" @click="triggleFullScreen"></i>
          <el-button type="info" @click="logout">退出</el-button>
        </div>
      </el-header>
      <!-- 主体区域 -->
      <el-main>
        <!-- 放一个路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入全屏的插件
import screenfull from 'screenfull'

export default {
  name: "Home",
  data() {
    return {
      menuList: [],
      menuIcons: [
        'iconfont icon-yonghuguanli',
        'iconfont icon-quanxianguanli',
        'iconfont icon-shangpinguanli',
        "iconfont icon-logooo_huabanfuben",
        'iconfont icon-shujutongji'
      ],
      // 侧边栏全部展示
      fullSideBar: true,
      // 全屏
      fullScreen: false,
    };
  },
  methods: {
    logout() {
      // 清除 sessionStorage 中的数据
      window.sessionStorage.clear();
      // 强制跳转到 登录页面
      this.$router.push("/login");
    },
    async getMenuList(){
      const {data: res} = await this.$http.get('/menus')
      console.log(res);
      this.menuList = res.data;
    },
    triggleSideBar(){
      this.fullSideBar = !this.fullSideBar;
    },
    triggleFullScreen() {
      // 不懂为什么加了判断条件 就会说不支持全屏
      // if (!screenfull.enabled) { // 如果不允许进入全屏，发出不允许提示
      //   this.$message({
      //     message: '不支持全屏',
      //     type: 'warning'
      //   })
      //   return false
      // }
      screenfull.toggle();
      this.fullScreen = !this.fullScreen
    }
  },
  created(){
    this.getMenuList()
  }
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
el-aside {
  background-color: rgb(48, 65, 86);
  color: rgb(191, 203, 217);
  // padding: 0 20px;
}
.el-menu {
  border-right: 0;
  i {
    color: rgb(191, 203, 217);
  }
  span {
    margin-left: 15px;
  }
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px !important;
  padding: 0;
}
.right-header {
  display: flex;
  align-items: center;
  .icon-fullScreen {
    font-weight: 700;
  }
  .iconfont {
    font-size: 20px;
    margin-right: 15px;
    color: #5a5e65;
    cursor: pointer;
  }
  .el-button {
    height: 35px;
    margin-right: 20px;
    padding: 9px 15px;
    background-color: #409eff;
    color: #fff;
    border: none;
    cursor: pointer;
  }
}
.icon-cebianlan, .icon-cebianlan-you {
  padding: 0 15px;
  cursor: pointer;
  color: #5a5e65;
}
.el-main {
  background-color: #f0f2f5;
  padding: 32px;
}
.el-menu-item {
  background-color: #1f2d3d
}
</style>