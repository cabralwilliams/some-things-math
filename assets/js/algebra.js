
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

var formatPolynomial = (coefficentArray = [1,2,3,4,5], variable = "x") => {
    //Returns polynomial in x^4 + 2x^3 + 3x^2 + 4x + 5 form
    var zeroCount = 0;
    for(var i = 0; i < coefficentArray.length; i++) {
        if(coefficentArray[i] == 0) {
            zeroCount++;
        }
    }
    if(zeroCount == coefficentArray.length) {
        return "0"; //If all zeros, return 0
    } else if(coefficentArray.length == 1) {
        return `${coefficentArray[0]}`; //If only one number, return that number
    }
    var xStr = `<i>${variable}</i>`;
    var expStr = (exponent = 1) => {
        if(exponent == 1 || exponent == 0) {
            return "";
        } else {
            return `<sup>${exponent}</sup>`;
        }
    };
    var newCos = [];
    var newIndex = 0;
    while(coefficentArray[newIndex] == 0) { //prevent polynomial from starting with 0
        newIndex++;
    }
    for(i = newIndex; i < coefficentArray.length; i++) {
        newCos.push(coefficentArray[i]);
    }
    var degree = newCos.length - 1;
    var output = "";
    for(i = 0; i < newCos.length; i++) {
        if(newCos[i] != 0) {
            if(i == newCos.length - 1) {
                if(newCos[i] < 0) {
                    output += " - " + (-newCos[i]);
                } else if(newCos[i] > 0) {
                    output += " + " + newCos[i];
                }
            } else if(i == 0) {
                if(newCos[i] == -1) {
                    output += "-";
                } else if(newCos[i] != 1) {
                    output += newCos[i];
                }
                output += `<i>${variable}</i>${expStr(degree - i)}`;
            } else {
                if(newCos[i] < 0) {
                    output += " - ";
                    if(newCos[i] != -1) {
                        output += (-newCos[i]);
                    }
                } else if(newCos[i] > 0) {
                    output += " + ";
                    if(newCos[i] != 1) {
                        output += newCos[i];
                    }
                }
                output += `<i>${variable}</i>${expStr(degree - i)}`;
            }
        }
    }
    return  output;
};

var formatLinearFactor = (leadCo = 1, zeroCo = 5, variable = "x") => {
    var output = "";
    if(leadCo == -1) {
        output += "-";
    } else if(leadCo != 1) {
        output += leadCo;
    }
    output += `<i>${variable}</i>`;
    if(zeroCo > 0) {
        output += ` - ${zeroCo}`;
    } else if(zeroCo < 0) {
        output += ` + ${-zeroCo}`;
    }
    return output;
};

