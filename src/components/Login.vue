<template>
    <!-- 登录组件 -->
    <div class="login-container">
        <!--登录表单-->
        <el-form class="login-form" ref="loginForm" :model="loginForm" :rules="rules">
            <!--登录表单标题-->
            <div class="login-title">
                <h3 class="title">Login Form</h3>
            </div>
            <!--用户名-->
            <el-form-item prop="username">
                <span class="svg-container">
                    <i class="iconfont icon-yonghuming"></i>
                </span>
                <el-input 
                    v-model="loginForm.username"
                    placeholder="Username"  
                    autocomplete="on"
                />
            </el-form-item>
            <!--密码-->
            <el-form-item prop="password">
                <span class="svg-container">
                    <i class="iconfont icon-mima"></i>
                </span>
                <span class="show-pwd" @click="showPwd">
                    <i :class="passwordType === 'password' ? 'iconfont icon-yanjing1' : 'iconfont icon-yanjing'" />
                </span>
                <el-input 
                    v-model="loginForm.password"
                    placeholder="Password"
                    type="password"
                    autocomplete="on"
                />
            </el-form-item>
            <!--登录按钮-->
            <el-button type="primary" style="width:100%;margin-bottom:10px;" @click="login">Login</el-button>
            <el-button type="primary" style="width:100%;margin-bottom:30px; margin-left:0" @click="reset">Reset</el-button>
            <!-- 联系我们 -->
            <div class="footer">
                <div class="tips">
                    <span>Username : admin</span>
                    <span>Password : 123456</span>
                </div>
                <!-- 联系我们 -->
                <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
                    Or connect with
                </el-button>
            </div>
        </el-form>
       
       <!-- 联系我们弹出框 -->
       <el-dialog title="Or connect with" :visible.sync="showDialog">
            Can not be simulated on local, so please combine you own business simulation! ! !
            <br>
            <br>
            <br>
            <div class="social">
                <div class="weixin">
                    <i class="iconfont icon-weixin" @click="contact"></i> 
                    <span>WeChat</span>
                </div>
                <div class="qq">
                    <i class="iconfont icon-QQ" @click="contact"></i> 
                    <span>QQ</span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            // 登录表单的数据绑定对象
            loginForm: {
                username: '',
                password: ''
            },
            // 眼睛图标类型
            passwordType: 'password',
            showDialog: false,
            // 验证规则对象
            rules: {
                username: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        showPwd(){
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
        },
        contact(){
            alert("ok");
        },
        // 重置登录表单
        reset(){
            // console.log(this);
            // this 指向当前组件对象
            this.$refs.loginForm.resetFields();
        },
        // 登录
        login(){
            this.$refs.loginForm.validate(async (valid)=>{
                console.log(valid);
                if(!valid) return;
                // 否则 通过 axios 发起请求 返回的是一个 promise 对象  可以通过 async 和 await 简化
                const result = await this.$http.post('login', this.loginForm);
                console.log(result.data);
                if(result.data.meta.status !== 200) return this.$message.error('登录失败!')
                this.$message.success('登录成功!')
                // 1. 将登录成功之后的 token 保存到客户端的 sessionStorage 中
                //   1.1 项目中除了登录之外的其他 api，必须在登录之后才能访问（原因）
                //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
                window.sessionStorage.setItem('token', result.data.data.token);
                console.log(result.data.data.token);
                // 2. 通过编程式导航跳转到后台主页  /home
                this.$router.push('/home');
            })
        }
    }
}
</script>

<style scoped>
.login-container {
    height: 100%;
    background-color: #2d3a4b;
}

.login-form {
    width: 520px;
    position: relative;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
}
.login-title {
    text-align: center;
    margin-bottom: 40px;
}
.login-title .title {
    font-size: 26px;
    color: #eee;
    font-weight: 700;
}
.svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
}
.show-pwd {
    position: absolute;
    right: 10px;
    display: inline-block;
    padding: 6px 0;
    vertical-align: middle;
    color: #889aa4;
    cursor: pointer;
}

/* reset element-ui css */
.login-form .el-form-item {
    background: rgba(0, 0, 0, .1);
    border: 1px solid rgba(255, 255, 255, .1);
    border-radius: 5px;
    color: #454545;
}
.el-form-item /deep/.el-form-item__content {
    margin-left: 0 !important
}
/deep/.el-input__inner {
    display: inline-block;
    height: 47px;
    border: 0px;
    background: transparent;
    color: #fff;
    padding: 12px 5px 12px 15px;
}
.el-button {
    background-color: #262729;
    border: #262729;
    border-radius: 4px;
}
.el-button:hover, .el-button:focus {
    border: 1px solid #5a5e66;
    background-color: #5a5e66;
}

.footer {
    width: 100%;
    position: relative;
    overflow: hidden;
}
.tips {
    color: #fff;
    margin: 10px 0;
}
.tips span {
    margin-right: 16px;
}
.thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 2px;
}

.social {
    margin: 20px 0;
}
.weixin {
    display: inline-block;
    height: 60px;
}
.qq {
    display: inline-block;
    height: 60px;
    margin-left: 50px;
}
.weixin span, .qq span{
    line-height: 60px;
    margin-left: 10px;
}
.icon-weixin {
    color: #00c186;
    font-size: 40px;
    margin-right: 5px;
}
.icon-QQ {
    color: #18ACFC;
    font-size: 40px;
    margin-right: 5px;
}
</style>