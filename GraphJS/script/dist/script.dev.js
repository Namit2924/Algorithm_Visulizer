// "use strict";

// var _dijkstra = require("./dijkstra.js");

// var _bfs = require("./bfs.js");

// var _dfs = require("./dfs.js");

// var _astar = require("./astar.js");

// //Importing Algorithm
// $(document).ready(function () {
//   //Set pevious State
//   var SIZE = 22;
//   var SPEED = 3;
//   var ALGORITHM = 1;
//   var startid, endid;
//   var isDown = false;
//   var wall = [];
//   var uniqueId;
//   var data = new Array(2); //Initial Function

//   displayGrid(SIZE); //sIZE SPEED AND SIZE

//   $("[type=range]").change(function () {
//     var newval = $(this).val(); //console.log(newval);

//     if (this.id == "speed") {
//       $("#speed_dis").text(newval);
//       SPEED = newval;
//     } else {
//       $("#size_dis").text(newval);
//       SIZE = newval;
//       startid = undefined;
//       endid = undefined;
//       displayGrid(SIZE);
//     }
//   }); //Display grid Function

//   function displayGrid(x) {
//     $(".screen").html(" ");
//     var screenWidth = $(".screen").innerWidth() / SIZE;

//     for (var i = 0; i < x * x; i++) {
//       $(".screen").append('<div class="unit" id="' + i + '"></div>');
//     }

//     $(".unit").css("width", screenWidth + "px");
//     $(".unit").css("height", screenWidth + "px");
//   } //Resize Event Handler


//   $(window).on("resize", function () {
//     displayGrid(SIZE);
//     startid = undefined;
//     endid = undefined;
//   }); //cHOOSE aLGORITHm

//   $('select').on('change', function () {
//     //console.log( this.value );
//     var choice = this.value;

//     if (choice == 1) {
//       $(".title h1").text("Breadth First Search");
//     } else if (choice == 2) {
//       $(".title h1").text("Depth First Search");
//     } else if (choice == 3) {
//       $(".title h1").text("Dijkstra Algorithm");
//     } else {
//       $(".title h1").text("A* Algorithm");
//     }

//     ALGORITHM = choice;
//   }); //oNCLICK HAndle Visualization [[[[[[Start]]]]]]]

//   $("#start").on("click", function () {
//     if (startid == undefined || endid == undefined) {
//       alert("Select the starting and ending point.");
//     } else {
//       wallGenerate();
//       connectArray(SIZE); //Disable input field

//       $("#wall").prop("disabled", true);
//       $("#clear").prop("disabled", true);
//       $("#size").prop("disabled", true);
//       $("#speed").prop("disabled", true);
//       $("#start").prop("disabled", true);
//       decoder(ALGORITHM);
//     }
//   }); //Handle algorithm visualization

//   function decoder(algo) {
//     SPEED = 6 - SPEED;

//     if (algo == 1) {
//       (0, _bfs.BreadthFirstSearch)(data, startid, endid, SPEED);
//     } else if (algo == 2) {
//       (0, _dfs.DepthFirstSearch)(data, startid, endid, SPEED);
//     } else if (algo == 3) {
//       (0, _dijkstra.Dijkstra)(data, startid, endid, SPEED);
//     } else {
//       (0, _astar.Astar)(data, startid, endid, SPEED);
//     }
//   } //Display---Animation---Onclick


//   $("body").on("dblclick", ".unit", function () {
//     //console.log(startid);
//     //console.log(endid);
//     if (startid == undefined) {
//       $(this).addClass("target");
//       startid = $(this).attr("id");
//     } else if (endid == undefined) {
//       $(this).addClass("target");
//       endid = $(this).attr("id");
//     } else {//pass;
//     }
//   }); //Clear Cell

//   $("#clear").on("click", function () {
//     startid = undefined;
//     endid = undefined;
//     wall = [];
//     $(".unit").addClass("restore");
//     data = new Array(2);
//     $(".unit").removeClass("animate");
//     $(".unit").removeClass("target");
//     $(".unit").removeClass("wall");
//     $(".unit").removeClass("path");
//   }); //Double Click Custom WALL Mouse Event

