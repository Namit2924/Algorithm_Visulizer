var Data;
var Queue = [];
var visited = [];
var visitedSet = new Set();

// Implementing BFS Traversal
export function BreadthFirstSearch(arrayData, startNodeId, endNodeId, SPEED) {
    Data = arrayData;
    Queue = [];
    visited = [];
    visitedSet.clear();

    let startNode = null;

    // Find the start node by ID
    for (let i = 0; i < Data.length; i++) {
        for (let j = 0; j < Data[i].length; j++) {
            if (Data[i][j].id === startNodeId) {
                startNode = Data[i][j];
                break;
            }
        }
        if (startNode) break;
    }

    if (!startNode) {
        alert("Start node not found!");
        return;
    }

    Queue.push(startNode);
    visited.push(startNode);
    visitedSet.add(startNode.id);

    while (Queue.length !== 0) {
        let currentNode = Queue.shift();

        for (let i = 0; i < currentNode.neighbors.length; i++) {
            let neighbor = currentNode.neighbors[i];
            if (!visitedSet.has(neighbor.id)) {
                Queue.push(neighbor);
                visited.push(neighbor);
                visitedSet.add(neighbor.id);
            }
        }
    }

    bfsAnimate(visited, endNodeId, SPEED);
}

// Animate BFS result
function bfsAnimate(data, stopId, speed) {
    let found = false;

    for (let i = 1; i < data.length; i++) {
        const nodeId = data[i].id;

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
        }, (data.length + 3) * 20 * speed);
    }
}

// Re-enable UI controls
function enableUIControls() {
    $("#wall, #clear, #size, #speed, #start").removeAttr('disabled');
}
