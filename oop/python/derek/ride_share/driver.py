
from person import Person

class Driver(Person):
  
  def __init__(self, name) -> None:
    super().__init__(name)
    self.passengers = {}

  def start_ride(self, passenger_name):
    # Add one to the number of times you have worked with that passenger
    # OR start it at 1
    self.passengers[passenger_name] = self.passengers.get(passenger_name, 0) + 1
    # Show that you are on a ride. This modifies on_going_ride in the parent
    super().start_ride()