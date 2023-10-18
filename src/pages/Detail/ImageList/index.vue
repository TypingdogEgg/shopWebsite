<template>
  <div class="swiper-container">
    <swiper ref="swiper" :options="swiperOptions">
      <swiper-slide v-for="(img, index) in skuImageList" :key="index">
        <img :src="img.imgUrl" @mouseover="changeImage(index, img)" :class="{ active: imgIndex == index }">
      </swiper-slide>
      <!-- 左箭头 -->
      <div slot="button-prev" class="swiper-button-prev"></div>
      <!-- 右箭头 -->
      <div slot="button-next" class="swiper-button-next"></div>
    </swiper>
  </div>
</template>

<script>
// 局部引入swiper插件
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: "ImageList",
  data() {
    return {
      // 默认第一张图片 active样式
      imgIndex: 0,
      // 轮播图配置
      swiperOptions: {
        slidesPerView: 6,
        // spaceBetween: 10,
        //导航前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      }
    }
  },
  components: {
    Swiper, SwiperSlide
  },
  props: ['skuImageList'],
  mounted() {

  },
  methods: {
    changeImage(index) {
      // 当鼠标进入的不是当前展示的图片时，就向zoom发送新的图片索引
      if (this.imgIndex != index) {
        this.imgIndex = index
        // 全局事件总线 向兄弟组件发送图片索引
        this.$bus.$emit('getImage', index)
      }
    }
  },
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 401px;
  box-sizing: border-box;
  // padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;
    // padding-left: 12px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;
      margin-left: 12px;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>