package zoo.enums;

import zoo.exceptions.SpecieDoesntExist;

import java.util.Set;

public enum Specie {
    LION(Set.of(FoodType.MEAT)),
    TIGER(Set.of(FoodType.MEAT)),
    SHARK(Set.of(FoodType.FISH)),
    PARROT(Set.of(FoodType.SEEDS)),
    ELEPHANT(Set.of(FoodType.GRASS, FoodType.LEAVES)),
    MONKEY(Set.of(FoodType.SEEDS, FoodType.FRUITS)), // Optional addition if FRUITS exist
    CAMEL(Set.of(FoodType.GRASS, FoodType.LEAVES)),
    SNAKE(Set.of(FoodType.MICE)),
    PANTHER(Set.of(FoodType.MEAT)),
    GOAT(Set.of(FoodType.GRASS, FoodType.LEAVES)),
    BEAR(Set.of(FoodType.MEAT, FoodType.HONEY)),
    FROG(Set.of(FoodType.FLIES)),
    POLARBEAR(Set.of(FoodType.MEAT, FoodType.FISH)),
    PENGUIN(Set.of(FoodType.FISH)),
    GIRAFFE(Set.of(FoodType.LEAVES)),
    LEOPARD(Set.of(FoodType.MEAT)),
    OCTOPUS(Set.of(FoodType.FISH)),
    EAGLE(Set.of(FoodType.MEAT)),
    LIZARD(Set.of(FoodType.FLIES, FoodType.MICE)),
    SEAL(Set.of(FoodType.FISH)),
    ZEBRA(Set.of(FoodType.GRASS, FoodType.LEAVES));

    private final Set<FoodType> compatibleFoods;

    Specie(Set<FoodType> compatibleFoods) {
        this.compatibleFoods = compatibleFoods;
    }


    public static Specie getSpecie(String type) throws SpecieDoesntExist {
        try {
            return Specie.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new SpecieDoesntExist("The species type " +type+ " cannot exist at this zoo.");
        }
    }

    // Can that species of animal eat that type of food
    public boolean catEat(FoodType foodType) {
        return compatibleFoods.contains(foodType);
    }
}
