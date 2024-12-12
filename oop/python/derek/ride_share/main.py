
from ride_share_company import RideShareCompany

def print_error(error):
  if error is not None:
    print(error)


def main():
  inputs = [
      ["REGISTER_DRIVER", "driver1"],
      ["REGISTER_DRIVER", "driver2"],
      ["REGISTER_DRIVER", "driver3"],
      ["REGISTER_PASSENGER", "passenger1"],
      ["REGISTER_PASSENGER", "passenger2"],
      ["REQUEST_RIDE", "passenger1"],  # Succeeds, assigns driver1
      ["REQUEST_RIDE", "passenger2"],  # Succeeds, assigns driver2
      ["REQUEST_RIDE", "passenger1"],  # Error: Ride already requested
      ["COMPLETE_RIDE", "passenger1"],  # Completes ride for passenger1 (driver1)
      ["REQUEST_RIDE", "passenger1"],  # Succeeds, assigns driver3
      ["COMPLETE_RIDE", "passenger2"],  # Completes ride for passenger2 (driver2)
      ["REQUEST_RIDE", "passenger2"],  # Succeeds, assigns driver1
      ["COMPLETE_RIDE", "passenger1"],  # Completes ride for passenger1 (driver3)
      ["COMPLETE_RIDE", "passenger1"],  # Error: No ongoing ride for the passenger
      ["REQUEST_RIDE", "passenger1"],  # Succeeds, assigns driver2
      ["REQUEST_RIDE", "passenger3"],  # Error: Passenger not registered
      ["REGISTER_PASSENGER", "passenger3"],
      ["REQUEST_RIDE", "passenger3"],  # Succeeds, assigns driver3
      ["COMPLETE_RIDE", "passenger2"],  # Completes ride for passenger2 (driver1)
      ["REQUEST_RIDE", "passenger2"],  # Succeeds, assigns driver1 again
      ["COMPLETE_RIDE", "passenger3"],  # Completes ride for passenger3 (driver3)
      ["TOP_DRIVERS", "2"],  # Return top 2 drivers by rides completed
      ["COMPLETE_RIDE", "passenger2"],  # Completes ride for passenger2 (driver1)
      ["REQUEST_RIDE", "passenger1"],  # Succeeds, assigns driver3
      ["COMPLETE_RIDE", "passenger1"],  # Completes ride for passenger1 (driver3)
      ["TOP_DRIVERS", "3"],  # Return top 3 drivers by rides completed
      ["TOP_PASSENGERS", "3"],  # Return top 3 passengers by rides completed
  ]

  company = RideShareCompany("YYAAA")

  for index, input in enumerate(inputs):
    action = input[0]
    if (action == "REGISTER_DRIVER"):
      res = company.register_driver(input[1])
      print_error(res)
    elif (action == "REGISTER_PASSENGER"):
      res = company.register_passenger(input[1])
      print_error(res)
    elif (action == "REQUEST_RIDE"):
      res = company.request_ride(input[1])
      print_error(res)
    elif (action == "COMPLETE_RIDE"):
      res = company.complete_ride(input[1])
      print_error(res)
    elif (action == "TOP_DRIVERS"):
      drivers = company.get_top_drivers(int(input[1]))  
      print(drivers)            
    elif (action == "TOP_PASSENGERS"):
      passengers = company.get_top_passengers(int(input[1]))
      print(passengers)


if __name__ == "__main__":
  main()