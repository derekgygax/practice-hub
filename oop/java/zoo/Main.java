package zoo;

import zoo.exceptions.*;
import zoo.models.Zoo;
import zoo.models.animal.Animal;

import java.util.ArrayList;
import java.util.List;

/*

Zoo Animal Management System

Create an animal enclosure.
    If the enclosure already exists, return -1.

Add animals to an enclosure.
    Each animal has a name, species, and age.
    If the enclosure doesn't exist, return -1.
    If the species is incompatible with the enclosure (e.g., a lion in a bird enclosure), return -1.

Transfer animals between enclosures.
    If either enclosure doesn’t exist, return -1.
    If the species is incompatible with the target enclosure, return -1.

Feed animals in an enclosure.
    Provide a food type and quantity.
    If the food type is incompatible with the species in the enclosure, return -1.
    Deduct the food from the zoo’s food inventory.


Generate a daily activity report.
    List each enclosure, the animals it contains, and the total food consumed by that enclosure.

Find the n oldest animals in the zoo.

If two animals are the same age, sort them alphabetically by name.

 */

public class Main {


    public static void main(String[] args) {
        String[][] inputs = {
                {"CREATE_ENCLOSURE", "Savanna", "20"},
                {"CREATE_ENCLOSURE", "Jungle", "15"},
                {"CREATE_ENCLOSURE", "Aquarium", "10"},
                {"CREATE_ENCLOSURE", "BirdHouse", "25"},
                {"CREATE_STORAGE_UNIT", "freezer", "1000"},
                {"CREATE_STORAGE_UNIT", "dry_storage", "1500"},
                {"CREATE_STORAGE_UNIT", "refrigerator", "500"},
                {"CREATE_STORAGE_UNIT", "small_storage", "200"},
                {"CREATE_STORAGE_UNIT", "cave", "200"},
                {"ADD_ANIMAL", "Savanna", "Lion", "Leo", "5"},
                {"ADD_ANIMAL", "Jungle", "Tiger", "Tina", "4"},
                {"ADD_ANIMAL", "Aquarium", "Shark", "Jaws", "8"},
                {"ADD_ANIMAL", "BirdHouse", "Parrot", "Polly", "2"},
                {"ADD_ANIMAL", "Savanna", "Elephant", "Dumbo", "10"},
                {"ADD_ANIMAL", "Jungle", "Monkey", "George", "3"},
                {"TRANSFER_ANIMAL", "Savanna", "Jungle", "Leo"},  // Error: incompatible species
                {"TRANSFER_ANIMAL", "Jungle", "Savanna", "Tina"},  // Error: incompatible species
                {"TRANSFER_ANIMAL", "BirdHouse", "Aquarium", "Polly"},  // Error: incompatible species
                {"TRANSFER_ANIMAL", "Jungle", "BirdHouse", "George"},  // Error: incompatible species
                {"LOAD_STORAGE", "MEAT", "100"},
                {"LOAD_STORAGE", "FISH", "200"},
                {"LOAD_STORAGE", "SEEDS", "150"},
                {"LOAD_STORAGE", "GRASS", "300"},
                {"LOAD_STORAGE", "FLIES", "50"},
                {"LOAD_STORAGE", "MICE", "75"},
                {"LOAD_STORAGE", "HONEY", "25"},
                {"LOAD_STORAGE", "LEAVES", "400"},
                {"LOAD_STORAGE", "MEAT", "50"},
                {"LOAD_STORAGE", "FISH", "100"},
                {"FEED_ANIMAL", "Leo", "Meat", "5"},
                {"FEED_ANIMAL", "Jaws", "Fish", "10"},
                {"FEED_ANIMAL", "Polly", "Seeds", "3"},
                {"FEED_ANIMAL", "Dumbo", "Grass", "15"},
                {"CREATE_ENCLOSURE", "Desert", "10"},
                {"CREATE_ENCLOSURE", "Polar", "6"},
                {"ADD_ANIMAL", "Desert", "Camel", "Cammie", "6"},
                {"ADD_ANIMAL", "Desert", "Snake", "Slither", "2"},
                {"CREATE_ENCLOSURE", "Atlantean", "100"},
                {"TRANSFER_ANIMAL", "Desert", "Savanna", "Cammie"},
                {"TRANSFER_ANIMAL", "Savanna", "Desert", "Dumbo"},  // Error: incompatible species
                {"ADD_ANIMAL", "Jungle", "Panther", "Bagheera", "7"},
                {"ADD_ANIMAL", "Rainforest", "Panther", "kitty", "7"},
                {"FEED_ANIMAL", "Bagheera", "Meat", "5"},
                {"TRANSFER_ANIMAL", "Jungle", "Aquarium", "Bagheera"},  // Error: incompatible species
                {"TRANSFER_ANIMAL", "Aquarium", "Savanna", "Jaws"},  // Error: incompatible species
                {"CREATE_ENCLOSURE", "Mountain", "8"},
                {"ADD_ANIMAL", "Mountain", "Goat", "Billy", "4"},
                {"ADD_ANIMAL", "Mountain", "Bear", "Baloo", "6"},
                {"FEED_ANIMAL", "Baloo", "Honey", "10"},
                {"TRANSFER_ANIMAL", "Mountain", "Savanna", "Billy"},  // Error: incompatible species
                {"TRANSFER_ANIMAL", "BirdHouse", "Savanna", "Polly"},  // Error: incompatible species
                {"CREATE_ENCLOSURE", "Rainforest", "12"},
                {"ADD_ANIMAL", "Rainforest", "Frog", "Ribbit", "1"},
                {"ADD_ANIMAL", "Rainforest", "Snake", "Slinky", "3"},
                {"TRANSFER_ANIMAL", "Rainforest", "Jungle", "Ribbit"},  // Error: incompatible species
                {"FEED_ANIMAL", "Ribbit", "Flies", "2"},
                {"FEED_ANIMAL", "Slither", "Mice", "3"},
                {"CREATE_ENCLOSURE", "Polar", "6"},
                {"TOP_OLDEST_ANIMALS", "3"},
                {"ADD_ANIMAL", "Polar", "Penguin", "Penny", "4"},
                {"ADD_ANIMAL", "Polar", "PolarBear", "Ice", "9"},
                {"TRANSFER_ANIMAL", "Polar", "Mountain", "Ice"},  // Error: incompatible species
                {"FEED_ANIMAL", "Ice", "Fish", "15"},
                {"FEED_ANIMAL", "Penny", "Fish", "5"},
                {"ADD_ANIMAL", "Savanna", "Giraffe", "Stretch", "8"},
                {"ADD_ANIMAL", "Jungle", "Leopard", "Spots", "6"},
                {"ADD_ANIMAL", "Aquarium", "Octopus", "Tentacle", "2"},
                {"TRANSFER_ANIMAL", "Aquarium", "Polar", "Tentacle"},  // Error: incompatible species
                {"FEED_ANIMAL", "Tentacle", "Fish", "3"},
                {"FEED_ANIMAL", "Stretch", "Leaves", "5"},
                {"TRANSFER_ANIMAL", "Jungle", "Savanna", "Spots"},  // Error: incompatible species
                {"TRANSFER_ANIMAL", "Polar", "Aquarium", "Penny"},  // Error: incompatible species
                {"TRANSFER_ANIMAL", "Savanna", "Jungle", "Dumbo"},  // Error: incompatible species
                {"ADD_ANIMAL", "BirdHouse", "Eagle", "Soar", "3"},
                {"FEED_ANIMAL", "Soar", "Meat", "5"},
                {"TRANSFER_ANIMAL", "BirdHouse", "Mountain", "Soar"},  // Error: incompatible species
                {"FEED_ANIMAL", "Billy", "Grass", "7"},
                {"TOP_OLDEST_ANIMALS", "5"},
                {"ADD_ANIMAL", "Desert", "Lizard", "Speedy", "1"},
                {"FEED_ANIMAL", "Speedy", "Insects", "2"},
                {"TRANSFER_ANIMAL", "Desert", "Rainforest", "Slither"},  // Error: incompatible species
                {"TOP_OLDEST_ANIMALS", "10"},
                {"TRANSFER_ANIMAL", "Polar", "Jungle", "Ice"},  // Error: incompatible species
                {"ADD_ANIMAL", "Polar", "Seal", "Splash", "3"},
                {"ADD_ANIMAL", "Desert", "Seal", "Dudder", "3"},
                {"FEED_ANIMAL", "Splash", "Fish", "7"},
                {"ADD_ANIMAL", "Savanna", "Zebra", "Stripes", "4"},
                {"FEED_ANIMAL", "Stripes", "Grass", "10"},
                {"TRANSFER_ANIMAL", "Savanna", "Polar", "Stretch"},  // Error: incompatible species
                {"TRANSFER_ANIMAL", "Polar", "Savanna", "Splash"},  // Error: incompatible species
                {"TOP_OLDEST_ANIMALS", "7"}
        };

        Zoo zoo = new Zoo("Washington DC");
        for (String[] input: inputs) {
            try {
                String action = input[0];
                switch (action) {
                    case "CREATE_ENCLOSURE" -> {
                        zoo.createEnclosure(input[1], Integer.parseInt(input[2]));
                    }
                    case "CREATE_STORAGE_UNIT" -> {
                        zoo.createStorageUnit(input[1], Integer.parseInt(input[2]));
                    }
                    case "LOAD_STORAGE" -> {
                        zoo.loadStorage(input[1], Integer.parseInt(input[2]));
                    }
                    case "ADD_ANIMAL" -> {
                        zoo.addAnimal(input[1], input[2], input[3], Integer.parseInt(input[4]));
                    }
                    case "TRANSFER_ANIMAL" -> {
                       zoo.transferAnimal(input[1], input[2], input[3]);
                    }
                    case "FEED_ANIMAL" -> {
                        zoo.feedAnimal(input[1], input[2], Integer.parseInt(input[3]));
                    }
                    case "TOP_OLDEST_ANIMALS" -> {
                        List<Animal> oldestAnimals = zoo.getOldestAnimals(Integer.parseInt(input[1]));
                        System.out.println(oldestAnimals);
                    }
                }
            } catch (AnimalCantEat bf) {
                System.err.println("BAD FOOD: " + bf.getMessage());
            } catch (AnimalIncompatibleWithEnclosure bh) {
                System.err.println("BAD HOUSE: " + bh.getMessage());
            } catch (SpecieDoesntExist sde) {
                System.err.println("SPECIE DOESN'T EXIST: " + sde.getMessage());
            } catch (EnclosureTypeDoesntExist etde) {
                System.err.println("ENCLOSURE TYPE DOESN'T EXIST: " + etde.getMessage());
            } catch (EnclosureNotBuilt enb) {
                System.err.println("ENCLOSURE NOT BUILT: " + enb.getMessage());
            } catch (EnclosureAlreadyExists ee) {
                System.err.println("ENCLOSURE EXISTS: " + ee.getMessage());
            } catch (Exception err) {
                System.err.println("OTHER ERROR: " + err.getMessage());
            }
        }

        System.out.println(zoo);

    }
}
