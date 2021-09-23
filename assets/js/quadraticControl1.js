
var selectorDiv = document.querySelector("#selectorDiv");
var quizDiv = document.querySelector("#quizDiv");

//Administrative Coding
var questionCount = 0;
var correctCount = 0;
var totalTime = 0;
var last10Quadratics = JSON.parse(localStorage.getItem("last10Quadratics")) || [];
var thisQuiz = [];
var nextObject, qOption, question, stResponse, corAnswers, qNumber, storedObject;
var timeController;
clearInterval(timeController);

var quad1 = new QuadraticClass1();
var outputDiv = document.createElement("div");
for(var i = 0; i < quad1.questionArray.length; i++) {
    var nextDiv = document.createElement("div");
    nextDiv.innerHTML = quad1.questionArray[i][0];
    outputDiv.appendChild(nextDiv);
}

//selectorDiv.appendChild(outputDiv);
var saveLast10 = function() {
    localStorage.setItem("last10Quadratics",JSON.stringify(last10Quadratics));
};

var addClassToElement = function(element,classToAdd) {
    element.classList.add(classToAdd);
};

var makeLabel = function(labelFor,labelText) {
    var output = document.createElement("label");
    output.setAttribute("for",labelFor);
    output.textContent = labelText;
    return output;
};

var generateSelectorElement = function() {
    var selectorForm = document.createElement("form");
    addClassToElement(selectorForm,"row-to-flex");
    addClassToElement(selectorForm,"justify-evenly");
    
    //Standard and Factored
    var sAndf = document.createElement("div");
    var radioSF = document.createElement("input");
    radioSF.type = "radio";
    radioSF.name = "quizOption";
    radioSF.id = "optionSF";
    radioSF.value = "optionSF";
    var labelSF = makeLabel("optionSF", " Standard/Factored");
    sAndf.append(radioSF,labelSF);

    //Standard and Vertex
    var sAndv = document.createElement("div");
    var radioSV = document.createElement("input");
    radioSV.type = "radio";
    radioSV.name = "quizOption";
    radioSV.id = "optionSV";
    radioSV.value = "optionSV";
    var labelSV = makeLabel("optionSV", " Standard/Vertex");
    sAndv.append(radioSV,labelSV);

    //Factored and Vertex
    var fAndv = document.createElement("div");
    var radioFV = document.createElement("input");
    radioFV.type = "radio";
    radioFV.name = "quizOption";
    radioFV.id = "optionFV";
    radioFV.value = "optionFV";
    var labelFV = makeLabel("optionFV", " Factored/Vertex");
    fAndv.append(radioFV,labelFV);

    //All
    var allDiv = document.createElement("div");
    var radioAll = document.createElement("input");
    radioAll.type = "radio";
    radioAll.name = "quizOption";
    radioAll.id = "optionAll";
    radioAll.value = "optionAll";
    radioAll.checked = "checked";
    var labelAll = makeLabel("optionAll", " All");
    allDiv.append(radioAll,labelAll);

    //Submit button
    var buttonEl = document.createElement("button");
    buttonEl.type = "submit";
    buttonEl.className = "my-basic-button";
    buttonEl.textContent = "Start";
    selectorForm.append(sAndf,sAndv,fAndv,allDiv,buttonEl);
    selectorDiv.innerHTML = "";
    selectorDiv.append(selectorForm);
};

var generatePreviousResults = function() {
    quizDiv.innerHTML = "";
    var outputDiv = document.createElement("div");
    addClassToElement(outputDiv,"row-to-flex");
    addClassToElement(outputDiv,"justify-between");
    var displayButton = document.createElement("button");
    addClassToElement(displayButton,"my-basic-button");
    var clearButton = document.createElement("button");
    addClassToElement(clearButton,"my-basic-button");
    displayButton.id = "displayData";
    clearButton.id = "clearData";
    displayButton.textContent = "Show Previous Results";
    clearButton.textContent = "Clear Previous Results";
    outputDiv.append(displayButton,clearButton);
    quizDiv.appendChild(outputDiv);
};

function selectAQuestion(inputValue) {
    switch(inputValue) {
        case "optionAll":
            return Math.floor(Math.random()*6);
        case "optionSF":
            return Math.floor(Math.random()*2);
        case "optionSV":
            return 2 + Math.floor(Math.random()*2);
        case "optionFV":
            return 4 + Math.floor(Math.random()*2);
        default:
            return Math.floor(Math.random()*6);
    }
}

