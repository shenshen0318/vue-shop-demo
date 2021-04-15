<template>
    <div>
        Home 组件
        <el-button type="info" @click="logout">退出</el-button>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            
        }
    },
    methods: {
        logout(){
            // 清除 sessionStorage 中的数据
            window.sessionStorage.clear();
            // 强制跳转到 登录页面
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>

</style>