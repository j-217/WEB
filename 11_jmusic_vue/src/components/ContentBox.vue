<template>
  <div class="content-box" v-if="itemList.title">
    <div class="title-box">
      <span class="title">{{ itemList.title }}</span>
      <span>更多</span>
    </div>
    <ul class="item-list">
      <li class="item" v-for="item in (itemList.recommend || itemList.albums)" :key="item.id" @click="goDetailPage(itemList.type, item.id)">
        <div class="image-fillet">
          <img :src="item.picUrl" alt="">
          <span class="playcount" v-if="item.playcount">{{ item.playcount | formatNumber }}</span>
        </div>
        <div class="name">{{ item.name }}</div>
      </li>
    </ul>
  </div>
</template>
<script>
import { formatNumber } from '../utils/utils'

export default {
  props: [
    'itemList'
  ],

  filters: {
    formatNumber,
  },

  methods: {
    goDetailPage(type, id){
      switch(type){
        case 'album':
          this.$store.dispatch('getAlbumDetail', id)
          this.$router.push({
            name: 'albumDetail'
          })
          break
        case 'songsList':
          this.$store.dispatch('getSongsListDetail', id)
          this.$router.push({
            name: 'songsListDetail'
          })
          break
      }
    }
  }
}
</script>
<style scoped lang="less">
  .content-box{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 0;
    .title-box{
      display: flex;
      justify-content: space-between;
      font-size: large;
      font-weight: 600;
      align-items: flex-end;
      padding: 0.5rem 0;
      >span:nth-of-type(2){
        font-size: small;
        font-weight: 400;
      }
    }
    .item-list{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 100%;
      .item{
        display: flex;
        flex-direction: column;
        width: 33.33%;
        align-items: center;
        padding: 0.5rem;
        .image-fillet{
          position: relative;
          display: flex;
          border-radius: 8%;
          overflow: hidden;
          width: 100%;
          height: 100%;
          >img{
            width: 100%;
            vertical-align: middle;
          }
          >span{
            position: absolute;
            top: 0.1rem;
            right: 0.2rem;
            color: #fff;
            font-size: 0.8rem;
            &::before{
              content: '▶ '
            }
          }
          // &::before{
          //   content: '';
          //   position: absolute;
          //   display: block;
          //   width: 100%;
          //   height: 1.5rem;
          //   background-image: linear-gradient(180deg, rgba(100, 100, 100, 0.8) -10%, rgba(230, 230, 230, 0) 80%)
          // }
        }
        .name{
          max-width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0.5rem 0;
        }
      }
    }
  }
</style>