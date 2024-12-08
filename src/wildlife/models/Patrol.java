package wildlife.models;

import java.util.UUID;

public class Patrol {
    private final UUID id;
    private String rangerName;
    private UUID[] zonesPatrolled;

    public Patrol() {
        this.id = UUID.randomUUID();
    }
}
