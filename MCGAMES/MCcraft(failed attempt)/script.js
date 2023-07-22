
const recipes = {
  recipe1: ["inventory-slot", "inventory-slot", "inventory-slot", "inventory-slot"],
  recipe2: ["inventory-slot", "", "", "inventory-slot"],
  recipe3: ["inventory-slot", "", "inventory-slot", ""]
};

function checkRecipe() {
  const slots = document.querySelectorAll('.slot');
  const ingredients = [];

  slots.forEach(slot => {
    if (slot.firstChild) {
      ingredients.push(slot.firstChild.className);
    } else {
      ingredients.push("");
    }
  });
  for (let recipe in recipes) {
    const recipeSlots = recipes[recipe];
    let matched = true;
    for (let i = 0; i < recipeSlots.length; i++) {
      if (recipeSlots[i] !== "" && recipeSlots[i] !== ingredients[i]) {
        matched = false;
        break;
      }
    }
    if (matched) {
      const outputSlot = document.querySelector('.output-slot');
      outputSlot.innerHTML = `<div class="${recipe}"></div>`;
      return;
    }
  }

  const outputSlot = document.querySelector('.output-slot');
  outputSlot.innerHTML = "";
}
function allowDrop(event) {
  event.preventDefault();
}
function drag(event) {
  event.dataTransfer.setData("text/plain", event.target.className);
}
function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text/plain");
  const targetSlot = event.target;
  if (targetSlot.firstChild) {
    targetSlot.removeChild(targetSlot.firstChild);
  }
  targetSlot.appendChild(document.querySelector(`.${data}`));
  checkRecipe();
}
