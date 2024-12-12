package rideshare.models;

public class Person {
    private String name;
    private boolean onGoingRide;
    private int totalRides;

    public Person(String name) {
        this.name = name;
        this.onGoingRide = false;
        this.totalRides = 0;
    }

    public void startRide() {
        this.onGoingRide = true;
    }

    public void completeRide() {
        this.onGoingRide = false;
        this.totalRides++;
    }

    public String getName() {
        return name;
    }

    public boolean isOnGoingRide() {
        return onGoingRide;
    }

    public int getTotalRides() {
        return totalRides;
    }
}
