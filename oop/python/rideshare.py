
"""
Design a basic ride-sharing system using object-oriented programming principles. The system should handle the following functionalities:

RideSharing
  Register a new driver.
    If the driver is already registered, return an error message: "Driver already registered."
  Register a new passenger.
    If the passenger is already registered, return an error message: "Passenger already registered."
  Request a ride for a passenger.
    If no drivers are available, return an error message: "No drivers available."
    If the passenger has already requested a ride, return an error message: "Ride already requested."
  Complete a ride.
    If no ride exists for the passenger, return an error message: "No ongoing ride for the passenger."
  Find n drivers with the highest number of completed rides.
    Return the top n drivers sorted by the number of rides completed, and in the case of a tie, alphabetically by name.
  Find n passengers with the highest number of completed rides.
    Return the top n drivers sorted by the number of rides completed, and in the case of a tie, alphabetically by name.
  Format of string printed out for the highest number of passengers/drivers:  USE __repr__
    DriverName (Completed Rides)
"""


# All the transactions need to be able to run. As in one input can have an error and stop and then the next one runs.

# inputs
# -REGISTER_DRIVER, driver_name
# -REGISTER_PASSENGER, passenger_name
# -REQUEST_RIDE, passenger_name
# -COMPLETE_RIDE, passenger_name
# -TOP_DRIVERS, number_of_drivers_returned
# -TOP_PASSENGERS, number_of_passengers_returned


inputs = [
    ["REGISTER_DRIVER", "driver1"],
    ["REGISTER_DRIVER", "driver2"],
    ["REGISTER_DRIVER", "driver3"],
    ["REGISTER_PASSENGER", "passenger1"],
    ["REGISTER_PASSENGER", "passenger2"],
    ["REQUEST_RIDE", "passenger1"],  # Succeeds, assigns driver1
    ["REQUEST_RIDE", "passenger2"],  # Succeeds, assigns driver2
    ["REQUEST_RIDE", "passenger1"],  # Error: Ride already requested
    ["COMPLETE_RIDE", "passenger1"],  # Completes ride for passenger1 (driver1)
    ["REQUEST_RIDE", "passenger1"],  # Succeeds, assigns driver3
    ["COMPLETE_RIDE", "passenger2"],  # Completes ride for passenger2 (driver2)
    ["REQUEST_RIDE", "passenger2"],  # Succeeds, assigns driver1
    ["COMPLETE_RIDE", "passenger1"],  # Completes ride for passenger1 (driver3)
    ["COMPLETE_RIDE", "passenger1"],  # Error: No ongoing ride for the passenger
    ["REQUEST_RIDE", "passenger1"],  # Succeeds, assigns driver2
    ["REQUEST_RIDE", "passenger3"],  # Error: Passenger not registered
    ["REGISTER_PASSENGER", "passenger3"],
    ["REQUEST_RIDE", "passenger3"],  # Succeeds, assigns driver3
    ["COMPLETE_RIDE", "passenger2"],  # Completes ride for passenger2 (driver1)
    ["REQUEST_RIDE", "passenger2"],  # Succeeds, assigns driver1 again
    ["COMPLETE_RIDE", "passenger3"],  # Completes ride for passenger3 (driver3)
    ["TOP_DRIVERS", "2"],  # Return top 2 drivers by rides completed
    ["COMPLETE_RIDE", "passenger2"],  # Completes ride for passenger2 (driver1)
    ["REQUEST_RIDE", "passenger1"],  # Succeeds, assigns driver3
    ["COMPLETE_RIDE", "passenger1"],  # Completes ride for passenger1 (driver3)
    ["TOP_DRIVERS", "3"],  # Return top 3 drivers by rides completed
    ["TOP_PASSENGERS", "3"],  # Return top 3 passengers by rides completed
]