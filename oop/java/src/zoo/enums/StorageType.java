package zoo.enums;

import zoo.exceptions.NoStorageForThatFood;
import zoo.exceptions.StorageTypeDoesntExist;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

// TODO this is assuming the each type of food can only be in one storage spot
public enum StorageType {
    FREEZER(Set.of(FoodType.MEAT, FoodType.FISH)),
    DRY_STORAGE(Set.of(FoodType.SEEDS, FoodType.GRASS)),
    REFRIGERATOR(Set.of(FoodType.HONEY, FoodType.LEAVES, FoodType.FRUITS)),
    SMALL_STORAGE(Set.of(FoodType.FLIES, FoodType.MICE));

    private final Set<FoodType> compatibleFoods;
    private static final Map<FoodType, StorageType> foodStorageMap = new HashMap<>();

    // Initialized the map to reference which storageType is used for each foodType
    // THIS IS HOW YOU LOAD AT THE VERY BEGINNING IN JAVA
    static {
        for (StorageType storageType: StorageType.values()) {
            for (FoodType foodType: storageType.compatibleFoods) {
                foodStorageMap.put(foodType, storageType);
            }
        }
    }

    StorageType(Set<FoodType> compatibleFoods) {
        this.compatibleFoods = compatibleFoods;
    }

    public static StorageType getStorageType(String storageType) {
        try {
            return StorageType.valueOf(storageType.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new StorageTypeDoesntExist("The storage type " + storageType + " does not exist");
        }
    }

    public static StorageType getStorageType(FoodType foodType) throws NoStorageForThatFood {
        StorageType storageType = foodStorageMap.get(foodType);
        if (storageType == null) {
            throw new NoStorageForThatFood("There is no storage unit for " + foodType);
        }
        return storageType;
    }

    public boolean isFoodCompatible(FoodType foodType) {
        return compatibleFoods.contains(foodType);
    }

}
