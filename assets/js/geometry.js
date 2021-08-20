
const DEG_RAD = Math.PI/180;
const RAD_DEG = 180/Math.PI;

function lawOfCosinesSide(sideA,sideB,angleC) {
    return Math.sqrt(sideA*sideA + sideB*sideB - 2*sideA*sideB*Math.cos(angleC*DEG_RAD));
}

function lawOfCosinesAngle(sideA,sideB,sideC) {
    var temp = sideA*sideA - sideB*sideB - sideC*sideC;
    temp /= (-2*sideB*sideC);
    var output = Math.acos(temp);
    return output*RAD_DEG;
}

function lawOfSinesAngle(sideA,sideB,angleA) {
    return Math.asin(Math.sin(angleA*DEG_RAD)*sideB/sideA)*RAD_DEG;
}

function lawOfSinesSide(sideA,angleA,angleB) {
    return sideA*Math.sin(angleB*DEG_RAD)/Math.sin(angleA*DEG_RAD);
}

function hexafy(redVal,greenVal,blueVal) {
    var characters = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
    var newRed, newGreen, newBlue;
    if(redVal > -1 && redVal < 256) {
        newRed = Math.floor(redVal);
    } else if(redVal < 0) {
        newRed = redVal;
        do {
            newRed = Math.floor(newRed + 256);
        } while(newRed < 0);
    } else if(redVal >= 256) {
        newRed = redVal;
        do {
            newRed = Math.floor(newRed - 256);
        } while(newRed >= 256);
    }

    if(greenVal > -1 && greenVal < 256) {
        newGreen = Math.floor(greenVal);
    } else if(greenVal < 0) {
        newGreen = greenVal;
        do {
            newGreen = Math.floor(newGreen + 256);
        } while(newGreen < 0);
    } else if(greenVal >= 256) {
        newGreen = greenVal;
        do {
            newGreen = Math.floor(newGreen - 256);
        } while(newGreen >= 256);
    }

    if(blueVal > -1 && blueVal < 256) {
        newBlue = Math.floor(blueVal);
    } else if(blueVal < 0) {
        newBlue = blueVal;
        do {
            newBlue = Math.floor(newBlue + 256);
        } while(newBlue < 0);
    } else if(blueVal >= 256) {
        newBlue = blueVal;
        do {
            newBlue = Math.floor(newBlue - 256);
        } while(newBlue >= 256);
    }
    var r1,r2,g1,g2,b1,b2;
    r1 = Math.floor(newRed/16);
    r2 = newRed - r1*16;
    g1 = Math.floor(newGreen/16);
    g2 = newGreen - g1*16;
    b1 = Math.floor(newBlue/16);
    b2 = newBlue - b1*16;

    var output = `#${characters[r1]}${characters[r2]}${characters[g1]}${characters[g2]}${characters[b1]}${characters[b2]}`;
    return output;
}

class Triangle1 {
    constructor(angleA,angleB,sideA) {
        this.angleA = angleA > 120 ? 40 + Math.floor(Math.random()*81) : angleA;
        this.angleB = this.angleA + angleB >= 160 ? Math.ceil(Math.random()*(160 - this.angleA)) : angleB;
        this.angleC = 180 - (this.angleA + this.angleB);
        this.sideA = sideA;
        this.sideB = this.sideA*Math.sin(DEG_RAD*this.angleB)/Math.sin(DEG_RAD*this.angleA);
        this.sideC = this.sideA*Math.sin(DEG_RAD*this.angleC)/Math.sin(DEG_RAD*this.angleA);
    }

    angleType() {
        var maxAngle = Math.max(this.angleA,this.angleB,this.angleC);
        if(maxAngle > 90) {
            return "Obtuse";
        } else if(maxAngle == 90) {
            return "Right";
        } else {
            return "Acute";
        }
    }

    sideType() {
        if(this.angleA == this.angleB && this.angleA == this.angleC) {
            return "Equilateral";
        } else if(this.angleA == this.angleB || this.angleA == this.angleC || this.angleB == this.angleC) {
            return "Isosceles";
        } else {
            return "Scalene";
        }
    }

