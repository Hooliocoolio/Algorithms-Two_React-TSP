import React from 'react';

let kNNTsp = require('./tsp/ls-knn-tsp');
let libTsp = require('./tsp/ls-tsp-lib');

let canvasContainerStyle = {
  margin: "10 auto"
}
let canvasStyle = {
  width: "1000px",
  height: "1000px"
}

class TSPCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circleX: 50,
      circleY: 50,
      minX: undefined,
      maxX: undefined,
      minY: undefined,
      maxY: undefined
    };
  }
  drawLine(start,end) {
    this.context.beginPath();
    this.context.lineWidth = 5;
    this.context.moveTo(start.x,start.y);
    this.context.lineTo(end.x,end.y);
    this.context.stroke();
  }
  updateTSPVertices(cities) {
    // when the TSP has a set of vertices (cities), draw them as small
    // circles here.
    cities.forEach((city) => {
      let r = Math.floor(Math.random()*255);
      let g = Math.floor(Math.random()*255);
      let b = Math.floor(Math.random()*255);
      this.context.fillStyle = 'rgba('+r+','+g+','+b+',1.0)';
      this.context.beginPath();
      this.context.lineWidth = 5;
      this.context.arc(city.x,city.y,10,0,2*Math.PI,false);
      this.context.fill();
      this.context.stroke();
    });
  }
  updateTSPPath(cityMap,path) {
    // when the TSP has computed the "best" path, draw it here along the circles
    for(let i = 0 ; i < path.length-1 ; i++) {
      this.drawLine(cityMap[path[i]], cityMap[path[i+1]]);
    }
    this.drawLine(cityMap[path[path.length-1]],cityMap[path[0]]);
  }
  drawTsp() {
    // promisify me :)
    let result = kNNTsp(libTsp.Cities);
    let cities = libTsp.Cities;
    // convert to hash for easy lookup
    let cityMap = {};
    let path = result.value;
    cities.forEach((city) => {
      cityMap[city.name] = {x:city.x, y:city.y};
    });
    this.updateTSPPath(cityMap, path);
    this.updateTSPVertices(cities);
  }
  drawCircle(position) {
    this.context.beginPath();
    this.context.arc(this.state.circleX,this.state.circleY,20,0,2*Math.PI,false);
    this.context.fill();
    this.context.stroke();
    this.state.circleX += 20;
    this.state.circleY += 20;
  }
  click() {
    this.drawTsp();
  }
  determineScalingFrom(cities) {
    this.minX = Number.MAX_VALUE;
    this.maxX = Number.MIN_VALUE;
    this.minY = Number.MAX_VALUE;
    this.maxY = Number.MIN_VALUE;
    for(let i = 0 ; i < cities.length ; i++) {
      if(cities[i].x < this.minX) this.minX = cities[i].x;
      if(cities[i].x > this.maxX) this.maxX = cities[i].x;
      if(cities[i].y < this.minY) this.minY = cities[i].y;
      if(cities[i].y > this.maxY) this.maxY = cities[i].y;
    }
  }
  componentDidMount() {
    let cities = libTsp.Cities;
    this.updateTSPVertices(cities);
    this.determineScalingFrom(libTsp.smallCities.Cities);
  }
  render() {
    return (<div style={canvasContainerStyle}>
             <canvas id="TSP" ref={(c) => this.context = c.getContext('2d')} height={canvasStyle.height} width={canvasStyle.width} style={canvasStyle} onClick={() => this.click()} />
           </div>
    );
  }
}

const App = (props) => {
  return <div>
           <TSPCanvas />
         </div>
}

export default App;
