class Road{
    constructor(x,width,laneCount=3) {
        this.x = x;
        this.width = width;
        this.laneCount=laneCount;

        this.left=x-width/2;
        this.right=x+width/2;
        
        const infinity=10000000; //making it a big value becuse using javascript's infinity creates problems when drawing
        this.top=-infinity;
        this.bottom=+infinity;

        const topLeft={x:this.left,y:this.top};
        const topRight={x:this.right,y:this.top};
        const bottomLeft={x:this.left,y:this.bottom};
        const bottomRight={x:this.right,y:this.bottom};
        this.borders=[ //allow for borders to be called in the future for collision detection
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ];
    }

    getLaneCenter(laneIndex){
        const laneWidth = this.width/this.laneCount;
        return this.left+laneWidth/2+
        Math.min(laneIndex,this.laneCount-1)*laneWidth;
    }

    draw(canvasContext){
        canvasContext.lineWidth=5;
        canvasContext.strokeStyle="white";

        for(let i=1; i<=this.laneCount-1; i++){
            const x=lerp(
                this.left,
                this.right,
                i/this.laneCount
            );

            canvasContext.setLineDash([20,20]);
            canvasContext.beginPath();
            canvasContext.moveTo(x,this.top);
            canvasContext.lineTo(x,this.bottom);
            canvasContext.stroke();
        }

        canvasContext.setLineDash([]);
        this.borders.forEach(border=>{
            canvasContext.beginPath();
            canvasContext.moveTo(border[0].x,border[0].y);
            canvasContext.lineTo(border[1].x,border[1].y);
            canvasContext.stroke();
        });
    }
}
