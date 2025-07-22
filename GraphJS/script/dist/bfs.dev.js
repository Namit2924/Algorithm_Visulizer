// "use strict";

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
// exports.BreadthFirstSearch = BreadthFirstSearch;
// var Data;
// var Queue = [];
// var visited = []; //Implementing BFS Traversal

// function BreadthFirstSearch(arrayData, startNode, endNode, SPEED) {
//   Data = new Array(2);
//   Data = arrayData;
//   Queue = [];
//   visited = []; //console.log(Data[0][0]);

//   var found = false;

//   for (var i = 0; i < Data.length; i++) {
//     for (var j = 0; j < Data.length; j++) {
//       if (Data[i][j].id == startNode) {
//         startNode = Data[i][j];
//         found = true;
//         break;
//       }

//       if (found) {
//         break;
//       }
//     }
//   } //console.log(startNode)


//   Queue.push(startNode);
//   visited.push(startNode); //console.log(Queue);
//   //console.log(visited);

//   while (Queue.length != 0) {
//     var x = Queue.shift(); //console.log(x);

//     for (var _i = 0; _i < x.neighbors.length; _i++) {
//       if (checkVisitedNode(x.neighbors[_i])) {
//         Queue.push(x.neighbors[_i]);
//         visited.push(x.neighbors[_i]);
//       }
//     }
//   }

//   bfsAnimate(visited, endNode, SPEED);
// } //Check Visited Node


// function checkVisitedNode(node) {
//   for (var i = 0; i < visited.length; i++) {
//     if (node == visited[i]) {
//       return false;
//     }
//   }

//   return true;
// } //function Animate


// function bfsAnimate(data, stop, speed) {
//   //console.log(data);
//   //console.log(stop);
//   var notfound = true;

//   var _loop = function _loop() {
//     var x = data[i].id;

//     if (x != stop) {
//       setTimeout(function () {
//         $("#" + x).addClass("animate"); //console.log(x);
//       }, (i + 1) * 20 * speed);
//     } else {
//       notfound = false;
//       setTimeout(function () {
//         alert("Element Found! \nNode visited after searching " + (i - 1) + " nodes.");
//         $("#wall").removeAttr('disabled');
//         $("#clear").removeAttr('disabled');
//         $("#size").removeAttr('disabled');
//         $("#speed").removeAttr('disabled');
//         $("#start").removeAttr('disabled');
//       }, (i + 3) * 20 * speed);
//       return "break";
//     }
//   };

//   for (var i = 1; i < data.length; i++) {
//     var _ret = _loop();

//     if (_ret === "break") break;
//   }

//   if (notfound) {
//     setTimeout(function () {
//       alert("Element cannot be found!");
//       $("#wall").removeAttr('disabled');
//       $("#clear").removeAttr('disabled');
//       $("#size").removeAttr('disabled');
//       $("#speed").removeAttr('disabled');
//       $("#start").removeAttr('disabled');
//     }, (i + 3) * 20 * speed);
//   }
// }


"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BreadthFirstSearch = BreadthFirstSearch;

let Data;
let Queue = [];
let visited = new Set();

// Main BFS Function
function BreadthFirstSearch(arrayData, startNodeId, endNodeId, SPEED) {
  Data = arrayData;
  Queue = [];
  visited = new Set();

  const startNode = findNodeById(startNodeId);
  const endNode = findNodeById(endNodeId);

  if (!startNode || !endNode) {
    alert("Start or End node not found!");
    return;
  }

  Queue.push(startNode);
  visited.add(startNode.id);

  const bfsOrder = [startNode];

  while (Queue.length > 0) {
    const current = Queue.shift();

    for (const neighbor of current.neighbors) {
      if (!visited.has(neighbor.id)) {
        Queue.push(neighbor);
        visited.add(neighbor.id);
        bfsOrder.push(neighbor);
        if (neighbor.id === endNodeId) break;
      }
    }
  }

  bfsAnimate(bfsOrder, endNodeId, SPEED);
}

// Helper: Find node by ID
function findNodeById(nodeId) {
  for (const row of Data) {
    for (const node of row) {
      if (node.id === nodeId) {
        return node;
      }
    }
  }
  return null;
}

// Animate Visited Nodes
function bfsAnimate(nodes, targetId, speed) {
  let found = false;

  for (let i = 1; i < nodes.length; i++) {
    const nodeId = nodes[i].id;

    if (nodeId !== targetId) {
      setTimeout(() => {
        $("#" + nodeId).addClass("animate");
      }, i * 20 * speed);
    } else {
      found = true;
      setTimeout(() => {
        alert(`Element Found!\nNode visited after searching ${i - 1} nodes.`);
        enableControls();
      }, (i + 3) * 20 * speed);
      break;
    }
  }

  if (!found) {
    setTimeout(() => {
      alert("Element cannot be found!");
      enableControls();
    }, (nodes.length + 3) * 20 * speed);
  }
}

// Re-enable control buttons
function enableControls() {
  $("#wall").removeAttr('disabled');
  $("#clear").removeAttr('disabled');
  $("#size").removeAttr('disabled');
  $("#speed").removeAttr('disabled');
  $("#start").removeAttr('disabled');
}
