package zoo.enums;

import zoo.exceptions.FoodTypeDoesntExist;

public enum FoodType {
    MEAT,
    FISH,
    SEEDS,
    FRUITS,
    GRASS,
    FLIES,
    MICE,
    HONEY,
    LEAVES;

    public static FoodType getFoodType(String type) throws FoodTypeDoesntExist {
        try {
            return FoodType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new FoodTypeDoesntExist("The food type " +type+ " cannot be stored at this zoo.");
        }
    }
}
