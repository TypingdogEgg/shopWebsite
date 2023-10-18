<template>
    <div>
        <!-- 全局组件直接调用 -->
        <TypeNav></TypeNav>

        <ListContainer></ListContainer>
        <TodayRecommend></TodayRecommend>
        <Rank></Rank>
        <Like></Like>
        <!-- 通过v-for生成多个floor，将各自的数据传送给对应的floor -->
        <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"></Floor>
        <Brand></Brand>
    </div>
</template>

<script>
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'

import { mapState } from 'vuex'

export default {
    name: 'Home',
    data() {
        return {
        }
    },
    mounted() {
        // 点击登录后 获取用户信息
        // this.$store.dispatch('getUserInfo').then(() => { }, () => { })
    },
    components: {
        ListContainer, TodayRecommend, Rank, Like, Floor, Brand
    },
    computed: {
        // 获取store里的bannerList数据
        ...mapState({
            floorList: (state) => state.Home.floorList
        })
    },

}
</script>

<style></style>