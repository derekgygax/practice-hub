package zoo.exceptions;

public class FoodTypeDoesntExist extends RuntimeException {
    public FoodTypeDoesntExist(String message) {
        super(message);
    }
}
