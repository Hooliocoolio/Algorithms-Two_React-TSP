const tspLib = require('./ls-tsp-lib');

// Calculates the length of the path of set from position 0 to n-1, plus n-1 back to 0
// Remembers the shortest.
const tsp = {
  shortest_path_length: Number.MAX_VALUE,
  shortest_path: undefined,
  do_TSP(set) {
    let set_path_length = 0;
    for(let i = 0 ; i < set.length-1 ; i++) {
      set_path_length += tspLib.distance_function(set[i], set[i+1]);
    }
    set_path_length += tspLib.distance_function(set[set.length-1], set[0]);
    if(set_path_length < this.shortest_path_length) {
      this.shortest_path_length = set_path_length;
      this.shortest_path = set;
    }
  },
  initialize() {
    this.shortest_path_length = Number.MAX_VALUE;
    this.shortest_path = undefined;
  }
}

const HeapsAlgorithmTSP = (n, set) => {
  if(n === 1) {
    // do_TSP if set members have x property
    if(set[0].x !== undefined) {
      tsp.do_TSP(set);
    }
    else {
      // just output it if not
      console.log(set);
    }
  }
  else {
    for(let i = 0; i < n-1 ; i++) {
      HeapsAlgorithmTSP(n - 1, set);
      if(n%2===0) {
        let x = set[i];
        set[i] = set[n-1];
        set[n-1] = x;
      }
      else {
        let x = set[0];
        set[0] = set[n-1];
        set[n-1] = x;
      }
    }
    HeapsAlgorithmTSP(n - 1, set);
  }
}

// Takes an array of cities {name:"",x:,y:}
const allPermutationsTSP = (set) => {
  tsp.initialize();
  let n = set.length;
  
  if(n>11) {
    return {warning: "n too large for Heaps Algorithm"};
  }
  
  return HeapsAlgorithmTSP(n, set);
}

module.exports = allPermutationsTSP;

