package zoo.enums;

import zoo.exceptions.EnclosureTypeDoesntExist;

import java.util.Set;

public enum EnclosureType {
    SAVANNA(Set.of(Specie.LION, Specie.ELEPHANT, Specie.GIRAFFE, Specie.ZEBRA)),
    JUNGLE(Set.of(Specie.TIGER, Specie.MONKEY, Specie.PANTHER, Specie.LEOPARD)),
    AQUARIUM(Set.of(Specie.SHARK, Specie.OCTOPUS, Specie.SEAL)),
    BIRDHOUSE(Set.of(Specie.PARROT, Specie.EAGLE)),
    DESERT(Set.of(Specie.CAMEL, Specie.LIZARD, Specie.SNAKE)),
    MOUNTAIN(Set.of(Specie.GOAT, Specie.BEAR)),
    RAINFOREST(Set.of(Specie.FROG, Specie.SNAKE)),
    POLAR(Set.of(Specie.POLARBEAR, Specie.PENGUIN, Specie.SEAL));

    private final Set<Specie> compatibleSpecies;

    EnclosureType(Set<Specie> compatibleSpecies) {
        this.compatibleSpecies = compatibleSpecies;
    }

    // This is for the general EnclosureType
    // Get the actual enclosure type based on what they passed in
    public static EnclosureType getEnclosureType(String type) throws EnclosureTypeDoesntExist {
        try {
            return EnclosureType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new EnclosureTypeDoesntExist("The enclosure of type " + type + " does not exist in this zoo.");
        }
    }

    // The below methods are for specific types of enclosures

    public Set<Specie> getCompatibleSpecies() {
        return compatibleSpecies;
    }

    public boolean isSpecieCompatible(Specie animal) {
        return compatibleSpecies.contains(animal);
    }
}
