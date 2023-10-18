<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'


export default {
  name: 'App',
  components: {
    Header, Footer
  },
  mounted() {
    // 在app.vue中发起请求只会调用一次 优化性能
    // 请求三级列表数据
    this.$store.dispatch('getCategoryList')
    // 请求轮播图图片数据
    this.$store.dispatch('getBannerList')
    // 请求楼层区域数据
    this.$store.dispatch('getFloorList')
  },
}
</script>

<style></style>
