let Data = [];
let visited = [];
let spotted = false;

// DFS Entry Function
export function DepthFirstSearch(arrayData, startId, endId, SPEED) {
    Data = arrayData;
    visited = [];
    spotted = false;

    let startNode = null;
    let endNode = null;

    // Locate start and end node objects
    outer: for (let i = 0; i < Data.length; i++) {
        for (let j = 0; j < Data[i].length; j++) {
            if (Data[i][j].id === startId) startNode = Data[i][j];
            if (Data[i][j].id === endId) endNode = Data[i][j];
            if (startNode && endNode) break outer;
        }
    }

    if (!startNode || !endNode) {
        alert("Start or End node not found!");
        return;
    }

    graphTraversal(startNode, endNode);
    animateDFS(visited, endId, SPEED);
}

// Recursive DFS Traversal
function graphTraversal(node, stopNode) {
    if (spotted || node.visited) return;

    node.visited = true;
    visited.push(node.id);

    if (node === stopNode) {
        spotted = true;
        return;
    }

    for (const neighbor of node.neighbors) {
        if (!neighbor.visited) {
            graphTraversal(neighbor, stopNode);
        }
    }
}

// Animate DFS Traversal
function animateDFS(visitedNodes, stopId, speed) {
    let found = false;

    for (let i = 1; i < visitedNodes.length; i++) {
        const nodeId = visitedNodes[i];
        if (nodeId !== stopId) {
            setTimeout(() => {
                $("#" + nodeId).addClass("animate");
            }, (i + 1) * 20 * speed);
        } else {
            found = true;
            setTimeout(() => {
                alert(`Element Found!\nNode visited after searching ${i - 1} nodes.`);
                enableUIControls();
            }, (i + 3) * 20 * speed);
            break;
        }
    }

    if (!found) {
        setTimeout(() => {
            alert("Element cannot be found!");
            enableUIControls();
        }, (visitedNodes.length + 3) * 20 * speed);
    }
}

// Enable UI Buttons
function enableUIControls() {
    $("#wall, #clear, #size, #speed, #start").removeAttr('disabled');
}
