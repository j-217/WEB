$(function(){
    // 导航块
    $(".wjs_nav .navbar-nav").on("click", function(){
        $(".nav").find(".active").removeClass("active");
        $(this).addClass("active");
    });
    // 轮播图start
    var items = $("#banner_slide .carousel-inner .item");
    // 监听屏幕大小改变
    $(window).on("resize", function(){
        var width = $(window).width();
        if(width >= 768){
            $(items).each(function(index, value){
                var item = $(this);
                var imgSrc = item.data("largeImage");
                item.html($('<a href="javascript:void(0);" class="banner_bgimg"></a>').css({"background-image": "url('"+ imgSrc +"')"}));
                // item.html('<a href="javascript:void(0);" class="banner_bgimg" style="background-image: url('+ imgSrc +');"></a>')
            });
        }else{
            $(items).each(function(index, value){
                var item = $(this);
                var imgSrc = item.data("smallImage");
                item.html('<a href="javascript:void(0);" class="banner_img"><img src="'+ imgSrc +'" alt="..."></a>');
            });
        };
    }).trigger("resize");

    // 手动滑动功能
    //轮播图end

    // 产品块
    // 工具提示初始化
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
    // 滑动菜单
    var lis = $(".wjs_products ul.nav li");
    var totalwidth = 0;
    lis.each(function(index, value){
        var li = $(this);
        totalwidth += li.outerWidth(true);
        // console.log(li.outerWidth(true));
    });
    $(".wjs_products ul.nav").width(totalwidth);
    // 使用iscroll插件完成菜单滑动
    myScroll = new IScroll(".nav-tabs-wrap", {
        scrollX: true,
        scrollY: false,
    });
});