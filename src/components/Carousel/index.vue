<template>
    <div class="carousel">
        <swiper ref="swiper" :options="swiperOptions">
            <swiper-slide v-for="li in list" :key="li.id">
                <img :src="li.imgUrl" />
            </swiper-slide>
            <!-- 左箭头 -->
            <div slot="button-prev" class="swiper-button-prev"></div>
            <!-- 右箭头 -->
            <div slot="button-next" class="swiper-button-next"></div>
            <!-- 分页器 -->
            <div slot="pagination" class="swiper-pagination"></div>
        </swiper>
    </div>
</template>

<script>
// 局部引入swiper插件
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
    name: 'Carousel',
    data() {
        return {
            // swiperOptions配置项: 使用swiper官网的配置项即可
            swiperOptions: {
                //导航前进后退按钮
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                //自动轮播图
                autoplay: {
                    delay: 1300,
                    stopOnLastSlide: false,
                    disableOnInteraction: true,
                },
                //无缝衔接
                loop: true,
                //分页器配置项
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true, // 点击分页器小球进行轮播图切换
                },
            },
        }
    },
    mounted() {
        //鼠标进入-暂停
        this.$refs.swiper.$el.onmouseenter = () => {
            this.$refs.swiper.$swiper.autoplay.stop();
        }
        //鼠标离开-开始
        this.$refs.swiper.$el.onmouseleave = () => {
            this.$refs.swiper.$swiper.autoplay.start();
        }
    },
    components: {
        Swiper, SwiperSlide
    },
    props: ['list']
}
</script>

<style scoped lang="less">
// 修改轮播图箭头样式
.swiper-button-prev,
.swiper-button-next {
    // display: none;
    opacity: 0;
    color: #fff;
    background-color: #00000023;
}

// 修改轮播图箭头样式
.swiper-button-prev:after,
.swiper-button-next:after {
    font-size: 24px;
}

.carousel:hover .swiper-button-next,
.carousel:hover .swiper-button-prev {
    opacity: 1;
}
</style>