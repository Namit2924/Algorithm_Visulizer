// "use strict";

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
// exports.Astar = Astar;
// var Data;
// var Queue = [];
// var visited = [];
// var found = false;
// var totalPath = []; //Implementing Dijkstra Visualization

// function Astar(arrayData, startNode, endNode, SPEED) {
//   //Initialization
//   Data = new Array(2);
//   Data = arrayData;
//   Queue = [];
//   visited = [];
//   found = false;
//   totalPath = []; //console.log(Data[0][0]);

//   var f1,
//       f2 = false;

//   for (var _i = 0; _i < Data.length; _i++) {
//     for (var j = 0; j < Data.length; j++) {
//       if (Data[_i][j].id == startNode) {
//         startNode = Data[_i][j];
//         f1 = true;
//       }

//       if (Data[_i][j].id == endNode) {
//         endNode = Data[_i][j];
//         f2 = true;
//       }
//     }

//     if (f1 && f2) {
//       break;
//     }
//   } //Calculating Heuristic


//   calculateHeuristic(Data, startNode, endNode); //console.log(Data);
//   //Astar

//   Astarcode(Data, startNode, endNode, totalPath, visited); //console.log(Data);
//   //console.log(visited);
//   //console.log(totalPath);

//   var _loop = function _loop() {
//     var x = visited[i]; //console.log(x+"==="+stop);

//     if (x != endNode.id) {
//       setTimeout(function () {
//         $("#" + x).addClass("animate");
//       }, (i + 1) * 20 * SPEED);
//     }
//   };

//   for (var i = 0; i < visited.length; i++) {
//     _loop();
//   }

//   if (!found) {
//     setTimeout(function () {
//       alert("Not Found");
//       $("#wall").removeAttr('disabled');
//       $("#clear").removeAttr('disabled');
//       $("#size").removeAttr('disabled');
//       $("#speed").removeAttr('disabled');
//       $("#start").removeAttr('disabled');
//     }, (i + 2) * 20 * SPEED);
//   } else {
//     AstarPath(totalPath, i, visited.length, SPEED);
//   }
// } //Trace Path


// function tracePath(prevSource, currentNode, startNode, totalPath, Data) {
//   var val = currentNode;

//   while (val.source != startNode.id) {
//     totalPath.push(val.source);
//     val = val.neighbors.filter(function (item) {
//       return item.id == val.source;
//     });
//     val = val[0];
//   } //console.log(totalPath);

// } //Calculate Heuristic


// function calculateHeuristic(Data, startNode, endNode) {
//   //console.log(startNode.i+","+startNode.j);
//   //console.log(endNode.i+","+endNode.j);
//   for (var i = 0; i < Data.length; i++) {
//     for (var j = 0; j < Data.length; j++) {
//       Data[i][j].heuristic = Math.abs(Data[i][j].i - endNode.i) + Math.abs(Data[i][j].j - endNode.j);
//     }
//   }
// }

// function Astarcode(Data, startNode, endNode, totalPath, visited) {
//   //Astar
//   //Setting Starting Node distance to 0
//   startNode.distance = 0; //Pushing startNode to the Queue

//   Queue.push(startNode);

//   while (Queue.length != 0) {
//     //console.log(Queue);
//     //Calculating minimum f-score
//     var current;
//     var min = Infinity;

//     for (var i = 0; i < Queue.length; i++) {
//       if (Queue[i].distance + Queue[i].heuristic < min) {
//         min = Queue[i].distance + Queue[i].heuristic;
//         current = Queue[i];
//       }
//     } //If element is finished
//     //console.log(current)
//     //console.log(endNode)


//     if (current === endNode) {
//       found = true;
//       return tracePath(current.source, current, startNode, totalPath, Data);
//     } //Popping the element current from the Queue


//     Queue = Queue.filter(function (item) {
//       return item.id != current.id;
//     }); //console.log(current.neighbors);

//     for (var _i2 = 0; _i2 < current.neighbors.length; _i2++) {
//       var f = current.distance + 1; //Storing the distance

//       if (f < current.neighbors[_i2].distance) {
//         current.neighbors[_i2].source = current.id;
//         current.neighbors[_i2].distance = f;
//         current.neighbors[_i2]["function"] = current.neighbors[_i2].distance + current.neighbors[_i2].heuristic;

