// true answers
const getTrueAnswers = () => {
  return ["E", "E", "E", "E"];
};

// Returns radio value in given form elements 
const getFormRadioValueByName = (formElements, name) => {
  if (!formElements) {
    return;
  }

  return formElements.find((item) => item.name === name && item.checked).value;
};

const gonderButton = document.getElementById("gonderButton");

// gonderButton clickHandler
gonderButton.addEventListener("click", (e) => {
  e.preventDefault();

  const form = document.getElementById("form");
  const formElements = Array.from(form.elements);

  // form radio item values
  let a1 = getFormRadioValueByName(formElements, "q1");
  let a2 = getFormRadioValueByName(formElements, "q2");
  let a3 = getFormRadioValueByName(formElements, "q3");
  let a4 = getFormRadioValueByName(formElements, "q4");
  const myAnswers = [a1, a2, a3, a4];

  // calculating score
  let value = 0;
  getTrueAnswers().forEach((answer, i) => {
    if (answer === myAnswers[i]) {
      value += 25;
    }
  });

  // hidden divs
  const percentageDiv = document.getElementById("percentageParent");
  const percentage = document.getElementById("percentage");

  // update score & show hidden div
  percentage.textContent = `% ${value}`;
  percentageDiv.classList.remove(["d-none"]);
});
