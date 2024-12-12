import { Driver } from "./Driver";
import { Passenger } from "./Passenger";


export class RideShareCompany {
  private name: string;
  private drivers: Map<string, Driver>;
  private passengers: Map<string, Passenger>;
  private freeDrivers: string[];
  private currentRides: Map<string, string>;

  constructor(name: string) {
    this.name = name;
    this.drivers = new Map<string, Driver>();
    this.passengers = new Map<string, Passenger>();
    this.freeDrivers = [];
    this.currentRides = new Map<string, string>();
  }

  registerDriver = (name: string): string | null => {
    if (this.drivers.has(name)) {
      return "Driver already registered";
    }
    this.drivers.set(name, new Driver(name));
    this.freeDrivers.push(name);

    return null;
  }

  registerPassenger = (name: string): string | null => {
    if (this.passengers.has(name)) {
      return "Passenger already registered";
    }
    this.passengers.set(name, new Passenger(name));

    return null;
  }

  requestRide = (passengerName: string): string | null => {
    const passenger: Passenger | undefined = this.passengers.get(passengerName);
    if (!passenger) {
      return "Passenger NOT registered";
    }
    if (this.freeDrivers.length === 0) {
      return "No driver available";
    }
    if (this.currentRides.has(passengerName)) {
      return "Ride already requested";
    }

    const driverName: string = this.freeDrivers.shift() ?? "";
    this.currentRides.set(passengerName, driverName);
    passenger.startRide(driverName);
    this.drivers.get(driverName)?.startRide(passengerName);

    return null;
  }

  completeRide = (passengerName: string): string | null => {
    const passenger: Passenger | undefined = this.passengers.get(passengerName);
    if (!passenger) {
      return "Passenger not registered";
    }
    const driverName: string | undefined = this.currentRides.get(passengerName);
    if (!driverName) {
      return "No ongoing ride";
    }

    this.currentRides.delete(passengerName);
    this.freeDrivers.push(driverName);
    passenger.completeRide();
    this.drivers.get(driverName)?.completeRide();

    return null;
  }

  getTopDrivers = (num: number) => {
    const drivers: Driver[] = Array.from(this.drivers.values());
    drivers.sort((a: Driver, b: Driver) => {
      if (a.getTotalRides() === b.getTotalRides()) {
        return a.getName().localeCompare(b.getName());
      }
      return b.getTotalRides() - a.getTotalRides();
    })
    return drivers.slice(0, Math.min(num, drivers.length));
  }

  getTopPassengers = (num: number) => {
    const passengers: Passenger[] = Array.from(this.passengers.values());
    passengers.sort((a: Passenger, b: Passenger) => {
      if (a.getTotalRides() === b.getTotalRides()) {
        return a.getName().localeCompare(b.getName());
      }
      return b.getTotalRides() - a.getTotalRides();
    })
    return passengers.slice(0, Math.min(num, passengers.length));
  }
}