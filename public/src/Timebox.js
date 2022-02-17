class Timebox{
    pl
    x
    y
    timer = new Timer()

    constructor(timer){
        this.x = 100 * (canvasWidth/500)
        this.y = canvasHeight/3
        this.pl = this.x / 3
    
        this.timer = timer

        this.draw()

    }
    draw(){
        let { s1, s2, m1, m2, h1, h2, counter1, counter2 } = this.timer.mappingDisplay()

        new SevenSegment(this.pl + 0, this.y, this.x, h1).draw()
        new SevenSegment(this.pl + this.x * 2/3, this.y, this.x, h2).draw()
    
        new Divider(this.pl + this.x * 2/3 * 2, this.y, this.x, counter1).draw()
    
        new SevenSegment(this.pl + this.x * 2/3 * 2 + (this.x/5), this.y, this.x, m1).draw()
        new SevenSegment(this.pl + this.x * 2/3 * 3 + (this.x/5), this.y, this.x, m2).draw()
    
        new Divider(this.pl + this.x * 2/3 * 4 + (this.x/5), this.y, this.x, counter2).draw()
    
        new SevenSegment(this.pl + this.x * 2/3 * 4 + (2*this.x/5), this.y, this.x, s1).draw()
        new SevenSegment(this.pl + this.x * 2/3 * 5 + (2*this.x/5), this.y, this.x, s2).draw()
    
    }
}