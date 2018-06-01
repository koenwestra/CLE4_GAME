class Game {
    
    private currentscreen: Proterolevel | Fishlevel | Lizardlevel 

    constructor() {
        this.currentscreen = new Fishlevel(this)
       
        this.gameLoop()
    }

    private gameLoop():void{
        // gamescreen updaten
        this.currentscreen.update()
        requestAnimationFrame(() => this.gameLoop())
    }

    public emptyScreen(){
        let forground = document.getElementsByTagName("forground")[0]
        forground.innerHTML = ""
    }

    public showScreen(screen:Proterolevel |  Fishlevel | Lizardlevel){
        this.currentscreen = screen
    }

}



// load
window.addEventListener("load", function () {
    new Game()
});