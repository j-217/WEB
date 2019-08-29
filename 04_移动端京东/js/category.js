window.onload = function(){
    slideDown();
};

// 全屏纵向滑动
function slideDown(){
    var listBox = document.getElementsByClassName("ct_list")[0];
    var lis = listBox.querySelectorAll("li");
    var maxTop = 0;
    var minTop = -(listBox.children.length * listBox.firstElementChild.clientHeight - document.getElementsByClassName("ct_lcontent")[0].offsetHeight);
    // var offsetTop = listBox.style.marginTop;
    var startY, moveY, distanceY, offsetTop,currentY = 0;
    listBox.addEventListener("touchstart", function(e){
            startY = e.targetTouches[0].clientY;
    });

    listBox.addEventListener("touchmove", function(e){
            listBox.style.transition = "none";
            moveY = e.targetTouches[0].clientY;
            distanceY = moveY - startY;
            listBox.style.marginTop = (distanceY + currentY) + "px";
            offsetTop = listBox.style.marginTop.split("px")[0];
            if(offsetTop > maxTop + 100 || offsetTop < minTop - 100){
                return;
            };
    });

    listBox.addEventListener("touchend", function(e){
            if(offsetTop > maxTop + 100){
                currentY = maxTop;
                listBox.style.transition = "margin-top 0.5s";
                listBox.style.marginTop = (maxTop) + "px";
                return;
            };
            if(offsetTop < minTop - 100){
                currentY = minTop;
                listBox.style.transition = "margin-top 0.5s";
                listBox.style.marginTop = (minTop) + "px";
                return;
            };
            currentY += distanceY;
    });
    tools.tap(listBox, function(e){
        for(var i=0; i<lis.length; i++){
            lis[i].classList.remove("active");
        };
        e.target.parentNode.classList.add("active");
    });
}