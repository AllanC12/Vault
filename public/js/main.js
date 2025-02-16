document.addEventListener("DOMContentLoaded", () => {
  const btnCloseModal = document.getElementById("btn-close-modal");
  const modal = document.getElementById("modal-account");
  const btnOpenModal = document.getElementById("btn-open-modal");

  const balanceElement = document.getElementById("balance-value");

  const formExpenseRevenue = document.getElementById("form-expenses-revenues");
  const btnRegisterExpnesesRevenue = document.getElementById(
    "btn-register-expenses-revenues"
  );
  const descriptionExpenseRevenue = document.getElementById(
    "description-expenses-revenues"
  );
  const valueExpenseRevenue = document.getElementById(
    "value-expenses-revenues"
  );
  const checkRevenue = document.getElementById("check-revenues");
  const checExpense = document.getElementById("check-expenses");
  const revenueDescription = document.querySelectorAll(".revenue-description");
  const allValueExpensesRevenues = document.querySelectorAll(".value");
  const revenueValue = document.querySelectorAll(".revenue-value");
  const expenseValue = document.querySelectorAll(".expense-value");

  const formatValues = () => {
    const balance = balanceElement.innerText;
    let balanceInt = parseInt(balance);
    if (balance.trim() === "") balanceInt = 0;

    balanceElement.innerText = balanceInt.toLocaleString("pt-BR", {
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

  const handleModal = (order) => {
    if (order === "hide") {
      modal.style.setProperty("opacity", 0);
      setTimeout(() => {
        modal.style.setProperty("display", "none");
      }, 50);
      return;
    }

    modal.style.setProperty("display", "flex");
    modal.style.setProperty("z-index", "999");
    setTimeout(() => {
      modal.style.setProperty("opacity", 1);
    }, 50);
  };

  btnOpenModal.addEventListener("click", (e) => {
    e.preventDefault();
    handleModal("show");
  });

  btnCloseModal.addEventListener("click", () => {
    handleModal("hide");
  });

  formExpenseRevenue.addEventListener("submit", (e) => {});

  handleModal("hide");
  formatValues();
});
