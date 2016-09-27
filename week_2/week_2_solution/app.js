(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


// Controllers //
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyCtrl = this;

  toBuyCtrl.items = ShoppingListCheckOffService.getItemsToBuy();

  toBuyCtrl.checkOffItem = function (itemIndex) {
    // Make sure the following is always atomic..
    var item = toBuyCtrl.items[itemIndex];
    ShoppingListCheckOffService.addItemAlreadyBought(item.name, item.quantity);
    ShoppingListCheckOffService.removeItemToBuy(itemIndex);

  }

  toBuyCtrl.getNumberOfItems = function () {
    return ShoppingListCheckOffService.getItemsToBuy().length;
  };

}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBoughtCtrl = this;

  alreadyBoughtCtrl.items = ShoppingListCheckOffService.getItemsAlreadyBought();

  alreadyBoughtCtrl.addItemAlreadyBought = function(item) {
    service.addItemAlreadyBought(item.name, item.quantity);
  }

  alreadyBoughtCtrl.getNumberOfItems = function () {
    return ShoppingListCheckOffService.getItemsAlreadyBought().length;
  };

}

// Services //
function ShoppingListCheckOffService() {
  var service = this;

  // Two lists of shopping items 1) 'to buy', and 2) 'already bought'
  var to_buy_items = [
    {name: "cookies", quantity: 10},
    {name: "cookies", quantity: 100},
    {name: "cookies", quantity: 1000},
    {name: "cookies", quantity: 10000},
    {name: "cookies", quantity: 100000}
  ];
  var already_bought_items = [];

  // These methods manage the 'to buy' list.
  service.addItemToBuy = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    to_buy_items.push(item);
  };

  service.removeItemToBuy = function (itemIndex) {
    to_buy_items.splice(itemIndex, 1);
  };

  service.getItemsToBuy = function () {
    return to_buy_items;
  };



  // These methods manage the 'already bought' list.
  service.addItemAlreadyBought = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    already_bought_items.push(item);
  };

  service.removeItemAlreadyBought = function (itemIndex) {
    already_bought_items.splice(itemIndex, 1);
  };

  service.getItemsAlreadyBought = function () {
    return already_bought_items;
  };

  service.getNumberOfItemsAlreadyBought = function () {
    return already_bought_items.length;
  };
}

})();
