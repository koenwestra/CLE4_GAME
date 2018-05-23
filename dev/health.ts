class Health {

    pointer : HTMLElement = document.getElementById("healthPointer")
    health : number = 0

    constructor() {
        let btn = document.getElementById("eatButton");
        let tiredButton = document.getElementById("restButton");
        btn.addEventListener("click", (e:Event) => this.movePointer());
        tiredButton.addEventListener("click", (e:Event) => this.movePointer());   
    }

    movePointer(){
        this.health -= 5
        this.pointer.style.transform = "translate("+this.health+"px)"
        console.log("health: ", this.health)
    }

}