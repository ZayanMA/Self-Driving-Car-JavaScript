const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=250;

const carCTX = carCanvas.getContext("2d");
const networkCTX = networkCanvas.getContext("2d");
const road=new Road(carCanvas.width/2, carCanvas.width*0.9);
const car =new Car(road.getLaneCenter(1),100,30,50,"AI");
const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY", 2)
];


animate();

function animate(){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]); //dont want traffic to be damaged by other traffic and cause blockades
    }
    car.update(road.borders,traffic);

    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    carCTX.save();
    carCTX.translate(0,-car.y+carCanvas.height*0.7);

    road.draw(carCTX);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCTX, "yellow");
    }
    car.draw(carCTX, "green");

    carCTX.restore();

    Visualizer.drawNetwork(networkCTX,car.brain);
    requestAnimationFrame(animate); //Calls animate many times to gives animation effect
}