// First level is created with paddle, bubble and score 
class Proterolevel {
    private paddle:Paddle
    private bubbles:Bubble[]
    private scoreElement:Element
    private score:number = -2
    game: Game

    

    constructor(g: Game) {
        let forground = document.getElementsByTagName("forground")[0]
        this.game = g
        this.scoreElement = document.createElement('score')
        forground.appendChild(this.scoreElement)
        this.scoreElement.innerHTML = "Score: 0"
        this.bubbles = []
        document.body.style.backgroundColor = "blue";
        
        
        for(let i = 0; i<10; i++) { 
            let d = new Bubble()
            this.bubbles.push(d)
           
          
        }
      
    
        this.paddle = new Paddle()
        this.paddle
        this.update()
  
        }
   
    public update(){
        for (let b of this.bubbles){
            let hit = this.checkCollision(this.paddle.getRectangle(), b.getRectangle())
            if(hit){
                b.dead();
                this.score++
                this.scoreElement.innerHTML = "Score: "+ this.score
            }
            if(this.score == 100) {  
               this.game.emptyScreen()
               this.game.showScreen(new Fishlevel(this.game))
            }
            b.update()
        }

        this.paddle.update()
        
 
}    


public checkCollision(a: ClientRect, b: ClientRect): boolean {
    return (a.left <= b.right &&
        b.left <= a.right &&
        a.top <= b.bottom &&
        b.top <= a.bottom)
}
   } 