//   $("body").on("mousedown", ".unit", function () {
//     isDown = true;
//   });
//   $("body").on("mouseup", ".unit", function () {
//     isDown = false;
//   });
//   $("body").on("mouseover", ".unit", function () {
//     if (isDown && $(this).css("background-color") != "rgb(38, 38, 38)") {
//       if ($(this).css("background-color") === "rgb(1, 110, 253)") {
//         $(this).addClass("restore");
//         $(this).removeClass("wall");
//       } else {
//         $(this).addClass("wall");
//         $(this).removeClass("restore");
//       } //console.log($(this).css("background-color"));

//     }
//   }); //Making Wall on button Press

//   $("#wall").on("click", function () {
//     wall = 0;

//     for (var i = 0; i < SIZE * SIZE; i++) {
//       if (i == startid || i == endid) {//pass
//       } else {
//         var x = Math.round(Math.random() * 10);

//         if (x == 0 || x == 1 || x == 2) {
//           $("#" + i).addClass("wall");
//         }
//       }
//     } //console.log(wall);

//   }); //generating wall array on click

//   function wallGenerate() {
//     wall = [];

//     for (var i = 0; i < SIZE * SIZE; i++) {
//       var x = $("#" + i).css("background-color");

//       if (x == "rgb(1, 110, 253)") {
//         wall.push(i);
//       }
//     } //console.log(wall);

//   } //Generate Array of Given Size//Conerting Array to Graph


//   function connectArray(size) {
//     uniqueId = 0; //Making 2-D Array

//     for (var i = 0; i < size; i++) {
//       data[i] = new Array(2);
//     } //Initializing 2-D Array


//     for (var _i = 0; _i < size; _i++) {
//       for (var j = 0; j < size; j++) {
//         //console.log(wall.indexOf(uniqueId))
//         if (wall.indexOf(uniqueId) == -1) {
//           data[_i][j] = new Spot(_i, j, false, uniqueId++);
//         } else {
//           data[_i][j] = new Spot(_i, j, true, uniqueId++);
//         }
//       }
//     }

//     for (var _i2 = 0; _i2 < size; _i2++) {
//       for (var _j = 0; _j < size; _j++) {
//         data[_i2][_j].connectFrom(data);
//       }
//     } //console.log(data);

//   } //Function to make neighbors


//   function Spot(i, j, isWall, id) {
//     this.i = i;
//     this.j = j;
//     this.id = id;
//     this.isWall = isWall;
//     this.neighbors = [];
//     this.path = [];
//     this.visited = false;
//     this.distance = Infinity;
//     this.heuristic = 0;
//     this["function"] = this.distance + this.heuristic;
//     this.source = "";

//     this.connectFrom = function (data) {
//       var i = this.i;
//       var j = this.j;

//       if (i > 0 && !data[i - 1][j].isWall) {
//         this.neighbors.push(data[i - 1][j]);
//       }

//       if (i < SIZE - 1 && !data[i + 1][j].isWall) {
//         this.neighbors.push(data[i + 1][j]);
//       }

//       if (j > 0 && !data[i][j - 1].isWall) {
//         this.neighbors.push(data[i][j - 1]);
//       }

//       if (j < SIZE - 1 && !data[i][j + 1].isWall) {
//         this.neighbors.push(data[i][j + 1]);
//       }
//     };
//   } //Make bfs dfs work ===> visual animate and path animate
//   //Scope for the dijistra and algorithm
//   //Scope of the the other algorithm to work
//   //Applying Algorithm one-by-one
//   //===============================

// });



"use strict";

const { Dijkstra } = require("./dijkstra.js");
const { BreadthFirstSearch } = require("./bfs.js");
const { DepthFirstSearch } = require("./dfs.js");
const { Astar } = require("./astar.js");

