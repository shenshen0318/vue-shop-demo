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
          <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
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
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delUser(scope.row.id)"></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <!-- 设置按钮 -->
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
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

    <!-- 添加用户弹出框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="50%"
      @close="dialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户弹出框 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @closed="editDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser(editForm.id)">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色的弹出框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoledialogVisible"
      width="50%"
      @close="setRoledialogClosed">
      <div>
        <p>当前的用户：{{userInfo.username}}</p>
        <p>当前的角色：{{userInfo.role_name}}</p>
        <p>分配新角色：
           <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoledialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'User',
  data(){
    // 自定义校验规则
    // 验证邮箱
    var checkEmail = (rule, value, callback)=>{
      const regEmail = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
      if(regEmail.test(value)){
        // 合法的邮箱
        return callback();
      }
      callback(new Error('请输入合法的邮箱'))
    }
    // 验证手机号
    var checkMobile = (rule, value, callback)=>{
      const regMobile = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if(regMobile.test(value)){
        // 合法的邮箱
        return callback();
      }
      callback(new Error('请输入合法的手机号'))
    }

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
      // 添加用户对话框的显示与隐藏
      dialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 表单验证规则
      addFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名的长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码的长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur' },
           { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 编辑用户弹出框
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          {required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 控制角色分配弹出框的显示与隐藏
      setRoledialogVisible: false,
      // 需要被分配角色的用户信息
      userInfo: {},
      // 所有角色的数据列表
      roleList: [],
      // 已选中的角色ID值
      selectedRoleId: ''
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
    },
    // 添加用户的对话框关闭事件
    dialogClosed(){
      this.$refs.addFormRef.resetFields();
    },
    // 点击按钮 添加新用户
    addUser(){
      this.$refs.addFormRef.validate(async (valid)=> {
        // console.log(valid);
        // 预验证失败 直接返回
        if(!valid) return;
        // 验证成功，发起添加用户的网络请求
        let {data: res} = await this.$http.post('users', this.addForm)
        if(res.meta.status !== 201){
          this.$message.error('添加用户失败');
        }
        this.$message.success('添加用户成功');
        this.dialogVisible = false;
        // 重新获取用户列表数据
        this.getUserList();
      })
    },
    // 显示编辑用户的弹出框
    async showEditDialog(id){
      this.editDialogVisible = true;
      const {data : res} = await this.$http.get('users/' + id);
      // console.log(res);
      if(res.meta.status !== 200){
        return this.$message.error('查询用户列表失败');
      }
      this.editForm = res.data;
    },
    // 关闭编辑用户弹出框时重置
    editDialogClosed(){
      this.$refs.editFormRef.resetFields();
    },
    // 点击按钮修改用户
    editUser(id){
      this.$refs.editFormRef.validate(async (valid)=> {
        // console.log(valid);
        // 预验证失败 直接返回
        if(!valid) return;
        // 验证成功，发起添加用户的网络请求
        let {data: res} = await this.$http.put('users/' + id, {email: this.editForm.email, mobile: this.editForm.mobile})
        if(res.meta.status !== 200){
          this.$message.error('编辑用户失败');
        }
        this.$message.success('编辑用户成功');
        this.editDialogVisible = false;
        // 重新获取用户列表数据
        this.getUserList();
      })
    },
    // 点击删除用户
    async delUser(id){
      // console.log(id);
      // 删除用户提示框 如果点击的是取消按钮 是会抛出一个错误信息， 要用 catch 接收
      const delRes = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(()=>{
        this.$message.info("已取消删除")
      })
      if(delRes !== 'confirm') return;
      // 发送 delete 请求
      const {data:res} = await this.$http.delete("users/" + id);
      console.log(res);
      if(res.meta.status !== 200){
        this.$message.error('删除用户失败');
      }
      this.$message.success('删除用户成功');
      // 重新获取用户列表数据
      this.getUserList();
    },
    // 分配角色
    async setRole(userInfo) {
      this.userInfo = userInfo;
      // 在展示对话框之前，获取所有角色的列表
      const {data:res} = await this.$http.get('roles');
      if(res.meta.status !== 200){
        return this.$message.error('获取角色列表失败！');
      }
      this.roleList = res.data;
      this.setRoledialogVisible = true;
    },
    // 点击按钮 分配角色
    async saveRoleInfo(){
      if(!this.selectedRoleId){
        this.$message.error('请选择要分配的角色')
      }
      const {data:res} = await this.$http.put(`users/${this.userInfo.id}/role`, {rid: this.selectedRoleId});
      if(res.meta.status !== 200){
        return this.$message.error('更新角色失败！')
      }
      this.$message.success('更新角色成功！')
      this.getUserList();
      this.setRoledialogVisible = false
    },
    // 监听分配角色弹出框的关闭事件
    setRoledialogClosed(){
      this.selectedRoleId = '';
      this.userInfo = {}
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>