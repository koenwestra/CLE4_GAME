// First stage of the Evolife game is created with all game element
class Fishlevel {

    private game : Game
    private wrapper : HTMLElement 
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
        
        
        this.sleep = new Buttonbar("sleep")
        this.eat = new Buttonbar("eat")

        this.animal = new Animal()

    }

    //wanneer gezondheid lang genog hoog is
    //doe this.game.emptyScreen() en 
    //this.game.showScreen(new lizardlevel(this.game))

    public update() {
        this.health = (this.eat.score + this.sleep.score) / 2
        this.eat.update()
        this.sleep.update()
        this.healthbar.drawPointer(this.health)
    }



}