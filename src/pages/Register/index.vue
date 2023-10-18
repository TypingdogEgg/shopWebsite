<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去<router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone" @change="checkPhoneNum">
        <span class="error-msg">{{ phoneErr }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code">
        <button @click="getCode">获取验证码</button>
        <!-- <span class="error-msg">验证码错误</span> -->
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="password" @change="checkPassword">
        <span class="error-msg">{{ pwdErr }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="pwdTwice" @change="checkPasswordTwice">
        <span class="error-msg">{{ pwdTwiceErr }}</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="isChecked">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg" v-show="!isChecked">未勾选</span>
      </div>
      <div class="btn">
        <button @click="register">注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
// 引入判断正则表达式
import { checkPhone, checkPwd } from '@/utils/regular'
export default {
  name: 'Register',
  data() {
    return {
      phone: '', // 手机号
      code: '', // 验证码
      password: '', // 密码
      pwdTwice: '', // 再次确认密码
      isChecked: true, // 是否勾选协议框
      phoneErr: '',//手机号错误信息
      pwdErr: '',//密码错误信息
      pwdTwiceErr: '',//二次密码错误信息
    }
  },
  methods: {
    // 点击发送获取验证码
    getCode() {
      this.$store.dispatch('getCode', this.phone).then(res => {
        this.code = this.$store.state.User.code
      }, err => {
        alert(err.message)
      })
    },
    // 检验手机号格式
    checkPhoneNum() {
      if (checkPhone(this.phone)) {
        this.phoneErr = ''
      } else {
        this.phoneErr = '手机格式错误！'
      }
    },
    // 检验密码格式
    checkPassword() {
      if (checkPwd(this.password)) {
        this.pwdErr = ''
      } else {
        this.pwdErr = '格式错误！要求以字母开头，长度在6~18之间，只能包含字母、数字和下划线'
      }
    },
    // 检验二次密码格式
    checkPasswordTwice() {
      if (this.password == this.pwdTwice) {
        this.pwdTwiceErr = ''
      } else {
        this.pwdTwiceErr = '密码不一致！'
      }
    },
    register() {
      // 先检测输入内容是否都符合要求
      if (this.phoneErr != '') {
        alert('手机格式有误！请重新输入')
        return
      } else {
        if (this.code == '') {
          alert('请输入验证码！')
          return
        } else {
          if (this.pwdErr != '') {
            alert('密码格式错误！要求以字母开头，长度在6~18之间，只能包含字母、数字和下划线')
            return
          } else {
            if (this.pwdTwiceErr != '') {
              alert('密码不一致！请重新输入')
              return
            } else {
              if (!this.isChecked) {
                alert('请勾选协议！')
                return
              }
            }
          }
        }
      }
      this.$store.dispatch('register', {
        phone: this.phone,
        password: this.password,
        code: this.code
      }).then(res => {
        // 注册成功跳转到登录界面
        this.$router.push('/login')
      }, (err) => {
        alert(err.message)
      })
    }
  },
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      position: relative;
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      button {
        position: absolute;
        // vertical-align: sub;
        top: 11px;
        left: 690px;
        border: none;
        background-color: #fff;
        color: #333;
        cursor: pointer;
      }

      .right-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: green;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
        border: none;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>