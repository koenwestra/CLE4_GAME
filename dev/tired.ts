class Tired {

    pointer : HTMLElement = document.getElementById("tiredPointer")
    tired : number = 0

    constructor() {
        let tiredButton = document.getElementById("restButton");
        tiredButton.addEventListener("click", (e:Event) => this.movePointer());    
    }

    movePointer(){
        this.tired -= 5        
        this.pointer.style.transform = "translate("+this.tired+"px)"
        console.log("Tired: ", this.tired)
    }

}