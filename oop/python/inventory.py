# Inventory Management System
# Description:
# Design an inventory management system for a warehouse. It needs to be able to perform the following operations:

# Add Item:

# Add a new item to the warehouse with a unique SKU (Stock Keeping Unit).
# If the item already exists, increase the available quantity.
# Remove Item:

# Remove a specific quantity of an item by its SKU.
# If the item does not exist or the quantity to remove exceeds the available quantity, error out.
# Ship Item:

# Ship a specific quantity of an item by its SKU.
# If the item does not exist or there is insufficient quantity, error out.
# Decrease the available quantity accordingly.
# Restock Item:

# Restock a specific quantity of an item by its SKU.
# If the item does not exist, error out.
# Find Most Shipped Items:

# Return the top n items that have been shipped the most times.
# If two items have the same shipment count, return them alphabetically by name.
# Example Operations:

# Add Item: ["ADD_ITEM", "SKU123", "Item1", 100]
# Remove Item: ["REMOVE_ITEM", "SKU123", 50]
# Ship Item: ["SHIP_ITEM", "SKU123", 20]
# Restock Item: ["RESTOCK_ITEM", "SKU123", 30]
# Find Most Shipped Items: ["TOP_SHIPPED_ITEMS", 5]

