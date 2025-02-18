class Inventory {
  constructor() {
    this.items = {};
  }

  addItem(name, quantity) {
    if (!(name in this.items)) {
      this.items[name] = 0
    }
    this.items[name] += quantity;
  }

  removeItem(name, quantity) {
    if (!(name in this.items)) {
      console.log(`Error: ${name} not found in inventory`)
      return;
    };

    if (this.items[name] < quantity) {
      console.log(`Warning: Not enough ${name} in stock. Removing what is available.`);
    }

    this.items[name] -= quantity;

    if (this.items[name] <= 0) {
      delete this.items[name];
    }
  }

  getTotalItems() {
    return Object.values(this.items).reduce((total, count) => {
      return total + count
    }, 0);
  }

  getStockReport() {
    return Object.entries(this.items).map(([name, qty]) => {
      return `Item: ${name}, Quantity: ${qty}`;
    });
  }
}

// Test Cases
const inventory = new Inventory();
inventory.addItem("apple", 10);
inventory.addItem("banana", 5);
inventory.addItem("apple", 5);
inventory.removeItem("banana", 2);
inventory.removeItem("apple", 20);
inventory.removeItem("orange", 1);

console.log("Total Items:", inventory.getTotalItems());
console.log("Stock Report:", inventory.getStockReport());
