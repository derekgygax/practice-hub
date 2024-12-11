package zoo.models;

import zoo.enums.EnclosureType;
import zoo.enums.Specie;
import zoo.exceptions.AnimalDoesntExist;
import zoo.exceptions.EnclosureAlreadyExists;
import zoo.exceptions.EnclosureNotBuilt;
import zoo.models.animal.Animal;
import zoo.models.animal.AnimalFactory;
import zoo.models.storage.Storage;

import java.util.*;

public class Zoo {
    private final String name;
    private final HashMap<EnclosureType, Enclosure> enclosures;
    private final Storage foodStore;
    // Assuming the names each animal are unique within the zoo
    private final HashMap<String, Animal> animals;

    public Zoo(String name) {
        this.name = name;
        this.enclosures = new HashMap<>();
        this.foodStore = new Storage();
        this.animals = new HashMap<>();
    }

    private Animal getAnimal(String name) throws AnimalDoesntExist {
        Animal animal = this.animals.get(name);
        if (animal == null) {
            throw new AnimalDoesntExist("The "+this.name+" zoo does not have the animal "+ name + ".");
        }
        return animal;
    }

    // get the enclosure by passing in the enclosure type as a string
    // convert to the enum type and go to the other function
    private Enclosure getEnclosure(String etString) {
        EnclosureType enclosureType = EnclosureType.getEnclosureType(etString);
        return this.getEnclosure(enclosureType);
    }

    // Get the enclosure, pass in the actual enum type
    private Enclosure getEnclosure(EnclosureType et) throws EnclosureNotBuilt{
        Enclosure enclosure = this.enclosures.get(et);
        if (enclosure == null) {
            throw new EnclosureNotBuilt("The enclosure "+et+" has not been built in the "+this.name+" zoo yet.");
        }
        return enclosure;
    }

    // Each zoo can only have one enclosure of each type right now
    public void createEnclosure(String enclosureTypeString, int maxCapacity) throws EnclosureAlreadyExists {
        // get the enclosure type
        EnclosureType enclosureType = EnclosureType.getEnclosureType(enclosureTypeString);

        // if enclosure already exists then throw error
        if (enclosures.containsKey(enclosureType)) {
            throw new EnclosureAlreadyExists("An enclosure of type "+enclosureType+" already exists in the "+this.name+" zoo.");
        }

        // create the enclosure and store it
        Enclosure enclosure = new Enclosure(enclosureType, maxCapacity);
        this.enclosures.put(enclosureType, enclosure);
    }

    public void addAnimal(String enclosureString, String specieString, String name, int age) {
        // Get the enclosure
        Enclosure enclosure = this.getEnclosure(enclosureString);

        // get animal specie
        Specie specie = Specie.getSpecie(specieString);

        // build the animal
        Animal animal = AnimalFactory.createAnimal(name, specie, age);

        // ensure animal compatibility with enclosure
        enclosure.ensureAnimalCompatibility(animal);

        // put animal in enclosure
        enclosure.addAnimal(animal);

        // TODO you did this here AFTER you did the step above but that could be misleading based on whats written
        this.animals.put(animal.getName(), animal);
    }

    public void transferAnimal(String enclosureFrom, String enclosureTo, String animalName) {

        // get the two enclosures
        Enclosure ec1 = this.getEnclosure(enclosureFrom);
        Enclosure ec2 = this.getEnclosure(enclosureTo);

        // Identify the animal
        Animal animal = this.getAnimal(animalName);

        // validate animal can be put in enclosure it's going to
        // this will throw an error
        ec2.ensureAnimalCompatibility(animal);

        // transfer animal
        // I check ensureAnimalCompatibility previously and then AGAIN in addAnimal
        // So I am nervous I would maybe need a rollback here but for now stop wasting time
        ec1.removeAnimal(animal);
        ec2.addAnimal(animal);

    }

    // Create the storage unit. Go to the Storage class and build the unit
    public void createStorageUnit(String storageType, int maxCapacity) {
        this.foodStore.buildUnit(storageType, maxCapacity);
    }

    // Load the storage with food
    public void loadStorage(String foodString, int amount) {
        this.foodStore.loadFood(foodString, amount);
    }

    // TODO: maybe should convert the string to the foodType here
    public void feedAnimal(String animalName, String foodTypeString, int amount) {
        // Get the animal. Throws error if animal doesn't exist
        Animal animal = this.getAnimal(animalName);

        // Check the animal can eat that kind of food
        animal.ensureCanEatFood(foodTypeString);

        // Check the food and that amount exists in storage
        // An error is thrown if it does NOT have enough of that kind of food
        this.foodStore.ensureHasEnoughFood(foodTypeString, amount);

        // Now we know that the animal can eat that food and that we have enough food
        // Currently nothing happens to the animal SO we will just remove the food from the storage
        this.foodStore.removeFood(foodTypeString, amount);
    }

    public List<Animal> getOldestAnimals(int numAnimals) {
        ArrayList<Animal> animals = new ArrayList<Animal>(this.animals.values());
//        When explicitly defining
//        animals.sort(Comparator.comparingInt((Animal animal) -> {
//            return animal.getAge();
//        }).reversed().thenComparing((Animal animal) -> {
//            return animal.getName();
//        }));
        animals.sort(Comparator.comparingInt(Animal::getAge).reversed().thenComparing(Animal::getName));

        return animals.subList(0, Math.min(numAnimals, animals.size()));
    }

    @Override
    public String toString() {
        return "Zoo{" +
                "name='" + name + '\'' +
                ",\n enclosures=" + enclosures.keySet() +
                ",\n animal=" + animals +
                '}';
    }
}
