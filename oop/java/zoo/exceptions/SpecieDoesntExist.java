package zoo.exceptions;

public class SpecieDoesntExist extends RuntimeException {
    public SpecieDoesntExist(String message) {
        super(message);
    }
}
