package zoo.exceptions;

public class NotEnoughFood extends RuntimeException {
    public NotEnoughFood(String message) {
        super(message);
    }
}
