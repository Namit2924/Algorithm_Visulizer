// "use strict";

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
// exports.DepthFirstSearch = DepthFirstSearch;
// var Data;
// var visited = [];
// var spotted = false; //Implementing BFS Traversal

// function DepthFirstSearch(arrayData, startNode, endNode, SPEED) {
//   Data = new Array(2);
//   Data = arrayData;
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


//   graphTraversal(startNode, endNode);
//   dfsanimate(visited, endNode, SPEED);
// } //Recursion


// function graphTraversal(node, stop) {
//   //console.log(node);
//   if (spotted) {//pass
//   } else {
//     node.visited = true;
//     visited.push(node.id);

//     for (var i = 0; i < node.neighbors.length; i++) {
//       if (!node.neighbors[i].visited) {
//         graphTraversal(node.neighbors[i]);
//       }
//     }

//     if (node == stop) {
//       spotted = true;
//     }
//   }
// } //Animate


// function dfsanimate(data, stop, speed) {
//   //console.log(data);
//   //console.log(stop);
//   var notfound = true;

//   var _loop = function _loop() {
//     var x = data[i];

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
exports.DepthFirstSearch = DepthFirstSearch;

let gridData = [];
let visitedNodes = [];
let targetFound = false;

// Depth First Search Implementation
function DepthFirstSearch(arrayData, startId, endId, SPEED) {
  gridData = arrayData;
  visitedNodes = [];
  targetFound = false;

  let startNode = null;

  // Locate start node in the grid
  for (let row of gridData) {
    for (let node of row) {
      if (node.id === startId) {
        startNode = node;
        break;
      }
    }
    if (startNode) break;
  }

  if (!startNode) {
    alert("Start node not found!");
    return;
  }

  // DFS traversal
  traverseDFS(startNode, endId);
  animateDFS(visitedNodes, endId, SPEED);
}

// DFS Recursive Traversal
function traverseDFS(node, targetId) {
  if (targetFound || !node) return;

  node.visited = true;
  visitedNodes.push(node.id);

  if (node.id === targetId) {
    targetFound = true;
    return;
  }

  for (let neighbor of node.neighbors) {
    if (!neighbor.visited) {
      traverseDFS(neighbor, targetId);
    }
  }
}

// Animate the DFS Path
function animateDFS(path, targetId, speed) {
  let notFound = true;

  for (let i = 1; i < path.length; i++) {
    const nodeId = path[i];

    if (nodeId !== targetId) {
      setTimeout(() => {
        $("#" + nodeId).addClass("animate");
      }, (i + 1) * 20 * speed);
    } else {
      notFound = false;
      setTimeout(() => {
        alert(`Element Found! \nNode visited after searching ${i - 1} nodes.`);
        enableControls();
      }, (i + 3) * 20 * speed);
      break;
    }
  }

  if (notFound) {
    setTimeout(() => {
      alert("Element cannot be found!");
      enableControls();
    }, (path.length + 3) * 20 * speed);
  }
}

// Re-enable UI controls after animation
function enableControls() {
  $("#wall, #clear, #size, #speed, #start").removeAttr("disabled");
}
