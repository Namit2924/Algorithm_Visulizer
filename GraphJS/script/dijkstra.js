let Data = [];
let Queue = [];
let visited = [];
let gotit = false;

// Dijkstra Algorithm Visualization
export function Dijkstra(arrayData, startId, endId, SPEED) {
    Data = arrayData;
    Queue = [];
    visited = [];
    gotit = false;

    let startNode = null;
    let endNode = null;

    // Find start and end nodes
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

    // Initialize distances and path
    for (let i = 0; i < Data.length; i++) {
        for (let j = 0; j < Data[i].length; j++) {
            Data[i][j].distance = Infinity;
            Data[i][j].path = null;
            Queue.push(Data[i][j]);
        }
    }

    startNode.distance = 0;

    while (Queue.length !== 0) {
        const current = getMinDistance(Queue);
        if (!current) break;

        Queue = Queue.filter(node => node !== current);

        for (const neighbor of current.neighbors) {
            if (Queue.includes(neighbor)) {
                const newDist = current.distance + 1; // weight = 1
                if (newDist < neighbor.distance) {
                    neighbor.distance = newDist;
                    neighbor.path = current.id;

                    if (neighbor.id === endNode.id) {
                        gotit = true;
                        break;
                    }

                    if (!gotit) {
                        visited.push(neighbor.id);
                    }
                }
            }
        }
    }

    animateDijkstra(visited, startNode, endNode, gotit, SPEED);
}

// Find node with minimum distance in queue
function getMinDistance(queue) {
    let minNode = null;
    for (const node of queue) {
        if (minNode === null || node.distance < minNode.distance) {
            minNode = node;
        }
    }
    return minNode;
}

// Animate visited nodes and start path animation if found
function animateDijkstra(visitedNodes, startNode, endNode, found, speed) {
    for (let i = 0; i < visitedNodes.length; i++) {
        const nodeId = visitedNodes[i];
        setTimeout(() => {
            $("#" + nodeId).addClass("animate");
        }, (i + 1) * 20 * speed);
    }

    if (!found) {
        setTimeout(() => {
            alert("Element cannot be found!");
            enableUIControls();
        }, (visitedNodes.length + 3) * 20 * speed);
    } else {
        animatePath(startNode, endNode, visitedNodes.length, speed);
    }
}

// Animate the shortest path from end to start
function animatePath(startNode, endNode, delayFrames, speed) {
    const trace = [];
    let current = endNode;

    while (current && current !== startNode) {
        trace.push(current.id);
        current = getNodeById(current.path);
    }

    trace.push(startNode.id);
    trace.reverse();

    for (let i = 1; i < trace.length; i++) {
        setTimeout(() => {
            $("#" + trace[i]).addClass("path");
        }, (delayFrames + i) * 20 * speed);
    }

    setTimeout(() => {
        alert(`Element Found! \nPath Distance: ${trace.length - 1}\nNodes Visited: ${delayFrames}`);
        enableUIControls();
    }, (delayFrames + trace.length + 2) * 20 * speed);
}

// Get node by ID
function getNodeById(id) {
    for (const row of Data) {
        for (const node of row) {
            if (node.id === id) return node;
        }
    }
    return null;
}

// Enable UI Buttons
function enableUIControls() {
    $("#wall, #clear, #size, #speed, #start").removeAttr('disabled');
}
