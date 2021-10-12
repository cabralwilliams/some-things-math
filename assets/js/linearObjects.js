//Strips whitespace from input answers
var stripSpaces = function(inputString = "some string") {
    var output = inputString.replaceAll(" ", "");
    return output;
};

//Formats numbers into time formats
function formatTimeToSecond(inputTime = 1000) {
    if(inputTime === 0) {
        return "0";
    }
    var remain = inputTime;
    var output = "";
    var hour = 3600000;
    var tenM = 600000;
    var m = 60000;
    var tenS = 10000;
    var s = 1000;
    var hourAdded = false;
    if(remain >= hour) {
        output += Math.floor(remain/hour) + ":";
        remain -= Math.floor(remain/hour)*hour;
        hourAdded = true;
    }
    var tenMAdded = false;
    if(remain >= tenM || hourAdded) {
        output += Math.floor(remain/tenM);
        remain -= Math.floor(remain/tenM)*tenM;
        tenMAdded = true;
    }
    var mAdded = false;
    if(remain >= m || tenMAdded) {
        output += Math.floor(remain/m) + ":";
        remain -= Math.floor(remain/m)*m;
        mAdded = true;
    }
    var tenSAdded = false;
    if(remain >= tenS || mAdded) {
        output += Math.floor(remain/tenS);
        remain -= Math.floor(remain/tenS)*tenS;
        tenSAdded = true;
    }
    if(remain >= s || tenSAdded) {
        output += Math.floor(remain/s);
        remain -= Math.floor(remain/s)*s;
    }
    return output;
}

function reselectIfZero(positiveLimit = 10) {
    var posLimit = positiveLimit <= 0 ? -(positiveLimit - 1) : positiveLimit + 1;
    var output = -posLimit + Math.floor(Math.random()*(2*posLimit + 1));
    while(output === 0) {
        output = -posLimit + Math.floor(Math.random()*(2*posLimit + 1));
    }
    return output;
}

function convertStandard(quadString) {
    var output = quadString.replace("<sup>", "^");
    output = output.replace("</sup>", "");
    output = output.replaceAll("<i>", "");
    output = output.replaceAll("</i>", "");
    return output;
}

function formatStandardLinear(coA,coB,coC) {
    var output = "";
    if(typeof coA === "number") {
        if(coA === -1) {
            output += "-";
        } else if(coA !== 1) {
            output += coA;
        }
    } else if(typeof coA === "string") {
        output += coA;
    }
    output += "<i>x</i>";
    if(typeof coB === "number") {
        if(coB < 0) {
            output += " - ";
            if(coB !== -1) {
                output += -coB;
            }
        } else if(coB > 0) {
            output += " + ";
            if(coB !== 1) {
                output += coB;
            }
        }
    } else if(typeof coB === "string") {
        output += " + " + coB;
    }
    output += "<i>y</i> = " + coC;
    return output;
}

class ParallelLines1 {
    constructor() {
        this.coA1 = reselectIfZero(12);
        this.coB1 = reselectIfZero(12);
        this.solX = reselectIfZero(3);
        this.solY = reselectIfZero(3);
        this.coC1 = this.coA1*this.solX + this.coB1*this.solY;
        this.multiple = reselectIfZero(4);
        while(this.multiple === 1) {
            this.multiple = reselectIfZero(4);
        }
        this.coA2 = this.coA1*this.multiple;
        this.coB2 = this.coB1*this.multiple;
        this.coC2 = this.coA2*this.solX + this.coB2*this.solY + reselectIfZero(6);
        this.questionArray = this.createQuestion();
    }

    createQuestion() {
        var coefficientArray = [this.coA1,this.coB1,this.coA2,this.coB2];
        var changeInt = Math.floor(Math.random()*4);
        var answer = coefficientArray[changeInt];
        var newCoefficients = [];
        for(var i = 0; i < 4; i++) {
            if(i !== changeInt) {
                newCoefficients.push(coefficientArray[i]);
            } else {
                newCoefficients.push("K");
            }
        }
        var line1 = formatStandardLinear(newCoefficients[0],newCoefficients[1],this.coC1);
        var line2 = formatStandardLinear(newCoefficients[2],newCoefficients[3],this.coC2);
        var question = Math.random() < 0.5 ? "If the two lines above are parallel, what is the value of K?" : "If the system above has no solution, what is the value of K?";
        var output = [];
        if(Math.random() < 0.5) {
            output.push(line1);
            output.push(line2);
        } else {
            output.push(line2);
            output.push(line1);
        }
        output.push(question);
        output.push([answer]);
        return output;
    }
}

