<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类标签的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 搜索关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌信息的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <!-- 平台售卖属性的面包屑 -->
            <li class="with-x" v-for="prop in searchParams.props">{{ prop.split(":")[1] }}
              <i @click="removeAttrs(prop)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <!-- 绑定自定义事件 -->
        <SearchSelector @getTrademarkInfo="getTrademarkInfo" @getAttrsInfo="getAttrsInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- searchParams里的order包含1时 展示active样式 -->
                <li :class="{ active: order1 }" @click="changeOrder(1)">
                  <a>综合<span v-show="order1" class="iconfont "
                      :class="orderAsc ? 'icon-direction-up' : 'icon-direction-down'"></span>
                  </a>
                </li>
                <!-- searchParams里的order包含2时 展示active样式 -->
                <li :class="{ active: !order1 }" @click="changeOrder(2)">
                  <a>价格<span v-show="!order1" class="iconfont "
                      :class="orderAsc ? 'icon-direction-up' : 'icon-direction-down'"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class=" goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 声明式导航 传递params参数 商品id -->
                    <router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥&nbsp;</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">{{ goods.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <!-- 点击直接加入购物车 -->
                    <a class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器组件 -->
          <!-- 先传入虚拟数据进行测试 -->
          <Pagination :pageSize="searchParams.pageSize" :pageNo="searchParams.pageNo" :total="total"
            :totalPages="totalPages" :continues="5" @getPageNo="getPageNo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Search',
  data() {
    return {
      searchParams: {
        // 一级id
        "category1Id": "",
        // 二级id
        "category2Id": "",
        // 三级id
        "category3Id": "",
        // 名字
        "categoryName": "",
        // 关键字
        "keyword": "",
        // 排序 默认为综合降序排序
        "order": "1:desc",
        // 页号
        "pageNo": 1,
        // 一页产品数量
        "pageSize": 10,
        // 平台售卖属性操作带的参数
        "props": [],
        // 品牌
        "trademark": ""
      }
    }
  },
  components: {
    SearchSelector
  },
  beforeMount() {
    // 在searchParams数据传入store请求商品列表数据之前将$route的query和params参数传入searchParams
    // this.searchParams.category1Id = this.$route.query.category1Id
    // this.searchParams.category2Id = this.$route.query.category2Id
    // this.searchParams.category3Id = this.$route.query.category3Id
    // this.searchParams.categoryName = this.$route.query.categoryName
    Object.assign(this.searchParams, this.$route.query, this.$route.params) //利用assign更简便
  },
  mounted() {
    // 挂载后根据路由中的params和query数据请求商品信息
    this.getData()
  },
  computed: {
    // 使用getters更方便 因为getters没有划分模块
    ...mapGetters(['goodsList']),
    // order中包含编号1
    order1() {
      return this.searchParams.order.includes('1')
    },
    // order中包含排序方式asc
    orderAsc() {
      return this.searchParams.order.includes('asc')
    },
    // 获取searchList数据中的商品总数和总页数
    ...mapState({
      total: (state) => state.Search.searchList.total,
      totalPages: (state) => state.Search.searchList.totalPages
    })
  },
  methods: {
    // 将向store请求search数据封装为函数 便于随时调用
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    // 点击x移除分类标签的面包屑
    removeCategoryName() {
      // 将query数据清空
      // 性能优化：因为传入请求数据的10个参数都是可写可不写的，将数据改成undefined后就不会传入服务器中
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      // 路由转到search同时params数据保留
      // watch会监视到路由的改变从而重新发送请求商品数据
      this.$router.push({
        name: 'search',
        params: this.$route.params
      })
    },
    // 点击x移除关键字的面包屑
    removeKeyword() {
      // 将params数据清空
      this.searchParams.keyword = undefined
      // 将header输入框内的keyword也要清空 兄弟组件之间通信使用全局事件总线
      this.$bus.$emit('clearKeyword')
      // 路由转到search同时query数据保留
      // watch会监视到路由的改变从而重新发送请求商品数据
      this.$router.push({
        name: 'search',
        query: this.$route.query
      })
    },
    // 组件自定义事件 获取品牌数据并加工
    getTrademarkInfo(trademarkInfo) {
      // 以“ID：品牌名称”形式传给searchParams
      this.searchParams.trademark = `${trademarkInfo.tmId}:${trademarkInfo.tmName}`
      // 请求新的数据
      this.getData()
    },
    // 移除面包屑
    removeTrademark() {
      // 清空品牌信息
      this.searchParams.trademark = undefined
      // 获取新数据
      this.getData()
    },
    // 组件自定义事件 获取平台销售属性并加工
    getAttrsInfo(...attrsInfo) {
      // 以“属性ID:属性值:属性名”形式传给searchParams
      let prop = `${attrsInfo[0]}:${attrsInfo[1]}:${attrsInfo[2]}`
      // 数据去重
      if (this.searchParams.props.indexOf(prop) == -1) {
        this.searchParams.props.push(prop)
      }
      // 请求新的数据
      this.getData()
    },
    // 移除面包屑
    removeAttrs(prop) {
      // 清空平台售卖属性
      this.searchParams.props = this.searchParams.props.filter((item) => {
        return item != prop
      })
      // 获取新数据
      this.getData()
    },
    // 改变排序（综合1/价格2）
    changeOrder(flag) {
      let originOrder = this.searchParams.order
      // 改变排序顺序
      if (originOrder.includes(flag)) {
        // 三元运算判断 如果是asc就变为dessc，反之变成asc
        this.searchParams.order = originOrder.includes('asc') ? `${flag}:desc` : `${flag}:asc`
      } else { //改变排序选项
        this.searchParams.order = `${flag}:desc`
      }
      // 获取新的数据
      this.getData()
    },
    // 跳转到指定页码
    getPageNo(page) {
      // 没有上一页或没有下一页或点击所在页时
      if (page == 0 || page > this.totalPages || page == this.searchParams.pageNo) return
      this.searchParams.pageNo = page
      this.getData()
      // 使用原生js将滚动条滚到最上方
      window.scrollTo(0, 0)
    },
  },
  watch: {
    // 监视路由数据变化 一旦变化就重新获取路由的query和params，然后重新请求search数据
    $route(oldValue, newValue) {
      // 请求完数据后清空id数据 以防止下次重新获取路由时产生错误
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      // 再次发起ajax请求
      this.getData()

    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;

              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }


            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>