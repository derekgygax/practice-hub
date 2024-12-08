package zoo.models.storage;

import zoo.enums.FoodType;
import zoo.enums.StorageType;
import zoo.exceptions.FoodIncompatibleWithStorage;
import zoo.exceptions.NotEnoughFood;
import zoo.exceptions.TooMuchFood;

import java.util.HashMap;
import java.util.UUID;


// TODO This is almost the same as enclosure and animals
// Just deals with foods and storage type ... fuck ... how do you deal
// with that.


public class Unit {
    private final UUID id;
    private final StorageType type;
    private HashMap<FoodType, Integer> foods;
    private final int maxCapacity;

    public Unit(StorageType storageType, int maxCapacity) {
        this.id = UUID.randomUUID();
        this.type = storageType;
        this.foods = new HashMap<>();
        this.maxCapacity = maxCapacity;
    }

    // Check to ensure the food is allowed to be stored in this type of unit
    public void ensureFoodCompatibility(FoodType foodType) throws FoodIncompatibleWithStorage {
        if (!this.type.isFoodCompatible(foodType)) {
            throw new FoodIncompatibleWithStorage("The food "+foodType+" is not allowed in the "+this.type+" storage unit.");
        }
    }

    public int getTotalFoodQuantity() {
        Integer quantity = 0;
        for (Integer amount: this.foods.values()) {
            quantity += amount;
        }
        return quantity;
    }

    public void ensureHasEnoughFood(FoodType foodType, int amountNeeded) throws NotEnoughFood {
        // check this unit can hold that type of food
        this.ensureFoodCompatibility(foodType);

        // get the current amount of that food in the unit
        int currentAmount = this.foods.getOrDefault(foodType, 0);

        if (currentAmount < amountNeeded) {
            throw new NotEnoughFood("The storage does not contain at least "+amountNeeded+" " + foodType);
        }
    }

    // Add food to the unit
    // Error out if the unit can't hold that much food
    public void addFood(FoodType foodType, int newAmount) throws TooMuchFood {
        // check this unit can hold that type of food
        this.ensureFoodCompatibility(foodType);

        // Get quantity of food in the unit right now
        int currentQuantity = this.getTotalFoodQuantity();

        // Check if the unit has space to hold that addition of food
        if ((currentQuantity + newAmount) > this.maxCapacity)  {
            throw new TooMuchFood("The "+this.type+" storage unit cannot hold "+newAmount+" new " + foodType);
        }

        // add the food
        Integer currentAmount = this.foods.getOrDefault(foodType, 0);
        this.foods.put(foodType, (currentAmount + newAmount));
    }

    // Remove the food from the storage unit
    public void removeFood(FoodType foodType, int amount) {
        // Ensure enough food exists to be removed
        this.ensureHasEnoughFood(foodType, amount);

        // If there is enough food then remove it
        this.foods.put(foodType, (this.foods.get(foodType) - amount));
    }

    public UUID getId() {
        return id;
    }

    public StorageType getType() {
        return type;
    }

    public int getMaxCapicity() {
        return maxCapacity;
    }
}
