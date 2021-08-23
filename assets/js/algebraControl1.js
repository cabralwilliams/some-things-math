
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