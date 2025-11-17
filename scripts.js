const container = document.getElementById("lista-itens");
const item = document.getElementById("nomeItem");
const buttonAdd = document.getElementById("addItem");
const resetButton = document.getElementById("reset");
const total = document.getElementById("result");

buttonAdd.addEventListener("click", addItem);
resetButton.addEventListener("click", resetList);
document.addEventListener("DOMContentLoaded", loadSavedList);

function addItem(text = item.value, price = "", checked = false) {
  if (!text.trim()) {
    alert("Digite um item antes de adicionar.");
    return;
  }

  const linha = document.createElement("div");
  linha.classList.add("item-linha");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkboxList");
  checkbox.checked = checked;

  const texto = document.createElement("span");
  texto.classList.add("item-texto");
  texto.textContent = text;

  const valueInput = document.createElement("input");
  valueInput.type = "number";
  valueInput.placeholder = "Insira o valor";
  valueInput.value = price;
  valueInput.classList.add("preco-input");
  valueInput.disabled = !checked;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "X";
  removeBtn.classList.add("remover");

  removeBtn.addEventListener("click", () => {
    linha.remove();
    updateTotal();
    saveList();
  });

  checkbox.addEventListener("change", () => {
    valueInput.disabled = !checkbox.checked;
    updateTotal();
    saveList();
  });

  valueInput.addEventListener("input", () => {
    updateTotal();
    saveList();
  });

  linha.appendChild(checkbox);
  linha.appendChild(texto);
  linha.appendChild(valueInput);
  linha.appendChild(removeBtn);

  container.appendChild(linha);
  item.value = "";

  saveList();
  updateTotal();
}

function updateTotal() {
  let totalSum = 0;
  const itens = container.querySelectorAll(".item-linha");

  itens.forEach(linha => {
    const checkbox = linha.querySelector("input[type='checkbox']");
    const preco = linha.querySelector(".preco-input");
    if (checkbox.checked) totalSum += parseFloat(preco.value) || 0;
  });

  total.textContent = "R$ " + totalSum.toFixed(2);
}

function saveList() {
  const itens = [];
  const linhas = container.querySelectorAll(".item-linha");

  linhas.forEach(linha => {
    itens.push({
      text: linha.querySelector(".item-texto").textContent,
      price: linha.querySelector(".preco-input").value,
      checked: linha.querySelector("input[type='checkbox']").checked
    });
  });

  localStorage.setItem("listaSuper", JSON.stringify(itens));
}

function loadSavedList() {
  const saved = JSON.parse(localStorage.getItem("listaSuper")) || [];
  saved.forEach(item => addItem(item.text, item.price, item.checked));
}

function resetList() {
  container.innerHTML = "";
  total.textContent = "R$ 0.00";
  localStorage.removeItem("listaSuper");
}