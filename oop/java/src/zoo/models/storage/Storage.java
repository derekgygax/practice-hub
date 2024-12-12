package zoo.models.storage;

import zoo.enums.FoodType;
import zoo.enums.StorageType;
import zoo.exceptions.NotEnoughFood;
import zoo.exceptions.StorageAlreadyExists;
import zoo.exceptions.StorageTypeDoesntExist;

import java.util.HashMap;
import java.util.UUID;

// REMEMBER: There i only 1 copy of each type of storage unit
//      We can add multiple another time
// REMEMBER: all foods types can only go in one unit
public class Storage {
    private final UUID id;
    private HashMap<StorageType, Unit> units;

    public Storage() {
        this.id = UUID.randomUUID();
        this.units = new HashMap<>();
    }

    public Unit getUnit(FoodType foodType) throws StorageTypeDoesntExist{
        // get the storage type that holds that food type
        StorageType storageType = StorageType.getStorageType(foodType);

        // Get the storage unit for that type. error out if it isn't built
        Unit unit = this.units.get(storageType);
        if (unit == null) {
            throw new StorageTypeDoesntExist("The "+storageType+" storage has not been built yet.");
        }

        return unit;
    }

    // Build the storage unit
    // If passed a string covert to a type and then pass to other function
    public void buildUnit(String storageTypeString, int maxCapacity) {
        StorageType storageType = StorageType.getStorageType(storageTypeString);
        this.buildUnit(storageType, maxCapacity);
    }
    // But the storage unit based on the type.
    // If that type of unit already exists then error out
    // Only one copy of each type is allowed
    public void buildUnit(StorageType storageType, int maxCapacity) throws StorageAlreadyExists {
        // if the unit already exists don't build it again
        if (this.units.containsKey(storageType)) {
            throw new StorageAlreadyExists("The zoo already have the "+storageType+" storage room.");
        }

        // Build the unit
        Unit unit = new Unit(storageType, maxCapacity);
        this.units.put(storageType, unit);
    }

    // Convert the food type string to an actual food type
    public void loadFood(String foodTypeString, int amount) {
        FoodType foodType = FoodType.getFoodType(foodTypeString);
        this.loadFood(foodType, amount);
    }
    // Load the food in the unit.
    // Error out if:
    //      There is no storage unit for that kind of food
    //      The storage unit for that food has not been built yet
    public void loadFood(FoodType foodType, int amount) {
        // Get the storage unit for that type. error out if it isn't built
        Unit unit = this.getUnit(foodType);

        // Add the food to the unit.
        // ONLY add if it fits OR add NONE. we can do partials later
        unit.addFood(foodType, amount);
    }

    public void ensureHasEnoughFood(String foodTypeString, int amount) {
        FoodType foodType = FoodType.getFoodType(foodTypeString);
        this.ensureHasEnoughFood(foodType, amount);
    }
    public void ensureHasEnoughFood(FoodType foodType, int amount) {
        // Get the unit with that food
        Unit unit = this.getUnit(foodType);

        // Check if the unit has the food and amount needed
        this.ensureHasEnoughFood(unit, foodType, amount);
    }
    public void ensureHasEnoughFood(Unit unit, FoodType foodType, int amount) {
        // Check if the unit has the food and amount needed
        unit.ensureHasEnoughFood(foodType, amount);
    }

    // Remove the food from the storage
    // Throw error if:
    //      That type of food doesn't exist
    //      That food
    public void removeFood(String foodTypeString, int amount) {
        FoodType foodType = FoodType.getFoodType(foodTypeString);
        this.removeFood(foodType, amount);
    }
    public void removeFood(FoodType foodType, int amount) {
        // Get the unit and ensure enough food exists in the storage to remove it
        // This is done already but do again in case this method is called somewhere else
        // This throws an error if there isn't enough food
        Unit unit = this.getUnit(foodType);
        this.ensureHasEnoughFood(unit, foodType, amount);

        // If there is enough food to remove it. THEN remove it
        unit.removeFood(foodType, amount);

    }
}