function generateStatusDisplay() {
    var overallDiv = document.createElement("div");
    addClassToElement(overallDiv,"row-to-flex");
    addClassToElement(overallDiv,"justify-between");
    var questionDiv = document.createElement("div");
    questionDiv.id = "questionNumber";
    var timerDiv = document.createElement("div");
    var timeSpan1 = document.createElement("span");
    timeSpan1.textContent = "Ellapsed Time: ";
    var timeSpan2 = document.createElement("span");
    timeSpan2.id = "timeEllapsed";
    questionDiv.textContent = `Question ${questionCount} of 10`;
    timeSpan2.textContent = formatTimeToSecond(totalTime);
    timerDiv.append(timeSpan1,timeSpan2);
    selectorDiv.innerHTML = "";
    overallDiv.append(questionDiv,timerDiv);
    selectorDiv.appendChild(overallDiv);
}

function updateTime() {
    totalTime += 1000;
    document.querySelector("#timeEllapsed").textContent = formatTimeToSecond(totalTime);
}

var generateNextObject = function(inputOption) {
    nextObject = new QuadraticClass1();
    qNumber = selectAQuestion(inputOption);
    questionCount++;
    var questionDisplayDiv = document.createElement("div");
    addClassToElement(questionDisplayDiv,"column-to-flex");
    addClassToElement(questionDisplayDiv,"width250");
    addClassToElement(questionDisplayDiv,"align-items-center");
    var questionHolder = document.createElement("div");
    addClassToElement(questionHolder,"column-to-flex");
    addClassToElement(questionHolder,"align-items-center");
    questionHolder.innerHTML = nextObject.questionArray[qNumber][0];
    var answerForm = document.createElement("form");
    addClassToElement(answerForm,"column-to-flex");
    var textInput = document.createElement("input");
    textInput.type = "text";
    textInput.id = "studentAnswer";
    textInput.name = "studentAnswer";
    var buttonElement = document.createElement("button");
    addClassToElement(buttonElement,"my-basic-button");
    buttonElement.type = "submit";
    buttonElement.textContent = "Submit";
    answerForm.append(textInput,buttonElement);
    questionDisplayDiv.append(questionHolder,answerForm);
    quizDiv.innerHTML = "";
    quizDiv.appendChild(questionDisplayDiv);
};

var setUpQuiz = function(event) {
    event.preventDefault();
    var quizOptions = document.getElementsByName("quizOption");
    for(var i = 0; i < quizOptions.length; i++) {
        if(quizOptions[i].checked) {
            qOption = quizOptions[i].value;
            break;
        }
    }
    console.log(qOption);
    thisQuiz = [];
    generateNextObject(qOption);
    generateStatusDisplay();
    storedObject = {};
    console.log(qNumber);
    console.log(questionCount);
    timeController = setInterval(updateTime,1000);
};

var createResultOb = function(question,response,answers,wasCorrect) {
    var output = {};
    output.question = question;
    output.response = response;
    output.correctAnswers = answers.join(", ");
    output.wasCorrect = wasCorrect;
    return output;
};

var resultRow = function(questionNumber,question,studentResponse,correctAnswers,wasCorrect) {
    var rowEl = document.createElement("tr");
    var td1 = document.createElement("td");
    addClassToElement(td1,"border-Bottom-Right-1");
    addClassToElement(td1,"tPadding-4");
    td1.textContent = questionNumber;
    var td2 = document.createElement("td");
    addClassToElement(td2,"border-Bottom-Right-1");
    addClassToElement(td2,"tPadding-4");
    td2.innerHTML = question;
    var td3 = document.createElement("td");
    addClassToElement(td3,"border-Bottom-Right-1");
    addClassToElement(td3,"tPadding-4");
    td3.textContent = studentResponse;
    var td4 = document.createElement("td");
    addClassToElement(td4,"border-Bottom-Right-1");
    addClassToElement(td4,"tPadding-4");
    td4.innerHTML = correctAnswers;
    var td5 = document.createElement("td");
    addClassToElement(td5,"border-Bottom-1");
    addClassToElement(td5,"tPadding-4");
    td5.textContent = wasCorrect;
    rowEl.append(td1,td2,td3,td4,td5);
    return rowEl;
};

