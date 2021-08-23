
const DEG_RAD = Math.PI/180;
const RAD_DEG = 180/Math.PI;

var reselectIfZero = (intRange = 10) => {
    var output = -intRange + Math.floor(Math.random()*(2*intRange + 1));
    if(output != 0) {
        return output;
    } else {
        do {
            output = -intRange + Math.floor(Math.random()*(2*intRange + 1));
        } while(output == 0);
    }
    return output;
};

var reselectValue = (intRange = 5, offLimitLow = -1, offLimitHigh = 1) => {
    var output = -intRange + Math.floor(Math.random()*(2*intRange + 1));
    if(output < offLimitLow || output > offLimitHigh) {
        return output;
    } else {
        do {
            output = -intRange + Math.floor(Math.random()*(2*intRange + 1));
        } while(output >= offLimitLow && output <= offLimitHigh);
    }
    return output;
};

var formatStandardLinear = (a = 1, b = 1, c = 1, color = "black") => {
    var output = "";
    if(a == -1) {
        output += "-";
    } else if(a != 1 && a != 0) {
        output += `<span style='color: ${color};'>` + a + "</span>";
    }
    output += "<i>x</i> ";
    if(b < 0) {
        output += "- ";
        if(b != -1) {
            output += `<span style='color: ${color};'>` + (-b) + "</span>";
        }
    } else {
        output += "+ ";
        if(b != 1 && b != 0) {
            output += `<span style='color: ${color};'>` + b + "</span>";
        }
    }
    output += "<i>y</i> = " + `<span style='color: ${color};'>` + c + "</span>";
    return output;
};

var formatStandardLinear2 = (a,b,c) => {
    var output = "";
    if(typeof a == "number") {
        if(a == -1) {
            output += "-";
        } else if(a != 1 && a != 0) {
            output += a;
        }
    } else {
        output += a;
    }
    output += "<i>x</i> ";
    if(typeof b == "number") {
        if(b < 0) {
            output += "- ";
            if(b != -1) {
                output += -b;
            }
        } else {
            output += "+ ";
            if(b != 1) {
                output += b;
            }
        }
    } else {
        output += "+ " + b;
    }
    output += "<i>y</i> = " + c;
    return output;
};

var formatStandardLinearLeft = (a = 1, b = 1, color = "black") => {
    var output = "";
    if(a == -1) {
        output += "-";
    } else if(a != 1 && a != 0) {
        output += `<span style='color: ${color};'>` + a + "</span>";
    }
    output += "<i>x</i> ";
    if(b < 0) {
        output += "- ";
        if(b != -1) {
            output += `<span style='color: ${color};'>` + (-b) + "</span>";
        }
    } else {
        output += "+ ";
        if(b != 1 && b != 0) {
            output += `<span style='color: ${color};'>` + b + "</span>";
        }
    }
    output += "<i>y</i>";
    return output;
};

var greatestCommonFactor = (inputArray = [1,2,3,4,5]) => {
    //returns the greatest common positive factor of a list of integers input as an array
    var posVals = [];
    for(var i = 0; i < inputArray.length; i++) {
        posVals.push(Math.abs(inputArray[i]));
    }
    var maxGCF = Math.min(...posVals);
    if(maxGCF == 1) {
        return 1;
    }
    var gcf = 1;
    for(var i = 2; i < maxGCF + 1; i ++) {
        var divisibleCount = 0;
        for(var j = 0; j < posVals.length; j++) {
            if(posVals[j]%i == 0) {
                divisibleCount++;
            }
        }
        if(divisibleCount == posVals.length) {
            var iIsFactor = true;
            while(iIsFactor) {
                for(var j = 0; j < posVals.length; j++) {
                    posVals[j] /= i;
                }
                gcf *= i;
                divisibleCount = 0;
                for(j = 0; j < posVals.length; j++) {
                    if(posVals[j]%i == 0) {
                        divisibleCount++;
                    }
                }
                if(divisibleCount != posVals.length) {
                    iIsFactor = false;
                }
            }
        }
    }
    return gcf;
};

var standardSVGLine = (aCo,bCo,cCo,strokeColor,lineW = 2,scaleUp = 5, initX = -20, finalX = 20, opacity = 0.75) => {
    var slope = -aCo/bCo;
    var intercept = cCo/bCo*scaleUp;
    return `<line x1='${initX*scaleUp}' y1='${-(slope*initX*scaleUp + intercept)}' x2='${finalX*scaleUp}' y2='${-(slope*finalX*scaleUp + intercept)}' stroke='${strokeColor}' stroke-width='${lineW}' opacity='${opacity}' />`;
};

