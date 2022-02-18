class Segment{
    
    
    SHAPE_TRIANGLE = 'TRIANGLE'
    SHAPE_RECTANGLE = 'RECTANGLE'

    COLOR_ON = [255, 53, 46]
    COLOR_OFF = [71, 71, 71]

    width = 0
    height = 0
    positionX = 0
    positionY = 0
    lightStatus
    direction

    constructor(width, height, positionX, positionY, direction, lightStatus){
        this.width = width
        this.height = height
        this.positionX = positionX
        this.positionY = positionY
        this.lightStatus = lightStatus
        this.direction = direction
    }

    getColor(){
        if(this.lightStatus){
            return this.COLOR_ON
        }else{
            return this.COLOR_OFF
        }
    }

    normalizeX(direction){
        if(this.direction == 'ver'){
            return this.positionX  - (this.width/2) 
        }else if(this.direction == 'hor'){
            return this.positionX + (this.width/2)
        }
    }

    normalizeY(){
        if(this.direction == 'ver'){
            return this.positionY + (this.width/2)
        }else if(this.direction == 'hor'){
            return this.positionY - (this.width/2)
        }
    }

    normalizeWidth(direction){
        if(this.direction == 'ver'){
            return this.width
        }else if(this.direction == 'hor'){
            return this.height - this.width
        }
    }

    normalizeHeight(){
        if(this.direction == 'ver'){
            return this.height - this.width
        }else if(this.direction == 'hor'){
            return this.width
        }
    }

    calculateShape(direction){
        if(this.direction == 'ver'){
            return this.calculateverShape()
        }else if(this.direction == 'hor'){
            return this.calculatehorShape()
        }
    }

    calculatehorShape(){
        return [
            {
                x1: this.positionX,
                y1: this.positionY,
                x2: this.normalizeX(),
                y2: this.normalizeY() + this.width,
                x3: this.normalizeX(),
                y3: this.normalizeY()
            },
            {
                x1: this.normalizeX(),
                y1: this.normalizeY(),
                x2: this.normalizeWidth(),
                y2: this.normalizeHeight(),
            },
            {
                x1: this.positionX + this.width + this.normalizeWidth(),
                y1: this.positionY,
                x2: this.normalizeX() + this.normalizeWidth(),
                y2: this.normalizeY() + this.width,
                x3: this.normalizeX() + this.normalizeWidth(),
                y3: this.normalizeY()
            }
        ]
    }

    calculateverShape(){
        return [
            {
                x1: this.normalizeX(),
                y1: this.normalizeY(),
                x2: this.positionX,
                y2: this.positionY,
                x3: this.normalizeX() + this.normalizeWidth(),
                y3: this.normalizeY()
            },
            {
                x1: this.normalizeX(),
                y1: this.normalizeY(),
                x2: this.normalizeWidth(),
                y2: this.normalizeHeight(),
            },
            {
                x1: this.normalizeX(),
                y1: this.normalizeY() + this.normalizeHeight(),
                x2: this.normalizeX() + (this.normalizeWidth() / 2),
                y2: this.normalizeY() + this.normalizeHeight() + (this.normalizeWidth() / 2),
                x3: this.normalizeX() + this.normalizeWidth(),
                y3: this.normalizeY() + this.normalizeHeight()
            }
        ]
    }


    draw(){
        this.drawShape(this.SHAPE_TRIANGLE, this.calculateShape(this.direction)[0])
        this.drawShape(this.SHAPE_RECTANGLE, this.calculateShape(this.direction)[1])
        this.drawShape(this.SHAPE_TRIANGLE, this.calculateShape(this.direction)[2])
    }

    coloring(){
        if(this.lightStatus){
            fill(this.COLOR_ON[0], this.COLOR_ON[1], this.COLOR_ON[2])
            
        }else{
            fill(this.COLOR_OFF[0], this.COLOR_OFF[1], this.COLOR_OFF[2])
            
        }
    }

    drawShape(shape, coordinate){
        this.coloring();
        if(shape == 'TRIANGLE'){
          const { x1, y1, x2, y2, x3, y3 } = coordinate
          triangle(x1, y1, x2, y2, x3, y3)
        }else if(shape == 'RECTANGLE'){
          
          const { x1, y1, x2, y2 } = coordinate
          rect(x1, y1, x2, y2);
        }
    }
}

class SevenSegment{

    positionX = 0
    positionY = 0
    width = 0
    height = 0
    gap = 0    

    length = 0
    number = 0
    gap = 0

    constructor(positionX, positionY, length, number){
        if(number == undefined){
            this.number = -1;

        }else{
            this.number = number;

        }
        this.length = length

        this.positionX = positionX
        this.positionY = positionY

        this.width = length * 2 / 3
        this.height = length

        this.gap = 5
    }

    getHeight(){
        return this.length / 3
    }

    getWidth(){
        return this.getHeight() / 4
    }

