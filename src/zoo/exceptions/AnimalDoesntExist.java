package zoo.exceptions;

public class AnimalDoesntExist extends RuntimeException {
    public AnimalDoesntExist(String message) {
        super(message);
    }
}