class ParallelStandard {
    constructor(a = reselectIfZero(8), b = reselectIfZero(8), c = reselectIfZero(20), multiple = reselectValue(6,-1,1), isEquivalent = false) {
        //The constructor inputs the A, B, C coefficents in the Ax + By = C equation of the first line, picks the multiple scaling the second line, and indicates whether the lines are initially identical
        this.a = a;
        this.b = b;
        this.c = c;
        this.multiple = multiple;  //Scale factor
        this.isEquivalent = isEquivalent;
        this.a2 = this.multiple*a;
        this.b2 = this.multiple*b;
        this.c2 = this.isEquivalent ? this.multiple*c : this.multiple*c - this.multiple;  //Determines whether the lines begin as equivalent lines
        this.lines = this.constructLines(); //Initially constructed line equations
        this.line1 = this.lines[0];
        this.line2 = this.lines[1];
        this.colorRoll = Math.floor(Math.random()*2); //Determines which color each line will be
    }

    constructLines() {
        var lineColor1 = this.colorRoll == 0 ? "#731C98" : "#f39218";
        var lineColor2 = this.colorRoll == 0 ? "#f39218" : "#731C98";
        var line1 = formatStandardLinear(this.a,this.b,this.c,lineColor1);
        var line2 = formatStandardLinear(this.a2,this.b2,this.c2,lineColor2);
        return [line1,line2];
    }

    adjustLine(adjustment = 0,lineInt = 0) {
        if(lineInt == 0) {
            this.c += adjustment;
            this.lines = this.constructLines();
            this.line1 = this.lines[0];
            this.line2 = this.lines[1];
        } else if(lineInt == 1) {
            this.c2 += adjustment;
            this.lines = this.constructLines();
            this.line1 = this.lines[0];
            this.line2 = this.lines[1];
        }
    }

    linesAreEquivalent() {
        if(this.a*this.c2 == this.a2*this.c) {
            return true;
        } else {
            return false;
        }
    }

    renderSystem(adjustment = 0, lineInt = 0) {
        this.adjustLine(adjustment,lineInt);
        var lineW = 2;
        var opacity = 0.75;
        var startPos = 15;
        var lineColor1 = this.colorRoll == 0 ? "#731C98" : "#f39218";
        var lineColor2 = this.colorRoll == 0 ? "#f39218" : "#731C98";
        var output = `<svg viewBox='-180 -180 360 360'>`;
        output += `<line x1='-170' y1='0' x2='170' y2='0' stroke='black' stroke-width='${lineW*0.75}' />`;
        output += `<line y1='-170' x1='0' y2='170' x2='0' stroke='black' stroke-width='${lineW*0.75}' />`;
        output += standardSVGLine(this.a,this.b,this.c,lineColor1,lineW,8,-startPos,startPos,opacity);
        output += standardSVGLine(this.a2,this.b2,this.c2,lineColor2,lineW,8,-startPos,startPos,opacity);
        output += `</svg>`;
        return output;
    }

    lineList() {
        var lineColor1 = this.colorRoll == 0 ? "#731C98" : "#f39218";
        var lineColor2 = this.colorRoll == 0 ? "#f39218" : "#731C98";
        var output = `<ul><li>Line 1: ${this.line1}</li><li>Line 2: ${this.line2}</li>`;
        output += `<li>Ratios: <sup style='color: ${lineColor1};'>${this.a}</sup>&frasl;<sub style='color: ${lineColor2};'>${this.a2}</sub> = <sup style='color: ${lineColor1};'>${this.b}</sup>&frasl;<sub style='color: ${lineColor2};'>${this.b2}</sub> `;
        if(this.linesAreEquivalent()) {
            output += `=`;
        } else {
            output += `&ne;`;
        }
        var lineStatus = this.linesAreEquivalent() ? "Identical Lines" : "Paralllel Lines";
        output += `<sup style='color: ${lineColor1};'>${this.c}</sup>&frasl;<sub style='color: ${lineColor2};'>${this.c2}</sub></li><li>Status: ${lineStatus}</li></ul>`;
        return output;
    }
}

var linearAdjustments = (maxAdjust = 20) => {
    var output = [];
    for(var i = -maxAdjust; i < maxAdjust + 1; i++) {
        output.push(i);
    }
    return output;
};

class LinearAlgebra1 {
    constructor(solX = reselectIfZero(7), solY = reselectIfZero(7), solMethod = Math.floor(Math.random()*6)) {
        //The constructor inputs the (x,y) solution and also dictates the line combo method
        this.solX = solX;
        this.solY = solY;
        this.solMethod = solMethod; //Determines combination criteria 0: 1+1, 1: 1-1, 2: 2-1, 3: 1-2, 4: -2+1, 5: -1+2
        this.lineCoefficients = this.getLineCoefficients();
        this.colorRoll = Math.floor(Math.random()*2); //Determines which color each line will be
        this.lineColor1 = this.colorRoll == 0 ? "#731C98" : "#f39218";
        this.lineColor2 = this.colorRoll == 0 ? "#f39218" : "#731C98";
        this.qArray = this.createQuestion();
        this.solutionsSteps = this.getSolutionSteps();
    }

