/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:
-Get the value of the input text element.  
-You should be expecting a variable number of arrays typed into the input separated by commas:  For example: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29]
-All array elements should be whole numbers (negative and 0 are allowed), no decimals. 
-Each array should have at least one element that is a whole number (negative and 0 are allowed), no decimals. 
-You can ignore any extra commas for example, inputting: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29], 
-There should be at least one array inputted. 
-You will then return a single array that has all the values from the arrays inputted sorted from lowest to highest number.  For example:  If our input was: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29] You would return:  [0,1,1,2,2,3,3,4,6,8,10,15,25,29]
-Add a list item to the #results list of result of the sort you have just completed. You will alternate the class for each list item using the classes is-green and is-red (described below), starting with is-green first.
-If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of an error somehow.
*/
let sortForm = document.getElementById("sortForm");
let formInput = document.getElementById("formInput");
let errorElem = document.getElementById("error");
let list = document.getElementById("results");
let formLabel = document.getElementById("formLabel");

if (sortForm) {
  sortForm.addEventListener("submit", (event) => {
    event.preventDefault();
    var userInput = formInput.value;
    if (!userInput) {
      formInput.value = "";
      errorElem.hidden = false;
      errorElem.innerHTML = "You must enter a value";
      formInput.focus();
    } else {
      let isValidInput = true;

      if (userInput.indexOf("[") !== 0 || userInput.indexOf("]") === -1) {
        isValidInput = false;
      }
      userInput = userInput.replaceAll("[", " ");
      userInput = userInput.replaceAll("]", " ");
      userInput = userInput.replaceAll(" ", "");
      // Now we should only have stuff and commas:     "2,30,-10,5,8,2,4,5,boo,"
      let strArr = userInput.split(",");
      // Now an array [2,30,-10,5,8,2,4,5,boo]
      for (let i = 0; i < strArr.length; i++) {
        if (strArr[i] == "" || strArr[i] == "-0") {
          isValidInput = false;
          break;
        }
        let num = Number(strArr[i]);
        if (!Number.isInteger(num)) {
          isValidInput = false;
          break;
        }
      }
      if (!isValidInput) {
        formInput.value = "";
        errorElem.hidden = false;
        errorElem.innerHTML = "Input was Invalid";
        formInput.focus();
      } else {
        strArr.sort((a, b) => a - b);

        errorElem.hidden = true;
        let li = document.createElement("li");

        let htmlString = "[";
        strArr.forEach((item) => {
          htmlString += item + ",";
        });

        htmlString = htmlString.substring(0, htmlString.length - 1);
        htmlString += "]";

        if (list.childNodes.length % 2 == 1) {
          li.className = "is-green";
          li.innerHTML = htmlString;
        } else {
          li.className = "is-red";
          li.innerHTML = htmlString;
        }
        list.appendChild(li);
        sortForm.reset();
        formInput.focus();
      }
    }
  });
}