class EquivalentLines1 {
    constructor() {
        this.coA1 = reselectIfZero(12);
        this.coB1 = reselectIfZero(12);
        this.solX = reselectIfZero(3);
        this.solY = reselectIfZero(3);
        this.coC1 = this.coA1*this.solX + this.coB1*this.solY;
        this.multiple = reselectIfZero(4);
        while(this.multiple === 1) {
            this.multiple = reselectIfZero(4);
        }
        this.coA2 = this.coA1*this.multiple;
        this.coB2 = this.coB1*this.multiple;
        this.coC2 = this.coA2*this.solX + this.coB2*this.solY;
        this.questionArray = this.createQuestion();
    }

    createQuestion() {
        var coefficientArray = [this.coA1,this.coB1,this.coC1,this.coA2,this.coB2,this.coC2];
        var changeInt = Math.floor(Math.random()*6);
        var answer = coefficientArray[changeInt];
        var newCoefficients = [];
        for(var i = 0; i < 6; i++) {
            if(i !== changeInt) {
                newCoefficients.push(coefficientArray[i]);
            } else {
                newCoefficients.push("K");
            }
        }
        var line1 = formatStandardLinear(newCoefficients[0],newCoefficients[1],newCoefficients[2]);
        var line2 = formatStandardLinear(newCoefficients[3],newCoefficients[4],newCoefficients[5]);
        var question = Math.random() < 0.5 ? "If the two lines above have more than one point in common, what is the value of K?" : "If the system above has an infinite number of solutions, what is the value of K?";
        var output = [];
        if(Math.random() < 0.5) {
            output.push(line1);
            output.push(line2);
        } else {
            output.push(line2);
            output.push(line1);
        }
        output.push(question);
        output.push([answer]);
        return output;
    }
}

class IntersectingLines1 {
    constructor() {
        this.coA1 = reselectIfZero(12);
        this.coB1 = reselectIfZero(12);
        this.coA2 = reselectIfZero(12);
        this.coB2 = reselectIfZero(12);
        while(this.coA1*this.coB2 === this.coA2*this.coB1) {
            this.coA2 = reselectIfZero(12);
            this.coB2 = reselectIfZero(12);
        }
        this.solX = reselectIfZero(9);
        this.solY = reselectIfZero(9);
        this.coC1 = this.coA1*this.solX + this.coB1*this.solY;
        this.coC2 = this.coA2*this.solX + this.coB2*this.solY;
        this.questionArray = this.createQuestion();
    }

    createQuestion() {
        var line1 = formatStandardLinear(this.coA1,this.coB1,this.coC1);
        var line2 = formatStandardLinear(this.coA2,this.coB2,this.coC2);
        var answer1 = `(${this.solX}, ${this.solY})`;
        var answer2 = `${this.solX}, ${this.solY}`;
        var question = "What is the solution (<i>x</i>, <i>y</i>) to the system above?";
        return [line1,line2,question,[answer1,answer2]];
    }
}

class PerpendicularLines1 {
    constructor() {
        this.coA1 = reselectIfZero(12);
        this.coB1 = reselectIfZero(12);
        this.multiple = reselectIfZero(4);
        this.coA2 = this.coB1*this.multiple;
        this.coB2 = -this.coA1*this.multiple;
        this.solX = reselectIfZero(9);
        this.solY = reselectIfZero(9);
        this.coC1 = this.coA1*this.solX + this.coB1*this.solY;
        this.coC2 = this.coA2*this.solX + this.coB2*this.solY;
        this.questionArray = this.createQuestion();
    }

    createQuestion() {
        var coefficientArray = [this.coA1,this.coB1,this.coA2,this.coB2];
        var changeInt = Math.floor(Math.random()*4);
        var answer = coefficientArray[changeInt];
        var newCoefficients = [];
        for(var i = 0; i < 4; i++) {
            if(i !== changeInt) {
                newCoefficients.push(coefficientArray[i]);
            } else {
                newCoefficients.push("K");
            }
        }
        var line1 = formatStandardLinear(newCoefficients[0],newCoefficients[1],this.coC1);
        var line2 = formatStandardLinear(newCoefficients[2],newCoefficients[3],this.coC2);
        var question = Math.random() < 0.5 ? "If the two lines above intersect at right angles, what is the value of K?" : "If the lines above are perpendicular, what is the value of K?";
        var output = [];
        if(Math.random() < 0.5) {
            output.push(line1);
            output.push(line2);
        } else {
            output.push(line2);
            output.push(line1);
        }
        output.push(question);
        output.push([answer]);
        return output;
    }
}

class AllLinearClasses {
    constructor(selectorInt = Math.floor(Math.random()*4)) {
        this.selectorInt = selectorInt;
        this.ob = this.createObject();
    }

    createObject() {
        var ob;
        switch(this.selectorInt) {
            case 0:
                ob = new ParallelLines1();
                break;
            case 1:
                ob = new EquivalentLines1();
                break;
            case 2:
                ob = new IntersectingLines1();
                break;
            case 3:
                ob = new PerpendicularLines1();
                break;
            default:
                ob = new ParallelLines1();
                break;
        }
        return ob;
    }
}