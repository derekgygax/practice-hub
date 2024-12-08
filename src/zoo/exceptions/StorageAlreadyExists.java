package zoo.exceptions;

public class StorageAlreadyExists extends RuntimeException {
    public StorageAlreadyExists(String message) {
        super(message);
    }
}
