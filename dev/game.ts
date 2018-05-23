class Game {
    
    health : Health
    hunger : Hunger
    tired : Tired

    constructor() {
        this.health = new Health()
        this.hunger = new Hunger()
        this.tired = new Tired()
    }
}



// load
window.addEventListener("load", function () {
    new Game()
});