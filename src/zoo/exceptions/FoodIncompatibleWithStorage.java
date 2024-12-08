package zoo.exceptions;

public class FoodIncompatibleWithStorage extends RuntimeException {
    public FoodIncompatibleWithStorage(String message) {
        super(message);
    }
}
