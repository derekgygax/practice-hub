
from person import Person

class Passenger(Person):
  
  def __init__(self, name) -> None:
    super().__init__(name)
    self.drivers = {}

  def start_ride(self, driver_name):
    self.drivers[driver_name] = self.drivers.get(driver_name, 0) + 1
    super().start_ride()