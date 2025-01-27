package rideshare.models;

import java.util.HashMap;

public class Passenger extends Person {
    //    private String name;
    private final HashMap<String, Integer> drivers;
//    private int onGoingRide;
//    private int completedRides;

    public Passenger(String name) {
        super(name);
//        this.name = name;
        this.drivers = new HashMap<>();
//        this.onGoingRide = 0;
//        this.completedRides = 0;
    }

    public void startRide(String driverName) {
        this.drivers.put(driverName, this.drivers.getOrDefault(driverName, 0) + 1);
        super.startRide();
    }

//    public void addDriver(String driverName) {
//        this.drivers.put(driverName, this.drivers.getOrDefault(driverName, 0) + 1);
//        this.onGoingRide++;
//    }

//    public void addCompletedRide() {
//        this.onGoingRide--;
//        this.completedRides++;
//    }

//    public String getName() {
//        return name;
//    }
//
//    public int getCompletedRides() {
//        return completedRides;
//    }

//    @Override
//    public String toString() {
//        return "Passenger{" +
//                "name='" + name + '\'' +
//                ", drivers=" + drivers +
//                ", onGoingRide=" + onGoingRide +
//                ", completedRides=" + completedRides +
//                '}';
//    }


    public HashMap<String, Integer> getDrivers() {
        return drivers;
    }

    @Override
    public String toString() {
        return this.getName() + "(" + this.getTotalRides() + ")";
    }
}
