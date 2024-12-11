package zoo.exceptions;

public class NoStorageForThatFood extends RuntimeException {
    public NoStorageForThatFood(String message) {
        super(message);
    }
}
