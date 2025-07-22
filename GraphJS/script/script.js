// Importing Algorithms
 import { Dijkstra } from './dijkstra.js';
 import {BreadthFirstSearch } from './bfs.js';
 import { DepthFirstSearch } from './dfs.js';
 import {Astar } from './astar.js';

$(document).ready(function () {
  let SIZE = 22;
  let SPEED = 3;
  let ALGORITHM = 1;
  let startid, endid;
  let isDown = false;
  let wall = [];
  let data = [];

  // Initialize grid
  displayGrid(SIZE);

  // Handle size and speed input
  $("[type=range]").change(function () {
    const newval = $(this).val();
    if (this.id === "speed") {
      $("#speed_dis").text(newval);
      SPEED = newval;
    } else {
      $("#size_dis").text(newval);
      SIZE = newval;
      startid = endid = undefined;
      displayGrid(SIZE);
    }
  });

  function displayGrid(size) {
    $(".screen").html("");
    const screenWidth = $(".screen").innerWidth() / size;

    for (let i = 0; i < size * size; i++) {
      $(".screen").append(`<div class="unit" id="${i}"></div>`);
    }

    $(".unit").css({ width: screenWidth, height: screenWidth });
  }

  $(window).on("resize", () => {
    displayGrid(SIZE);
    startid = endid = undefined;
  });

  // Algorithm selection
  $('select').on('change', function () {
    ALGORITHM = parseInt(this.value);
    const algoNames = ["", "Breadth First Search", "Depth First Search", "Dijkstra Algorithm", "A* Algorithm"];
    $(".title h1").text(algoNames[ALGORITHM]);
  });

  // Start visualization
  $("#start").on("click", function () {
    if (startid === undefined || endid === undefined) {
      alert("Select the starting and ending point.");
      return;
    }

    wallGenerate();
    connectArray(SIZE);
    disableInputs(true);
    runAlgorithm(ALGORITHM);
  });

  function disableInputs(disable) {
    ["#wall", "#clear", "#size", "#speed", "#start"].forEach(id => $(id).prop("disabled", disable));
  }

  function runAlgorithm(algo) {
    const delay = 6 - SPEED;
    const start = Number(startid);
    const end = Number(endid);

    switch (algo) {
      case 1: BreadthFirstSearch(data, start, end, delay); break;
      case 2: DepthFirstSearch (data, start, end, delay); break;
      case 3: Dijkstra(data, start, end, delay); break;
      case 4: Astar(data, start, end, delay); break;
    }
  }

  // Select start and end
  $("body").on("dblclick", ".unit", function () {
    const id = $(this).attr("id");
    if (startid === undefined) {
      $(this).addClass("target");
      startid = id;
    } else if (endid === undefined) {
      $(this).addClass("target");
      endid = id;
    }
  });

  // Clear grid
  $("#clear").on("click", function () {
    startid = endid = undefined;
    wall = [];
    data = [];
    $(".unit").removeClass("animate target wall path").addClass("restore");
  });

  // Mouse interaction for drawing walls
  $("body").on({
    mousedown: () => isDown = true,
    mouseup: () => isDown = false,
    mouseover: function () {
      if (isDown) {
        const isWall = $(this).hasClass("wall");
        $(this).toggleClass("wall", !isWall).toggleClass("restore", isWall);
      }
    }
  }, ".unit");

  // Random wall generation
  $("#wall").on("click", function () {
    for (let i = 0; i < SIZE * SIZE; i++) {
      if (i != startid && i != endid && Math.random() < 0.3) {
        $(`#${i}`).addClass("wall");
      }
    }
  });

  function wallGenerate() {
    wall = [];
    for (let i = 0; i < SIZE * SIZE; i++) {
      if ($(`#${i}`).hasClass("wall")) wall.push(i);
    }
  }

  function connectArray(size) {
    let id = 0;
    data = Array.from({ length: size }, (_, i) =>
      Array.from({ length: size }, (_, j) => new Spot(i, j, wall.includes(id), id++))
    );

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        data[i][j].connectFrom(data);
      }
    }
  }

  function Spot(i, j, isWall, id) {
    this.i = i;
    this.j = j;
    this.id = id;
    this.isWall = isWall;
    this.neighbors = [];
    this.path = [];
    this.visited = false;
    this.distance = Infinity;
    this.heuristic = 0;
    this.function = () => this.distance + this.heuristic;
    this.source = "";

    this.connectFrom = function (grid) {
      const directions = [
        [i - 1, j], [i + 1, j],
        [i, j - 1], [i, j + 1]
      ];
      for (const [x, y] of directions) {
        if (x >= 0 && x < SIZE && y >= 0 && y < SIZE && !grid[x][y].isWall) {
          this.neighbors.push(grid[x][y]);
        }
      }
    };
  }
});
