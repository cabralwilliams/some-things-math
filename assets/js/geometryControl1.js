var tAngles1 = () => {
    var output = [0,0,0,0,0,0,0,0,0,0,0,0];
    for(var i = 1; i < 90; i++) {
        output.push(i);
    }
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    for(var i = 91; i < 180; i++) {
        output.push(i);
    }
    output.push(180);
    output.push(180);
    output.push(180);
    output.push(180);
    output.push(180);
    output.push(180);
    output.push(180);
    output.push(180);
    output.push(180);
    output.push(180);
    output.push(180);
    output.push(180);
    return output;
};

var circleAngles1 = () => {
    var output = [0,0,0,0,0,0,0,0,0,0,0,0];
    for(var i = 0.9; i < 90; i += 0.9) {
        output.push(i);
    }
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    output.push(90);
    for(i = 90.9; i < 180; i += 0.9) {
        output.push(i);
    }
    for(i = 0; i < 15; i++) {
        output.push(180);
    }
    for(i = 180.9; i <270; i += 0.9) {
        output.push(i);
    }
    for(i = 0; i < 15; i += 0.9) {
        output.push(270);
    }
    for(i = 270.9; i < 360; i += 0.9) {
        output.push(i);
    }
    for(i = 0; i < 15; i++) {
        output.push(360);
    }
    return output;
};

var triAn1Start = document.getElementById("triAn1Start");
var triAn1Pause = document.getElementById("triAn1Pause");
var triAn1Display = document.getElementById("triAn1Display");
var triAn1Data = document.getElementById("triAn1Data");
var circAn1Start = document.getElementById("circAn1Start");
var circAn1Pause = document.getElementById("circAn1Pause");
var circAn1Display = document.getElementById("circAn1Display");
var circAn1Data = document.getElementById("circAn1Data");
var triAn1Index = 0;
var circAn1Index = 0;
var triAn1Bool = false;
var triAn1Increasing = true;
var t1Angles = tAngles1();
var circAn1Bool = false;
var circAn1Increasing = true;
var c1Angles = circleAngles1();
var triAn1Interval, circAn1Interval;

var tri1ObA = new Triangle2(80,60,1);
var tri1ObB = new TriangleAnimate(80,60);
var circ1Ob = new CircleSectorAnimate(100,0);

triAn1Display.innerHTML = tri1ObB.renderFigure(0);
triAn1Data.innerHTML = `<ul><li>Angle Type: None</li><li>Side Type: None</li></ul><h3>Law of Cosines:</h3><h3>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> - 2&dot;a&dot;b&dot;cos<i>C</i></h3><ul><li>Area: ${tri1ObB.calculateArea()}</li></ul>`;

circAn1Display.innerHTML = circ1Ob.renderFigure();
circAn1Data.innerHTML = `<ul><li>Radius: 100</li><li>Angle Fraction: <sup>0&deg;</sup>&frasl;<sub>360&deg;</sub></li><li>Length Fraction: <sup>0 &pi;</sup>&frasl;<sub>200 &pi;</sub></li><li>Area Fraction: <sup>0 &pi;</sup>&frasl;<sub>10000 &pi;</sub></li><li>Percentage: <sup>0</sup>&frasl;<sub>100</sub></li></ul>`;

