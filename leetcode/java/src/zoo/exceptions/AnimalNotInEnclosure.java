package zoo.exceptions;

public class AnimalNotInEnclosure extends RuntimeException {
    public AnimalNotInEnclosure(String message) {
        super(message);
    }
}
