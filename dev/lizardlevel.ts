// Second stage of the Evolife game is created with all game element
class Lizardlevel {

    private wrapper : HTMLElement 
    private game : Game
    private healthbar : Healthbar 
    private animalName : HTMLElement
    private buttonwrapper : HTMLElement
    private eat : Buttonbar
    private sleep : Buttonbar
    private drink : Buttonbar
    private animal : Animal
    private health : number

    constructor(g:Game){
        
        this.game = g

        this.healthbar = new Healthbar()

        let forground = document.getElementsByTagName("forground")[0]
        this.buttonwrapper = document.createElement("buttonwrapper")
        forground.appendChild(this.buttonwrapper)

        this.animalName = document.createElement("animalname")
        this.animalName.innerHTML = "Cephalaspis"
        forground.appendChild(this.animalName)


        this.wrapper = document.createElement("wrapper")
        forground.appendChild(this.wrapper)

        this.eat = new Buttonbar("eat")
        this.sleep = new Buttonbar("sleep")
        this.drink = new Buttonbar("drink")
        this.animal = new Animal()

        this.animalName = document.createElement("animalname")
        this.animalName.innerHTML = "Cephalaspis"
        forground.appendChild(this.animalName)

    }

    //wanneer gezondheid lang genog hoog is
    //zet game.currentscreen() op apelevel

    public update() {
        this.health = this.eat.score + this.sleep.score + this.drink.score / 3
    }

}