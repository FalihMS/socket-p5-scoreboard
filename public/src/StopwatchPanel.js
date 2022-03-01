class PanelStopwatch{
    px
    py

    length

    x
    y
    
    positionX
    positionY
    width
    height

    state

    padding = 25


    constructor(width, height){
        let areaWidth = width
        let areaHeight = height/2

        this.length = 100 * (areaWidth/650)

        this.width = parseInt(new SevenSegment(0, 0, this.length, 0).width * 6) + parseInt(new Divider(0, 0, this.length, 0).width*2)
        this.height = this.length
 
        this.px = (areaWidth - this.width)/2
        this.py = areaHeight + (areaHeight - this.height)/2 * 0

        this.x = 0 + this.px
        this.y = 0 + this.py

        this.state = false

    }

    setState(state){
        this.state = state
        return this
    }

    hoverButton(side){
        if(side == 0 && this.state == 'pause'){
            if((this.x < mouseX) && (this.width / 2 - this.padding + this.x > mouseX)&&(this.y < mouseY) && (this.height/2 + this.y > mouseY)){
                return true
            }
            else{
                return false
            }
        }else if(side == 1){
            if((this.x + this.width / 2 + this.padding * 2 < mouseX) && ((this.x + this.width / 2 + this.padding * 2) + (this.width / 2 - this.padding * 2) > mouseX)&&(this.y < mouseY) && (this.height/2 + this.y > mouseY)){
                return true
            }
            else{
                return false
            }
        }else{
            return false
        }
    }

    drawButton(x, y, width, height){
        strokeWeight(1);
        noFill()
        rect(x, y, width, height)
    }

    draw(){
        
        fill(0)
        rect(this.x - this.padding, this.y - this.padding, this.width + (this.padding * 2), this.height + (this.padding * 2))

        stroke(255, 53, 46)
        strokeWeight(1);
        noFill()
        if(this.state == 'pause'){
            this.drawButton(this.x, this.y, this.width / 2 - this.padding, this.height/2)

            textSize(48);
            fill(255, 53, 46);
            text('RESUME', this.x + (this.width / 2 )/3, this.y + (this.height/2)/2 + 10);
            stroke(255, 53, 46)

            textSize(48);
            fill(255, 53, 46);
            text('STOP', (this.x + this.width / 2 + this.padding * 2) + (this.width / 2 )/3, this.y + (this.height/2)/2 + 10);
        }else{
            
            if(this.state == 'play'){
                stroke(255, 53, 46)
                textSize(48);
                fill(255, 53, 46);
                text('PAUSE', (this.x + this.width / 2 + this.padding * 2) + (this.width / 2 )/3, this.y + (this.height/2)/2 + 10);
            }else if(this.state == 'stop'){
                stroke(255, 53, 46)
                textSize(48);
                fill(255, 53, 46);
                text('PLAY', (this.x + this.width / 2 + this.padding * 2) + (this.width / 2 )/3, this.y + (this.height/2)/2 + 10);
            }
        }

        
        this.drawButton(this.x + this.width / 2 + this.padding * 2, this.y, this.width / 2 - this.padding * 2, this.height/2)
        noStroke() 
    }
}