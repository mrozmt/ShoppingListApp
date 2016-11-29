function isLocalStorageEmpty(){
  if (localStorage.getItem("shoppingItems") == null) {
    return true;
  }
  return false;
}

function loadItemsToList() {
    console.log(window.document.title);
    var shoppingItems = JSON.parse(localStorage.getItem("shoppingItems"));
    for (let item of shoppingItems) {
      $( "#CreateShoppinglist > ul" ).append( "<li>" + item + "</li>" );
  }
}

function initializeListItems(){
  var shoppingItems = new Array();
  shoppingItems[0] = "Apple";
  shoppingItems[1] = "Banana";
  shoppingItems[2] = "Battery";
  shoppingItems[3] = "Beef";
  shoppingItems[4] = "Bread";
  shoppingItems[5] = "Butter";
  shoppingItems[6] = "Candy";
  shoppingItems[7] = "Cereal";
  shoppingItems[8] = "Cheese";
  shoppingItems[9] = "Chicken";
  shoppingItems[10] = "Chocolate";
  shoppingItems[11] = "Coffee";
  shoppingItems[12] = "Cookies";
  shoppingItems[13] = "Deodorant";
  shoppingItems[14] = "Detergent";
  shoppingItems[15] = "Eggs";
  shoppingItems[16] = "Fish";
  shoppingItems[17] = "Floss";
  shoppingItems[18] = "Flour";
  shoppingItems[19] = "Juice";
  shoppingItems[20] = "Lemons";
  shoppingItems[21] = "Milk";
  shoppingItems[22] = "Mouthwash";
  shoppingItems[23] = "Nuts";
  shoppingItems[24] = "Olive Oil";
  shoppingItems[25] = "Oranges";
  shoppingItems[26] = "Pasta";
  shoppingItems[27] = "Popcorn";
  shoppingItems[28] = "Pork";
  shoppingItems[29] = "Raisins";
  shoppingItems[30] = "Razor";
  shoppingItems[31] = "Sausage";
  shoppingItems[32] = "Seafood";
  shoppingItems[33] = "Shampoo";
  shoppingItems[34] = "Soft Drink";
  shoppingItems[35] = "Soup";
  shoppingItems[36] = "Tea";
  shoppingItems[37] = "Tissue";
  shoppingItems[38] = "Toilet Paper";
  shoppingItems[39] = "Toothpaste";
  shoppingItems[40] = "Vegetable Oil";
  shoppingItems[41] = "Water";
  shoppingItems[42] = "Watermelon";
  shoppingItems[43] = "Yogurt";
  localStorage["shoppingItems"] = JSON.stringify(shoppingItems);
}
