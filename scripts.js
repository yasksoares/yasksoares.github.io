const container = document.getElementById("lista-itens");
const item = document.getElementById("nomeItem");
const buttonAdd = document.getElementById("addItem");
const resetButton = document.getElementById("reset");
const total = document.getElementById("result");

buttonAdd.addEventListener("click", () => addItem());
resetButton.addEventListener("click", resetList);

document.addEventListener("DOMContentLoaded", loadSavedList);

function addItem(text = item.value, price = "", checked = false) {
  if (!text.trim()) {
    alert("Digite um item antes de adicionar.");
    return;
  }

  const label = document.createElement("label");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkboxList";
  checkbox.checked = checked;

  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(" " + text));

  const valueInput = document.createElement("input");
  valueInput.type = "number";
  valueInput.placeholder = "Insira o valor";
  valueInput.value = price;
  valueInput.disabled = !checked;

  // Botão de remover item
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "X";
  removeBtn.className = "remover";
  removeBtn.style.marginLeft = "8px";

  removeBtn.addEventListener("click", () => {
    label.remove();
    valueInput.remove();
    removeBtn.remove();
    br.remove();
    updateTotal();
    saveList();
  });

  const br = document.createElement("br");

  checkbox.addEventListener("change", () => {
    valueInput.disabled = !checkbox.checked;
    updateTotal();
    saveList();
  });

  valueInput.addEventListener("input", () => {
    updateTotal();
    saveList();
  });

  container.appendChild(label);
  container.appendChild(valueInput);
  container.appendChild(removeBtn);
  container.appendChild(br);

  item.value = "";

  updateTotal();
  saveList();
}

function updateTotal() {
  let totalSum = 0;
  const inputs = container.querySelectorAll('input[type="number"]');

  inputs.forEach(input => {
    const label = input.previousElementSibling;
    const checkbox = label.querySelector('input[type="checkbox"]');
    if (checkbox.checked) totalSum += parseFloat(input.value) || 0;
  });

  total.textContent = "R$ " + totalSum.toFixed(2);
}

function saveList() {
  let items = [];
  const labels = container.querySelectorAll("label");

  labels.forEach(label => {
    const checkbox = label.querySelector('input[type="checkbox"]');
    const text = label.childNodes[1].textContent.trim();
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
  total.textContent = "R$ 0";
  localStorage.removeItem("listaSuper");
}
