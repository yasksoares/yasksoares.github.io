const container = document.getElementById("lista-itens");
const item = document.getElementById("nomeItem");
const buttonAdd = document.getElementById("addItem");
const resetButton = document.getElementById("reset");
const total = document.getElementById("result");

let result = 0;

buttonAdd.addEventListener("click", function(){

  if(!item.value.trim()){
    alert("Digite um item antes de adicionar.");
    return;
  }
  
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "myCheckbox";
  checkbox.classList.add("checkboxList");
  container.appendChild(checkbox);
  const label = document.createElement("label");
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(" " + item.value));

  resetButton.addEventListener("click", function() {
  container.innerHTML = "";
  total.textContent = "Total: 0";
  result = 0;
  });

  const valueInput = document.createElement("input");
  valueInput.type = "number";
  valueInput.placeholder = "Insira o valor"
  valueInput.disabled = true;

  checkbox.addEventListener("change", function(){
    valueInput.disabled = !checkbox.checked;
  });

  container.appendChild(label);
  container.appendChild(valueInput);
  container.appendChild(document.createElement("br"));
  item.value = "";


  valueInput.addEventListener("input", function(){
  let inputs = container.querySelectorAll('input[type="number"]');
  let totalSum = 0;

    inputs.forEach((input) => {
        let correspondingCheckbox = input.previousElementSibling.querySelector('input[type="checkbox"]')
        if (correspondingCheckbox && correspondingCheckbox.checked) {
            totalSum += parseFloat(input.value) || 0;
        }
    });

  total.textContent = "R$ " + totalSum;
  });
})