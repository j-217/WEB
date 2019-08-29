var tools = {
    tap: function(dom, callback){
        if(!dom || typeof(dom) != "object"){
            return;
        };
        var startTime, 
            endTime, 
            startX,
            startY,
            endX,
            endY;
        dom.addEventListener("touchstart", function(e){
            if(e.targetTouches[0].length > 1){
                // 不止一根手指，返回
                return;
            };
            startTime = Date.now();
            startX = e.targetTouches[0].clientX;
            startY = e.targetTouches[0].clientY;
        });

        dom.addEventListener("touchend", function(e){
            if(e.changedTouches[0].length > 1){
                // 不止一根手指，返回
                return;
            };
            endTime = Date.now();
            if(endTime - startTime >= 150){
                return;
            };
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            if(Math.abs(endX - startX) < 6 && Math.abs(endY - startY) < 6){
                console.log("单击");
                // 判断是否传入callback并执行, 传递e参数
                callback && callback(e);
            };
        });
    },
};