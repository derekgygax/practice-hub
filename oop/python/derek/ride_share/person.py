

class Person:
  def __init__(self, name) -> None:
    self.name = name
    self.on_going_ride = False
    self.total_ride = 0

  def start_ride(self):
    self.on_going_ride = True

  def ride_completed(self):
    self.on_going_ride = False
    self.total_ride += 1

  def __repr__(self) -> str:
    return self.name +"(" +str(self.total_ride)+ ")"