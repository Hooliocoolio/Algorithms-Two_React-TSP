const smallCities = require('./smallcityObj');

const Cities = [
{name:"Denver", x:500, y:500},
{name:"Cheyenne", x:500, y:600},
{name:"Santa Fe", x:500, y:350},
{name:"Salt Lake City", x:300, y:500}
]

const distance_function = (city1, city2) => {
  return Math.sqrt(Math.pow(city1.x-city2.x,2) + Math.pow(city1.y-city2.y,2));
}

const MinPriorityListFactory = () => {
  const minPriorityList = {
    list: [],
    min: undefined,
    queueSize: 2,
    push: function(score, index) {
      for(let i = 0 ; i < this.queueSize ; i++) {
        if( this.list[i] === undefined || score < this.list[i].score) {
          this.list.splice(i,0,{score:score, value:index});
          break;
        }
      }
      while(this.list.length > this.queueSize) {
        this.list.pop();
      }
      this.min = this.list[0].score;
    },
    top: function() {
      return this.list[0];
    },
    pop: function() {
      return this.list.shift();
    },
    getLength: function() {
      return this.list.length;
    }
  }
  return minPriorityList;
}

module.exports = {Cities:Cities,
                 distance_function:distance_function,
                 MinPriorityListFactory:MinPriorityListFactory,
                 smallCities:smallCities
}; 

