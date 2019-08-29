window.onload = function(){
    searchEffect();
    timeCountDown();
    bannerEffect();
};

// 头部搜索块的js效果, 未移出banner时透明度变化
function searchEffect(){
    var banner = document.getElementsByClassName("jd_banner")[0];
    var banner_height = banner.offsetHeight;
    var search = document.getElementsByClassName("jd_search")[0];
    window.onscroll = function(){
        var offsetTop = document.documentElement.scrollTop;
        var opacity = offsetTop/banner_height;
        if(offsetTop < banner_height){
            search.style.backgroundColor = "rgba(233, 35, 34, "+ opacity +")";
        };
    };
};

// 倒计时功能
function timeCountDown(){
    var total_time = 5500;
    var spans = document.getElementsByClassName("jd_seckill_time")[0].querySelectorAll("span");
    var timer = setInterval(function(){
        if(total_time < 0){
            clearInterval(timer);
            return;
        }else{
            var hours = Math.floor(total_time / 3600);
            var minutes = Math.floor(total_time % 3600 / 60);
            var seconds = total_time % 60;
            spans[0].innerText = Math.floor(hours / 10);
            spans[1].innerText = hours % 10;
            spans[3].innerText = Math.floor(minutes / 10);
            spans[4].innerText = minutes % 10;
            spans[6].innerText = Math.floor(seconds / 10);
            spans[7].innerText = seconds % 10;
            total_time--;
        }  
    }, 1000);
};

// 轮播图
function bannerEffect(){
    var banner = document.querySelector(".jd_banner");
    var imgBox = banner.querySelector("ul:first-of-type");
    var first = imgBox.firstElementChild;
    var last = imgBox.lastElementChild;
    
    // 首尾添加图片
    imgBox.appendChild(first.cloneNode(true));
    imgBox.insertBefore(last.cloneNode(true), first);

    // 设置图片和盒子的宽度以及偏移量
    var bannerWidth = banner.offsetWidth;
    var lis = imgBox.querySelectorAll("li");
    count = lis.length;
    imgBox.parentElement.style.width = count * bannerWidth + "px";
    for(var i=0; i<count; i++){
        lis[i].style.width = bannerWidth + "px";
    };
    imgBox.parentElement.style.left = -(bannerWidth) + "px";

    // 自动轮播
    var index = 1
    function startTime(){
        timer = setInterval(function(){
        index++;
        imgBox.parentNode.style.transition = "left 0.5s ease-in-out";
        imgBox.parentNode.style.left = -(index*bannerWidth) + "px";
        // index++;
        if(index==count - 1){
            setTimeout(function(){
                    index = 1;
                    imgBox.parentNode.style.transition = "none";
                    imgBox.parentNode.style.left = -(bannerWidth) + "px";
                }, 500)   
            };
        }, 2000);
    };

    function setIndicator(index){
        var banner_indicators = document.getElementsByClassName("jd_banner_indicator")[0].children;
        for(var i=0;i<banner_indicators.length;i++){
            banner_indicators[i].classList.remove("active");
        };
        banner_indicators[index - 1].classList.add("active");
    };
    
    startTime();
    // 改变屏幕大小重新计算图片盒子宽度
    window.onresize = function(){
        // bannerWidth 使用全局变量
        bannerWidth = banner.offsetWidth;
        var lis = imgBox.querySelectorAll("li");
        var count = lis.length;
        imgBox.parentNode.style.width = count * bannerWidth + "px";
        for(var i=0; i<count; i++){
            lis[i].style.width = bannerWidth + "px";
        };
        imgBox.parentNode.style.left = -(index * bannerWidth) + "px";
    };

    var startX, moveX, distanceX;
    imgBox.addEventListener("touchstart", function(e){
            // console.log("touchstart");
            clearInterval(timer);
            startX = e.targetTouches[0].clientX;
    });

    imgBox.addEventListener("touchmove", function(e){
            // console.log("touchmove");
            imgBox.parentNode.style.transition = "none";
            moveX = e.targetTouches[0].clientX;
            distanceX = moveX - startX;
            imgBox.parentNode.style.left = -(index * bannerWidth) + distanceX + "px";
    });

    imgBox.addEventListener("touchend", function(e){
            // console.log("touchend");
            if(distanceX > 100){
                index--;
                if(index == 0){
                    setTimeout(function(){
                        index = count - 2;
                        imgBox.parentNode.style.transition = "none";
                        imgBox.parentNode.style.left = -(index * bannerWidth) + "px";
                    }, 500);
                };
            }else if(distanceX < -100){
                index++;
                if(index == count - 1){
                    setTimeout(function(){
                        index = 1;
                        imgBox.parentNode.style.transition = "none";
                        imgBox.parentNode.style.left = -(index * bannerWidth) + "px";
                    }, 500)
                };
            };
            imgBox.parentNode.style.transition = "left 0.5s ease-in-out";
            imgBox.parentNode.style.left = -(index * bannerWidth) + "px";
            startTime();
    });

    imgBox.parentNode.addEventListener("transitionend", function(){
            setIndicator(index);
    });
};