    getLineCoefficients() {
        var a1, b1, a2, b2;
        do {
            a1 = reselectIfZero(10);
            b1 = reselectIfZero(10);
            a2 = reselectIfZero(10);
            b2 = reselectIfZero(10);
            switch(this.solMethod) {
                case 0:
                    if(a1 + a2 == 0 || b1 + b2 == 0) {
                        a1 = 1;
                        a2 = 1;
                        b1 = 1;
                        b2 = 1;
                    }
                    break;
                case 1:
                    if(a1 == a2 || b1 == b2) {
                        a1 = 1;
                        a2 = 1;
                        b1 = 1;
                        b2 = 1;
                    }
                    break;
                case 2:
                    if(2*a1 == a2 || 2*b1 == b2) {
                        a1 = 1;
                        a2 = 1;
                        b1 = 1;
                        b2 = 1;
                    }
                    break;
                case 3:
                    if(a1 == 2*a2 || b1 == 2*b2) {
                        a1 = 1;
                        a2 = 1;
                        b1 = 1;
                        b2 = 1;
                    }
                    break;
                case 4:
                    if(2*a1 == a2 || 2*b1 == b2) {
                        a1 = 1;
                        a2 = 1;
                        b1 = 1;
                        b2 = 1;
                    }
                    break;
                case 5:
                    if(a1 == 2*a2 || b1 == 2*b2) {
                        a1 = 1;
                        a2 = 1;
                        b1 = 1;
                        b2 = 1;
                    }
                    break;
                default:
                    if(a1 + a2 == 0 || b1 + b2 == 0) {
                        a1 = 1;
                        a2 = 1;
                        b1 = 1;
                        b2 = 1;
                    }
                    break;
            }
        } while(a1*b2 == a2*b1);
        return [[a1,b1,a1*this.solX+b1*this.solY],[a2,b2,a2*this.solX+b2*this.solY]];
    }

    getTempCoefficients(multiple = 1,lineInt = 0) {
        var tempArray = [];
        if(lineInt == 0) {
            for(var i = 0; i < 3; i++) {
                tempArray.push(this.lineCoefficients[0][i]*multiple);
            }
        } else {
            for(var i = 0; i < 3; i++) {
                tempArray.push(this.lineCoefficients[1][i]*multiple);
            }
        }
        return tempArray;
    }

    createQuestion() {
        var output = `<ul><li>${formatStandardLinear(this.lineCoefficients[0][0],this.lineCoefficients[0][1],this.lineCoefficients[0][2],this.lineColor1)}</li>`;
        output += `<li>${formatStandardLinear(this.lineCoefficients[1][0],this.lineCoefficients[1][1],this.lineCoefficients[1][2],this.lineColor2)}</li>`;
        var comboCos = [];
        var comboC;
        switch(this.solMethod) {
            case 0:
                comboCos.push(this.lineCoefficients[0][0]+this.lineCoefficients[1][0]);
                comboCos.push(this.lineCoefficients[0][1]+this.lineCoefficients[1][1]);
                comboC = (this.lineCoefficients[0][0] + this.lineCoefficients[1][0])*this.solX + (this.lineCoefficients[0][1] + this.lineCoefficients[1][1])*this.solY;
                break
            case 1:
                comboCos.push(this.lineCoefficients[0][0]-this.lineCoefficients[1][0]);
                comboCos.push(this.lineCoefficients[0][1]-this.lineCoefficients[1][1]);
                comboC = (this.lineCoefficients[0][0] - this.lineCoefficients[1][0])*this.solX + (this.lineCoefficients[0][1] - this.lineCoefficients[1][1])*this.solY;
                break
            case 2:
                comboCos.push(2*this.lineCoefficients[0][0]-this.lineCoefficients[1][0]);
                comboCos.push(2*this.lineCoefficients[0][1]-this.lineCoefficients[1][1]);
                comboC = (2*this.lineCoefficients[0][0] - this.lineCoefficients[1][0])*this.solX + (2*this.lineCoefficients[0][1] - this.lineCoefficients[1][1])*this.solY;
                break
            case 3:
                comboCos.push(this.lineCoefficients[0][0]-2*this.lineCoefficients[1][0]);
                comboCos.push(this.lineCoefficients[0][1]-2*this.lineCoefficients[1][1]);
                comboC = (this.lineCoefficients[0][0] - 2*this.lineCoefficients[1][0])*this.solX + (this.lineCoefficients[0][1] - 2*this.lineCoefficients[1][1])*this.solY;
                break
            case 4:
                comboCos.push(-2*this.lineCoefficients[0][0]+this.lineCoefficients[1][0]);
                comboCos.push(-2*this.lineCoefficients[0][1]+this.lineCoefficients[1][1]);
                comboC = (-2*this.lineCoefficients[0][0] + this.lineCoefficients[1][0])*this.solX + (-2*this.lineCoefficients[0][1] + this.lineCoefficients[1][1])*this.solY;
                break
            case 5:
                comboCos.push(-this.lineCoefficients[0][0]+2*this.lineCoefficients[1][0]);
                comboCos.push(-this.lineCoefficients[0][1]+2*this.lineCoefficients[1][1]);
                comboC = (-this.lineCoefficients[0][0] + 2*this.lineCoefficients[1][0])*this.solX + (-this.lineCoefficients[0][1] + 2*this.lineCoefficients[1][1])*this.solY;
                break
            default:
                comboCos.push(this.lineCoefficients[0][0]+this.lineCoefficients[1][0]);
                comboCos.push(this.lineCoefficients[0][1]+this.lineCoefficients[1][1]);
                comboC = (this.lineCoefficients[0][0] + this.lineCoefficients[1][0])*this.solX + (this.lineCoefficients[0][1] + this.lineCoefficients[1][1])*this.solY;
                break
        }
        comboCos.push(comboC);
        var initComboCos = [];
        for(var i = 0; i < comboCos.length; i++) {
            initComboCos.push(comboCos[i]);
        }
        var gcf = greatestCommonFactor(comboCos);
        if(gcf != 1) {
            for(var i = 0; i < comboCos.length; i++) {
                comboCos[i] /= gcf;
            }
        }
        output += `<li>Given the above linear system, what is the value of ${formatStandardLinearLeft(comboCos[0],comboCos[1],"#000000")}?</li></ul>`;
        return [output,gcf,initComboCos,comboCos];
    }

