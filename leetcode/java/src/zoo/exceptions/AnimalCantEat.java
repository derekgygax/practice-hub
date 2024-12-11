package zoo.exceptions;

public class AnimalCantEat extends RuntimeException {
    public AnimalCantEat(String message) {
        super(message);
    }
}
