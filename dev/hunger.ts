class Hunger {

    pointer : HTMLElement = document.getElementById("hungerPointer")
    hunger : number = 0

    constructor() {
        let eatButton = document.getElementById("eatButton");
        eatButton.addEventListener("click", (e:Event) => this.movePointer());    
    }

    movePointer(){
        this.hunger -= 5        
        this.pointer.style.transform = "translate("+this.hunger+"px)"
        console.log("hunger: ", this.hunger)
    }

}