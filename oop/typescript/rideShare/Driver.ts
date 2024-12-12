import { Person } from "./Person";


export class Driver extends Person {

  private passengers: Map<string, number>;

  constructor(name: string) {
    super(name);
    this.passengers = new Map<string, number>();
  }

  startRide(name: string): void {
    this.passengers.set(name, (this.passengers.get(name) ?? 0) + 1);
    super.markRideStarted();
  }

}