// "use strict";

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
// exports.Dijkstra = Dijkstra;
// var Data;
// var Queue = [];
// var visited = [];
// var gotit; //Implementing Dijkstra Visualization

// function Dijkstra(arrayData, startNode, endNode, SPEED) {
//   Data = new Array(2);
//   Data = arrayData;
//   Queue = [];
//   visited = [];
//   var f1,
//       f2 = false;
//   gotit = false;

//   for (var i = 0; i < Data.length; i++) {
//     for (var j = 0; j < Data.length; j++) {
//       if (Data[i][j].id == startNode) {
//         startNode = Data[i][j];
//         f1 = true;
//       }

//       if (Data[i][j].id == endNode) {
//         endNode = Data[i][j];
//         f2 = true;
//       }
//     }

//     if (f1 && f2) {
//       break;
//     }
//   } //Starting node to 0


//   startNode.distance = 0; //Adding element to the queue

//   for (var _i = 0; _i < Data.length; _i++) {
//     for (var _j = 0; _j < Data.length; _j++) {
//       Queue.push(Data[_i][_j]);
//     }
//   }

//   while (Queue.length != 0) {
//     var min = getMinDistance(Queue); //Getting the minimum path

//     if (min == undefined) {
//       break;
//     }

//     Queue = Queue.filter(function (item) {
//       return item !== min;
//     }); //Removing the current from Queue

//     for (var _i2 = 0; _i2 < min.neighbors.length; _i2++) {
//       //Looping through the neighbours of min
//       if (Queue.indexOf(min.neighbors[_i2]) >= 0) {
//         //Checking if it's neighbour is in the queue
//         var fun = min.distance + 1; //1 is the weighted

//         if (fun < min.neighbors[_i2].distance) {
//           min.neighbors[_i2].distance = fun;
//           min.neighbors[_i2].path = min.id; //Path-Find

//           if (min.neighbors[_i2].id == endNode.id) {
//             gotit = true;
//             break;
//           } //====================Animate


//           if (!gotit) {
//             visited.push(min.neighbors[_i2].id);
//           } //=========================

//         }
//       }
//     }
//   } //console.log(endNode);
//   //console.log(startNode);
//   //console.log(Queue);
//   //console.log(visited);


//   djanimate(visited, startNode, endNode, gotit, SPEED);
// }

// function getMinDistance(queue) {
//   //Get minimum Distance
//   var min = Infinity;
//   var id;

//   for (var i = 0; i < Queue.length; i++) {
//     if (Queue[i].distance < min) {
//       min = Queue[i].distance;
//       id = Queue[i];
//     }
//   }

//   return id;
// } //Animate


// function djanimate(data, start, stop, get, speed) {
//   var _loop = function _loop() {
//     var x = data[i]; //console.log(x+"==="+stop);

//     setTimeout(function () {
//       $("#" + x).addClass("animate"); //console.log(x);
//     }, (i + 1) * 20 * speed);
//   };

//   //console.log(data);
//   //console.log(stop);
//   //console.log(stop);
//   for (var i = 0; i < data.length; i++) {
//     _loop();
//   }

//   if (!get) {
//     setTimeout(function () {
//       alert("Element cannot be found!");
//       $("#wall").removeAttr('disabled');
//       $("#clear").removeAttr('disabled');
//       $("#size").removeAttr('disabled');
//       $("#speed").removeAttr('disabled');
//       $("#start").removeAttr('disabled');
//     }, (i + 3) * 20 * speed);
//   }

//   if (gotit) {
//     pathAnimate(start, stop, i, speed);
//   }
// }

// function pathAnimate(start, stop, frames, speed) {
//   var nodes = frames; //console.log(start);
//   //console.log(stop);
//   //console.log(frames);

//   var x = stop;
//   var trace = [];

//   while (x != start) {
//     var path = x.path;
//     trace.push(path);

//     for (var i = 0; i < Data.length; i++) {
//       for (var j = 0; j < Data.length; j++) {
//         if (Data[i][j].id == path) {
//           x = Data[i][j];
//         }
//       }
//     }
//   } //console.log(trace);


