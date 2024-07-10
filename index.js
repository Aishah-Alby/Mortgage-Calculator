const amount_m = document.querySelector(".amount-m");
const amount = document.querySelector("#amount");
console.log(amount);
const mortgageTerm = document.querySelector("#term");
const Term = document.querySelector(".Term");
const mortgageRates = document.querySelector("#rates");
const Rates = document.querySelector(".Rates");
const buttn = document.querySelector(".buttn");
const radiobtn = document.querySelectorAll("input[name='query']");
const divradio = document.querySelector(".radio");
const container2 = document.querySelector(".container2");
const dollar = document.querySelector(".dollar");
const years = document.querySelector(".years");
const percent = document.querySelector(".percent");

let selectedQuery;
radiobtn.forEach((item) => {
  item.addEventListener("click", () => {
    selectedQuery = item.value;
    console.log(item.value);
  });
});
//function you need to modify and repeat function for each errortag
function addError(elem, text, errorField) {
  elem.classList.add("error-input");
  let error = document.querySelector(`.${errorField}`);
  if (error) {
    error.innerText = text;
  } else {
    let errorMessage = document.createElement("div");
    errorMessage.className = errorField;
    errorMessage.style = "color:red; font-size:15px;";
    errorMessage.innerText = text;
    elem.after(errorMessage);
  }
}

function remError(elem, errorField) {
  let error = document.querySelector(`.${errorField}`);

  if (error) {
    error.innerText = "";
  }
  elem.classList.remove("error-input");
}
function interestOnly(amount, mortgageRates) {
  let interest = (amount * mortgageRates) / 12 / 100;
  return interest;
}

function totalInterest(interestOnly, mortgageTerm) {
  let totalInterest = interestOnly * mortgageTerm * 12;
  return totalInterest;
}

function monthlyRepayment(amount, mortgageRates, mortgageTerm) {
  let M =
    (amount * mortgageRates * Math.pow(1 + mortgageRates), mortgageTerm) /
    (Math.pow(1 + mortgageRates), mortgageTerm - 1);
  return M;
}
console.log(
  `The monthly repayment is: $${monthlyRepayment(
    amount.value,
    mortgageRates.value,
    mortgageTerm.value
  )}`
);
function totalRepayment(monthlyRepayment, mortgageTerm) {
  return parseFloat(monthlyRepayment) * mortgageTerm * 12;
}
//console.log(`The monthly repayment is: $${totalRepayment(45, 10)}`);

buttn.addEventListener("click", () => {
  console.log();
  const errorsArray = [];

  if (amount.value.length === 0) {
    errorsArray.push({
      field: "Mortgage Amount",
      errorMessage: "This field is required",
    });
    addError(amount_m, "This field is required", "amount-error-input");
    dollar.style = "background-color:red;";
  } else {
    remError(amount_m, "amount-error-input");
  }
  if (mortgageTerm.value.length === 0) {
    errorsArray.push({
      field: "Mortgage Term",
      errorMessage: "This field is required",
    });
    addError(Term, "This field is required", "term-error-input");
    years.style = "background-color:red;";
  } else {
    remError(Term, "term-error-input");
  }

  if (mortgageRates.value.length === 0) {
    errorsArray.push({
      field: "Mortgage Rate",
      errorMessage: "This field is required",
    });
    addError(Rates, "This field is required", "rate-error-input");
    percent.style = "background-color:red;";
  } else {
    remError(Rates, "rate-error-input");
  }

  if (!selectedQuery) {
    errorsArray.push({
      field: "radiobtn",
      errorMessage: "This field is required",
    });

    let error = document.querySelector(".error_message_radio");
    if (error) {
      error.innerText = "This field is required";
    } else {
      let errorMessage = document.createElement("p");
      errorMessage.className = "error_message_radio";
      errorMessage.style = "color:red; font-size:10px;";
      errorMessage.innerText = "This field is required";
      divradio.after(errorMessage);
    }
  } else {
    let error = document.querySelector(".error_message_radio");
    if (error) {
      error.innerText = "";
    }
  }

  if (errorsArray.length === 0) {
    const mortgage =
      selectedQuery === "Repayment"
        ? monthlyRepayment(
            amount.value,
            mortgageRates.value,
            mortgageTerm.value
          )
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
});