$(document).ready(() => {
  let SIZE = 22;
  let SPEED = 3;
  let ALGORITHM = 1;
  let startid, endid;
  let isDown = false;
  let wall = [];
  let uniqueId;
  let data = [];

  displayGrid(SIZE);

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
    const unitSize = $(".screen").innerWidth() / SIZE;

    for (let i = 0; i < size * size; i++) {
      $(".screen").append(`<div class="unit" id="${i}"></div>`);
    }

    $(".unit").css({
      width: `${unitSize}px`,
      height: `${unitSize}px`
    });
  }

  $(window).on("resize", () => {
    displayGrid(SIZE);
    startid = endid = undefined;
  });

  $("select").on("change", function () {
    const choice = parseInt(this.value);
    ALGORITHM = choice;

    const algoName = {
      1: "Breadth First Search",
      2: "Depth First Search",
      3: "Dijkstra Algorithm",
      4: "A* Algorithm"
    };
    $(".title h1").text(algoName[choice]);
  });

  $("#start").on("click", () => {
    if (!startid || !endid) {
      alert("Select the starting and ending point.");
      return;
    }

    wallGenerate();
    connectArray(SIZE);

    // Disable controls
    ["#wall", "#clear", "#size", "#speed", "#start"].forEach(id =>
      $(id).prop("disabled", true)
    );

    runAlgorithm(ALGORITHM);
  });

  function runAlgorithm(algo) {
    SPEED = 6 - SPEED;
    const algorithms = {
      1: BreadthFirstSearch,
      2: DepthFirstSearch,
      3: Dijkstra,
      4: Astar
    };
    algorithms[algo](data, startid, endid, SPEED);
  }

  $("body").on("dblclick", ".unit", function () {
    const id = $(this).attr("id");
    if (!startid) {
      $(this).addClass("target");
      startid = id;
    } else if (!endid) {
      $(this).addClass("target");
      endid = id;
    }
  });

  $("#clear").on("click", () => {
    startid = endid = undefined;
    wall = [];
    data = [];
    $(".unit").addClass("restore").removeClass("animate target wall path");
  });

  // Mouse wall drawing
  $("body")
    .on("mousedown", ".unit", () => isDown = true)
    .on("mouseup", ".unit", () => isDown = false)
    .on("mouseover", ".unit", function () {
      if (!isDown) return;
      const $el = $(this);
      if ($el.css("background-color") === "rgb(1, 110, 253)") {
        $el.removeClass("wall").addClass("restore");
      } else if ($el.css("background-color") !== "rgb(38, 38, 38)") {
        $el.addClass("wall").removeClass("restore");
      }
    });

  $("#wall").on("click", () => {
    for (let i = 0; i < SIZE * SIZE; i++) {
      if (i === parseInt(startid) || i === parseInt(endid)) continue;
      if (Math.floor(Math.random() * 10) <= 2) {
        $("#" + i).addClass("wall");
      }
    }
  });

  function wallGenerate() {
    wall = [];
    for (let i = 0; i < SIZE * SIZE; i++) {
      if ($("#" + i).css("background-color") === "rgb(1, 110, 253)") {
        wall.push(i);
      }
    }
  }

  function connectArray(size) {
    uniqueId = 0;
    data = Array.from({ length: size }, () => new Array(size));

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const id = uniqueId++;
        const isWall = wall.includes(id);
        data[i][j] = new Spot(i, j, isWall, id);
      }
    }

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
    this.visited = false;
    this.distance = Infinity;
    this.heuristic = 0;
    this.f = this.distance + this.heuristic;
    this.source = "";

    this.connectFrom = (data) => {
      if (i > 0 && !data[i - 1][j].isWall) this.neighbors.push(data[i - 1][j]);
      if (i < SIZE - 1 && !data[i + 1][j].isWall) this.neighbors.push(data[i + 1][j]);
      if (j > 0 && !data[i][j - 1].isWall) this.neighbors.push(data[i][j - 1]);
      if (j < SIZE - 1 && !data[i][j + 1].isWall) this.neighbors.push(data[i][j + 1]);
    };
  }
});
