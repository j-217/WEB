(function(){
    var position = "absolute";
    var elements = [];

    function Snake(args){
        args = args || {};
        //蛇节长宽
        this.width = args.width || 20;
        this.height = args.height || 20;
        //蛇移动方向
        this.direction = args.direction || "right";
        //蛇身构造，初始长度3，第一位蛇头
        this.body = [
            //x轴位置蛇头距离0的蛇节距离，y轴位置蛇头距离0的蛇节距离，颜色
            {x: 3, y: 2, color: "red"},
            {x: 2, y: 2, color: "blue"},
            {x: 1, y: 2, color: "blue"},
        ]
    }

    Snake.prototype.render = function(map){
        if(elements.length != 0){
            remove();
        }
        //渲染蛇身
        for(var i = 0; i < this.body.length; i ++){
            var obj = this.body[i];
            var div = document.createElement("div");
            map.appendChild(div);
            elements.push(div);
            div.style.position = position;
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.backgroundColor = obj.color;
        }
    }


    function remove(){
        for(var i = elements.length - 1; i >= 0; i--){
            elements[i].parentNode.removeChild(elements[i]);
        }
        elements = [];
    }


    Snake.prototype.move = function(food, map){
        //蛇身
        for(var i = this.body.length - 1; i > 0; i--){
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //蛇头
        var head = this.body[0];
        switch(this.direction){
            case "right":
                head.x += 1;
                break;
            case "left":
                head.x -= 1;
                break;
            case "up":
                head.y -= 1;
                break;
            case "down":
                head.y += 1;
            break;
        }

        if(head.x * this.width === food.x && head.y * this.height === food.y){
            food.render(map);
            var last = this.body[this.body.length - 1];
            console.log(last);
            this.body.push({x: last.x, y: last.y, color: last.color});
        }
    }

    window.Snake = Snake;
}());
