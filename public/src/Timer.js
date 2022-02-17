class Timer{

    counter = 0

    constructor(counter){
        // console.log(this.parseTime())
        this.counter = counter;
    }

    state(function1, function2){
        if(this.getHour() == 0 && this.getMinute() == 0 && this.getSecond() == 0 && this.getMilisecond() == 0){
            function1()
        }
        else if(this.counter == -1){
            function2()
        }
    
    }

    getHour(){
        return Math.floor((this.counter % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    }

    getMinute(){
        return Math.floor((this.counter % (1000 * 60 * 60)) / (1000 * 60));
    }

    getSecond(){
        return Math.floor((parseInt(this.counter) % (1000 * 60)) / 1000)
    }

    getMilisecond(){
        return Math.floor((parseInt(this.counter) / 100 % 10) );
    }

    parseTime(){
        return {
            hours: this.getHour(),
            minutes: this.getMinute(),
            seconds: this.getSecond(),
            miliseconds:this.getMilisecond()
        }
    }

    setCounter(value){
        this.counter = value
    }

    mappingDisplay(){
        if(this.getHour() == 0 & this.getMinute() == 0){
            return {
                s1: Math.floor(this.getMilisecond()),
                s2: null,            
                m1: Math.floor(this.getSecond() / 10),
                m2: (this.getSecond() % 10),                
                h1: null,
                h2: null,
                counter1: 1,
                counter2: (Math.ceil((parseInt(this.counter) % (1000 * 60)) / 1000) * -1)
            }
        }else if(this.counter == -1){
            return{
                s1: 0,
                s2: null,
                m1: 0,
                m2: 0,
                h1: null,
                h2: null,
                counter1: 1,
                counter2: -1
            }


        }else{
            return{
                s1: Math.floor(this.getSecond() / 10),
                s2: this.getSecond() % 10,
                m1: Math.floor(this.getMinute() / 10),
                m2: this.getMinute() % 10,
                h1: Math.floor(this.getHour() / 10),
                h2: (this.getHour() % 10),
                counter1: Math.ceil((parseInt(this.counter) % (1000 * 60)) / 1000),
                counter2: Math.ceil((parseInt(this.counter) % (1000 * 60)) / 1000)
            }
        }
    }
}