//   var _loop2 = function _loop2(_i3) {
//     setTimeout(function () {
//       $("#" + trace[_i3]).addClass("path"); //console.log("Trace = " + trace[i]);
//     }, ++frames * 20 * speed);
//   };

//   for (var _i3 = trace.length - 2; _i3 >= 0; _i3--) {
//     _loop2(_i3);
//   } //console.log("Entered");


//   setTimeout(function () {
//     alert("Element Found! \nPath Distance : " + (trace.length - 1) + "\nNode visited after searching " + nodes + " nodes.");
//     $("#wall").removeAttr('disabled');
//     $("#clear").removeAttr('disabled');
//     $("#size").removeAttr('disabled');
//     $("#speed").removeAttr('disabled');
//     $("#start").removeAttr('disabled');
//   }, (++frames + 2) * 20 * speed);
// }


"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dijkstra = Dijkstra;

let Data;
let Queue = [];
let visited = [];
let gotit = false;

function Dijkstra(arrayData, startNodeId, endNodeId, SPEED) {
  Data = arrayData;
  Queue = [];
  visited = [];
  gotit = false;

  let startNode = null;
  let endNode = null;

  for (let i = 0; i < Data.length; i++) {
    for (let j = 0; j < Data[i].length; j++) {
      if (Data[i][j].id === startNodeId) startNode = Data[i][j];
      if (Data[i][j].id === endNodeId) endNode = Data[i][j];
    }
  }

  if (!startNode || !endNode) {
    alert("Start or End node not found!");
    return;
  }

  startNode.distance = 0;

  // Add all nodes to the Queue
  for (let row of Data) {
    for (let node of row) {
      if (node.distance === undefined) node.distance = Infinity;
      Queue.push(node);
    }
  }

  // Dijkstra's Main Loop
  while (Queue.length > 0) {
    let current = getMinDistance(Queue);
    if (!current) break;

    Queue = Queue.filter(n => n !== current);

    for (let neighbor of current.neighbors) {
      if (!Queue.includes(neighbor)) continue;

      let newDist = current.distance + 1; // weight = 1
      if (newDist < neighbor.distance) {
        neighbor.distance = newDist;
        neighbor.path = current.id;

        if (neighbor.id === endNode.id) {
          gotit = true;
          break;
        }
        if (!gotit) visited.push(neighbor.id);
      }
    }
  }

  djanimate(visited, startNode, endNode, gotit, SPEED);
}

function getMinDistance(queue) {
  let minNode = null;
  let minDist = Infinity;

  for (let node of queue) {
    if (node.distance < minDist) {
      minDist = node.distance;
      minNode = node;
    }
  }
  return minNode;
}

function djanimate(data, start, stop, found, speed) {
  for (let i = 0; i < data.length; i++) {
    setTimeout(() => {
      $("#" + data[i]).addClass("animate");
    }, (i + 1) * 20 * speed);
  }

  if (!found) {
    setTimeout(() => {
      alert("Element cannot be found!");
      enableControls();
    }, (data.length + 3) * 20 * speed);
  }

  if (found) {
    pathAnimate(start, stop, data.length, speed);
  }
}

function pathAnimate(start, stop, frameOffset, speed) {
  let trace = [];
  let current = stop;

  while (current && current.id !== start.id) {
    trace.push(current.path);
    current = findNodeById(current.path);
  }

  for (let i = trace.length - 2; i >= 0; i--) {
    setTimeout(() => {
      $("#" + trace[i]).addClass("path");
    }, (++frameOffset) * 20 * speed);
  }

  setTimeout(() => {
    alert(`Element Found! \nPath Distance: ${trace.length - 1}\nNodes Visited: ${frameOffset}`);
    enableControls();
  }, (++frameOffset + 2) * 20 * speed);
}

function findNodeById(id) {
  for (let row of Data) {
    for (let node of row) {
      if (node.id === id) return node;
    }
  }
  return null;
}

function enableControls() {
  $("#wall").removeAttr('disabled');
  $("#clear").removeAttr('disabled');
  $("#size").removeAttr('disabled');
  $("#speed").removeAttr('disabled');
  $("#start").removeAttr('disabled');
}
