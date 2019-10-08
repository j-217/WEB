(function(){
    var that;
    function Game(map, speed){
        this.map = map;
        this.food = new Food();
        this.snake = new Snake();
        this.speed = speed;
        that = this;
    }

    Game.prototype.start = function() {
        //1.渲染蛇和食物
        this.food.render(this.map);
        this.snake.render(this.map);
        //2.游戏逻辑
        //2.1蛇移动
        runSnake(this.speed);
        //2.2使用方向键控制蛇的方向
        bindKey();
        //2.3蛇吃到食物
        //2.4蛇碰到墙游戏结束
    };

    function runSnake(speed){
        var timerId = setInterval(function(){
        that.snake.move(that.food, that.map);
        that.snake.render(that.map);

        var headX = that.snake.body[0].x;
        var headY = that.snake.body[0].y;
        var maxX = that.map.offsetWidth/that.snake.width;
        var maxY = that.map.offsetHeight/that.snake.height;
        if(headX < 0 || headX >= maxX || headY <0 || headY >= maxY){
            clearInterval(timerId);
            var over = document.getElementById("over");
            over.style.display = "Block";
            over.addEventListener("click", function(){
                window.location.reload();
            }, false)
        }
        }, speed)
    }


    function bindKey(){
        document.addEventListener("keydown", function(e){
            switch(e.keyCode){
                case 37:
                    that.snake.direction = "left";
                    break;
                case 38:
                    that.snake.direction = "up";
                    break;
                case 39:
                    that.snake.direction = "right";
                    break;
                case 40:
                    that.snake.direction = "down";
                    break;
            }
        }, false)
    }

    window.Game = Game;
}());

