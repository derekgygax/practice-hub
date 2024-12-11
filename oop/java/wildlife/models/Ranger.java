package wildlife.models;

import wildlife.enums.ZoneType;

import java.util.UUID;

public class Ranger {
    private final UUID id;
    private String name;
    private UUID[] zonesPatrolling;


    public Ranger(String name) {
        this.id = UUID.randomUUID();
        this.name = name;
    }
}