    mappingPattern(number){
        const mappingNumber = [
            [1,1,1,0,1,1,1],
            [0,0,1,0,0,0,1],
            [0,1,1,1,1,1,0],
            [0,1,1,1,0,1,1],
            [1,0,1,1,0,0,1],
            [1,1,0,1,0,1,1],
            [1,1,0,1,1,1,1],
            [0,1,1,0,0,0,1],
            [1,1,1,1,1,1,1],
            [1,1,1,1,0,1,1],
        ]

        

        if(number >= 0 && number <= 9){
            return mappingNumber[number]
        }else{
            return [0,0,0,0,0,0,0];
        }

        
    }
    draw(){

        // stroke(255, 204, 0);
        // strokeWeight(1);
        // fill(0, 0, 0)
        // rect(this.positionX, this.positionY, this.width, this.height)

        // noStroke()
        let mapping = this.mappingSegment()

        mapping.forEach((segment)=>{
            new Segment(segment.width, segment.height, segment.positionX, segment.positionY, segment.direction, segment.lightOn).draw();
            
        })
    }

    mappingSegment(){
        let x = (this.positionX + (this.length / 8)) + (this.getWidth() / 2);
        let y = (this.positionY + (this.length / 10)) + (this.getWidth() / 2);

        return[
            {
                width: this.getWidth(),
                height: this.getHeight(),
                positionX: x,
                positionY: y,
                direction: 'ver',
                lightOn: this.mappingPattern(this.number)[0]
            },
            {
                width: this.getWidth(),
                height: this.getHeight(),
                positionX: x + this.gap,
                positionY: y - this.gap,
                direction: 'hor',
                lightOn: this.mappingPattern(this.number)[1]
            },
            {
                width: this.getWidth(),
                height: this.getHeight(),
                positionX: x + (2 * this.gap) + this.getHeight(),
                positionY: y,
                direction: 'ver',
                lightOn: this.mappingPattern(this.number)[2]
            },
            {
                width: this.getWidth(),
                height: this.getHeight(),
                positionX: x + this.gap,
                positionY: y + this.getHeight() + this.gap,
                direction: 'hor',
                lightOn: this.mappingPattern(this.number)[3]
            },
            {
                width: this.getWidth(),
                height: this.getHeight(),
                positionX: x,
                positionY: y + this.getHeight() + (2 * this.gap),
                direction: 'ver',
                lightOn: this.mappingPattern(this.number)[4]
            },
            {
                width: this.getWidth(),
                height: this.getHeight(),
                positionX: x + this.gap,
                positionY: y + (3 * this.gap) + (2 * this.getHeight()),
                direction: 'hor',
                lightOn: this.mappingPattern(this.number)[5]
            },
            {
                width: this.getWidth(),
                height: this.getHeight(),
                positionX: x + (2 * this.gap) + this.getHeight(),
                positionY: y + this.getHeight() + (2 * this.gap),
                direction: 'ver',
                lightOn: this.mappingPattern(this.number)[6]
            },
        ]
    }


}

class Divider{

    
    COLOR_ON = [255, 53, 46]
    COLOR_OFF = [71, 71, 71]

    positionX = 0
    positionY = 0

    width = 0
    height = 0

    length = 0
    counter = 0    

    constructor(positionX, positionY, length, counter){
        this.positionX = positionX
        this.positionY = positionY
        
        this.length = length
        this.counter = counter    

        this.width = length/5
        this.height = length
    
    
    }

    calculate(){
        return{
            rect1:{
                x1: this.positionX + this.length/20,
                y1: this.positionY + (this.length/2) - (2 * this.length/10),
                x2: (this.length/20)*2,
                y2: (this.length/10)
            },
            rect2:{
                x1: this.positionX + this.length/20,
                y1: this.positionY + (this.length/2) + (this.length/10),
                x2: (this.length/20) * 2,
                y2: (this.length/10)
            }
        }
    }

    drawTop(){
        const { x1, y1, x2, y2 } = this.calculate().rect1
        rect(x1, y1, x2, y2);
    }

    drawBottom(){
        const { x1, y1, x2, y2 } = this.calculate().rect2
        rect(x1, y1, x2, y2);

    }

    coloring(lightStatus){
        if(lightStatus){
            fill(this.COLOR_ON[0], this.COLOR_ON[1], this.COLOR_ON[2])
            
        }else{
            fill(this.COLOR_OFF[0], this.COLOR_OFF[1], this.COLOR_OFF[2])
            
        }
    }

    draw(){
        // fill(0, 0, 255)
        // rect(this.positionX, this.positionY, this.width, this.height)

        noStroke();
        if(this.counter >= 0){

            let lightOn = this.counter % 2 == 0
            this.coloring(lightOn)

            this.drawTop()
            this.drawBottom()
        }else{
            this.coloring(false)
            this.drawTop()

            this.coloring(true)
            this.drawBottom()

        }
    }
}