//         if (Queue.indexOf(current.neighbors[_i2]) == -1) {
//           Queue.push(current.neighbors[_i2]);
//         } //Animate


//         visited.push(current.neighbors[_i2].id);
//       }
//     } //console.log(visited);

//   }

//   return false;
// }

// function AstarPath(path, frames, nodes, speed) {
//   var _loop2 = function _loop2() {
//     var x = path[i]; //console.log(x+"==="+stop);

//     setTimeout(function () {
//       $("#" + x).addClass("path");
//     }, ++frames * 20 * speed);
//   };

//   for (var i = path.length - 1; i >= 0; i--) {
//     _loop2();
//   }

//   setTimeout(function () {
//     alert("Path Found\nDistance : " + path.length + "\nNode visited after searching " + nodes + " nodes.");
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
exports.Astar = Astar;

let Data = [];
let Queue = [];
let visited = [];
let found = false;
let totalPath = [];

function Astar(arrayData, startId, endId, SPEED) {
  Data = arrayData;
  Queue = [];
  visited = [];
  found = false;
  totalPath = [];

  let startNode = null, endNode = null;

  for (let row of Data) {
    for (let cell of row) {
      if (cell.id === startId) startNode = cell;
      if (cell.id === endId) endNode = cell;
    }
  }

  if (!startNode || !endNode) {
    alert("Start or End node not found!");
    return;
  }

  calculateHeuristic(Data, endNode);
  runAstar(startNode, endNode);

  for (let i = 0; i < visited.length; i++) {
    const x = visited[i];
    if (x !== endNode.id) {
      setTimeout(() => {
        $("#" + x).addClass("animate");
      }, (i + 1) * 20 * SPEED);
    }
  }

  if (!found) {
    setTimeout(() => {
      alert("Element not found!");
      enableControls();
    }, (visited.length + 2) * 20 * SPEED);
  } else {
    animatePath(totalPath, visited.length, SPEED);
  }
}

// Trace the shortest path using backtracking
function tracePath(currentNode, startNode) {
  let current = currentNode;

  while (current && current.source !== startNode.id) {
    totalPath.push(current.source);
    current = current.neighbors.find(n => n.id === current.source);
  }
}

// Manhattan Distance Heuristic
function calculateHeuristic(data, endNode) {
  for (let row of data) {
    for (let cell of row) {
      cell.heuristic = Math.abs(cell.i - endNode.i) + Math.abs(cell.j - endNode.j);
      cell.distance = Infinity;
      cell.source = null;
    }
  }
}

// A* core logic
function runAstar(startNode, endNode) {
  startNode.distance = 0;
  Queue.push(startNode);

  while (Queue.length > 0) {
    let current = Queue.reduce((a, b) =>
      (a.distance + a.heuristic < b.distance + b.heuristic) ? a : b
    );

    if (current === endNode) {
      found = true;
      tracePath(current, startNode);
      return;
    }

    Queue = Queue.filter(node => node.id !== current.id);

    for (let neighbor of current.neighbors) {
      const tentativeDistance = current.distance + 1;

      if (tentativeDistance < neighbor.distance) {
        neighbor.distance = tentativeDistance;
        neighbor.source = current.id;

        if (!Queue.includes(neighbor)) {
          Queue.push(neighbor);
          visited.push(neighbor.id);
        }
      }
    }
  }
}

// Animate the final path
function animatePath(path, delayStart, speed) {
  let frame = delayStart;

  for (let i = path.length - 1; i >= 0; i--) {
    const nodeId = path[i];
    setTimeout(() => {
      $("#" + nodeId).addClass("path");
    }, (++frame) * 20 * speed);
  }

  setTimeout(() => {
    alert(`Path Found!\nDistance: ${path.length}\nNodes Visited: ${visited.length}`);
    enableControls();
  }, (++frame + 2) * 20 * speed);
}

// Enable buttons after execution
function enableControls() {
  ["#wall", "#clear", "#size", "#speed", "#start"].forEach(id => {
    $(id).removeAttr("disabled");
  });
}
