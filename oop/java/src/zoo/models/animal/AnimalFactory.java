package zoo.models.animal;

import zoo.enums.Specie;

import java.util.HashMap;
import java.util.Map;

public class AnimalFactory {
    private static final Map<Specie, TriFunction<String, Specie, Integer, Animal>> animalMap = new HashMap<>();

    static {
        animalMap.put(Specie.LION, Lion::new);
        animalMap.put(Specie.SHARK, Shark::new);
        animalMap.put(Specie.TIGER, Tiger::new);
        animalMap.put(Specie.SNAKE, Snake::new);
        animalMap.put(Specie.SEAL, Seal::new);
    }

    private AnimalFactory() {}

    public static Animal createAnimal(String name, Specie specie, int age) {
        TriFunction<String, Specie, Integer, Animal> constructor = animalMap.get(specie);
        if (constructor != null) {
            return constructor.apply(name, specie, age);
        }
        return new Animal(name, specie, age);
    }

}
