
var stripSpaces = function(inputString) {
    var output = inputString.replaceAll(" ", "");
    return output;
};

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

//console.log("Cabral Maceo Williams");
//console.log(stripSpaces("Cabral Maceo Williams"));

function formatLinearFactor(zeroVal,variable = "x") {
    var output = `<i>${variable}</i>`;
    if(zeroVal < 0) {
        output += ` + ${-zeroVal}`;
    } else if(zeroVal > 0) {
        output += ` - ${zeroVal}`;
    }
    return output;
}

function quadraticForms(leadCo, zero1, zero2) {
    //Disallow 0 as a root/zero
    var xVar = "<i>x</i>";
    var standard = "";
    var vertex = "";
    var factored = "";
    var stCoB = leadCo*(-zero1 - zero2);
    var stCoC = leadCo*zero1*zero2;
    var vertX = (zero1 + zero2)/2;
    var vertY = leadCo*(vertX - zero1)*(vertX - zero2);

    if(leadCo === -1) {
        standard += "-";
        vertex += "-";
        factored += "-";
    } else if(leadCo !== 1) {
        standard += leadCo;
        vertex += leadCo;
        factored += leadCo;
    }

    if(vertX !== 0) {
        vertex += "(" + xVar;
        if(vertX < 0) {
            vertex += " + " + (-vertX);
        } else {
            vertex += " - " + vertX;
        }
        vertex += ")";
    } else {
        vertex += xVar;
    }
    vertex += "<sup>2</sup>";
    if(vertY < 0) {
        vertex += " - " + (-vertY);
    } else if(vertY > 0) {
        vertex += " + " + vertY;
    }

    var factored1 = factored + `(${formatLinearFactor(zero1)})(${formatLinearFactor(zero2)})`;
    var factored2 = factored + `(${formatLinearFactor(zero2)})(${formatLinearFactor(zero1)})`;
    standard += xVar + "<sup>2</sup>";
    if(stCoB < 0) {
        standard += " - ";
        if(stCoB !== -1) {
            standard += (-stCoB);
        }
        standard += xVar;
    } else if(stCoB > 0) {
        standard += " + ";
        if(stCoB !== 1) {
            standard += stCoB;
        }
        standard += xVar;
    }
    if(stCoC < 0) {
        standard += " - " + (-stCoC);
    } else if(stCoC > 0) {
        standard += " + " + stCoC;
    }
    return [standard,vertex,factored1,factored2];
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

class QuadraticClass1 {
    constructor() {
        this.roots = this.chooseZeroes();
        this.zero1 = this.roots[0];
        this.zero2 = this.roots[1];
        this.quadForms = quadraticForms(1,this.zero1,this.zero2);
        this.questionArray = this.createQuestions();
    }

    chooseZeroes() {
        var zero1 = reselectIfZero(12);
        var zero2 = reselectIfZero(12);
        while(Math.abs(zero1 + zero2)%2 !== 0) {
            zero2 = reselectIfZero(12);
        }
        return [zero1,zero2];
    }

    listize(inputStr) {
        return `<ul><li>${inputStr}</li></ul>`;
    }

    createQuestions() {
        var question, answer;
        var outputArray = [];
        //Give standard, request factored
        question = this.listize(this.quadForms[0]) + "<p>What is the above quadratic expression written in FACTORED form?</p>";
        answer = [this.quadForms[2],this.quadForms[3]];
        outputArray.push([question,answer]);
        //Give factored, request standard
        var temp = Math.random() < 0.5 ? this.listize(this.quadForms[2]) : this.listize(this.quadForms[3]);
        question = temp + "<p>What is the above quadratic expression written in STANDARD form?</p>";
        answer = [this.quadForms[0]];
        outputArray.push([question,answer]);
        //Give standard, request vertex
        question = this.listize(this.quadForms[0]) + "<p>What is the above quadratic expression written in VERTEX form?</p>";
        answer = [this.quadForms[1]];
        outputArray.push([question,answer]);
        //Give vertex, request standard
        question = this.listize(this.quadForms[1]) + "<p>What is the above quadratic expression written in STANDARD form?</p>";
        answer = [this.quadForms[0]];
        outputArray.push([question,answer]);
        //Give factored, request vertex
        temp = Math.random() < 0.5 ? this.listize(this.quadForms[2]) : this.listize(this.quadForms[3]);
        question = temp + "<p>What is the above quadratic expression written in VERTEX form?</p>";
        answer = [this.quadForms[1]];
        outputArray.push([question,answer]);
        //Give vertex, request factored
        question = this.listize(this.quadForms[1]) + "<p>What is the above quadratic expression written in FACTORED form?</p>";
        answer = [this.quadForms[2],this.quadForms[3]];
        outputArray.push([question,answer]);
        return outputArray;
    }
}

//var testQuad = quadraticForms(1,reselectIfZero(12),reselectIfZero(12));
//console.log(testQuad[0]);
//console.log(convertStandard(testQuad[0]));