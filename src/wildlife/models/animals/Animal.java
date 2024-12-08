package wildlife.models.animals;

import wildlife.enums.Species;
import wildlife.models.Zone;

import java.util.UUID;

public class Animal {
    private final UUID id;
    private Species species;
    private int age;
    private String name;
    private UUID zone;

    public Animal() {
        this.id = UUID.randomUUID();
    }
}
