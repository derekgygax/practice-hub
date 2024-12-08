package zoo.models;

import zoo.enums.EnclosureType;
import zoo.exceptions.AnimalIncompatibleWithEnclosure;
import zoo.exceptions.AnimalNotInEnclosure;
import zoo.models.animal.Animal;

import java.util.HashSet;
import java.util.UUID;

public class Enclosure {
    private final UUID id;
    private EnclosureType type;
    private HashSet<UUID> animals;
    private int maxCapacity;

    public Enclosure(EnclosureType type, int maxCapacity) {
        this.id = UUID.randomUUID();
        this.type = type;
        this.animals = new HashSet<>();
        this.maxCapacity = maxCapacity;
    }

    public void ensureAnimalCompatibility(Animal animal) throws AnimalIncompatibleWithEnclosure {
        if (!this.type.isSpecieCompatible(animal.getSpecie())) {
            throw new AnimalIncompatibleWithEnclosure( animal.getName() + " the " + animal.getSpecie().toString()+" cannot be in an enclosure of type " + this.type.toString());
        }
    }

    public void addAnimal(Animal animal) throws AnimalIncompatibleWithEnclosure {
        this.ensureAnimalCompatibility(animal);
        this.animals.add(animal.getId());
    }

    public void removeAnimal(Animal animal) throws AnimalNotInEnclosure {
        if (!this.animals.contains(animal.getId())) {
            throw new AnimalNotInEnclosure(animal.getName() + " does not exist in the enclosure " + this.type);
        }
        this.animals.remove(animal.getId());
    }


    public UUID getId() {
        return id;
    }

    public EnclosureType getType() {
        return type;
    }

    public HashSet<UUID> getAnimals() {
        return animals;
    }

    @Override
    public String toString() {
        return "Enclosure{" +
                "id=" + id +
                ", type=" + type +
                ", animals=" + animals +
                '}';
    }
}