    triangleType() {
        var acute = "An acute triangle is any triangle in which all three angles measure less than 90&deg;.";
        var right = "A right triangle is any triangle that has exactly one 90&deg; angle.";
        var obtuse = "An obtuse triangle is any triangle that has exactly one angle that is greater than 90&deg; but less than 180&deg;.";
        var equilateral = "An equilateral triangle is a triangle in which all sides are congruent.";
        var isosceles = "An isosceles triangle is a triangle that has exactly two sides that are congruent.";
        var scalene = "A scalene triangle is a triangle in which none of the sides are congruent.";
        var angles = [acute,right,obtuse];
        var sides = [scalene,isosceles,equilateral];
        var n1, n2;
        switch(this.angleType()) {
            case "Obtuse":
                n1 = 2;
                break;
            case "Right":
                n1 = 1;
                break;
            case "Acute":
                n1 = 0;
                break;
        }
        switch(this.sideType()) {
            case "Scalene":
                n2 = 0;
                break;
            case "Isosceles":
                n2 = 1;
                break;
            case "Equilateral":
                n2 = 2;
                break;
        }
        return [angles[n1],sides[n2]];
    }
}

class Triangle2 {
    constructor(sideA,sideB,angleC) {
        this.sideA = sideA;
        this.sideB = sideB;
        this.tAngleC = angleC;
        this.angleC = this.getAngleC();
        this.sideC = lawOfCosinesSide(this.sideA,this.sideB,this.angleC);
        this.angleB = lawOfSinesAngle(this.sideC,this.sideB,this.angleC);
        this.angleA = 180 - (this.angleB + this.angleC);
        this.angleType = "Acute";
        if(Math.max(this.angleA,this.angleB,this.angleC) == 90) {
            this.angleType = "Right";
        } else if(Math.max(this.angleA,this.angleB,this.angleC) > 90) {
            this.angleType = "Obtuse";
        }
        this.triangle1 = new Triangle1(this.angleA,this.angleB,this.sideA);
    }

    getAngleC() {
        var output = this.tAngleC;
        if(output < 180 && output >= 0) {
            return output;
        }
        if(output >= 180) {
            while(output > 360) {
                output -= 360;
            }
            while(output > 180) {
                output -= 180;
            }
            return output;
        }
        if(output < 0) {
            while(output < -360) {
                output += 360;
            }
            while(output < 0) {
                output += 180;
            }
            return output;
        }
    }
}

class TriangleAnimate {
    constructor(sideA = 3, sideB = 4, colorA = "#FF0000", colorB = "#00FF00", colorC = "#0000FF", opacity = 0.6) {
        this.sideA = sideA;
        this.sideB = sideB;
        this.colorA = colorA;
        this.colorB = colorB;
        this.colorC = colorC;
        this.opacity = opacity;
        this.scale = 100/Math.max(this.sideA,this.sideB);
        this.angle = 0;
    }

    setAngle(inputAngle = 50) {
        if(inputAngle >= 0 && inputAngle <= 180) {
            this.angle = inputAngle;
        } else if(inputAngle < 0 && inputAngle >= -180) {
            this.angle = -inputAngle;
        } else if(inputAngle < -180) {
            this.angle = this.setAngle(inputAngle + 360);
        } else if(inputAngle > 180 && inputAngle <= 360) {
            this.angle = 360 - inputAngle;
        } else if(inputAngle > 360) {
            this.angle = this.setAngle(inputAngle - 360);
        }
    }

    calculateArea() {
        var triHeight = this.sideB*Math.sin(this.angle*DEG_RAD);
        return 0.5*triHeight*this.sideA;
    }

    renderFigure(inputAngle = 50) {
        this.setAngle(inputAngle);
        var lineW = 2;
        var output = `<svg viewBox='-105 -105 210 110' alt='Animated triangle changing size with angle between two of the sides.'>`;
        output += `<line x1='0' y1='0' x2='${this.sideA*this.scale}' y2='0' stroke='${this.colorA}' stroke-width='${lineW}' opacity='${this.opacity}' />`;
        var x = this.sideB*this.scale*Math.cos(this.angle*DEG_RAD);
        var y = this.sideB*this.scale*Math.sin(this.angle*DEG_RAD);
        output += `<line x1='0' y1='0' x2='${x}' y2='${-y}' stroke='${this.colorB}' stroke-width='${lineW}' opacity='${this.opacity}' />`;
        output += `<line x1='${this.sideA*this.scale}' y1='0' x2='${x}' y2='${-y}' stroke='${this.colorC}' stroke-width='${lineW}' opacity='${this.opacity}' />`;
        output += `</svg>`;
        return output;
    }
}

class CircleSectorAnimate {
    constructor(radius = 100, theta = 45) {
        this.radius = radius;
        this.theta = theta;
        if(this.theta > 360) {
            do {
                this.theta -= 360;
            } while(this.theta > 360);
        } else if(this.theta < 0) {
            do {
                this.theta += 360;
            } while(this.theta < 0);
        }
        this.scale = 100/this.radius;
    }

