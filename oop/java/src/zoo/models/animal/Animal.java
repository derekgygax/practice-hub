package zoo.models.animal;

import zoo.enums.FoodType;
import zoo.enums.Specie;
import zoo.exceptions.AnimalCantEat;

import java.util.UUID;

// If you made this abstract then you can NOT make an
// instance of it.
//public abstract class Animal {
public class Animal {
    private final UUID id;
    private final Specie specie;
    private String name;
    private int age;

    public Animal(String name, Specie specie, int age) {
        this.id = UUID.randomUUID();
        this.name = name;
        this.specie = specie;
        this.age = age;
    }

    public void makeNoise() {
        System.out.println("NOISEEE!!!");
    }

    // Ensure the animal can eat the food
    // If not throw an error
    public void ensureCanEatFood(String foodTypeString) {
        FoodType foodType = FoodType.getFoodType(foodTypeString);
        this.ensureCanEatFood(foodType);
    }
    public void ensureCanEatFood(FoodType foodType) throws AnimalCantEat {
        if (!this.specie.catEat(foodType)) {
            throw new AnimalCantEat(this.name + " the "+this.specie+" cannot eat " + foodType);
        }
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public UUID getId() {
        return id;
    }

    public Specie getSpecie() {
        return specie;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    @Override
    public String toString() {
        return "Animal{" +
                "name='" + name + '\'' +
                ", specie=" + specie +
                ", age=" + age +
                '}';
    }
}
