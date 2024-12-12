package rideshare.models;

import bank.model.Account;

import java.util.*;

public class RideShare {

    private HashMap<String, Driver> drivers;
    private HashMap<String, Passenger> passengers;
    // This holds the names of drivers that are free
    private LinkedList<String> freeDrivers;
    // This holds the name of passengers on the ride as they key
    // and the name of the driver as the value
    private HashMap<String, String> currentRides;

    public RideShare() {
        this.drivers = new HashMap<>();
        this.passengers = new HashMap<>();
        this.freeDrivers = new LinkedList<>();
        this.currentRides = new HashMap<>();
    }

    public String addDriver(String name) {
        try {

            if (this.drivers.containsKey(name)) {
                return "Driver already registered.";
            }
            this.drivers.put(name, new Driver(name));
            this.freeDrivers.addLast(name);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return null;
    }

    public String addPassenger(String name) {
        if (this.passengers.containsKey(name)) {
            return "Passenger already registered.";
        }
        this.passengers.put(name, new Passenger(name));

        return null;
    }

    public String requestRide(String passengerName) {
        if (!this.passengers.containsKey(passengerName)) {
            return "Passenger NOT registered.";
        }

        if (this.freeDrivers.isEmpty()) {
            return "No drivers available.";
        }

        if (this.currentRides.containsKey(passengerName)) {
            return "Ride already requested.";
        }

        // Get the driver and start the ride
        String driverName = freeDrivers.removeFirst();
        this.passengers.get(passengerName).startRide(driverName);
        this.drivers.get(driverName).startRide(passengerName);
        this.currentRides.put(passengerName, driverName);

        return null;
    }

    public String completeRide(String passengerName) {
        if (!this.currentRides.containsKey(passengerName)) {
            return "No ongoing ride for the passenger.";
        }

        // stop the ride
        String driverName = this.currentRides.get(passengerName);
        this.drivers.get(driverName).completeRide();
        this.passengers.get(passengerName).completeRide();
        this.currentRides.remove(passengerName);
        this.freeDrivers.addLast(driverName);

        return null;
    }

    public List<Driver> getTopDrivers(int numDrivers) {
        List<Driver> drivers = new ArrayList<Driver>(this.drivers.values());
//        drivers.sort(Comparator.comparingInt((Driver a) -> {
//            return a.getNumCompletedRides();
//        }).reversed().thenComparing((Driver a) -> {
//            return a.getName();
//        }));
        drivers.sort(Comparator.comparingInt(Driver::getTotalRides).reversed().thenComparing(Driver::getName));
        return drivers.subList(0, Math.min(drivers.size(), numDrivers));
    }

    public List<Passenger> getTopPassengers(int numPassengers) {
        List<Passenger> passengers = new ArrayList<Passenger>(this.passengers.values());
        passengers.sort(Comparator.comparingInt(Passenger::getTotalRides).reversed().thenComparing(Passenger::getName));
        return passengers.subList(0, Math.min(passengers.size(), numPassengers));
    }


}
