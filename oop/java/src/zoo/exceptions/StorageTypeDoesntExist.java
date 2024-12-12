package zoo.exceptions;

public class StorageTypeDoesntExist extends RuntimeException {
    public StorageTypeDoesntExist(String message) {
        super(message);
    }
}
