class Inventory {
  constructor() {
    this.items = {};
  }

  addItem(name, quantity) {
    if (this.items[name]) {
      this.items[name] += quantity;
    } else {
      this.items[name] = quantity;
    }
  }

  removeItem(name, quantity) {
    if (!this.items[name]) return `Error: ${name} not found in inventory`;

    if (this.items[name] < quantity) {
      console.log(`Warning: Not enough ${name} in stock. Removing what is available.`);
    }

    this.items[name] -= quantity;

    if (this.items[name] === 0) {
      delete name;
    }
  }

  getTotalItems() {
    return Object.values(this.items).reduce((total, count) => total + count);
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