triAn1Start.addEventListener("click", function() {
    if(!triAn1Bool) {
        triAn1Bool = true;
        triAn1Interval = setInterval(function() {
            if(triAn1Increasing) {
                triAn1Index++;
                if(triAn1Index >= t1Angles.length) {
                    triAn1Index--;
                    triAn1Increasing = false;
                }
            } else {
                triAn1Index--;
                if(triAn1Index < 0) {
                    triAn1Index = 0;
                    triAn1Increasing = true;
                }
            }
            tri1ObB.setAngle(t1Angles[triAn1Index]);
            triAn1Display.innerHTML = tri1ObB.renderFigure(tri1ObB.angle);
            var triData = "";
            if(tri1ObB.angle == 0 || tri1ObB.angle == 180) {
                triData = `<ul><li>Angle Type: None</li><li>Side Type: None</li></ul><h3>Law of Cosines:</h3><h3>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> - 2&dot;a&dot;b&dot;cos<i>C</i></h3>`;
            } else {
                tri1ObA = new Triangle2(80,60,tri1ObB.angle);
                triData = `<ul><li>Angle Type: ${tri1ObA.angleType}</li><li>Side Type: ${tri1ObA.triangle1.sideType()}</li></ul><h3>Law of Cosines:</h3><h3>c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> - 2&dot;a&dot;b&dot;cos<i>C</i></h3><ul><li>`;
                if(tri1ObA.sideA > tri1ObA.sideC) {
                    triData += `<span style='color: #FF0000;'>${tri1ObA.sideA}<sup>2</sup></span> `;
                    if(tri1ObA.angleType == "Obtuse") {
                        triData += `&gt;`;
                    } else if(tri1ObA.angleType == "Right") {
                        triData += `=`;
                    } else {
                        triData += `&lt;`;
                    }
                    triData += ` <span style='color: #00FF00;'>${tri1ObA.sideB}<sup>2</sup></span> + <span style='color: #0000FF;'>${tri1ObA.sideC.toFixed(2)}<sup>2</sup></span></li></ul>`;
                } else {
                    triData += `<span style='color: #0000ff;'>${tri1ObA.sideC.toFixed(2)}<sup>2</sup></span> `;
                    if(tri1ObA.angleType == "Obtuse") {
                        triData += `&gt;`;
                    } else if(tri1ObA.angleType == "Right") {
                        triData += `=`;
                    } else {
                        triData += `&lt;`;
                    }
                    triData += ` <span style='color: #00FF00;'>${tri1ObA.sideB}<sup>2</sup></span> + <span style='color: #ff0000;'>${tri1ObA.sideA}<sup>2</sup></span></li></ul>`;
                }
            }
            triData += `<ul><li>Area: ${tri1ObB.calculateArea()}</li><li>Angle A: ${tri1ObA.angleA.toFixed(2)}</li><li>Angle B: ${tri1ObA.angleB.toFixed(2)}</li><li>Angle C: ${tri1ObA.angleC.toFixed(2)}</li></ul>`;
            triAn1Data.innerHTML = triData;
        },150);
    }
});

triAn1Pause.addEventListener("click", function() {
    if(triAn1Bool) {
        triAn1Bool = false;
        clearInterval(triAn1Interval);
    }
});

circAn1Start.addEventListener("click", function() {
    if(!circAn1Bool) {
        circAn1Bool = true;
        circAn1Interval = setInterval(function() {
            if(circAn1Increasing) {
                circAn1Index++;
                if(circAn1Index >= c1Angles.length) {
                    circAn1Index--;
                    circAn1Increasing = false;
                }
            } else {
                circAn1Index--;
                if(circAn1Index < 0) {
                    circAn1Index = 0;
                    circAn1Increasing = true;
                }
            }
            circ1Ob.updateTheta(c1Angles[circAn1Index]);
            circAn1Display.innerHTML = circ1Ob.renderFigure(circ1Ob.theta);
            var fractionData = circ1Ob.calculateStats(circ1Ob.theta);
            var circData = `<ul><li>Radius: 100</li><li>Angle Fraction: <sup>${circ1Ob.theta.toFixed(2)}&deg;</sup>&frasl;<sub>360&deg;</sub></li><li>Length Fraction: <sup>${fractionData[0].toFixed(2)} &pi;</sup>&frasl;<sub>200 &pi;</sub></li><li>Area Fraction: <sup>${fractionData[1].toFixed(2)} &pi;</sup>&frasl;<sub>10000 &pi;</sub></li><li>Percentage: <sup>${(circ1Ob.theta/360*100).toFixed(2)}</sup>&frasl;<sub>100</sub></li></ul>`;
            circAn1Data.innerHTML = circData;
        },120);
    }
});

