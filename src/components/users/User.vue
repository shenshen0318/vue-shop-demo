<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区 -->
      <el-table :data="userList" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <!-- 放一个作用域插槽 渲染状态这一列 -->
          <template slot-scope="scope">
            <!-- scope.row 代表这一行的数据 -->
            <!-- 在switch开关中用v-model数据绑定 mg_state 数据 -->
            <el-switch
              v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <!-- 设置按钮 -->
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background>
      </el-pagination>

    </el-card>

  </div>
</template>

<script>
export default {
  name: 'User',
  data(){
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 每页显示的条数
        pagesize: 2
      },
      userList: [],
      total: 0,

    }
  },

  created(){
    this.getUserList();
  },

  methods: {
    // 获取用户列表
    async getUserList(){
      let {data : res} = await this.$http.get('users', { params: this.queryInfo});
      // console.log(res);
      if(res.meta.status !== 200){
        return this.$message.error("获取用户列表失败");
      }
      this.total = res.data.total;
      this.userList = res.data.users;
    },

    // pageSize 改变时会触发
    handleSizeChange(newSize){
      // console.log(newSize);
      this.queryInfo.pagesize = newSize;
      // 发起新的数据请求
      this.getUserList();
    },

    // currentPage 改变时会触发
    handleCurrentChange(newPage){
      // console.log(newPage);
      this.queryInfo.pagenum = newPage;
      // 发起新的数据请求
      this.getUserList();
    },

    // 处理用户状态的改变
    async userStateChanged(userInfo){
      console.log(userInfo);
      const {data : res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`);
      if(res.meta.status !== 200){
        userInfo.mg_state = !userInfo.mg_state;
        return this.$message.error('更新用户状态失败');
      }
      this.$message.success('更新用户状态成功');
    }
    
  }
}
</script>

<style lang="less" scoped>
  
</style>