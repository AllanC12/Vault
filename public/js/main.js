document.addEventListener("DOMContentLoaded", () => {

  const balanceElement = document.getElementById("balance-value");

  const allValueExpensesRevenues = document.querySelectorAll(".value");
  const revenueValue = document.querySelectorAll(".revenue-value");
  const expenseValue = document.querySelectorAll(".expense-value");

  const graphicElement = document.getElementById("myChart");
  let difference = 0;

  const formatValues = () => {
    balanceElement.innerText = difference.toLocaleString("pt-BR", {
      minimumIntegerDigits: 2,
      style: "currency",
      currency: "BRL",
    });

    allValueExpensesRevenues.forEach((value) => {
      const valueInt = parseInt(value.innerText);

      value.innerText = valueInt.toLocaleString("pt-BR", {
        minimumIntegerDigits: 2,
        style: "currency",
        currency: "BRL",
      });
    });
  };

  const sumValues = () => {
    let sumRevenues = 0;
    let sumExpenses = 0;

    revenueValue.forEach((value) => {
      const valueInt = parseFloat(
        value.innerText
          .replace("R$", "")
          .trim()
      );

      sumRevenues += valueInt;
    });

    expenseValue.forEach((value) => {
      const valueInt = parseFloat(
        value.innerText
        .replace("R$", "")      
          .trim()
      );
      sumExpenses += valueInt;
    });

    difference = sumRevenues - sumExpenses;


    return [sumRevenues, sumExpenses, difference];
  };

  const renderGraphic = () => {
    new Chart(graphicElement, {
      type: "bar",
      data: {
        labels: ["", "", ""],
        datasets: [
          {
            label: "Receitas",
            data: [sumValues()[0]],
            borderWidth: 1,
            backgroundColor: ["rgba(69, 235, 54, 0.6)"],
          },
          {
            label: "Despesas",
            data: [sumValues()[1]],
            borderWidth: 1,
            backgroundColor: ["rgba(250, 3, 57, 0.6)"],
          },
          {
            label: "Diferença",
            data: [sumValues()[2]],
            borderWidth: 1,
            backgroundColor: ["rgba(42, 61, 238, 0.6)"],
          },
        ],
      },
    });
  };


  sumValues();
  renderGraphic();
  formatValues();
});