var isPrime = (intVal = 24) => {
    if(Math.abs(intVal) < 2) {
        return false;
    }
    var testVal = Math.abs(intVal);
    var i = 2;
    while(i <= Math.sqrt(testVal)) {
        if(testVal%i == 0) {
            return false;
        }
        i++;
    }
    return true;
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

var primeFactorization = (inputInt = 24) => {
    //Returns the positive prime factorization of a number(integer) but also includes the number 1
    var testInt = Math.abs(Math.floor(inputInt));
    if(testInt < 2) {
        return [1];
    }
    var output = [1];
    var testFactor = 2;
    while(testInt > 1) {
        while(testInt%testFactor == 0) {
            if(isPrime(testFactor)) {
                testInt /= testFactor;
                output.push(testFactor);
            }
        }
        testFactor++;
    }
    return output;
};

var leastCommonMultiple = (inputArray = [1,2,3,4,5]) => {
    //returns the least common positive multiple of a list of integers input as an array
    var posVals = [];
    for(var i = 0; i < inputArray.length; i++) {
        posVals.push(Math.abs(inputArray[i]));
    }
    var primes = [];
    for(i = 0; i < posVals.length; i++) {
        if(posVals[i] != 1) {
            var pfs = primeFactorization(posVals[i]); //Get the prime factors of the current number
            if(primes.length == 0) { //Take all prime factors of the first number
                for(var j = 0; j < pfs.length; j++) {
                    primes.push(pfs[j]);
                }
            } else {
                //Test to see if all factors have been matched in the current number
                var pfIndex = 0;
                do {
                    var cf = pfs[pfIndex];
                    var count1 = 0; //Occurrences of the current factor in the pfs array
                    var count2 = 0; //Occurrences of the current factor in the primes array
                    do {
                        count1++;
                        pfIndex++;
                    } while(pfIndex < pfs.length && cf == pfs[pfIndex]);
                    if(cf == 1) {
                        continue;
                    } else {
                        for(var j = 1; j < primes.length; j++) {
                            if(primes[j] == cf) {
                                count2++;
                            }
                        }
                    }
                    if(count1 > count2) {
                        for(var j = 0; j < (count1 - count2); j++) {
                            primes.push(cf);
                        }
                    }
                } while(pfIndex < pfs.length);
            }
        }
    }
    if(primes.length == 0) {
        return 1;
    }
    var output = 1;
    for(i = 0; i < primes.length; i++) {
        output *= primes[i];
    }
    return output;
};

var oneVarEquation = (coefficient1 = 5, coefficient2 = 10, variable = "x") => {
    //returns an equation in 5x = 10 form
    var output = "";
    if(coefficient1 == -1) {
        output += "-";
    } else if(coefficient1 != 1) {
        output += coefficient1;
    }
    output += `<i>${variable}</i> = ${coefficient2}`;
    return output;
};

var sqrtArray = (inputInt = 900) => {
    //Returns [a,b] of a&radic;b
    var perfectSquare = 1;
    var remain = Math.floor(Math.abs(inputInt));
    if(remain == 0) {
        return [0,0];
    } else if(remain == 1) {
        return [1,1];
    } else if(Math.floor(Math.sqrt(remain)) == Math.sqrt(remain)) {
        return [Math.sqrt(remain),1];
    }
    for(var i = Math.ceil(Math.sqrt(remain)); i > 3; i--) {
        if(Math.floor(Math.sqrt(i)) == Math.sqrt(i) && remain%i == 0) {
            perfectSquare *= Math.sqrt(i);
            remain /= i;
        }
    }
    return [perfectSquare,remain];
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

//Linear Elimination class
class LinearElimination {
    constructor(solX = reselectIfZero(9), solY = reselectIfZero(9)) {
        //Constructor selects the solution (x,y) - intersection point of two lines
        this.solX = solX;
        this.solY = solY;
        this.lineCoefficients = this.getLineCoefficients();
        this.colorRoll = Math.floor(Math.random()*2); //Determines which color each line will be
        this.lineColor1 = this.colorRoll == 0 ? "#731C98" : "#f39218";
        this.lineColor2 = this.colorRoll == 0 ? "#f39218" : "#731C98";
        this.line1Cos = this.lineCoefficients[0];
        this.line2Cos = this.lineCoefficients[1];
        this.eliminateX = this.eliminateXSteps();
        this.eliminateY = this.eliminateYSteps();
    }

    getLineCoefficients() {
        var a1, b1, a2, b2;
        do {
            a1 = reselectIfZero(12);
            b1 = reselectIfZero(12);
            a2 = reselectIfZero(12);
            b2 = reselectIfZero(12);
        } while(a1*b2 == a2*b1); //Don't allow lines to be identical
        var c1 = a1*this.solX + b1*this.solY;
        var c2 = a2*this.solX + b2*this.solY;
        return [[a1,b1,c1],[a2,b2,c2]];
    }

    eliminateXSteps() {
        var a1 = this.line1Cos[0];
        var a2 = this.line2Cos[0];
        var b1 = this.line1Cos[1];
        var b2 = this.line2Cos[1];
        var c1 = this.line1Cos[2];
        var c2 = this.line2Cos[2];
        var lcm = leastCommonMultiple([a1,a2]);
        var factor1, factor2;
        if(a1 == a2) {
            factor1 = 1;
            factor2 = -1;
        } else if(a1 == -a2) {
            factor1 = 1;
            factor2 = 1;
        } else {
            factor1 = lcm/a1;
            factor2 = -lcm/a2;
        }
        var steps = [`<ul><li>${formatStandardLinear(a1,b1,c1,this.lineColor1)}</li><li>${formatStandardLinear(a2,b2,c2,this.lineColor2)}</li></ul>`];
        var nextStep = "<ul><li>";
        if(factor1 == 1) {
            nextStep += `${formatStandardLinear(a1,b1,c1,this.lineColor1)}`;
        } else if(factor1 == -1) {
            nextStep += `-(${formatStandardLinear(a1,b1,c1,this.lineColor1)})`;
        } else {
            nextStep += `${factor1}(${formatStandardLinear(a1,b1,c1,this.lineColor1)})`;
        }
        nextStep += "</li><li>";
        if(factor2 == 1) {
            nextStep += `${formatStandardLinear(a2,b2,c2,this.lineColor2)}`;
        } else if(factor2 == -1) {
            nextStep += `-(${formatStandardLinear(a2,b2,c2,this.lineColor2)})`;
        } else {
            nextStep += `${factor2}(${formatStandardLinear(a2,b2,c2,this.lineColor2)})`;
        }
        nextStep += "</li></ul>";
        steps.push(nextStep);
        nextStep = `<ul><li>${formatStandardLinear(factor1*a1,factor1*b1,factor1*c1,this.lineColor1)}</li><li>${formatStandardLinear(factor2*a2,factor2*b2,factor2*c2,this.lineColor2)}</li></ul>`;
        steps.push(nextStep);
        var nextB = factor1*b1 + factor2*b2;
        var nextC = factor1*c1 + factor2*c2;
        nextStep = `<ul><li>${oneVarEquation(nextB,nextC,"y")}</li></ul>`;
        steps.push(nextStep);
        if(nextB != 1) {
            nextStep = `<ul><li><i>y</i> = ${this.solY}</li></ul>`;
            steps.push(nextStep);
        }
        nextStep = `<ul><li><i>y</i> = ${this.solY}</li><li><i>x</i> = ${this.solX}</li></ul>`;
        steps.push(nextStep);
        return steps;
    }

    eliminateYSteps() {
        var a1 = this.line1Cos[0];
        var a2 = this.line2Cos[0];
        var b1 = this.line1Cos[1];
        var b2 = this.line2Cos[1];
        var c1 = this.line1Cos[2];
        var c2 = this.line2Cos[2];
        var lcm = leastCommonMultiple([b1,b2]);
        var factor1, factor2;
        if(b1 == b2) {
            factor1 = 1;
            factor2 = -1;
        } else if(b1 == -b2) {
            factor1 = 1;
            factor2 = 1;
        } else {
            factor1 = lcm/b1;
            factor2 = -lcm/b2;
        }
        var steps = [`<ul><li>${formatStandardLinear(a1,b1,c1,this.lineColor1)}</li><li>${formatStandardLinear(a2,b2,c2,this.lineColor2)}</li></ul>`];
        var nextStep = "<ul><li>";
        if(factor1 == 1) {
            nextStep += `${formatStandardLinear(a1,b1,c1,this.lineColor1)}`;
        } else if(factor1 == -1) {
            nextStep += `-(${formatStandardLinear(a1,b1,c1,this.lineColor1)})`;
        } else {
            nextStep += `${factor1}(${formatStandardLinear(a1,b1,c1,this.lineColor1)})`;
        }
        nextStep += "</li><li>";
        if(factor2 == 1) {
            nextStep += `${formatStandardLinear(a2,b2,c2,this.lineColor2)}`;
        } else if(factor2 == -1) {
            nextStep += `-(${formatStandardLinear(a2,b2,c2,this.lineColor2)})`;
        } else {
            nextStep += `${factor2}(${formatStandardLinear(a2,b2,c2,this.lineColor2)})`;
        }
        nextStep += "</li></ul>";
        steps.push(nextStep);
        nextStep = `<ul><li>${formatStandardLinear(factor1*a1,factor1*b1,factor1*c1,this.lineColor1)}</li><li>${formatStandardLinear(factor2*a2,factor2*b2,factor2*c2,this.lineColor2)}</li></ul>`;
        steps.push(nextStep);
        var nextA = factor1*a1 + factor2*a2;
        var nextC = factor1*c1 + factor2*c2;
        nextStep = `<ul><li>${oneVarEquation(nextA,nextC,"x")}</li></ul>`;
        steps.push(nextStep);
        if(nextA != 1) {
            nextStep = `<ul><li><i>x</i> = ${this.solX}</li></ul>`;
            steps.push(nextStep);
        }
        nextStep = `<ul><li><i>x</i> = ${this.solX}</li><li><i>y</i> = ${this.solY}</li></ul>`;
        steps.push(nextStep);
        return steps;
    }
}

class CompleteTheSquare1 {
    constructor(axisOfSymmetry = reselectIfZero(15)) {
        this.axisOfSymmetry = axisOfSymmetry;
        this.requiredC = this.axisOfSymmetry*this.axisOfSymmetry;
        this.initialC = -Math.ceil(Math.random()*30) + Math.ceil(Math.random()*this.requiredC);
        this.colorRoll = Math.floor(Math.random()*2); //Determines which color each line will be
        this.color1 = this.colorRoll == 0 ? "#731C98" : "#f39218";
        this.color2 = this.colorRoll == 0 ? "#f39218" : "#731C98";
        this.solutionsSteps = this.getSolutionSteps();
    }

    getSolutionSteps() {
        var addition = this.requiredC - this.initialC;
        var sqrtA = sqrtArray(addition);
        var question = `<ul><li>${formatPolynomial([1,-2*this.axisOfSymmetry,this.initialC],"x")} = 0</li><li>What are all solutions, <i>x</i>, to the equation above?</li>`;
        var initPoly = formatPolynomial([1,-2*this.axisOfSymmetry,this.initialC],"x");
        var firstStep = `<ul><li>${formatPolynomial([1,-2*this.axisOfSymmetry,this.initialC],"x")} = 0</li>`;
        var steps1 = [`${question}</ul>`]; //1
        var steps2 = [firstStep + "</ul>",firstStep + "</ul>",firstStep + "</ul>"]; //3
        var nextStep1 = `<li><span style='color: ${this.color1};'>Divide the linear term by 2: </span><span style='color: ${this.color2};'>${-2*this.axisOfSymmetry}/2 = ${-this.axisOfSymmetry}.</span></li></ul>`;
        steps1.push(question + nextStep1); //2
        nextStep1 = question + `<li><span style='color: ${this.color1};'>Square the </span><span style='color: ${this.color2};'>${-this.axisOfSymmetry}</span> <span style='color: ${this.color1};'>&rarr;: </span><span style='color: ${this.color2};'>(${-this.axisOfSymmetry})<sup>2</sup> = ${this.axisOfSymmetry*this.axisOfSymmetry}</span></li></ul>`;
        steps1.push(nextStep1); //3
        nextStep1 = question + `<li><span style='color: ${this.color1};'>Add </span><span style='color: ${this.color2};'>${addition}</span> <span style='color: ${this.color1};'>to both sides.</span></li></ul>`;
        var nextStep2 = `<ul><li>${initPoly} <span style='color: ${this.color2};'>+ ${addition}</span> = 0 <span style='color: ${this.color2};'>+ ${addition}</span></li></ul>`;
        steps1.push(nextStep1); //4
        steps2.push(nextStep2); //4
        nextStep1 = question + `<li><span style='color: ${this.color1};'>Simplify</span></li></ul>`;
        nextStep2 = `<ul><li style='color: ${this.color2}'>${formatPolynomial([1,-2*this.axisOfSymmetry,this.requiredC],"x")} = ${addition}</li></ul>`;
        steps1.push(nextStep1); //5
        steps2.push(nextStep2); //5
        nextStep1 = question + `<li><span style='color: ${this.color1};'>Rewrite both sides as squares.</span></li></ul>`;
        nextStep2 = `<ul><li style='color: ${this.color2};'>(${formatLinearFactor(1,this.axisOfSymmetry,"x")})<sup>2</sup> = (&radic;<span class='rootBorder${this.color2.slice(1)}'>${addition}</span>)<sup>2</sup></li></ul>`;
        steps1.push(nextStep1); //6
        steps2.push(nextStep2); //6
        var rootStr, rootStr2;
        if(sqrtA[1] == 1) {
            rootStr = `&plusmn;${sqrtA[0]}`;
            rootStr2 = ` &plusmn; ${sqrtA[0]}`;
        } else {
            rootStr = "&plusmn;";
            rootStr2 = " &plusmn; ";
            if(sqrtA[0] != 1) {
                rootStr += sqrtA[0];
                rootStr2 += sqrtA[0];
            }
            rootStr += `&radic;<span class='rootBorder${this.color2.slice(1)}'>${sqrtA[1]}</span>`;
            rootStr2 += `&radic;<span class='rootBorder${this.color2.slice(1)}'>${sqrtA[1]}</span>`;
        }
        nextStep1 = question + `<li><span style='color: ${this.color1};'>Take the square root of both sides.</span></li></ul>`;
        nextStep2 = `<ul><li style='color: ${this.color2};'>${formatLinearFactor(1,this.axisOfSymmetry,"x")} = ${rootStr}</li></ul>`;
        steps1.push(nextStep1); //7
        steps2.push(nextStep2); //7
        var shift = () => {
            if(this.axisOfSymmetry > 0) {
                return `Add ${this.axisOfSymmetry} to both sides.`;
            } else {
                return `Subtract ${-this.axisOfSymmetry} from both sides.`;
            }
        };
        var lineFactPlus = formatLinearFactor(1,this.axisOfSymmetry,"x") + `<span style='color: ${this.color2};'>`;
        if(this.axisOfSymmetry > 0) {
            lineFactPlus += ` + ${this.axisOfSymmetry}`;
        } else {
            lineFactPlus += ` - ${-this.axisOfSymmetry}`;
        }
        lineFactPlus += `</span> = <span style='color: ${this.color2};'>${this.axisOfSymmetry}</span>${rootStr2}`;
        nextStep1 = question + `<li><span style='color: ${this.color1};'>${shift()}</span></li></ul>`;
        nextStep2 = `<ul><li>${lineFactPlus}</li></ul>`;
        steps1.push(nextStep1); //8
        steps2.push(nextStep2); //8
        var solStr;
        if(sqrtA[1] == 1) {
            solStr = `${this.axisOfSymmetry - sqrtA[0]} and ${this.axisOfSymmetry + sqrtA[0]}`;
        } else {
            solStr = `${this.axisOfSymmetry}${rootStr2}`;
        }
        nextStep1 = question + `<li><span style='color: ${this.color1};'>Simplify.</span></li></ul>`;
        nextStep2 = `<ul><li style='color: ${this.color2};'><i>x</i> = ${solStr}</li></ul>`;
        steps1.push(nextStep1); //9
        steps2.push(nextStep2); //9
        return [steps1,steps2];
    }
}