class Sensor{
    constructor(car){
        this.car=car;
        this.rayCount=5;
        this.rayLength=150;
        this.raySpread=Math.PI/2;

        this.rays=[];
        this.readings=[]; //to check if there is border and how far it is
    }

    update(roadBorders){
       this.#castRays();
       this.readings=[];
       for(let i=0;i<this.rays.length;i++){
        this.readings.push(
            this.#getReading(this.rays[i],roadBorders)
        );
       }
    }

    #getReading(ray, roadBorders){
        let touches=[];
        for(let i=0;i<roadBorders.length;i++){
            const touch=getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            if(touch){
                touches.push(touch);
            }
        }

        if(touches.length==0){
            return null;
        }else{
            const offsets=touches.map(e=>e.offset); //goes through all the elements in touches array and gets the offset value as each element in the array has 3 values, on of which is the offset
            const minOffset=Math.min(...offsets); //... operator spreads the array into many values
            return touches.find(e=>e.offset==minOffset);
        }
    }

    #castRays(){
        this.rays=[];
        for(let i=0;i<this.rayCount;i++){
            const rayAngle=lerp(
                this.raySpread/2,
                -this.raySpread/2,
                this.rayCount==1?0.5:i/(this.rayCount-1) //1 ray doesn't work because of undefined division
            )+this.car.angle;

            const start={x:this.car.x, y:this.car.y};
            const end={
                x:this.car.x-
                    Math.sin(rayAngle)*this.rayLength,
                y:this.car.y-
                    Math.cos(rayAngle)*this.rayLength
            };
            this.rays.push([start,end]);
        }

    }

    draw(canvasContext){
        for(let i=0;i<this.rayCount;i++){
            let end=this.rays[i][1];
            if(this.readings[i]){
                end=this.readings[i];
            }
            canvasContext.beginPath();
            canvasContext.lineWidth=2;
            canvasContext.strokeStyle="yellow";
            canvasContext.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            canvasContext.lineTo(
                end.x,
                end.y
            );
            canvasContext.stroke();

            canvasContext.beginPath();
            canvasContext.lineWidth=2;
            canvasContext.strokeStyle="black";
            canvasContext.moveTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            );
            canvasContext.lineTo(
                end.x,
                end.y
            );
            canvasContext.stroke();
        }
    }
}