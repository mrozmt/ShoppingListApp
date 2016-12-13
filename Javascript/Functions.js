var chosenItems = "";
var CurrentShoppingListArray = [];
var ShoppingListName = "";
var ReportArray = [];

function Item(name, quantity) {
  this.name = name;
  this.quantity = quantity;
}

function ReportItem(date, name, quantity){
  this.date = date;
  this.name = name;
  this.quantity = quantity;
}

//*******************************create list screen functions*******************

/*
* this function adds an object to the CurrentShoppingListArray while also updating
* the user interface.
*/
function addItem(){
  var itemName = $("#spinlabel").html();
  var quantity = $("#spin").val();
  for(var i = 0; i < CurrentShoppingListArray.length; i++){
    if(itemName == CurrentShoppingListArray[i].name){
      CurrentShoppingListArray[i].quantity = parseInt(CurrentShoppingListArray[i].quantity) + parseInt(quantity);
      return;
    }
  }
  var tempItem = new Item(itemName, quantity);
  CurrentShoppingListArray.push(tempItem);
}

//changes the page and stores the user's current chosen item to localStorage
function setChosenItem(chosenItem){
  localStorage.setItem("chosenItem", chosenItem.text);
  $.mobile.pageContainer.pagecontainer("change", "choosenitems.html", {transition: 'slide'});
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
  if(CurrentShoppingListArray.length > 0){
    var listName = $("#SaveListName").val();
    var arrayListNames = JSON.parse(localStorage.getItem("ShoppingListsArrayNames"));
    var sameName = new Boolean(false);
    if(arrayListNames != null){
      if (arrayListNames.length > 0){
        for(var i = 0; i < arrayListNames.length; i++){
          if(listName == arrayListNames[i]){
            sameName = true;
          }
        }
      }
    }
    if(listName.length != 0 && sameName == false){
      localStorage[$("#SaveListName").val()] = JSON.stringify(CurrentShoppingListArray);
      addNewListName(listName);

      //empty CurrentShoppingListArray
      CurrentShoppingListArray = [];
      $.mobile.pageContainer.pagecontainer("change", "../../MainMenu.html", {transition: 'slide'});
    }
    else if(sameName == true){
      $("#ListValidator").text("Name already exists. Choose another one.");
    }
    else{
      $("#ListValidator").text("Please enter a name for the list.");
    }
  }
  else{
    $("#ListValidator").text("There are currently no items in the list.");
  }
}

//add new list name to array and save to localStorage
function addNewListName(){
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
/*
* retrieve all shopping list names from local storage and display them
*/
function displayShoppingLists(){
  var ShoppingLists = JSON.parse(localStorage.getItem("ShoppingListsArrayNames"));
  if(ShoppingLists != null){
    if(ShoppingLists.length > 0){
      for (let item of ShoppingLists) {
        $("#ShoppingLists").append("<li><a href='ShoppingListItems.html' data-transition='slide'>"
        + item + "</a></li>");
      }
    }
    else {
      $( "#ShoppingLists" ).append("<center><li style='color:red'>There are currently" +
      " no shopping lists.<li></center>");
    }
  }
  else {
    $( "#ShoppingLists" ).append("<center><li style='color:red'>There are currently" +
    " no shopping lists.<li></center>");
  }
}
/*
* retrieve shopping list items and display them to the user
*/
function retrieveShoppingListItems(){
  var chosenList = localStorage.getItem("chosenList");
  $("#ShoppingListItemsHeading").html(chosenList);
  var shoppingList = JSON.parse(localStorage.getItem(chosenList));
  if (shoppingList.length > 0){
    shoppingList = convertObjArrayToItemArray(shoppingList);
    for (var i = 0; i < shoppingList.length; i++){
      $("#ShoppingListItems").append("<li data-icon='delete'><a href='#'>"
      + shoppingList[i].name + "  <span class='ui-li-count'>Quantity: "
      + shoppingList[i].quantity +"</span></a></li>");
    }
  }
  else{
    $("#ShoppingListItems").append("<center><li style='color:red'>There are currently" +
    " no items to buy.<li></center>");
  }
}

/*
* when the array is retrieved from localStorage, the objects in it are retrieved
* as normal objects. This function converts every object back to the custom type
* item.
*/
function convertObjArrayToItemArray(objArray){
  var tempItem = null;
  var tempItemList = [];
  for (var i = 0; i < objArray.length; i++){
    var tempItem = new Item(objArray[i].name, objArray[i].quantity);
    tempItemList.push(tempItem);
  }
  return tempItemList;
}

/*
* retrieve the shopping and bought items lists from the local storage,
* compare the clicked item with the shopping list and remove it from that
* list and add it to the bought items list
*/
function boughtItem(BoughtItem){
  var chosenBoughtList = localStorage.getItem("chosenBoughtList");
  var boughtList = localStorage.getItem(chosenBoughtList);
  if(boughtList == null){
    boughtList = [];
  }
  else{
    boughtList = JSON.parse(boughtList);
    boughtList = convertObjArrayToItemArray(boughtList);
  }
  var chosenList = localStorage.getItem("chosenList");
  var shoppingList = localStorage.getItem(chosenList);
  if(shoppingList != null){
    shoppingList = JSON.parse(shoppingList);
    shoppingList = convertObjArrayToItemArray(shoppingList);
  }
  for (var i = 0; i < shoppingList.length; i++){
    if(BoughtItem[0] == shoppingList[i].name){
      var tempBoughtItem = shoppingList[i];
      shoppingList.splice(i, 1);
      boughtList.push(tempBoughtItem);
    }
  }
  localStorage.setItem(chosenBoughtList, JSON.stringify(boughtList));
  localStorage.setItem(chosenList, JSON.stringify(shoppingList));
}

/*
* retrieve the shopping and bought items lists from the local storage,
* compare the clicked item with the bought items list and remove it from that
* list and add it back to the shopping items list
*/
function untickItem(UntickItem){
  var chosenBoughtList = localStorage.getItem("chosenBoughtList");
  var boughtList = localStorage.getItem(chosenBoughtList);
  if(boughtList == null){
    boughtList = [];
  }
  else{
    boughtList = JSON.parse(boughtList);
    boughtList = convertObjArrayToItemArray(boughtList);
  }
  var chosenList = localStorage.getItem("chosenList");
  var shoppingList = localStorage.getItem(chosenList);
  if(shoppingList != null){
    shoppingList = JSON.parse(shoppingList);
    shoppingList = convertObjArrayToItemArray(shoppingList);
  }
  for (var i = 0; i < boughtList.length; i++){
    if(UntickItem[0] == boughtList[i].name){
      var tempUntickItem = boughtList[i];
      boughtList.splice(i, 1);
      shoppingList.push(tempUntickItem);
    }
  }
  localStorage.setItem(chosenBoughtList, JSON.stringify(boughtList));
  localStorage.setItem(chosenList, JSON.stringify(shoppingList));
}

/*
* retrieve the bought items list and display it to the user.
*/
function retrieveBoughtShoppingListItems(){
  var chosenBoughtList = localStorage.getItem("chosenBoughtList");
  var boughtList = localStorage.getItem(chosenBoughtList);
  if(boughtList != null){
    boughtList = JSON.parse(boughtList);
    for (var i =0; i < boughtList.length; i++){
      $("#BoughtItemsList").append("<li data-icon='delete'><a href='#'>"
      + boughtList[i].name + "  <span class='ui-li-count'>Quantity: "
      + boughtList[i].quantity +"</span></a></li>");
    }
  }
}
