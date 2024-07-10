if (errorsArray.length === 0) {
  const mortgage =
    selectedQuery === "Repayment"
      ? monthlyRepayment(amount.value, mortgageRates.value, mortgageTerm.value)
      : interestOnly(amount.value, mortgageRates.value);
  const mortgageTotal =
    selectedQuery === "Repayment"
      ? totalRepayment(parseFloat(mortgage), mortgageTerm.value)
      : totalInterest(parseFloat(mortgage), mortgageTerm.value);

  const result = document.querySelector(".result");
  result.style = "display: none";

  const success = document.querySelector(".success_message");
  const mortgageTotalSpan = document.getElementById("mortgageTotal");
  const mortgageValueSpan = document.getElementById("mortgageValue");

  mortgageTotalSpan.innerText = mortgageTotal;
  mortgageValueSpan.innerText = mortgage;
  success.style = "display: block";
}

function remError(elem, errorField) {
  let error = document.querySelector(`.${errorField}`);

  if (error) {
    error.innerText = "";
  }
  elem.classList.remove("error-input");
}

const errorsArray = [];
const error1 = document.querySelector(".errortag1");
if (amount.value.length === 0) {
  errorsArray.push({
    field: "Mortgage Amount",
    errorMessage: "This field is required",
  });
  const error1 = document.querySelector(".errortag1");
  error1.style = "color:red";
} else {
  error1.style = "color:hsl(208, 100%, 97%)";
}
if (errorsArray.length === 0) {
  amount.value.length === 0 ? "0" : amount.value;
  const error1 = document.querySelector(".errortag1");
  error1.style = "color:red";
} else {
  error1.style = "color:hsl(208, 100%, 97%)";
}
