
from typing import Optional, Dict, List
from driver import Driver
from passenger import Passenger

class RideShareCompany:

  def __init__(self, name) -> None:
    self.name = name
    self.drivers: Dict[str, Driver] = {}
    self.passengers: Dict[str, Passenger] = {}
    self.free_drivers: List[str] = []
    self.current_rides: List[str, str] = {}

  def register_driver(self, name: str) -> Optional[str]:
    if (name in self.drivers):
      return "Driver already registered."
    self.drivers[name] = Driver(name)
    self.free_drivers.append(name)

  def register_passenger(self, name: str) -> Optional[str]:
    if (name in self.passengers):
      return "Passenger already registered."
    self.passengers[name] = Passenger(name)

  def request_ride(self, passenger_name: str) -> Optional[str]:
    if (passenger_name not in self.passengers):
      return "Passenger not registered."
    if (len(self.free_drivers) == 0):
      return "No drivers available."
    if (passenger_name in self.current_rides):
      return "Ride already requested."
    
    driver_name = self.free_drivers.pop(0)
    self.drivers[driver_name].start_ride(passenger_name)
    self.passengers[passenger_name].start_ride(driver_name)
    self.current_rides[passenger_name] = driver_name

  def complete_ride(self, passenger_name):
    if (passenger_name not in self.passengers):
      return "Passenger not registered."
    if (passenger_name not in self.current_rides):
      return "No ongoing ride."
    
    driver_name = self.current_rides[passenger_name]
    self.passengers[passenger_name].ride_completed()
    self.drivers[driver_name].ride_completed()
    self.free_drivers.append(driver_name)
    del self.current_rides[passenger_name]

  def get_top_drivers(self, num_drivers: int) -> List[Driver]:
    drivers = self.drivers.values()
    drivers = sorted(drivers, key= lambda driver: (-driver.total_ride, driver.name))
    return drivers[0 : num_drivers]

  def get_top_passengers(self, num_passengers: int) -> List[Passenger]:
    passengers = self.passengers.values()
    passengers = sorted(passengers, key= lambda passenger: (-passenger.total_ride, passenger.name))
    return passengers[0 : num_passengers]