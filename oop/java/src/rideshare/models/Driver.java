package rideshare.models;

import java.util.HashMap;

public class Driver extends Person {
    //    private String name;
    private final HashMap<String, Integer> passengers;
//    private int onGoingRides;
//    private int numCompletedRides;

    public Driver(String name) {
        super(name);
//        this.name = name;
        this.passengers = new HashMap<>();
//        this.numCompletedRides = 0;
//        this.onGoingRides = 0;
    }

    public void startRide(String passengerName) {
        this.passengers.put(passengerName, this.passengers.getOrDefault(passengerName, 0) + 1);
        super.startRide();
    }
//    public void addPassenger(String passengerName) {
//        this.passengers.put(passengerName, this.passengers.getOrDefault(passengerName, 0) + 1);
//        this.onGoingRides++;
//    }

//    public void addCompletedRide() {
//        this.onGoingRides--;
//        this.numCompletedRides++;
//    }

//    public String getName() {
//        return name;
//    }
//
//    public int getNumCompletedRides() {
//        return numCompletedRides;
//    }

//    @Override
//    public String toString() {
//        return "Driver{" +
//                "name='" + name + '\'' +
//                ", passengers=" + passengers +
//                ", onGoingRides=" + onGoingRides +
//                ", numCompletedRides=" + numCompletedRides +
//                '}';
//    }


    public HashMap<String, Integer> getPassengers() {
        return passengers;
    }

    @Override
    public String toString() {
        return this.getName() + "(" + this.getTotalRides() + ")";
    }
}
