class Timebox{
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



    constructor(timer, width, height){
        let areaWidth = width
        let areaHeight = height

        this.length = 100 * (areaWidth/650)

        this.timer = timer

        this.width = parseInt(new SevenSegment(0, 0, this.length, 0).width * 6) + parseInt(new Divider(0, 0, this.length, 0).width*2)
        this.height = this.length
 
        this.px = (areaWidth - this.width)/2
        this.py = (areaHeight - this.height)/2

        this.x = 0 + this.px
        this.y = 0 + this.py

        this.draw()


    }

    draw(){

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
}