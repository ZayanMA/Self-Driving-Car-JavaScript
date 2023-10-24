const canvas=document.getElementById("myCanvas");

canvas.width=200;

const canvasContext = canvas.getContext("2d");
const road=new Road(canvas.width/2, canvas.width*0.9);
const car =new Car(road.getLaneCenter(1),100,30,50,"KEYS");
const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY", 2)
];


animate();

function animate(){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]); //dont want traffic to be damaged by other traffic and cause blockades
    }
    car.update(road.borders,traffic);

    canvas.height=window.innerHeight;

    canvasContext.save();
    canvasContext.translate(0,-car.y+canvas.height*0.7);

    road.draw(canvasContext);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(canvasContext);
    }
    car.draw(canvasContext);

    canvasContext.restore();
    requestAnimationFrame(animate); //Calls animate many times to gives animation effect

}