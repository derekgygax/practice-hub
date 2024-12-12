

export class Person {

  private name: string;
  private onRide: boolean;
  private totalRides: number;

  constructor(name: string) {
    this.name = name;
    this.onRide = false;
    this.totalRides = 0;
  }

  // This can loose the reference of 'this' in callback like setTimeout or asynchronous things
  markRideStarted(): void {
    this.onRide = true;
  }
  // This holds on to this but can NOT be overriden in child classes or called with super
  // startingRide = () => {}

  completeRide(): void {
    this.onRide = false;
    this.totalRides++;
  }

  getName(): string {
    return this.name;
  }

  isOnRide(): boolean {
    return this.onRide;
  }

  getTotalRides(): number {
    return this.totalRides;
  }

  toString() {
    return this.name + "(" + this.totalRides + ")"
  }
}