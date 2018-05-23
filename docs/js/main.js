var Game = (function () {
    function Game() {
        this.health = new Health();
        this.hunger = new Hunger();
        this.tired = new Tired();
    }
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Health = (function () {
    function Health() {
        var _this = this;
        this.pointer = document.getElementById("healthPointer");
        this.health = 0;
        var btn = document.getElementById("eatButton");
        var tiredButton = document.getElementById("restButton");
        btn.addEventListener("click", function (e) { return _this.movePointer(); });
        tiredButton.addEventListener("click", function (e) { return _this.movePointer(); });
    }
    Health.prototype.movePointer = function () {
        this.health -= 5;
        this.pointer.style.transform = "translate(" + this.health + "px)";
        console.log("health: ", this.health);
    };
    return Health;
}());
var Hunger = (function () {
    function Hunger() {
        var _this = this;
        this.pointer = document.getElementById("hungerPointer");
        this.hunger = 0;
        var eatButton = document.getElementById("eatButton");
        eatButton.addEventListener("click", function (e) { return _this.movePointer(); });
    }
    Hunger.prototype.movePointer = function () {
        this.hunger -= 5;
        this.pointer.style.transform = "translate(" + this.hunger + "px)";
        console.log("hunger: ", this.hunger);
    };
    return Hunger;
}());
var Tired = (function () {
    function Tired() {
        var _this = this;
        this.pointer = document.getElementById("tiredPointer");
        this.tired = 0;
        var tiredButton = document.getElementById("restButton");
        tiredButton.addEventListener("click", function (e) { return _this.movePointer(); });
    }
    Tired.prototype.movePointer = function () {
        this.tired -= 5;
        this.pointer.style.transform = "translate(" + this.tired + "px)";
        console.log("Tired: ", this.tired);
    };
    return Tired;
}());
//# sourceMappingURL=main.js.map