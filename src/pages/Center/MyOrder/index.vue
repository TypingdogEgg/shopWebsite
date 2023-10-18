<template>
    <!-- 右侧内容 -->
    <div class="order-right">
        <div class="order-content">
            <div class="title">
                <h3>我的订单</h3>
            </div>
            <div class="chosetype">
                <table>
                    <thead>
                        <tr>
                            <th width="29%">商品</th>
                            <th width="31%">订单详情</th>
                            <th width="13%">收货人</th>
                            <th>金额</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="orders">

                <table class="order-item" v-for="record in recordList" :key="record.id">
                    <thead>
                        <tr>
                            <th colspan="5">
                                <span class="ordertitle">{{ record.createTime }}　订单编号：{{ record.outTradeNo }} <span
                                        class="pull-right delete"><img src="./images/delete.png"></span></span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(order, index) in record.orderDetailList" :key="order.id">
                            <td width="60%">
                                <div class="typographic">
                                    <img :src="order.imgUrl" style="width: 82px;">
                                    <a href="#" class="block-text">{{
                                        order.skuName }}</a>
                                    <span>x{{ order.skuNum }}</span>
                                    <a href="#" class="service">售后申请</a>
                                </div>
                            </td>
                            <td :rowspan="record.orderDetailList.length" width="8%" class="center" v-if="index == 0">{{
                                record.consignee }}</td>
                            <td :rowspan="record.orderDetailList.length" width="13%" class="center" v-if="index == 0">
                                <ul class="unstyled">
                                    <li>总金额¥{{ record.totalAmount }}</li>
                                    <li>在线支付</li>
                                </ul>
                            </td>
                            <td :rowspan="record.orderDetailList.length" width="8%" class="center" v-if="index == 0">
                                <a href="#" class="btn">{{ record.orderStatusName }} </a>
                            </td>
                            <td :rowspan="record.orderDetailList.length" width="13%" class="center" v-if="index == 0">
                                <ul class="unstyled">
                                    <li>
                                        <a href="mycomment.html" target="_blank">评价|晒单</a>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div class="choose-order">
                <!-- 分页器 -->
                <pagination :pageSize="limit" :pageNo="page" :total="total" :totalPages="pages" :continues="3"
                    @getPageNo="getPageNo"></pagination>
            </div>
        </div>
        <!--猜你喜欢-->
        <div class="like">
            <h4 class="kt">猜你喜欢</h4>
            <ul class="like-list">
                <li class="likeItem">
                    <div class="p-img">
                        <img src="./images/itemlike01.png" />
                    </div>
                    <div class="attr">
                        <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>3699.00</i>
                    </div>
                    <div class="commit">已有6人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="./images/itemlike02.png" />
                    </div>
                    <div class="attr">
                        Apple苹果iPhone 6s/6s Plus 16G 64G 128G
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4388.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="./images/itemlike03.png" />
                    </div>
                    <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="./images/itemlike04.png" />
                    </div>
                    <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyOrder',
    data() {
        return {
            page: 1,//当前所在页码 默认1
            limit: 6,//每页限制展示商品数
            recordList: [],
            total: 0,//总商品数
            pages: 0,//总页数
        }
    },
    methods: {
        // 获取我的订单的数据
        async getMyOrderData() {
            let result = await this.$api.myOrderList(this.page, this.limit)
            if (result.code == 200) {
                this.recordList = result.data.records
                this.total = result.data.total
                this.limit = result.data.size
                this.page = result.data.current
                this.pages = result.data.pages
            }
        },
        // 跳转到指定页码 组件自定义事件 子传父
        getPageNo(page) {
            // 没有上一页或没有下一页或点击所在页时
            if (page == 0 || page > this.pages || page == this.page) return
            this.page = page
            this.getMyOrderData()
            // 使用原生js将滚动条滚到最上方
            window.scrollTo(0, 0)
        },
    },
    mounted() {
        this.getMyOrderData()
    },
}
</script>

