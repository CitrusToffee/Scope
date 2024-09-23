/**
 * @type {inventoryItem[]}
 */
let playerInv = [
  {
    img: "/imgs/health-kit.svg",
    name: "health kit",
    executable: heal,
    params: {amount: 20}
  },
  {
    img: "/imgs/Pistol.svg",
    name: "Pistol",
    executable: swapWeapon,
    params: {switch_to: "Pistol"}
  }
];

function toggleInvVisibility() {
  if (document.getElementById("inventoryBar").style.display !== "none") {
    document.getElementById("inventoryBar").style.display = "none";
  } else {
    document.getElementById("inventoryBar").style.display = null;
  }
}

/**
 * Filling the InventoryList with the items in playerInv.
 */
function updateInventoryList() {
  let inventoryBar = document.createElement("DIV");
  inventoryBar.id = "inventoryBar";
  playerInv.forEach((item, i) => {
    let itemHTML = document.createElement("DIV");
    itemHTML.setAttribute("onclick",`use_item(${i})`);
    itemHTML.classList.add("inventorySlot");
    let itemIMG = document.createElement("IMG");
    itemIMG.classList.add("itemImg")
    itemIMG.src = item.img
    itemHTML.append(itemIMG);
    inventoryBar.append(itemHTML);
  })
  let invPanel = document.getElementById("inventoryPanel");
  invPanel.innerHTML = "";
  invPanel.append(inventoryBar);
}

/**
 * The Function for using an item in slot "item_slot". It just calls the executable in the inventoryItem
 * object with the params as a parameter and then deleting the item from the list.
 * @param {number} item_slot
 */
function use_item(item_slot) {
  /*
   * @type {inventoryItem}
   */
  console.log(`Using Item in slot ${item_slot}`);
  let inv_item = playerInv[item_slot];
  if (inv_item === undefined) {
    return;
  }
  console.log(`Using item ${inv_item.name} with parameters ${JSON.stringify(inv_item.params)}`);
  inv_item.executable(inv_item.params);

  playerInv.splice(item_slot, 1);
  updateInventoryList();
}


function heal(params) {
  if (params.amount === undefined || !params.amount instanceof Number) {
    return;
  }
  playerHealth = Math.min(100, playerHealth + params.amount)
  updateHealth()
}

function swapWeapon(params) {
  if (params.switch_to === undefined || !params.switch_to instanceof String) {
    return;
  }

  let add_to_inv = currentWeapon.name
  setWeapon(params.switch_to)
  updateAmmo();

  // add previous Weapon to inventory to switch to.
  playerInv.push({
    img: `/imgs/${add_to_inv}.svg`,
    name: add_to_inv,
    executable: swapWeapon,
    params: {switch_to: add_to_inv}
  })
}