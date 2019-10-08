function runGame(speed){
    var map = document.getElementById('map');
    var game = new Game(map, speed);
    game.start();
}

var start = document.getElementById("start");

start.addEventListener("click", function(){
    var speed = parseInt(document.getElementById("speedOptions").value);
    var startPage = document.getElementById("startPage");
    startPage.style.display = "none";
    runGame(speed);
},false)