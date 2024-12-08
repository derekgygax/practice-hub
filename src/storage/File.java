package storage;

import java.time.ZoneId;
import java.time.ZonedDateTime;

public class File {
    public String name;
    public ZonedDateTime createdAt;

    public File(String name) {
        this.name = name;
        this.createdAt = ZonedDateTime.now(ZoneId.systemDefault());
    }

    public File(String name, ZonedDateTime createdAt) {
        this.name = name;
        this.createdAt = createdAt;
    }

    public ZonedDateTime getCreatedAt(String timeZone) {
        return createdAt.withZoneSameInstant(ZoneId.of(timeZone));
    }

    public File makeCopy() {
        return new File(
                this.name,
                this.createdAt
        );
    }

}
