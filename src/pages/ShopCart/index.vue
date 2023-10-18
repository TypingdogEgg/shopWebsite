<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" id="" value="" :checked="cart.isChecked" @change="changeChecked(cart)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con4">
            <!-- 更改商品数量函数 -->
            <a href="javascript:void(0)" class="mins" @click="changeSkuNum(-1, 0, cart)">-</a>
            <!-- 将输入框内的修改数量和商品实际数量的差传入函数中 -->
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cart.skuNum"
              @change="changeSkuNum(($event.target.value - cart.skuNum) * 1, 1, cart)">
            <a href="javascript:void(0)" class="plus" @click="changeSkuNum(1, 0, cart)">+</a>
          </li>
          <li class="cart-list-con5">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con6">
            <!-- 删除商品信息函数 -->
            <a class="sindelet" @click="deleteCartById(cart.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" @change="allChecked($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{ total.sumNum }}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ total.sumPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- 点击结算跳转到订单交易页面 -->
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import debounce from 'lodash/debounce'
export default {
  name: 'ShopCart',
  data() {
    return {

    }
  },
  mounted() {
    // 请求获取购物车数据
    this.getData()
  },
  computed: {
    ...mapGetters(['cartList']),
    // 计算选中商品的总价和数量
    total() {
      let sumPrice = 0
      let sumNum = 0
      this.cartList.forEach((item) => {
        if (item.isChecked) {
          sumPrice += item.skuPrice * item.skuNum
          sumNum += item.skuNum
        }
      })
      return { sumNum, sumPrice }
    },
    // 判断是否全选
    isAllChecked() {
      // 数组方法every：每个子项都满足条件时返回真
      let checked = this.cartList.every(item => item.isChecked == true)
      return checked
    }
  },
  methods: {
    // 获取购物车数据
    getData() {
      this.$store.dispatch('getCartList')
    },
    // num表示修改后数量和修改前数量的差值；tag=0表示按钮操作，tag=1表示输入操作；cart表示当前操作的商品的数据
    // 当快速点击按钮时还是会出现数量错误的情况：使用防抖
    changeSkuNum: debounce(function (num, tag, cart) {
      // 如果tag=0就是按钮操作, 并判断操作后的商品数量是否大于0
      // 如果tag=1，判断输入框内容是否为数字，以及输入的数量是否大于0
      if (!tag && cart.skuNum + num > 0 || tag && !isNaN(num) && num > -cart.skuNum) {
        num = parseInt(num)
      } else { // 如果输入非法的内容会发送更改为0的请求
        num = 0
      }
      // 发送请求
      this.$store.dispatch('UpdateShopcar', {
        skuId: cart.skuId,
        skuNum: num
      }).then(res => {
        // 重新请求获取购物车数据
        this.getData()
      }, (err) => { alert(err); })
    }, 200),
    // 发送请求删除对应的商品数据
    deleteCartById(skuId) {
      this.$store.dispatch('deleteCartInfo', skuId).then(
        res => {
          // 重新请求获取购物车数据
          this.getData()
        }, (err) => { alert(err); })
    },
    // 点击商品复选框修改isChecked状态
    changeChecked(cart) {
      // 发送修改请求
      this.$store.dispatch('changeChecked', {
        skuId: cart.skuId,
        // 如果目前复选框选中则目标提交修改状态为0，否则为1
        isChecked: cart.isChecked ? '0' : '1'
      }).then(
        (res) => { //成功就重新读取数据
          this.getData()
        }, (err) => { // 失败就输出错误
          alert(err)
        })
    },
    // 删除所有选中的商品
    deleteAllChecked() {
      this.$store.dispatch('deleteAllChecked').then(
        (res) => {
          this.getData()
        }, (err) => { alert(err) })
    },
    // 点击全选或反选
    allChecked(e) {
      let isChecked = e.target.checked ? '1' : '0'
      this.$store.dispatch('clickAllChecked', isChecked).then((res) => {
        this.getData()
      }, err => {
        alert(err.message)
      })
    },
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 10%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 23%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 10%;

      }

      .cart-th4 {
        width: 15%;
      }

      .cart-th5 {
        width: 25%;
      }

      .cart-th3 {
        width: 16.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 30%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }


        .cart-list-con3 {
          width: 12.5%;

        }

        .cart-list-con4 {
          width: 18%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con5 {
          width: 24%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con6 {
          width: 7%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
        cursor: pointer;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>