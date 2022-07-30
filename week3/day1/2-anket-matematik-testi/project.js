// true answers
const getTrueAnswers = () => {
  return [8, 10, 3, 25];
};

const gonderButton = document.getElementById("gonderButton");

// gonderButton clickHandler
gonderButton.addEventListener("click", (e) => {
  e.preventDefault();

  const form = document.getElementById("form");

  // form radio item values
  let a1 = form.q1.value;
  let a2 = form.q2.value;
  let a3 = form.q3.value;
  let a4 = form.q4.value;
  const myAnswers = [a1, a2, a3, a4];

  // calculating score
  let value = 0;
  getTrueAnswers().forEach((answer, i) => {
    if (answer === parseInt(myAnswers[i], 10)) {
      value += 25;
    }
  });

  // hidden divs
  const percentageDiv = document.getElementById("percentageParent");
  const percentage = document.getElementById("percentage");
  const percentageExtraText = document.getElementById("percentageExtraText");

  // show hidden div & update score
  percentage.textContent = `${value} %`;
  percentageDiv.classList.remove(["d-none"]);
  
  // show hidden div & disable button
  if (value === 100) {
    percentageExtraText.classList.remove(["d-none"])
    e.target.disabled = true;
  }
});
