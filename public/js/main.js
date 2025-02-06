document.addEventListener("DOMContentLoaded", () => {
  const btnCloseModal = document.getElementById("btn-close-modal");
  const modal = document.getElementById("modal-account");
  const btnOpenModal = document.getElementById("btn-open-modal");

  const balanceElement = document.getElementById("balance-value");

  const formatBalance = () => {
    const balance = balanceElement.innerText;
    const balanceInt = parseInt(balance);

    balanceElement.innerText = balanceInt.toLocaleString("pt-BR", {
      minimumIntegerDigits: 2,
      style: "currency",
      currency: "BRL",
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

  handleModal("hide");
  formatBalance();
});
