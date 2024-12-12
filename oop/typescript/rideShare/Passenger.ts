import { Driver } from "./Driver";
import { Person } from "./Person";


export class Passenger extends Person {
  private drivers: Map<string, number>;

  constructor(name: string) {
    super(name);
    this.drivers = new Map<string, number>();
  }

  startRide(driverName: string) {
    this.drivers.set(driverName, (this.drivers.get(driverName) ?? 0) + 1);
    super.markRideStarted();
  }
}