/*
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
  Format: DriverName (Completed Rides)

*/

class Passenger {
  public name: string;
  public driverName: string | null;

  constructor(name: string) {
    this.name = name;
    this.driverName = null;
  }

  startRide(driverName: string) {
    this.driverName = driverName;
  }

  isOnRide(): boolean {
    return this.driverName !== null;
  }

  finishRide() {
    const driverName: string | null = this.driverName;
    this.driverName = null;
    return driverName;
  }
}

class Driver {
  public name: string;
  public ridesCompleted: number;

  constructor(name: string) {
    this.name = name;
    this.ridesCompleted = 0;
  }

  completeRide() {
    this.ridesCompleted += 1;
  }

  toString() {
    return `${this.name}(${this.ridesCompleted})`
  }

}


class RideShareCompany {
  public drivers: Map<string, Driver>;
  public freeDrivers: string[];
  public passengers: Map<string, Passenger>;

  constructor() {
    this.drivers = new Map<string, Driver>();
    this.freeDrivers = [];
    this.passengers = new Map<string, Passenger>();
  }

  addDriver(name: string): string | null {
    if (this.drivers.has(name)) {
      return "Driver already registered.";
    }

    const driver: Driver = new Driver(name);
    this.drivers.set(name, driver);
    this.freeDrivers.push(name);

    return null;
  }

  addPassenger(name: string): string | null {
    if (this.passengers.has(name)) {
      return "Passenger already registered.";
    }
    this.passengers.set(name, new Passenger(name));
    return null;
  }

  requestRide(passengerName: string): string | null {

    // if the passenger doesn't exist then return no passenger with that name
    if (!this.passengers.has(passengerName)) {
      return `No passenger ${passengerName} in the system.`;
    }

    // If there are no free drivers return No drivers available.
    if (this.freeDrivers.length === 0) {
      return "No drivers available.";
    }

    // if passenger already on a ride return Ride already requested.
    if (this.passengers.get(passengerName)?.isOnRide()) {
      return "Ride already requested.";
    }

    // Get the driver from freeDrivers
    const driverName: string | undefined = this.freeDrivers.shift();

    // If there was a driver then start the ride
    if (driverName) {
      this.passengers.get(passengerName)?.startRide(driverName);
    }

    return null;
  }

  completeRide(passengerName: string): string | null {
    // If the pasenger in the system
    if (!this.passengers.has(passengerName)) {
      return "The passenger does not exist in the system";
    }

    // Is the passenger on a ride
    if (!this.passengers.get(passengerName)?.isOnRide()) {
      return "No ongoing ride for the passenger."
    }

    const driverName: string | null | undefined = this.passengers.get(passengerName)?.finishRide();
    if (driverName) {
      this.freeDrivers.push(driverName);
      this.drivers.get(driverName)?.completeRide();
    }

    return null;
  }

  getTopDrivers(numTopDrivers: number): Driver[] {
    const drivers = Array.from(this.drivers.values())
    drivers.sort((a: Driver, b: Driver) => {
      if (a.ridesCompleted === b.ridesCompleted) {
        return a.name.localeCompare(b.name);
      }
      return b.ridesCompleted - a.ridesCompleted;
    })
    return drivers.slice(0, numTopDrivers);
  }
}



const inputs: string[][] = [
  ["REGISTER_DRIVER", "driver1"],
  ["REGISTER_DRIVER", "driver2"],
  ["REGISTER_DRIVER", "driver3"],
  ["REGISTER_PASSENGER", "passenger1"],
  ["REGISTER_PASSENGER", "passenger2"],
  ["REQUEST_RIDE", "passenger1"],    // Succeeds, assigns driver1
  ["REQUEST_RIDE", "passenger2"],    // Succeeds, assigns driver2
  ["REQUEST_RIDE", "passenger1"],    // Error: Ride already requested
  ["COMPLETE_RIDE", "passenger1"],   // Completes ride for passenger1 (driver1)
  ["REQUEST_RIDE", "passenger1"],    // Succeeds, assigns driver3
  ["COMPLETE_RIDE", "passenger2"],   // Completes ride for passenger2 (driver2)
  ["REQUEST_RIDE", "passenger2"],    // Succeeds, assigns driver1
  ["COMPLETE_RIDE", "passenger1"],   // Completes ride for passenger1 (driver3)
  ["COMPLETE_RIDE", "passenger1"],   // Error: No ongoing ride for the passenger
  ["REQUEST_RIDE", "passenger1"],    // Succeeds, assigns driver2
  ["REQUEST_RIDE", "passenger3"],    // Error: Passenger not registered
  ["REGISTER_PASSENGER", "passenger3"],
  ["REQUEST_RIDE", "passenger3"],    // Succeeds, assigns driver3
  ["COMPLETE_RIDE", "passenger2"],   // Completes ride for passenger2 (driver1)
  ["REQUEST_RIDE", "passenger2"],    // Succeeds, assigns driver1 again
  ["COMPLETE_RIDE", "passenger3"],   // Completes ride for passenger3 (driver3)
  ["TOP_DRIVERS", "2"],              // Return top 2 drivers by rides completed
  ["COMPLETE_RIDE", "passenger2"],   // Completes ride for passenger2 (driver1)
  ["REQUEST_RIDE", "passenger1"],    // Succeeds, assigns driver3
  ["COMPLETE_RIDE", "passenger1"],   // Completes ride for passenger1 (driver3)
  ["TOP_DRIVERS", "3"],              // Return top 3 drivers by rides completed
];

const rideCompany = new RideShareCompany();

const displayError = (error: string | null) => {
  if (error) {
    console.error(error);
  }
}

for (let i: number = 0; i < inputs.length; i++) {
  const input: string[] = inputs[i];
  const action: string = input[0];
  if (action === "REGISTER_DRIVER") {

    const name: string = input[1];
    const resp = rideCompany.addDriver(name);
    displayError(resp);

  } else if (action === "REGISTER_PASSENGER") {

    const name = input[1];
    const resp = rideCompany.addPassenger(name);
    displayError(resp);

  } else if (action === "REQUEST_RIDE") {
    const passengerName = input[1];
    const resp = rideCompany.requestRide(passengerName);
    displayError(resp);

  } else if (action === "COMPLETE_RIDE") {
    const passengerName = input[1];
    const resp = rideCompany.completeRide(passengerName);
    displayError(resp);

  } else if (action === "TOP_DRIVERS") {
    const numTop: number = Number.parseInt(input[1], 10);
    const topDrivers = rideCompany.getTopDrivers(numTop);
    console.log(topDrivers.toString());
  }


}
