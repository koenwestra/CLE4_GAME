class Buttonbar {

    private bar:HTMLElement
    private button:HTMLElement
    private img: HTMLImageElement
    private pointer: HTMLElement
    private text: HTMLElement

    private pointerWidth: number 
    public score: number = 50
    private name: string


    constructor(name:string){

        this.name = name

        this.bar = document.createElement("bar")
        this.bar.id = name+"bar"
        let wrapper = document.getElementsByTagName("wrapper")[0]
        wrapper.appendChild(this.bar)

        this.pointer = document.createElement(name+"pointer")
        this.bar.appendChild(this.pointer)

        this.img = document.createElement("img")
        this.img.src = "img/"+name+".png"
        this.pointer.appendChild(this.img)

        this.button = document.createElement("button")
        this.button.id = name+"button"
        let buttonwrapper = document.getElementsByTagName("buttonwrapper")[0]
        buttonwrapper.appendChild(this.button)

        this.img = document.createElement("img")
        this.img.src = "img/"+name+".png"
        this.button.appendChild(this.img)

        this.button.addEventListener("click", (e:Event) => this.movePointer());

        this.getTired()
    }

    public update(){
        this.pointer.innerHTML = this.name+" "+this.score+" / 100"
        this.checkButtonOpacity()
        this.drawPointer()
    }

    private movePointer(){
        if(this.score < 100){
            this.score += 5
        }
    }

    private getTired(){
        setTimeout(() => {
            if(this.score > 0){
                this.score -= 1
            }
            this.getTired()  
        }, 5000)
    }

    private drawPointer(){
        this.pointerWidth = this.score * 4
        this.pointer.style.width = this.pointerWidth+"px";
    }

    private checkButtonOpacity(){
        if(this.score >= 100){
            this.score = 100
            this.button.style.opacity = "0.5";
        }
        else{
            this.button.style.opacity = "unset"
        }
    }
}

