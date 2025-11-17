const container = document.getElementById("lista-itens");
const item = document.getElementById("nomeItem");
const buttonAdd = document.getElementById("addItem");
const resetButton = document.getElementById("reset");
const total = document.getElementById("result");

buttonAdd.addEventListener("click", addItem);
resetButton.addEventListener("click", resetList);

// ----- Carregar itens salvos quando abrir -----
document.addEventListener("DOMContentLoaded", loadSavedList);

function addItem(text = item.value, price = "", checked = false) {

  if (!text.trim()) {
    alert("Digite um item antes de adicionar.");
    return;
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkboxList");
  checkbox.checked = checked;

  const label = document.createElement("label");
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(" " + text));

  const valueInput = document.createElement("input");
  valueInput.type = "number";
  valueInput.placeholder = "Insira o valor";
  valueInput.value = price;
  valueInput.disabled = !checked;

  // ----- BOTÃO DE REMOVER ITEM -----
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "X";
  removeBtn.classList.add("remover");
  removeBtn.style.marginLeft = "8px";

  removeBtn.addEventListener("click", function () {
    const priceInput = label.nextElementSibling;
    const removeBtnEl = priceInput.nextElementSibling;
    const br = removeBtnEl.nextElementSibling;

    label.remove();
    priceInput.remove();
    removeBtnEl.remove();
    br.remove();

    updateTotal();
    saveList();
  });

  checkbox.addEventListener("change", function () {
    valueInput.disabled = !checkbox.checked;
    saveList();
    updateTotal();
  });

  valueInput.addEventListener("input", function () {
    updateTotal();
    saveList();
  });

  container.appendChild(label);
  container.appendChild(valueInput);
  container.appendChild(removeBtn);
  container.appendChild(document.createElement("br"));
  item.value = "";

  saveList();
  updateTotal();
}

function updateTotal() {
  let inputs = container.querySelectorAll('input[type="number"]');
  let totalSum = 0;

  inputs.forEach((input) => {
    let checkbox = input.previousElementSibling.querySelector('input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      totalSum += parseFloat(input.value) || 0;
    }
  });

  total.textContent = "R$ " + totalSum.toFixed(2);
}

function saveList() {
  let items = [];
  const labels = container.querySelectorAll("label");

  labels.forEach(label => {
    const text = label.textContent.trim();
    const checkbox = label.querySelector('input[type="checkbox"]');
    const valueInput = label.nextElementSibling;

    items.push({
      text,
      price: valueInput.value,
      checked: checkbox.checked
    });
  });

  localStorage.setItem("listaSuper", JSON.stringify(items));
}

function loadSavedList() {
  const saved = JSON.parse(localStorage.getItem("listaSuper")) || [];
  saved.forEach(item => addItem(item.text, item.price, item.checked));
}

function resetList() {
  container.innerHTML = "";
  total.textContent = "Total: 0";
  localStorage.removeItem("listaSuper");
}
