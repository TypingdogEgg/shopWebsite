<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <!-- 未登录注册 -->
                    <p v-if="!userNickName">
                        <span>请</span>
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register" class="register">免费注册</router-link>
                    </p>
                    <!-- 登陆后 -->
                    <p v-else>
                        <!-- <span>请</span> -->
                        <a>{{ userNickName }}</a>
                        <a class="register" @click="logOut">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/center">我的订单</router-link>
                    <router-link to="/shopcart">我的购物车</router-link>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link to="/home" class="logo" title="尚品汇">
                    <img src="./images/logo.png" alt="">
                </router-link>
            </h1>
            <!-- 有些路由组件不需要展示输入框，如登录、注册等组件 -->
            <div class="searchArea" v-if="$route.meta.showInput">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            keyword: ''
        }
    },
    mounted() {
        // 通过全局事件总线 清除keyword
        this.$bus.$on('clearKeyword', () => {
            this.keyword = ''
        })
    },
    methods: {
        goSearch() {
            // 输入框传输params参数
            // 点击搜素跳转路由使用编程式导航路由，可以处理数据
            const location = {  //合并参数
                name: 'search',
                params: { //传输params参数
                    keyword: this.keyword || undefined
                },
                query: this.$route.query
            }
            this.$router.push(location, () => { }, () => { })  // push函数本质是返回一个promise函数，只需要用两个参数来承接promise的resolve和reject参数即可捕获到异常并不做处理
            this.searchData = ''
        },
        // 退出登录
        logOut() {
            // 清除用户登录信息
            this.$store.dispatch('clear').then(
                // 退出登录后回到主页
                () => { this.$router.push('/home') },
                (err) => { alert(err.message) })
        }
    },
    computed: {
        userNickName() {
            return this.$store.state.User.userInfo.nickName
        }
    }
}
</script>

<style scoped lang="less">
.header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                        cursor: pointer;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>