    updateTheta(inputAngle = 270) {
        var output = inputAngle;
        if(output > 360) {
            do {
                output -= 360;
            } while(output > 360);
        } else if(output < 0) {
            do {
                output += 360;
            } while(output < 0);
        }
        this.theta = output;
    }

    calculateStats(inputAngle = this.theta) {
        var area = this.radius*this.radius*inputAngle/360;
        var circumference = 2*this.radius*inputAngle/360;
        return [circumference,area];
    }

    renderFigure(inputAngle = this.theta) {
        var lineW = 2;
        this.updateTheta(inputAngle);
        var output = `<svg viewBox='-105 -105 210 210'>`;
        output += `<circle cx='0' cy='0' r='100' stroke='black' stroke-width='${lineW*0.75}' fill='none' />`;
        output += `<path d='M0 0 L 100 0 A 100 100, 0, `;
        if(inputAngle > 180) {
            output += "1";
        } else {
            output += "0";
        }
        output += `, 0, `;
        var x = 100*Math.cos(inputAngle*DEG_RAD);
        var y = 100*Math.sin(inputAngle*DEG_RAD);
        output += `${x} ${-y} L 0 0 Z' stroke='#731C98' fill='#f39218' stroke-width='${lineW}' />`;
        output += `</svg>`;
        return output;
    }
}

class RectangleAnimate {
    constructor(squareSide = 24, sideMax = 35) {
        this.squareSide = squareSide;
        this.sideMax = sideMax;
        this.factors = this.getFactors();
        this.perimeterPairs1 = this.getPerimeterPairs1();
        this.perimeterPairs2 = this.getPerimeterPairs2();
        this.scale1 = 500/this.squareSide/3;
        this.scale2 = 480/this.sideMax;
    }

    getFactors() {
        var output = [];
        for(var i = 1; i < this.squareSide*this.squareSide + 1; i++) {
            if(this.squareSide*this.squareSide%i == 0) {
                output.push(i);
            }
        }
        return output;
    }

    getPerimeterPairs1() {
        var output = [];
        var midIndex = (this.factors.length - 1)/2;
        for(var i = 0; i < midIndex; i++) {
            output.push([this.factors[i],this.factors[this.factors.length - 1 - i]]);
        }
        output.push([this.factors[midIndex],this.factors[midIndex]]);
        return output;
    }

    getPerimeterPairs2() {
        var output = [];
        if((this.sideMax + 1)%2 == 0) {
            for(var i = 1; i < (this.sideMax + 1)/2; i++) {
                output.push([i,this.sideMax + 1 - i]);
            }
            output.push([(this.sideMax + 1)/2,(this.sideMax + 1)/2]);
        } else {
            for(var i = 1; i < this.sideMax/2 + 1; i++) {
                output.push([i,this.sideMax + 1 - i]);
            }
        }
        return output;
    }

    getDimensions1(index = 0) {
        var newIndex = index%this.perimeterPairs1.length;
        return this.perimeterPairs1[newIndex];
    }

    getDimensions2(index = 0) {
        var newIndex = index%this.perimeterPairs2.length;
        return this.perimeterPairs2[newIndex];
    }

    renderRectangle1(inputIndex = 0) {
        var lineW = 2;
        var newIndex = inputIndex%this.perimeterPairs1.length;
        var output = `<svg viewBox='-350 -125 700 250'>`;
        output += `<rect x='${-this.perimeterPairs1[newIndex][1]/2*this.scale1}' y='${-this.perimeterPairs1[newIndex][0]/2*this.scale1}' width='${this.perimeterPairs1[newIndex][1]*this.scale1}' height='${this.perimeterPairs1[newIndex][0]*this.scale1}' stroke='#f39218' stroke-width='${lineW}' fill='#731C98' />`;
        output += `</svg>`;
        return output;
    }

    renderRectangle2(inputIndex = 0) {
        var lineW = 2;
        var newIndex = inputIndex%this.perimeterPairs2.length;
        var output = `<svg viewBox='-250 -125 500 250'>`;
        output += `<rect x='${-this.perimeterPairs2[newIndex][1]/2*this.scale2}' y='${-this.perimeterPairs2[newIndex][0]/2*this.scale2}' width='${this.perimeterPairs2[newIndex][1]*this.scale2}' height='${this.perimeterPairs2[newIndex][0]*this.scale2}' stroke='#731C98' stroke-width='${lineW}' fill='#f39218' />`;
        output += `</svg>`;
        return output;
    }
}
