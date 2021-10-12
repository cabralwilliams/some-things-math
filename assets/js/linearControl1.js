
var selectorDiv = document.querySelector("#selectorDiv");
var quizDiv = document.querySelector("#quizDiv");

//Administrative Coding
var questionCount = 0;
var correctCount = 0;
var totalTime = 0;
var last10Linear = JSON.parse(localStorage.getItem("last10Linear")) || [];
var thisQuiz = [];
var nextObject, qOption, question, stResponse, corAnswers, qNumber, storedObject;
var timeController;
clearInterval(timeController);

var saveLast10 = function() {
    localStorage.setItem("last10Linear",JSON.stringify(last10Linear));
};

var addClassToElement = function(element,classToAdd) {
    element.classList.add(classToAdd);
};

var createNextObject = function() {
    var outputDiv = document.createElement("div");
};

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

var generateSelectorElement = function() {
    var selectorForm = document.createElement("form");
    addClassToElement(selectorForm,"lonely");

    //Submit button
    var buttonEl = document.createElement("button");
    buttonEl.type = "submit";
    buttonEl.className = "my-basic-button";
    buttonEl.textContent = "Start";
    selectorForm.append(buttonEl);
    selectorDiv.innerHTML = "";
    selectorDiv.append(selectorForm);
};

var generatePreviousResults = function() {
    quizDiv.innerHTML = "";
    var outputDiv = document.createElement("div");
    addClassToElement(outputDiv,"row-to-flex-2");
    //addClassToElement(outputDiv,"justify-around");
    var displayButton = document.createElement("button");
    addClassToElement(displayButton,"my-basic-button");
    var clearButton = document.createElement("button");
    addClassToElement(clearButton,"my-basic-button");
    displayButton.id = "displayData";
    clearButton.id = "clearData";
    displayButton.textContent = "Show Previous Results";
    clearButton.textContent = "Clear Previous Results";
    var displayDiv = document.createElement("div");
    var clearDiv = document.createElement("div");
    displayDiv.appendChild(displayButton);
    clearDiv.appendChild(clearButton);
    outputDiv.append(displayDiv,clearDiv);
    quizDiv.appendChild(outputDiv);
};

var generateNextObject = function() {
    nextObject = new AllLinearClasses().ob;
    questionCount++;
    var questionDisplayDiv = document.createElement("div");
    addClassToElement(questionDisplayDiv,"column-to-flex");
    addClassToElement(questionDisplayDiv,"width250");
    addClassToElement(questionDisplayDiv,"align-items-center");
    var questionHolder = document.createElement("div");
    addClassToElement(questionHolder,"column-to-flex");
    addClassToElement(questionHolder,"align-items-center");
    questionHolder.innerHTML = `<ul><li>${nextObject.questionArray[0]}</li><li>${nextObject.questionArray[1]}</li></ul><p>${nextObject.questionArray[2]}</p>`;
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
    thisQuiz = [];
    generateNextObject();
    generateStatusDisplay();
    storedObject = {};
    console.log(qNumber);
    console.log(questionCount);
    timeController = setInterval(updateTime,1000);
};

var createResultOb = function(line1,line2,question,response,answers,wasCorrect) {
    var output = {};
    output.question = `<ul><li>${line1}</li><li>${line2}</li></ul>` + question;
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
    corAnswers = nextObject.questionArray[3];
    console.log(corAnswers);
    console.log(stResponse);
    var answerFound = false;
    for(var i = 0; i < corAnswers.length; i++) {
        if(convertStandard(stripSpaces(stResponse)) === convertStandard(stripSpaces(String(corAnswers[i])))) {
            answerFound = true;
            break;
        }
    }
    var resultOb = createResultOb(nextObject.questionArray[0],nextObject.questionArray[1],nextObject.questionArray[2],stResponse,nextObject.questionArray[3],answerFound);
    thisQuiz.push(resultOb);
    if(questionCount === 10) {
        clearInterval(timeController);
        storedObject.resultArray = thisQuiz;
        storedObject.ellapsedTime = totalTime;
        storedObject.quizDate = moment().format("MM/D/YYYY");
        var newLast10 = [storedObject];
        if(last10Linear.length === 10) {
            for(i = 0; i < 9; i++) {
                newLast10.push(last10Linear[i]);
            }
        } else {
            for(i = 0; i < last10Linear.length; i++) {
                newLast10.push(last10Linear[i]);
            }
        }
        last10Linear = newLast10;
        saveLast10();
        var displayedResults = tabulateResults(storedObject);
        quizDiv.innerHTML = "";
        generateSelectorElement();
        quizDiv.appendChild(displayedResults);
    } else {
        generateNextObject();
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
    topicDiv.textContent = "Topic: Linear Systems";
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
    localStorage.removeItem("last10Linear");
    last10Linear = [];
    quizDiv.innerHTML = "";
}

function showPriorResults(event) {
    event.preventDefault();
    quizDiv.innerHTML = "";
    for(var i = 0; i < last10Linear.length; i++) {
        var nextResult = tabulateResults(last10Linear[i]);
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