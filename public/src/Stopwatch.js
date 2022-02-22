class Stopwatch{
    px
    py

    length

    x
    y
    
    positionX
    positionY
    width
    height
    timer 

    onFirstPanel
    onSecondPanel

    onPause
    onPlay

    constructor(timer, width, height){
        let areaWidth = width
        let areaHeight = height / 2

        this.onFirstPanel = false
        this.onSecondPanel = false
        

        this.length = 125 * (areaWidth/650)

        this.timer = timer

        this.width = parseInt(new SevenSegment(0, 0, this.length, 0).width * 6) + parseInt(new Divider(0, 0, this.length, 0).width*2)
        this.height = this.length
 
        this.px = (areaWidth - this.width)/2
        this.py = (areaHeight - this.height)/2

        this.x = 0 + this.px
        this.y = 0 + this.py



    }
    draw(){
        this.drawTimer()
        this.drawPanel()
    }

    drawTimer(){

        stroke(255, 53, 46)
        strokeWeight(1);
        noFill()
        rect(this.x, this.y, this.width, this.height)
        noStroke()
        

        let { s1, s2, m1, m2, h1, h2, counter1, counter2 } = this.timer.mappingDisplay()

        new SevenSegment(this.px + 0, this.y, this.length, h1).draw()
        new SevenSegment(this.px + this.length * 2/3, this.y, this.length, h2).draw()

        new Divider(this.px + this.length * 2/3 * 2, this.y, this.length, counter1).draw()

        new SevenSegment(this.px + this.length * 2/3 * 2 + (this.length/5), this.y, this.length, m1).draw()
        new SevenSegment(this.px + this.length * 2/3 * 3 + (this.length/5), this.y, this.length, m2).draw()

        new Divider(this.px + this.length * 2/3 * 4 + (this.length/5), this.y, this.length, counter2).draw()

        new SevenSegment(this.px + this.length * 2/3 * 4 + (2*this.length/5), this.y, this.length, s1).draw()
        new SevenSegment(this.px + this.length * 2/3 * 5 + (2*this.length/5), this.y, this.length, s2).draw()
    
 
    }

    drawPanel(){

       
        this.y += height / 2




        let innerPx = this.width / (2 * 10)


        let innerWidth = (this.width - (innerPx * 2) ) / 2
        let innerHeight = this.height / 2

        let gap = innerPx / 2

        stroke(0)
        fill(0)
        rect(this.x , this.y, this.width, innerHeight)

        stroke(255, 53, 46)
        strokeWeight(1);

        if(this.onPause){
            
            if(this.hoverPanel(this.x + innerPx, this.y, innerWidth, innerHeight)){
                fill(255, 53, 46)
                rect(this.x + innerPx, this.y, innerWidth - gap, innerHeight)

                fill(255)
                text('Resume', this.x + innerPx + (innerWidth/3), this.y + 15 + innerHeight / 2)

                this.onFirstPanel = true
            }else{
                fill(0) 
                rect(this.x + innerPx, this.y, innerWidth - gap, innerHeight)

                fill(255, 53, 46)
                text('Resume', this.x + innerPx + (innerWidth/3), this.y + 15 + innerHeight / 2)

                this.onFirstPanel = false
            }

            if(this.hoverPanel(this.x + innerPx + innerWidth, this.y, innerWidth, innerHeight)){
                fill(255, 53, 46)
                rect(this.x + innerPx + innerWidth + gap, this.y, innerWidth - gap, innerHeight)
                
                fill(255)
                text('Reset', this.x + innerPx + gap + innerWidth + (innerWidth/3), this.y + 15 + innerHeight / 2)
                
                this.onSecondPanel = true
            }else{
                fill(0) 
                rect(this.x + innerPx + innerWidth + gap, this.y, innerWidth - gap, innerHeight)
                
                fill(255, 53, 46)
                text('Reset', this.x + innerPx + gap + innerWidth + (innerWidth/3), this.y + 15 + innerHeight / 2)
                
                this.onSecondPanel = false
            }    
        }else{

            innerPx = this.width/4
            let textWrite = this.onPlay ? 'Pause' : 'Play'
            
            if(this.hoverPanel(this.x + innerPx, this.y, innerWidth, innerHeight)){
                fill(255, 53, 46)
                rect(this.x + innerPx, this.y, innerWidth - gap, innerHeight)

                fill(255)
                text(textWrite, this.x + innerPx + innerWidth/3, this.y + 15 + innerHeight / 2)
                this.onFirstPanel = true
            }else{
                fill(0) 
                rect(this.x + innerPx, this.y, innerWidth - gap, innerHeight)

                fill(255, 53, 46)
                text(textWrite, this.x + innerPx + innerWidth/3, this.y + 15 + innerHeight / 2)
                
                this.onFirstPanel = false
            }

            fill(0) 
            stroke(0)
            rect(this.x + innerPx + innerWidth + gap, this.y, innerWidth - gap, innerHeight)
        }
       

        noStroke()
    }

    hoverPanel(x, y, width, height){
        if (mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height){
            // console.log("in")
            return true;
        } else {
            // console.log("out")
            return false;
            
        }
    }
}