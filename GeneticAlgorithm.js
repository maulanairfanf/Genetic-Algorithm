var Item = function(name, survivalPoints, weight) {
    this.name = name;
    this.survivalPoints = survivalPoints;
    this.weight = weight;
  }

var items = [];
items.push(new Item("pocketknife", 10.00, 1.00));
items.push(new Item("beans", 20.00, 5.00));
items.push(new Item("potatoes", 15.00, 10.00));
items.push(new Item("unions", 2.00, 1.00));
items.push(new Item("sleeping bag", 30.00, 7.00));
items.push(new Item("rope", 10.00, 5.00));
items.push(new Item("compass", 30.00, 1.00));

console.log(items)