circAn1Pause.addEventListener("click", function() {
    if(circAn1Bool) {
        circAn1Bool = false;
        clearInterval(circAn1Interval);
    }
});

var calcRectangleInfo = (dimensions) => {
    return `<ul><li>Length: ${dimensions[1]}</li><li>Width: ${dimensions[0]}</li><li>Perimeter: ${2*(dimensions[0] + dimensions[1])}</li><li>Area: ${dimensions[0]*dimensions[1]}</li></ul>`;
}

var rectAn1Start = document.getElementById("rectAn1Start");
var rectAn1Pause = document.getElementById("rectAn1Pause");
var rectAn1Data = document.getElementById("rectAn1Data");
var rectAn1Display = document.getElementById("rectAn1Display");
var rectOb1 = new RectangleAnimate();
var rectIndex1 = 0;
var rectTInterval1;
var rectAn1Bool = false;
var rectAn1Increase = true;
rectAn1Display.innerHTML = rectOb1.renderRectangle2(rectIndex1);
var rectData1 = rectOb1.getDimensions2(0);
rectAn1Data.innerHTML = calcRectangleInfo(rectData1);

rectAn1Start.addEventListener("click", function() {
    if(!rectAn1Bool) {
        rectAn1Bool = true;
        rectTInterval1 = setInterval(function() {
            if(rectAn1Increase) {
                rectIndex1++;
                if(rectIndex1 >= rectOb1.perimeterPairs2.length) {
                    rectIndex1 = rectOb1.perimeterPairs2.length - 1;
                    rectAn1Increase = false;
                }
            } else {
                rectIndex1--;
                if(rectIndex1 < 0) {
                    rectIndex1 = 0;
                    rectAn1Increase = true;
                }
            }
            rectAn1Display.innerHTML = rectOb1.renderRectangle2(rectIndex1);
            rectData1 = rectOb1.getDimensions2(rectIndex1);
            rectAn1Data.innerHTML = calcRectangleInfo(rectData1);
        },750);
    }
});

rectAn1Pause.addEventListener("click", function() {
    rectAn1Bool = false;
    clearInterval(rectTInterval1);
});

var rectAn2Start = document.getElementById("rectAn2Start");
var rectAn2Pause = document.getElementById("rectAn2Pause");
var rectAn2Data = document.getElementById("rectAn2Data");
var rectAn2Display = document.getElementById("rectAn2Display");
var rectIndex2 = 0;
var rectTInterval2;
var rectAn2Bool = false;
var rectAn2Increase = true;
rectAn2Display.innerHTML = rectOb1.renderRectangle1(rectIndex2);
var rectData2 = rectOb1.getDimensions1(0);
rectAn2Data.innerHTML = calcRectangleInfo(rectData2);

rectAn2Start.addEventListener("click", function() {
    if(!rectAn2Bool) {
        rectAn2Bool = true;
        rectTInterval2 = setInterval(function() {
            if(rectAn2Increase) {
                rectIndex2++;
                if(rectIndex2 >= rectOb1.perimeterPairs1.length) {
                    rectIndex2 = rectOb1.perimeterPairs1.length - 1;
                    rectAn2Increase = false;
                }
            } else {
                rectIndex2--;
                if(rectIndex2 < 0) {
                    rectIndex2 = 0;
                    rectAn2Increase = true;
                }
            }
            rectAn2Display.innerHTML = rectOb1.renderRectangle1(rectIndex2);
            rectData2 = rectOb1.getDimensions1(rectIndex2);
            rectAn2Data.innerHTML = calcRectangleInfo(rectData2);
        },750);
    }
});

rectAn2Pause.addEventListener("click", function() {
    rectAn2Bool = false;
    clearInterval(rectTInterval2);
});