var checkSubmittedAnswer = function(event) {
    event.preventDefault();
    stResponse = document.querySelector("#studentAnswer").value.trim();
    corAnswers = nextObject.questionArray[qNumber][1];
    var answerFound = false;
    for(var i = 0; i < corAnswers.length; i++) {
        if(convertStandard(stripSpaces(stResponse)) === convertStandard(stripSpaces(corAnswers[i]))) {
            answerFound = true;
            break;
        }
    }
    var resultOb = createResultOb(nextObject.questionArray[qNumber][0],stResponse,nextObject.questionArray[qNumber][1],answerFound);
    thisQuiz.push(resultOb);
    if(questionCount === 10) {
        clearInterval(timeController);
        storedObject.resultArray = thisQuiz;
        storedObject.ellapsedTime = totalTime;
        storedObject.quizDate = moment().format("MM/D/YYYY");
        var quizMode;
        if(qOption === "optionSF") {
            quizMode = "Standard and Factored";
        } else if(qOption === "optionSV") {
            quizMode = "Standard and Vertex";
        } else if(qOption === "optionFV") {
            quizMode = "Factored and Vertex";
        } else {
            quizMode = "All Forms";
        }
        storedObject.quizMode = quizMode;
        var newLast10 = [storedObject];
        if(last10Quadratics.length === 10) {
            for(i = 0; i < 9; i++) {
                newLast10.push(last10Quadratics[i]);
            }
        } else {
            for(i = 0; i < last10Quadratics.length; i++) {
                newLast10.push(last10Quadratics[i]);
            }
        }
        last10Quadratics = newLast10;
        saveLast10();
        var displayedResults = tabulateResults(storedObject);
        quizDiv.innerHTML = "";
        generateSelectorElement();
        quizDiv.appendChild(displayedResults);
    } else {
        generateNextObject(qOption);
        generateStatusDisplay();
    }
};



function tabulateResults(resultObject) {
    var tableHeaders = document.createElement("tr");
    var th1 = document.createElement("th");
    addClassToElement(th1,"border-Bottom-Right-1");
    addClassToElement(th1,"tPadding-4");
    th1.textContent = "Question #";
    var th2 = document.createElement("th");
    addClassToElement(th2,"border-Bottom-Right-1");
    addClassToElement(th2,"tPadding-4");
    th2.textContent = "Question";
    var th3 = document.createElement("th");
    addClassToElement(th3,"border-Bottom-Right-1");
    addClassToElement(th3,"tPadding-4");
    th3.textContent = "Your Response";
    var th4 = document.createElement("th");
    addClassToElement(th4,"border-Bottom-Right-1");
    addClassToElement(th4,"tPadding-4");
    th4.textContent = "Correct Answer(s)";
    var th5 = document.createElement("th");
    addClassToElement(th5,"border-Bottom-1");
    addClassToElement(th5,"tPadding-4");
    th5.textContent = "Correct?";
    tableHeaders.append(th1,th2,th3,th4,th5);
    var dateDiv = document.createElement("div");
    dateDiv.textContent = "Date: " + resultObject.quizDate;
    var topicDiv = document.createElement("div");
    topicDiv.textContent = "Topic: " + resultObject.quizMode;
    var timeDiv = document.createElement("div");
    timeDiv.textContent = "Ellapsed Time: " + formatTimeToSecond(resultObject.ellapsedTime);
    var performanceDiv = document.createElement("div");
    var totalCorrect = 0;
    var tableEl = document.createElement("table");
    addClassToElement(tableEl,"borderColor1All");
    tableEl.appendChild(tableHeaders);
    for(var i = 0; i < resultObject.resultArray.length; i++) {
        var nextRow = resultRow(i+1,resultObject.resultArray[i].question,resultObject.resultArray[i].response,resultObject.resultArray[i].correctAnswers,resultObject.resultArray[i].wasCorrect);
        if(resultObject.resultArray[i].wasCorrect) {
            totalCorrect++;
        }
        tableEl.appendChild(nextRow);
    }
    performanceDiv.textContent = "Performance: " + totalCorrect + "/10";
    var tbodyEl = document.createElement("tbody");
    tbodyEl.appendChild(tableEl);
    var outputDiv = document.createElement("div");
    addClassToElement(outputDiv,"column-to-flex");
    outputDiv.append(dateDiv,topicDiv,timeDiv,performanceDiv,tbodyEl);
    return outputDiv;
}

function clearAllData(event) {
    event.preventDefault();
    localStorage.removeItem("last10Quadratics");
    last10Quadratics = [];
    quizDiv.innerHTML = "";
}

function showPriorResults(event) {
    event.preventDefault();
    quizDiv.innerHTML = "";
    for(var i = 0; i < last10Quadratics.length; i++) {
        var nextResult = tabulateResults(last10Quadratics[i]);
        quizDiv.appendChild(nextResult);
    }
}

generateSelectorElement();
generatePreviousResults();


//setUpQuiz();

selectorDiv.addEventListener("submit", setUpQuiz);
quizDiv.addEventListener("submit", checkSubmittedAnswer);
quizDiv.addEventListener("click", function(event) {
    if(event.target.id === "clearData") {
        clearAllData(event);
    } else if(event.target.id === "displayData") {
        showPriorResults(event);
    }
});