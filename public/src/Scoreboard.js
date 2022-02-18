class Scoreboard{
    constructor(width, height, score){
        let x = 100 * (width/400)
        let y = height*2/3 + 50
        let pl = x / 3

        let scoreWidth = new SevenSegment(0, 0, x, 0).width *2
        let free = width - scoreWidth * 2

        pl = free / 3

        let scoreA = score[0]
        let scoreB = score[1]

        new SevenSegment(pl + 0, y, x, Math.floor(scoreA/10)).draw()
        new SevenSegment(pl + x * 2/3, y, x, scoreA%10).draw()    
        
        new SevenSegment((pl*2) + x * 4/3, y, x, Math.floor(scoreB/10)).draw()    
        new SevenSegment((pl*2) + x * 6/3, y, x, scoreB%10).draw()    

        stroke(255, 53, 46)
        strokeWeight(1);
        noFill()
        rect(pl + 5, y, scoreWidth, x)

        noStroke()

        stroke(255, 53, 46)
        strokeWeight(1);
        fill(0)
        rect(pl + 5, y + x, scoreWidth, 100)

        fill(255)
        textSize(64);
        text('HOME', pl + (scoreWidth/3 - 10), y + x + 70);

        stroke(255, 53, 46)
        strokeWeight(1);
        noFill()
        rect(pl * 2 + 10 + scoreWidth , y, scoreWidth, x)

        stroke(255, 53, 46)
        strokeWeight(1);
        fill(0)
        rect(pl * 2 + 10 + scoreWidth, y + x, scoreWidth, 100)
        noStroke()

        fill(255)
        textSize(64);
        text('AWAY', (pl*2) + (x*4/3) + (scoreWidth/3 + 10), y + x + 70);

    }

    getFree(){

    }
}