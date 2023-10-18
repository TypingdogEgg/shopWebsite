<template>
  <div class="spec-preview">
    <img :src="image.imgUrl" />
    <!-- 绑定鼠标移动事件 -->
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img :src="image.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      // 索引默认为0
      index: 0
    }
  },
  mounted() {
    // 接收imageList实时发来的图片索引
    this.$bus.$on('getImage', (index) => {
      this.index = index
    })
  },
  beforeDestroy() {
    this.$bus.$off('getImage')
  },
  computed: {
    image() {
      return this.skuImageList[this.index] || {}
    }
  },
  props: ['skuImageList'],
  methods: {
    move(e) {
      //获取蒙板
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      //计算蒙板的left|top数值
      let left = e.offsetX - mask.offsetWidth / 2;
      let top = e.offsetY - mask.offsetHeight / 2;
      //约束蒙板的上下左右范围
      if (left < 0) left = 0;
      if (left > mask.offsetWidth) left = mask.offsetWidth;
      if (top < 0) top = 0;
      if (top > mask.offsetHeight) top = mask.offsetHeight;
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    },
  },
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover~.mask,
  .event:hover~.big {
    display: block;
  }
}
</style>