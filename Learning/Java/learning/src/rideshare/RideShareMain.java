package rideshare;

//RideSharing
//Register a new driver.
//If the driver is already registered, return an error message: "Driver already registered."
//Register a new passenger.
//If the passenger is already registered, return an error message: "Passenger already registered."
//Request a ride for a passenger.
//If no drivers are available, return an error message: "No drivers available."
//If the passenger has already requested a ride, return an error message: "Ride already requested."
//Complete a ride.
//If no ride exists for the passenger, return an error message: "No ongoing ride for the passenger."
//Find n drivers with the highest number of completed rides. and who their most common rider is
// keep track of the drivers for each passenger and how often they have used that one
//Find n passengers with the highest number of completed rides. and who their most common rider is
// keep track of the drivers for each passenger and how often they have used that one
//Return the top n drivers sorted by the number of rides completed, and in the case of a tie, alphabetically by name.
//        Format: DriverName (Completed Rides)

import rideshare.models.Driver;
import rideshare.models.Passenger;
import rideshare.models.RideShare;

import java.util.List;

public class RideShareMain {

    private static void printError(int step, String error) {
        if (error != null) {
            System.err.println(step + ": " + error);
        }
    }

    public static void main(String[] args) {
        String[][] inputs = {
                {"REGISTER_DRIVER", "driver1"},
                {"REGISTER_DRIVER", "driver2"},
                {"REGISTER_DRIVER", "driver3"},
                {"REGISTER_PASSENGER", "passenger1"},
                {"REGISTER_PASSENGER", "passenger2"},
                {"REQUEST_RIDE", "passenger1"},    // Succeeds, assigns driver1
                {"REQUEST_RIDE", "passenger2"},    // Succeeds, assigns driver2
                {"REQUEST_RIDE", "passenger1"},    // Error: Ride already requested
                {"COMPLETE_RIDE", "passenger1"},   // Completes ride for passenger1 (driver1)
                {"REQUEST_RIDE", "passenger1"},    // Succeeds, assigns driver3
                {"COMPLETE_RIDE", "passenger2"},   // Completes ride for passenger2 (driver2)
                {"REQUEST_RIDE", "passenger2"},    // Succeeds, assigns driver1
                {"COMPLETE_RIDE", "passenger1"},   // Completes ride for passenger1 (driver3)
                {"COMPLETE_RIDE", "passenger1"},   // Error: No ongoing ride for the passenger
                {"REQUEST_RIDE", "passenger1"},    // Succeeds, assigns driver2
                {"REQUEST_RIDE", "passenger3"},    // Error: Passenger not registered
                {"REGISTER_PASSENGER", "passenger3"},
                {"REQUEST_RIDE", "passenger3"},    // Succeeds, assigns driver3
                {"COMPLETE_RIDE", "passenger2"},   // Completes ride for passenger2 (driver1)
                {"REQUEST_RIDE", "passenger2"},    // Succeeds, assigns driver1 again
                {"COMPLETE_RIDE", "passenger3"},   // Completes ride for passenger3 (driver3)
                {"TOP_DRIVERS", "2"},              // Return top 2 drivers by rides completed
                {"COMPLETE_RIDE", "passenger2"},   // Completes ride for passenger2 (driver1)
                {"REQUEST_RIDE", "passenger1"},    // Succeeds, assigns driver3
                {"COMPLETE_RIDE", "passenger1"},   // Completes ride for passenger1 (driver3)
                {"TOP_DRIVERS", "3"},              // Return top 3 drivers by rides completed
                {"TOP_PASSENGERS", "3"},              // Return top 3 passengers by rides completed
        };

        RideShare rideShare = new RideShare();

        for (int i = 0; i < inputs.length; i++) {
            String[] input = inputs[i];
            String action = input[0];
            if (action.equals("REGISTER_DRIVER")) {
                String name = input[1];
                String result = rideShare.addDriver(name);
                RideShareMain.printError(i, result);
            } else if (action.equals("REGISTER_PASSENGER")) {
                String name = input[1];
                String result = rideShare.addPassenger(name);
                RideShareMain.printError(i, result);
            } else if (action.equals("REQUEST_RIDE")) {
                String passengerName = input[1];
                String result = rideShare.requestRide(passengerName);
                RideShareMain.printError(i, result);
            } else if (action.equals("COMPLETE_RIDE")) {
                String passengerName = input[1];
                String result = rideShare.completeRide(passengerName);
                RideShareMain.printError(i, result);
            } else if (action.equals("TOP_DRIVERS")) {
                int numDrivers = Integer.parseInt(input[1]);
                List<Driver> drivers = rideShare.getTopDrivers(numDrivers);
                System.out.println(i + ": " + drivers);
            } else if (action.equals("TOP_PASSENGERS")) {
                int numDrivers = Integer.parseInt(input[1]);
                List<Passenger> passengers = rideShare.getTopPassengers(numDrivers);
                System.out.println(i + ": " + passengers);
            }
        }
    }
}
