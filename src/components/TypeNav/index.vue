<template>
    <!-- 三级联动分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveList">
                <h2 class="all" @mouseenter="enterList">全部商品分类</h2>
                <transition name="sort">
                    <div class="sort" v-show="isShow">
                        <!-- 使用事件委托(利用冒泡原理)，将点击事件放在大div中，根据自定义属性判断是否为目标标签；若直接对a标签使用router-link或点击事件，会导致循环产生多个回调函数，增大网页负担 -->
                        <div class="all-sort-list2" @click="goSearch($event)">
                            <div class="item bo" v-for="(c1, index) in categoryList" :key="c1.categoryId">
                                <!-- 实现鼠标移入样式 -->
                                <h3 @mouseenter="changeIndex(index)" :class="{ current: currentIndex == index }">
                                    <a :data-categoryName="c1.categoryName" :data-categoryId1="c1.categoryId">{{
                                        c1.categoryName }}</a>
                                </h3>
                                <!-- 二、三级列表 使用v-show实现列表的显示与隐藏 -->
                                <div class="item-list clearfix" v-show="currentIndex == index">
                                    <div class="subitem">
                                        <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-categoryId2="c2.categoryId">{{
                                                    c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-categoryId3="c3.categoryId">{{
                                                            c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>

            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入节流
import throttle from 'lodash/throttle'

export default {
    name: 'TypeNav',
    data() {
        return {
            currentIndex: -1,
            isShow: true, //一级菜单是否显示
        }
    },
    mounted() {
        // 向store仓库获取categoryList; 在这里获取会导致每次刷新和切换组件时重新获取数据，大大降低浏览器性能
        // this.$store.dispatch('getCategoryList')

        // 在search组件隐藏一级菜单
        if (this.$route.path != '/home') {
            this.isShow = false
        }
    },
    computed: {
        ...mapState({
            // 会自动调用右侧函数
            categoryList: state => state.Home.categoryList
        })
    },
    methods: {
        // 节流：用户操作速度过快会导致页面卡顿，通过节流，规定时间内只执行一次操作
        changeIndex: throttle(function (index) {
            this.currentIndex = index
        }, 50),
        // 三级联动列表 确定和发送点击对象的名字和id 以及合并query和params参数
        goSearch(event) {
            // 点击列表传输query数据
            // 存在自定义事件则不为空
            let { categoryname, categoryid1, categoryid2, categoryid3 } = event.target.dataset
            // 判断点击事件是否为标签
            if (categoryname) {
                const query = { categoryName: categoryname }
                if (categoryid1) { // 判断是否为一级标签
                    query.category1Id = categoryid1
                } else if (categoryid2) { // 判断是否为二级标签
                    query.category2Id = categoryid2
                } else { // 判断是否为三级标签
                    query.category3Id = categoryid3
                }

                // 编程式导航路由跳转 并传送信息
                const location = {
                    name: 'search',
                    query,
                }
                // 当params参数为真时 合并参数
                if (this.$route.params) {
                    location.params = this.$route.params
                    this.$router.push(location)
                }
            }
        },
        // 从全部商品分类标签中进入一级菜单（对于home组件来说这一步无所谓）
        enterList() {
            if (this.$route.path != '/home') {
                this.isShow = true
            }
        },
        // 离开菜单时
        leaveList() {
            // 离开一级菜单将背景颜色关掉
            this.currentIndex = -1
            // search模块中离开一级菜单就隐藏
            if (this.$route.path != '/home') {
                this.isShow = false
            }
        },
    },
}
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;

            position: absolute;
            background: #fafafa;
            z-index: 999;


            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 27px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                            text-decoration: none;
                            cursor: pointer;
                        }
                    }

                    .current {
                        background-color: #ccc;
                    }

                    .item-list {
                        // display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;

                                    a {
                                        cursor: pointer;
                                    }
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;

                                        a {
                                            cursor: pointer;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }
            }
        }

        // 过渡动画 注意：要与sort同级才有效果 
        .sort-enter {
            height: 0;
            // overflow: hidden;
            opacity: 0;
        }

        .sort-enter-to {
            height: 461px;
            // overflow: hidden;
            opacity: 1;
        }

        .sort-enter-active {
            // overflow: hidden;
            transition: all .1s linear;
        }
    }
}
</style>