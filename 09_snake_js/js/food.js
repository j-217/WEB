(function(){
    var position = "absolute";
    var elements = [];

    function Food(args){
        args = args || {};
        this.x = args.x || 0;
        this.y = args.y || 0;
        this.height = args.height || 20;
        this.width = args.width || 20;
        this.color = args.color || "red";
    }

    Food.prototype.render = function(map){
        if(elements.length != 0){
            remove()};
        this.x = Tools.getRandom(0, map.offsetWidth/this.width - 1) * this.width;
        this.y = Tools.getRandom(0, map.offsetHeight/this.height - 1) * this.height;
        var div = document.createElement("div");
        map.appendChild(div);
        elements.push(div);
        div.style.position = position;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        div.style.height = this.height + "px";
        div.style.width = this.width + "px";
        div.style.backgroundColor = this.color;
        div.style.borderRadius = "50%";
    }


    function remove(){
        var remove_e = elements.pop();
        remove_e.parentNode.removeChild(remove_e);
    }
    window.Food = Food;
}());