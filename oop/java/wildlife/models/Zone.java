package wildlife.models;

import wildlife.enums.ZoneType;

import java.util.UUID;

public class Zone {
    private final UUID id;
    private ZoneType type;
    private UUID[] animals;
    private int totalNumberAnimalsAllowed;

    public Zone() {
        this.id = UUID.randomUUID();
    }
}
