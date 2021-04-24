<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加角色按钮区 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="dialogVisible=true">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row  :class="['bdbottom', 'vcenter', i1 === 0 ? 'bdtop' : '']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
              <!-- 一级权限 -->
              <el-col :span="5" >
                <el-tag closable @close="removeTagById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
               <!-- 二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过 for 循环嵌套渲染二级权限 -->
                <el-row :class="[i2 !== 0 ? 'bdtop' : '', 'vcenter']" v-for="(item2, i2) in item1.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeTagById(scope.row,item2.id)">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag type="warning" v-for="(item3, i3) in item2.children" :key="item3.id" closable @close="removeTagById(scope.row,item3.id)">
                      {{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- <pre>
              {{scope.row}}
            </pre> -->
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="350">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="delRole(scope.row.id)">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加新角色弹窗 -->
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
      width="50%"
      @close="dialogClosed()">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑角色弹窗 -->
    <el-dialog
      title="编辑角色"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed()">
      <!-- 内容主体区域 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole(editForm.roleId)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { log } from '@antv/g2plot/lib/utils';
export default {
  name: 'Roles',
  data(){
    return {
      rolesList: [],
      // 新用户弹窗
      dialogVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      addFormRules: {
        roleName: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      },
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        roleName: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    // 获取所有角色列表
    async getRolesList() {
      const {data:res} = await this.$http.get('roles');
      if(res.meta.status !== 200){
        return this.$message.error('获取角色列表失败！');
      }
      this.rolesList = res.data;
      // console.log(this.rolesList);
    },
    // 根据 id 删除 tag 标签
    async removeTagById(role, id){
      // 弹框提示用户是否要删除
      const confimRes = await this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((error) => error)   
      // console.log(role, id);
      if(confimRes !== 'confirm'){
        return this.$message.info('已取消删除'); 
      }
      const {data : res} = await this.$http.delete(`roles/${role.id}/rights/${id}`);
      console.log(res);
      if(res.meta.status !== 200){
        return this.$message.error('删除权限失败！');
      }
      
      // 使用 getRolesList 函数会重新调一遍接口，表格重新渲染一次
      // this.getRolesList();
      
      role.children = res.data;
    },
    // 添加新角色
    addRole(){
      this.$refs.addFormRef.validate(async (valid)=> {
        // console.log(valid);
        // 预验证失败 直接返回
        if(!valid) return;
        // 验证成功，发起添加用户的网络请求
        let {data: res} = await this.$http.post('roles', this.addForm)
        if(res.meta.status !== 201){
          this.$message.error('添加新角色失败！');
        }
        this.$message.success('添加新角色成功！');
        this.dialogVisible = false;
        this.getRolesList();
      })
    },
    // 添加角色的对话框关闭事件
    dialogClosed(){
      this.$refs.addFormRef.resetFields();
    },
    // 删除角色
    async delRole(id){
      const {data : res} = await this.$http.delete(`roles/${id}`);
      if(res.meta.status !== 200){
        this.$message.error('删除角色失败！');
      }
      this.$message.success('删除角色成功！');
      this.getRolesList();
    },
    // 显示编辑的弹出框
    async showEditDialog(id){
      this.editDialogVisible = true;
      const {data : res} = await this.$http.get('roles/' + id);
      // console.log(res);
      if(res.meta.status !== 200){
        return this.$message.error('查询用户列表失败');
      }
      this.editForm = res.data;
      console.log(this.editForm);
    },
    // 编辑角色
    editRole(id){
       this.$refs.editFormRef.validate(async (valid)=> {
        // console.log(valid);
        // 预验证失败 直接返回
        if(!valid) return;
        // console.log(id);
        const {data : res} = await this.$http.put(`roles/${id}`, {roleName : this.editForm.roleName, roleDesc:this.editForm.roleDesc});
        if(res.meta.status !== 200){
          this.$message.error('编辑角色失败！');
        }
        this.$message.success('编辑角色成功！');
        this,this.editDialogVisible = false;
        this.getRolesList();
      });
    },
    // 编辑角色的对话框关闭事件
    editDialogClosed(){
      this.$refs.editFormRef.resetFields();
    }
  },
  created() {
    this.getRolesList();
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>