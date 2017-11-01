const tspLib = require('./ls-tsp-lib');

// Recursive kNN: find the k nearest neighbors of start_index, call self, and then
// reduce the results back to the top of stack.
const kNN = (start_index, set, k, last) => {
  // Tail result: return start to end
  if(set.length === 1) {
    let result = {};
    result.length = tspLib.distance_function(set[0], last);
    result.path = [last.name];
    return result;
  }
  let nearest = tspLib.MinPriorityListFactory();
  nearest.queueSize = k;
  let start = set.splice(start_index, 1)[0];
  for(let i = 0 ; i < set.length ; i++) {
    let current_distance = tspLib.distance_function(start, set[i]);
    nearest.push(current_distance, i);
  } 
  let best = tspLib.MinPriorityListFactory();
  best.queueSize = k;
  for(let i = 0 ; i < nearest.getLength() ; i++) {
    let next = nearest.pop();
    let result = kNN(next.value, set.slice(), 1, last);
    result.path.unshift(set[next.value].name);
    best.push(next.score+result.length, result.path);
  }
  let result = best.top();
  return {length: result.score, path: result.value};
}

const kNNTSP = (set, options = {}) => {
  // options processing
  let k = 1;
  if(options.k) {
    k = Number(options.k);
  }
  let startingCityCount = set.length;
  if(options.startingCityCount) {
    startingCityCount = options.startingCityCount;
  }

  // execute kNN on TSP
  let finalResults = tspLib.MinPriorityListFactory();
  for(let i = 0 ; i < startingCityCount ; i++) {
    let data = set.slice();
    let result = kNN(i, data, k, data[i]);
    finalResults.push(result.length, result.path);
  }
  return finalResults.top();
}

module.exports = kNNTSP;

