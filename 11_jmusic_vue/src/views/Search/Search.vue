<template>
  <div class="search-box">
    <!-- header -->
    <common-header :searchKeyword="searchDefaultKeyword" :style="changeStyle"></common-header>
    <!-- body -->
    <div class="body-box">
      <router-view></router-view>
    </div>
    <!-- footer -->
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import CommonHeader from '../../components/CommonHeader'
import NavFooter from '../../components/NavFooter'
import { mapState } from 'vuex'

export default {
  data(){
    return{
      changeStyle: {'color': '#000', 'backgroundColor': '#fff'}
    }
  },

  components: {
    CommonHeader,
    NavFooter,
  },

  mounted(){
    this.$store.dispatch('getSearchDefaultKeyword')
  },

  computed: {
    ...mapState({
      searchDefaultKeyword: state => state.music.searchDefaultKeyword,
    })
  },
}
</script>
<style scoped lang="less">
.search-box{
  height: 100%;
  width: 100%;
  .body-box{
    height: auto;
    width: 100%;
    margin-top: 3rem;
    margin-bottom: 3rem;
    padding: 0 1rem;
  }
}
</style>