    getSolutionSteps() {
        var mult1, mult2;
        switch(this.solMethod) {
            case 0:
                mult1 = 1;
                mult2 = 1;
                break;
            case 1:
                mult1 = 1;
                mult2 = -1;
                break;
            case 2:
                mult1 = 2;
                mult2 = -1;
                break;
            case 3:
                mult1 = 1;
                mult2 = -2;
                break;
            case 4:
                mult1 = -2;
                mult2 = 1;
                break;
            case 5:
                mult1 = -1;
                mult2 = 2;
                break;
            default:
                mult1 = 1;
                mult2 = 1;
                break;
        }
        var output = [];
        var temp = `<ul><li>${formatStandardLinear(this.lineCoefficients[0][0],this.lineCoefficients[0][1],this.lineCoefficients[0][2],this.lineColor1)}</li>`;
        temp += `<li>${formatStandardLinear(this.lineCoefficients[1][0],this.lineCoefficients[1][1],this.lineCoefficients[1][2],this.lineColor2)}</li></ul>`;
        output.push(temp);
        temp = `<ul><li>`;
        if(mult1 == -1) {
            temp += `-(${formatStandardLinear(this.lineCoefficients[0][0],this.lineCoefficients[0][1],this.lineCoefficients[0][2],this.lineColor1)})`;
        } else if(mult1 != 1) {
            temp += `${mult1}(${formatStandardLinear(this.lineCoefficients[0][0],this.lineCoefficients[0][1],this.lineCoefficients[0][2],this.lineColor1)})`;
        } else {
            temp += `${formatStandardLinear(this.lineCoefficients[0][0],this.lineCoefficients[0][1],this.lineCoefficients[0][2],this.lineColor1)}`;
        }
        temp += `</li><li>`;
        if(mult2 == -1) {
            temp += `-(${formatStandardLinear(this.lineCoefficients[1][0],this.lineCoefficients[1][1],this.lineCoefficients[1][2],this.lineColor2)})`;
        } else if(mult2 != 1) {
            temp += `${mult2}(${formatStandardLinear(this.lineCoefficients[1][0],this.lineCoefficients[1][1],this.lineCoefficients[1][2],this.lineColor2)})`;
        } else {
            temp += `${formatStandardLinear(this.lineCoefficients[1][0],this.lineCoefficients[1][1],this.lineCoefficients[1][2],this.lineColor2)}`;
        }
        temp += `</li></ul>`;
        if(mult1 != 1 || mult2 != 1) {
            output.push(temp);
        }
        temp = `<ul><li>${formatStandardLinear(this.qArray[2][0],this.qArray[2][1],this.qArray[2][2],"#000000")}</li></ul>`;
        output.push(temp);
        if(this.qArray[1] != 1) {
            temp = `<ul><li>${formatStandardLinear(this.qArray[3][0],this.qArray[3][1],this.qArray[3][2],"#000000")}</li></ul>`;
            output.push(temp);
        }
        return output;
    }
}