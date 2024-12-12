import { RideShareCompany } from "./RideShareCompany";

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
  ["TOP_PASSENGERS", "3"],
];


const displayError = (error: string | null) => {
  if (error) {
    console.error(error);
  }
}

const rideCompany: RideShareCompany = new RideShareCompany("YAAA");


for (let i: number = 0; i < inputs.length; i++) {
  const input: string[] = inputs[i];
  const action: string = input[0];
  if (action === "REGISTER_DRIVER") {

    const name: string = input[1];
    const resp = rideCompany.registerDriver(name);
    displayError(resp);

  } else if (action === "REGISTER_PASSENGER") {

    const name = input[1];
    const resp = rideCompany.registerPassenger(name);
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
  } else if (action === "TOP_PASSENGERS") {
    const numTop: number = Number.parseInt(input[1], 10);
    const topPassengers = rideCompany.getTopPassengers(numTop);
    console.log(topPassengers.toString());
  }

}

