var Animal = (function () {
    function Animal() {
        this.element = document.createElement("animal");
        this.img = document.createElement("img");
        this.img.src = "./img/fish_normal.png";
        var forground = document.getElementsByTagName("forground")[0];
        forground.appendChild(this.element);
        this.element.appendChild(this.img);
    }
    return Animal;
}());
var Bubble = (function () {
    function Bubble() {
        var forground = document.getElementsByTagName("forground")[0];
        this.element = document.createElement("bubble");
        forground.appendChild(this.element);
        this.xposition = this.randomNumber(0, window.innerWidth - 130);
        this.yposition = this.randomNumber(0, window.innerHeight - 130);
    }
    Bubble.prototype.update = function () {
        this.element.style.left = this.xposition + "px";
        this.element.style.top = this.yposition + "px";
    };
    Bubble.prototype.dead = function () {
        (this.element.classList.add("dead"), 5000);
    };
    Bubble.prototype.randomNumber = function (min, max) {
        var a = Math.floor(Math.random() * (max - min + 1)) + min;
        return a;
    };
    Bubble.prototype.getRectangle = function () {
        return this.element.getBoundingClientRect();
    };
    return Bubble;
}());
var Buttonbar = (function () {
    function Buttonbar(name) {
        var _this = this;
        this.score = 50;
        this.name = name;
        this.bar = document.createElement("bar");
        this.bar.id = name + "bar";
        var wrapper = document.getElementsByTagName("wrapper")[0];
        wrapper.appendChild(this.bar);
        this.pointer = document.createElement(name + "pointer");
        this.bar.appendChild(this.pointer);
        this.img = document.createElement("img");
        this.img.src = "img/" + name + ".png";
        this.pointer.appendChild(this.img);
        this.button = document.createElement("button");
        this.button.id = name + "button";
        var buttonwrapper = document.getElementsByTagName("buttonwrapper")[0];
        buttonwrapper.appendChild(this.button);
        this.img = document.createElement("img");
        this.img.src = "img/" + name + ".png";
        this.button.appendChild(this.img);
        this.button.addEventListener("click", function (e) { return _this.movePointer(); });
        this.getTired();
    }
    Buttonbar.prototype.update = function () {
        this.pointer.innerHTML = this.name + " " + this.score + " / 100";
        this.checkButtonOpacity();
        this.drawPointer();
    };
    Buttonbar.prototype.movePointer = function () {
        if (this.score < 100) {
            this.score += 5;
        }
    };
    Buttonbar.prototype.getTired = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.score > 0) {
                _this.score -= 1;
            }
            _this.getTired();
        }, 5000);
    };
    Buttonbar.prototype.drawPointer = function () {
        this.pointerWidth = this.score * 4;
        this.pointer.style.width = this.pointerWidth + "px";
    };
    Buttonbar.prototype.checkButtonOpacity = function () {
        if (this.score >= 100) {
            this.score = 100;
            this.button.style.opacity = "0.5";
        }
        else {
            this.button.style.opacity = "unset";
        }
    };
    return Buttonbar;
}());
var Proterolevel = (function () {
    function Proterolevel(g) {
        this.score = -2;
        var forground = document.getElementsByTagName("forground")[0];
        this.game = g;
        this.scoreElement = document.createElement('score');
        forground.appendChild(this.scoreElement);
        this.scoreElement.innerHTML = "Score: 0";
        this.bubbles = [];
        document.body.style.backgroundColor = "blue";
        for (var i = 0; i < 10; i++) {
            var d = new Bubble();
            this.bubbles.push(d);
        }
        this.paddle = new Paddle();
        this.paddle;
        this.update();
    }
    Proterolevel.prototype.update = function () {
        for (var _i = 0, _a = this.bubbles; _i < _a.length; _i++) {
            var b = _a[_i];
            var hit = this.checkCollision(this.paddle.getRectangle(), b.getRectangle());
            if (hit) {
                b.dead();
                this.score++;
                this.scoreElement.innerHTML = "Score: " + this.score;
            }
            if (this.score == 100) {
                this.game.emptyScreen();
                this.game.showScreen(new Fishlevel(this.game));
            }
            b.update();
        }
        this.paddle.update();
    };
    Proterolevel.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Proterolevel;
}());
var Fishlevel = (function () {
    function Fishlevel(g) {
        this.game = g;
        this.healthbar = new Healthbar();
        var forground = document.getElementsByTagName("forground")[0];
        this.buttonwrapper = document.createElement("buttonwrapper");
        forground.appendChild(this.buttonwrapper);
        this.animalName = document.createElement("animalname");
        this.animalName.innerHTML = "Cephalaspis";
        forground.appendChild(this.animalName);
        this.wrapper = document.createElement("wrapper");
        forground.appendChild(this.wrapper);
        this.sleep = new Buttonbar("sleep");
        this.eat = new Buttonbar("eat");
        this.animal = new Animal();
    }
    Fishlevel.prototype.update = function () {
        this.health = (this.eat.score + this.sleep.score) / 2;
        this.eat.update();
        this.sleep.update();
        this.healthbar.drawPointer(this.health);
    };
    return Fishlevel;
}());
var Game = (function () {
    function Game() {
        this.currentscreen = new Fishlevel(this);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.currentscreen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.emptyScreen = function () {
        var forground = document.getElementsByTagName("forground")[0];
        forground.innerHTML = "";
    };
    Game.prototype.showScreen = function (screen) {
        this.currentscreen = screen;
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Healthbar = (function () {
    function Healthbar() {
        var forground = document.getElementsByTagName("forground")[0];
        this.bar = document.createElement("healthbar");
        forground.appendChild(this.bar);
        this.healthPointer = document.createElement("healthpointer");
        this.bar.appendChild(this.healthPointer);
    }
    Healthbar.prototype.drawPointer = function (healthScore) {
        this.pointerPosition = healthScore * 4;
        console.log(this.pointerPosition);
        this.healthPointer.style.transform = "translate(" + -this.pointerPosition + "px)";
    };
    return Healthbar;
}());
var Lizardlevel = (function () {
    function Lizardlevel(g) {
        this.game = g;
        this.healthbar = new Healthbar();
        var forground = document.getElementsByTagName("forground")[0];
        this.buttonwrapper = document.createElement("buttonwrapper");
        forground.appendChild(this.buttonwrapper);
        this.animalName = document.createElement("animalname");
        this.animalName.innerHTML = "Cephalaspis";
        forground.appendChild(this.animalName);
        this.wrapper = document.createElement("wrapper");
        forground.appendChild(this.wrapper);
        this.eat = new Buttonbar("eat");
        this.sleep = new Buttonbar("sleep");
        this.drink = new Buttonbar("drink");
        this.animal = new Animal();
        this.animalName = document.createElement("animalname");
        this.animalName.innerHTML = "Cephalaspis";
        forground.appendChild(this.animalName);
    }
    Lizardlevel.prototype.update = function () {
        this.health = this.eat.score + this.sleep.score + this.drink.score / 3;
    };
    return Lizardlevel;
}());
var Paddle = (function () {
    function Paddle() {
        var _this = this;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        var forground = document.getElementsByTagName("forground")[0];
        this.div = document.createElement("paddle");
        forground.appendChild(this.div);
        this.upkey = 87;
        this.downkey = 83;
        this.leftkey = 68;
        this.rightkey = 65;
        this.x = 0;
        this.y = 200;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Paddle.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Paddle.prototype.onKeyDown = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 5;
                break;
            case this.downkey:
                this.downSpeed = 5;
                break;
            case this.leftkey:
                this.leftSpeed = 5;
                break;
            case this.rightkey:
                this.rightSpeed = 5;
                break;
        }
    };
    Paddle.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
            case this.leftkey:
                this.leftSpeed = 0;
                break;
            case this.rightkey:
                this.rightSpeed = 0;
                break;
        }
    };
    Paddle.prototype.update = function () {
        var newY = this.y - this.upSpeed + this.downSpeed;
        var newX = this.x - this.rightSpeed + this.leftSpeed;
        if (newY > 0 && newY + 100 < window.innerHeight)
            this.y = newY;
        if (newX > 0 && newX + 100 < window.innerWidth)
            this.x = newX;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Paddle.prototype.getRectangleq = function () {
        return this.div.getBoundingClientRect();
    };
    return Paddle;
}());
//# sourceMappingURL=main.js.map