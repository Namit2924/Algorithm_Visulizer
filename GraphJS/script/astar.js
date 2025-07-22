let Data = [];
let Queue = [];
let visited = [];
let found = false;
let totalPath = [];

// A* Algorithm Visualization
export function Astar(arrayData, startId, endId, SPEED) {
    Data = arrayData;
    Queue = [];
    visited = [];
    found = false;
    totalPath = [];

    let startNode = null;
    let endNode = null;

    // Find start and end node objects
    outer: for (let i = 0; i < Data.length; i++) {
        for (let j = 0; j < Data[i].length; j++) {
            if (Data[i][j].id === startId) startNode = Data[i][j];
            if (Data[i][j].id === endId) endNode = Data[i][j];
            if (startNode && endNode) break outer;
        }
    }

  if (!startNode || !endNode) {
    alert("Select the starting and ending point.");
    return;
}

    calculateHeuristic(Data, endNode);
    AstarSearch(startNode, endNode);

    // Animate visited nodes
    for (let i = 0; i < visited.length; i++) {
        const nodeId = visited[i];
        if (nodeId !== endId) {
            setTimeout(() => {
                $("#" + nodeId).addClass("animate");
            }, (i + 1) * 20 * SPEED);
        }
    }

    if (!found) {
        setTimeout(() => {
            alert("Path Not Found");
            enableUI();
        }, (visited.length + 2) * 20 * SPEED);
    } else {
        animatePath(totalPath, visited.length, SPEED);
    }
}

// Calculate Manhattan Distance (Heuristic)
function calculateHeuristic(data, endNode) {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            data[i][j].heuristic = Math.abs(data[i][j].i - endNode.i) + Math.abs(data[i][j].j - endNode.j);
            data[i][j].distance = Infinity;
            data[i][j].source = null;
        }
    }
}

// A* Algorithm Logic
function AstarSearch(startNode, endNode) {
    startNode.distance = 0;
    Queue.push(startNode);

    while (Queue.length !== 0) {
        let current = getLowestFNode(Queue);

        if (current === endNode) {
            found = true;
            tracePath(current, startNode);
            return;
        }

        Queue = Queue.filter(n => n.id !== current.id);

        for (const neighbor of current.neighbors) {
            const tempDist = current.distance + 1;
            if (tempDist < neighbor.distance) {
                neighbor.distance = tempDist;
                neighbor.source = current;
                if (!Queue.includes(neighbor)) {
                    Queue.push(neighbor);
                }
                visited.push(neighbor.id);
            }
        }
    }
}

// Get node with lowest f = g + h
function getLowestFNode(queue) {
    return queue.reduce((minNode, node) => {
        const fScore = node.distance + node.heuristic;
        return (!minNode || fScore < (minNode.distance + minNode.heuristic)) ? node : minNode;
    }, null);
}

// Trace path from end to start
function tracePath(endNode, startNode) {
    let current = endNode;
    while (current !== startNode) {
        totalPath.push(current.id);
        current = current.source;
    }
}

// Animate final path
function animatePath(path, delayFrames, speed) {
    path.reverse(); // From start to end
    for (let i = 0; i < path.length; i++) {
        const nodeId = path[i];
        setTimeout(() => {
            $("#" + nodeId).addClass("path");
        }, (delayFrames + i + 1) * 20 * speed);
    }

    setTimeout(() => {
        alert(`Path Found\nDistance: ${path.length}\nNodes visited: ${visited.length}`);
        enableUI();
    }, (delayFrames + path.length + 2) * 20 * speed);
}

// Enable UI after animation
function enableUI() {
    $("#wall, #clear, #size, #speed, #start").removeAttr('disabled');
}
