<template>
    <div class="fr page">
        <div class="sui-pagination clearfix">
            <ul>
                <!-- 没有上一页的时候启用disabled样式 -->
                <li class="prev " :class="{ disabled: pageNo == 1 }" @click="$emit('getPageNo', pageNo - 1)">
                    <a>«上一页</a>
                </li>
                <!-- 当存在一段start不等于1的连续页码段时展示 -->
                <li v-if="getStartAndEnd.start != 1" @click="$emit('getPageNo', 1)"><a>1</a></li>
                <li v-if="getStartAndEnd.start != 1" class="dotted"><span>...</span></li>
                <!-- 连续页码段 从start到end 数字也可以用v-for -->
                <li v-for="(page, index) in getStartAndEnd.end" :key="index" v-if="page >= getStartAndEnd.start"
                    :class="{ active: page == pageNo }" @click="$emit('getPageNo', page)">
                    <a>{{ page }}</a>
                </li>
                <!-- 当存在一段end不等于最后页码的连续页码段时展示 -->
                <li v-if="getStartAndEnd.end != totalPages" class="dotted"><span>...</span></li>
                <li v-if="getStartAndEnd.end != totalPages" @click="$emit('getPageNo', totalPages)"><a>{{ totalPages }}</a>
                </li>
                <!-- 没有下一页的时候启用disabled样式 -->
                <li class="next" :class="{ disabled: pageNo == totalPages }" @click="$emit('getPageNo', pageNo + 1)">
                    <a>下一页»</a>
                </li>
            </ul>
            <div><span>共{{ totalPages }}页&nbsp;</span></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    data() {
        return {

        }
    },
    props: ['pageSize', 'pageNo', 'total', 'totalPages', 'continues'], // continues是连续展示页码数
    computed: {
        // 计算连续页码序列的起始值和结束值
        getStartAndEnd() {
            let start = 0 // 记录连续开始页码
            let end = 1 // 记录连续末尾页码
            // 总页数小于连续页码序列长度时
            if (this.totalPages < this.continues) {
                start = 1
                end = this.totalPages
            } else { // 大于等于连续页码序列长度
                start = this.pageNo - parseInt(this.continues / 2)
                end = this.pageNo + parseInt(this.continues / 2)
                // 起始页码小于1 说明所在页码小于3
                if (start < 1) {
                    start = 1
                    end = start + this.continues - 1
                }
                // 如果结束页码大于总页数 说明所在页码在总页数前三页
                if (end > this.totalPages) {
                    start = this.totalPages - this.continues + 1
                    end = this.totalPages
                }
            }
            return { start, end }
        }
    },

}
</script>

<style scoped lang="less">
.page {
    // width: 815px;
    display: flex;
    align-items: center;
    width: 1200px;
    justify-content: center;
    height: 66px;
    overflow: hidden;
    float: right;

    .sui-pagination {
        margin: 18px 0;

        ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            // width: 480px;
            float: left;

            li {
                line-height: 18px;
                display: inline-block;

                a {
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    border: 1px solid #e0e9ee;
                    margin-left: 3px;
                    font-size: 14px;
                    padding: 9px 18px;
                    color: #333;
                    cursor: pointer;
                }

                &.active {
                    a {
                        background-color: #fff;
                        color: #e1251b;
                        border-color: #fff;
                        cursor: default;
                    }
                }

                &.prev {
                    a {
                        background-color: #fafafa;
                    }
                }

                &.disabled {
                    a {
                        color: #999;
                        cursor: default;
                    }
                }

                &.dotted {
                    span {
                        // margin-left: -1px;
                        position: relative;
                        float: left;
                        line-height: 18px;
                        text-decoration: none;
                        background-color: #fff;
                        font-size: 14px;
                        border: 0;
                        padding: 9px 18px;
                        color: #333;
                    }
                }

                &.next {
                    a {
                        background-color: #fafafa;
                    }
                }
            }
        }

        div {
            color: #333;
            font-size: 14px;
            float: right;
            // width: 335px;
            line-height: 37px;
            margin-left: 10px;
        }
    }
}
</style>