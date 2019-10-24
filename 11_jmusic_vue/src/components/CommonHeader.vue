<template>
  <div class="header">
      <div class="header-flex">
        <div class="left" @click="onClickLeft">
          <van-icon name="arrow-left" />
        </div>
        <div class="title-box">
          <div class="title">{{ title }}</div>
          <div class="info">{{ info }}</div>
        </div>
        <div class="right">
          <van-icon name="ellipsis" />
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props:[
    'title',
    'info'
  ],

  methods: {
    onClickLeft(){
      this.$router.back()
    },
  }
}
</script>
<style scoped lang="less">
.header{
  transform: translateZ(0);
  position: fixed;
  top: 0;
  height: 3rem;
  width: 100%;
  padding: 0.5rem 1rem;
  color: #fff;
  font-size: xx-large;
  z-index: 15;
  .header-flex{
    display: flex;
    justify-content: space-between;
    .left{
      padding-right: 1.5rem;
    }
    .title-box{
      width: 80%;
      font-size: large;
      white-space: nowrap;
      overflow: hidden;
      .info{
        font-size: small;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .right{
      padding-left: 1.5rem;
    }
  }
}
</style>