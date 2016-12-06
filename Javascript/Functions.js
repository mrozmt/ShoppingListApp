var chosenItems = "";
var CurrentShoppingListArray = [];
var ShoppingListName = "";

//*******************************create list screen functions*******************

/*
 * this function adds an object to the CurrentShoppingListArray while also updating
 * the user interface.
 */
function addItem(){
  var itemName = $("#spinlabel").html();
  var quantity = $("#spin").val();
  var itemObj = {Name:itemName, Quantity:quantity};
  CurrentShoppingListArray.push(itemObj);
  $.mobile.pageContainer.pagecontainer("change", "CreateShoppingList.html", null);
}

//changes the page and stores the user's current chosen item to localStorage
function setChosenItem(chosenItem){
  localStorage.setItem("chosenItem", chosenItem.text);
  $.mobile.pageContainer.pagecontainer("change", "choosenitems.html", null);
}

//retrieve user's chosen item from localStorage
function getChosenItem(){
  $("#spinlabel").html(localStorage.getItem("chosenItem"));
}

//check if shoppingItems array in the localStorage is empty or not
function isLocalStorageEmpty(){
  if (localStorage.getItem("shoppingItems") == null) {
    return true;
  }
  return false;
}

/*
 * load the shopping items from the localStorage to the list from where the user
 * can choose the items
 */
function loadItemsToList() {
    var shoppingItems = JSON.parse(localStorage.getItem("shoppingItems"));
    for (let item of shoppingItems) {
      $( "#CreateShoppinglist > ul" ).append( "<li>" + item + "</li>" );
  }
}

/*
 * Save the user's list to the localStorage and change page to main menu.
 */
function saveList(){
  var listName = $("#SaveListName").val();
  localStorage[$("#SaveListName").val()] = JSON.stringify(CurrentShoppingListArray);
  var testListSaved = JSON.parse(localStorage.getItem($("SaveListName").val()));
  addNewListName(listName);

  //empty CurrentShoppingListArray
  CurrentShoppingListArray = [];
  $.mobile.pageContainer.pagecontainer("change", "../../MainMenu.html", null);
}

//add new list name to array and save to localStorage
function addNewListName(listName){
  var tempArr = [];
  if (localStorage.getItem("ShoppingListsArrayNames") != null) {
    tempArr = JSON.parse(localStorage.getItem("ShoppingListsArrayNames"));
  }
  tempArr.push($("#SaveListName").val());
  localStorage["ShoppingListsArrayNames"] = JSON.stringify(tempArr);
}

//initialize the shoppling list from where the user can choose the shopping items.
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

//***********************Shopping Lists Screen functions************************
function displayShoppingLists(){
  var ShoppingLists = JSON.parse(localStorage.getItem("ShoppingListsArrayNames"));
  if(ShoppingLists != null){
    for (let item of ShoppingLists) {
      $("#ShoppingLists").append("<li><a href='ShoppingListItems.html'>" + item + "</a></li>");
    }
  }
  else{
    $( "#ShoppingLists > ul" ).append("<p style='color:red'>There are currently no Shopping Lists available. "
    +"Please create a new one first!!!</p>");
  }
}

function retrieveShoppingListItems(){
  var chosenList = localStorage.getItem("chosenList");
  var shoppingList = JSON.parse(localStorage.getItem(chosenList));
  $("#ShoppingListItemsHeading").html(chosenList);
  for (var i =0; i < shoppingList.length; i++){
    $("#ShoppingListItems").append("<li data-icon='delete'><a href='#'>"
    + shoppingList[i].Name + "<span class='ui-li-count'>Quantity: "
    + shoppingList[i].Quantity +"</span></a></li>");
  }
}
