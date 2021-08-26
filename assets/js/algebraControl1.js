
var parLinAn1Start = document.getElementById("parLinAn1Start");
var parLinAn1Pause = document.getElementById("parLinAn1Pause");
var parLinAn1Data = document.getElementById("parLinAn1Data");
var parLinAn1Display = document.getElementById("parLinAn1Display");

var linSyst1 = new ParallelStandard(reselectIfZero(6),reselectIfZero(6),reselectIfZero(20),reselectValue(4,-1,1),false);
var lineInt1 = Math.floor(Math.random()*2);
parLinAn1Display.innerHTML = linSyst1.renderSystem(0,lineInt1);
parLinAn1Data.innerHTML = linSyst1.lineList();
var linSyst1Indices = linearAdjustments(15);
var linIndex1 = Math.floor(linSyst1Indices.length/2);
var linSyst1Increasing = true;
var linSyst1Moving = false;
var linSyst1Interval;

parLinAn1Start.addEventListener("click", function() {
    if(!linSyst1Moving) {
        linSyst1Moving = true;
        var adjustment;
        linSyst1Interval = setInterval(function() {
            if(linSyst1Increasing) {
                linIndex1++;
                if(linIndex1 >= linSyst1Indices.length) {
                    linIndex1 = linSyst1Indices.length - 1;
                    linSyst1Increasing = false;
                }
            } else {
                linIndex1--;
                if(linIndex1 < 0) {
                    linIndex1 = 0;
                    linSyst1Increasing = true;
                }
            }
            if(linIndex1 == Math.floor(linSyst1Indices/2)) {
                adjustment = 0;
            } else if(linSyst1Increasing) {
                adjustment = linSyst1.multiple;
            } else {
                adjustment = -linSyst1.multiple;
            }
            parLinAn1Display.innerHTML = linSyst1.renderSystem(adjustment,lineInt1);
            parLinAn1Data.innerHTML = linSyst1.lineList();
            console.log(linIndex1);
        }, 800);
    }
});

parLinAn1Pause.addEventListener("click", () => {
    if(linSyst1Moving) {
        linSyst1Moving = false;
        clearInterval(linSyst1Interval);
    }
});

var linSyst1Start = document.getElementById("linSyst1Start");
var linSyst1Pause = document.getElementById("linSyst1Pause");
var linSyst1Q = document.getElementById("linSyst1Q");
var linSyst1Display = document.getElementById("linSyst1Display");

var linIntSyst1 = new LinearAlgebra1();
var linIntSyst1Index = 0;
var linIntSyst1Moving = false;
var linIntSyst1Interval;

linSyst1Q.innerHTML = linIntSyst1.qArray[0];
linSyst1Display.innerHTML = `<div class='diplay-solution'><h3>Solution</h3>` + linIntSyst1.solutionsSteps[linIntSyst1Index] + "</div>";

linSyst1Start.addEventListener("click", function() {
    if(!linIntSyst1Moving) {
        linIntSyst1Moving = true;
        linIntSyst1Interval = setInterval(function() {
            linIntSyst1Index++;
            if(linIntSyst1Index >= linIntSyst1.solutionsSteps.length) {
                linIntSyst1Index = 0;
            }
            linSyst1Display.innerHTML = `<div class='diplay-solution'><h3>Solution</h3>` + linIntSyst1.solutionsSteps[linIntSyst1Index] + "</div>";
        },2000);
    }
});

linSyst1Pause.addEventListener("click", function() {
    if(linIntSyst1Moving) {
        linIntSyst1Moving = false;
        clearInterval(linIntSyst1Interval);
    }
});

var linSyst2Start = document.getElementById("linSyst2Start");
var linSyst2Pause = document.getElementById("linSyst2Pause");
var linSyst2Q = document.getElementById("linSyst2Q");
var linSyst2Display = document.getElementById("linSyst2Display");

var linIntSyst2 = new LinearElimination();
var linIntSyst2Index = 0;
var eliminatingX = true;
var solutionMoving2 = false;
var linSyst2Interval;

linSyst2Q.innerHTML = `<ul><li>${formatStandardLinear(linIntSyst2.line1Cos[0],linIntSyst2.line1Cos[1],linIntSyst2.line1Cos[2],linIntSyst2.lineColor1)}</li><li>${formatStandardLinear(linIntSyst2.line2Cos[0],linIntSyst2.line2Cos[1],linIntSyst2.line2Cos[2],linIntSyst2.lineColor2)}<li><li>What is the solution, (<i>x</i>,<i>y</i>), to the system above?</li></ul>`;
linSyst2Display.innerHTML = `<h3>Solution - Eliminate <i>x</i></h3><ul><li>${formatStandardLinear(linIntSyst2.line1Cos[0],linIntSyst2.line1Cos[1],linIntSyst2.line1Cos[2],linIntSyst2.lineColor1)}</li><li>${formatStandardLinear(linIntSyst2.line2Cos[0],linIntSyst2.line2Cos[1],linIntSyst2.line2Cos[2],linIntSyst2.lineColor2)}<li></ul>`;

linSyst2Start.addEventListener("click", function() {
    if(!solutionMoving2) {
        solutionMoving2 = true;
        linSyst2Interval = setInterval(() => {
            linIntSyst2Index++;
            if(eliminatingX) {
                if(linIntSyst2Index >= linIntSyst2.eliminateX.length) {
                    linIntSyst2Index = 0;
                    eliminatingX = false;
                }
            } else {
                if(linIntSyst2Index >= linIntSyst2.eliminateY.length) {
                    linIntSyst2Index = 0;
                    eliminatingX = true;
                }
            }
            if(eliminatingX) {
                linSyst2Display.innerHTML = `<h3>Solution - Eliminate <i>x</i></h3>${linIntSyst2.eliminateX[linIntSyst2Index]}`;
            } else {
                linSyst2Display.innerHTML = `<h3>Solution - Eliminate <i>y</i></h3>${linIntSyst2.eliminateY[linIntSyst2Index]}`;
            }
        }, 2500);
    }
});

linSyst2Pause.addEventListener("click", function() {
    if(solutionMoving2) {
        solutionMoving2 = false;
        clearInterval(linSyst2Interval);
    }
});

var compSquareStart = document.getElementById("compSquareStart");
var compSquarePause = document.getElementById("compSquarePause");
var compSquareQuest = document.getElementById("compSquareQuest");
var compSquareDisplay = document.getElementById("compSquareDisplay");

var compSquareIndex = 0;
var compSquareSolving = false;
var compSquareOb = new CompleteTheSquare1();
var compSquareInterval;

compSquareQuest.innerHTML = compSquareOb.solutionsSteps[0][compSquareIndex];
compSquareDisplay.innerHTML = `<h3>Solution</h3>${compSquareOb.solutionsSteps[1][compSquareIndex]}`;

compSquareStart.addEventListener("click", function() {
    if(!compSquareSolving) {
        compSquareSolving = true;
        compSquareInterval = setInterval(() => {
            compSquareIndex++;
            if(compSquareIndex >= compSquareOb.solutionsSteps[0].length) {
                compSquareIndex = 0;
            }
            compSquareQuest.innerHTML = compSquareOb.solutionsSteps[0][compSquareIndex];
            compSquareDisplay.innerHTML = `<h3>Solution</h3>${compSquareOb.solutionsSteps[1][compSquareIndex]}`;
        },4000);
    }
});

compSquarePause.addEventListener("click", function() {
    if(compSquareSolving) {
        compSquareSolving = false;
        clearInterval(compSquareInterval);
    }
});