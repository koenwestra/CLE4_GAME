// Bubble is created in foreground with x and y posistion
    class Bubble { 
        private yposition:number 
        private xposition:number
        private element:HTMLElement;

        
    
        constructor() { 
            let forground = document.getElementsByTagName("forground")[0]
            this.element = document.createElement("bubble")
            forground.appendChild(this.element)
         
            
            this.xposition = this.randomNumber(0, window.innerWidth-130)
            this.yposition = this.randomNumber(0, window.innerHeight-130)
    
    
        }
        public update(){ 
           
            this.element.style.left = this.xposition + "px";
            this.element.style.top = this.yposition + "px";
            
           

        }

        public dead() {  
           (this.element.classList.add("dead"), 5000)
      
        
        }
       

    
        randomNumber(min:number, max:number) {
            let a:number = Math.floor(Math.random() * (max - min + 1) ) + min;
            return a
        }

        public getRectangle() {
            return this.element.getBoundingClientRect()
    }
    
    }
    