<style lang="less" scoped>
//右边
.order-right {
    float: right;
    width: 83.33%;

    //订单部分
    .order-content {
        margin: 0 20px;
        color: #666;

        //标题
        .title {
            margin-bottom: 22px;
            border: 1px solid #ddd;

            h3 {
                padding: 12px 10px;
                font-size: 15px;
                background-color: #f1f1f1;

            }
        }

        //表头
        .chosetype {
            margin-bottom: 15px;
            color: #666;

            table {
                border: 1px solid #e6e6e6;
                border-collapse: separate;
                border-radius: 2px;
                width: 100%;
                max-width: 100%;
                border-spacing: 0;

                th {
                    padding: 6px 8px;
                    color: #666;
                    font-weight: 700;
                    vertical-align: bottom;
                    background-color: #f4f4f4;
                    line-height: 18px;
                    border-bottom: 1px solid #e6e6e6;
                    font-size: 12px;
                    text-align: left;
                }
            }
        }

        // 表单内容
        .orders {
            font-size: 12px;

            a {
                &:hover {
                    color: #4cb9fc;
                }
            }

            table {
                border: 1px solid #e6e6e6;
                border-collapse: collapse;
                border-radius: 2px;
                width: 100%;
                margin-bottom: 18px;
                max-width: 100%;

                th {
                    padding: 6px 8px;
                    line-height: 18px;
                    text-align: left;
                    vertical-align: bottom;
                    background-color: #f4f4f4;
                    font-size: 12px;
                    color: #666;

                    .pull-right {
                        float: right;
                        cursor: pointer;

                        img {
                            margin-right: 10px;
                            vertical-align: middle;
                        }
                    }
                }

                td {
                    font-size: 12px;
                    color: #666;
                    padding: 6px 8px;
                    line-height: 18px;
                    text-align: left;
                    vertical-align: middle;
                    border: 1px solid #e6e6e6;

                    &.center {
                        text-align: center;
                    }

                    .typographic {
                        img {
                            float: left;
                            margin-right: 10px;
                        }

                        a {
                            float: left;
                            min-width: 80px;
                            max-width: 250px;
                            color: #e1251b;

                            &.service {
                                color: #666;
                            }
                        }

                        span {
                            float: left;
                            min-width: 80px;
                            max-width: 250px;
                            text-align: center;
                        }

                    }
                }

            }
        }

        // 分页
        .choose-order {
            height: 66px;

            .pagination {
                margin: 38px 0;

                ul {
                    font-size: 0;
                    display: inline-block;

                    li {
                        display: inline-block;
                        padding: 4px 9px;
                        font-size: 14px;
                        border: 1px solid #e0e9ee;

                        &.prev,
                        &.next {
                            background-color: #fafafa;
                        }

                        &.prev {
                            border-right-color: #28a3ef;
                        }

                        &.page {
                            border-color: #28a3ef;
                            border-left: 0;

                            &.actived {
                                background-color: #28a3ef;

                                a {
                                    color: #fff;
                                }

                            }
                        }
                    }
                }

                div {
                    display: inline-block;
                    font-size: 14px;
                    color: #333;
                }
            }
        }
    }

    // 猜你喜欢
    .like {
        border: 1px solid #ddd;
        margin: 15px 20px;

        .kt {
            border-bottom: 1px solid #ddd;
            background: #f1f1f1;
            color: #666;
            margin: 0;
            padding: 12px;
            font-size: 15px;
        }

        .like-list {
            padding: 15px 11px;
            overflow: hidden;

            .likeItem {
                width: 25%;
                float: left;

                .p-img {
                    text-align: left;

                    img {
                        width: 167px;
                        height: 123px;
                    }
                }

                .attr {
                    padding: 0 15px;
                }

                .price {
                    padding: 0 15px;
                    font-size: 16px;
                    color: #c81623;
                    margin-bottom: 20px;
                }

                .commit {
                    padding: 0 15px;
                }
            }
        }
    }
}
</style>