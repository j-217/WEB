<template>
    <div class="homeContainer">
        <div class="banner">
            <mt-swipe :auto="3000">
              <mt-swipe-item>1</mt-swipe-item>
              <mt-swipe-item>2</mt-swipe-item>
              <mt-swipe-item>3</mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="menu">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4"><a href="#">
                        <img src="../images/menu1.png">
                        <div class="mui-media-body">新闻资讯</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4"><a href="#">
                        <img src="../images/menu2.png">
                        <div class="mui-media-body">图片分享</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4"><a href="#">
                        <img src="../images/menu3.png">
                        <div class="mui-media-body">商品购买</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4"><a href="#">
                        <img src="../images/menu4.png">
                        <div class="mui-media-body">留言反馈</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4"><a href="#">
                       <img src="../images/menu5.png">
                        <div class="mui-media-body">视频专区</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4"><a href="#">
                        <img src="../images/menu6.png">
                        <div class="mui-media-body">联系我们</div></a></li>
            </ul> 
        </div>
    </div>
</template>

<script>
    
</script>

<style scoped lang="less">
    .banner{
        .mint-swipe{
            height: 200px;
            .mint-swipe-item{
                &:nth-child(1){
                    background-color: red;
                }
                &:nth-child(2){
                    background-color: blue;
                }
                &:nth-child(3){
                    background-color: yellow;
                }
            }
        }
    }
    .menu{
        .mui-table-view{
            .mui-table-view-cell{
                background-color: #fff;
                border: none;
            }
        }
    }
</style>