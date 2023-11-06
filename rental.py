class Car:
    def __init__(self, make, model, year, daily_rate, free=True):
        self.make = make
        self.model = model
        self.year = year
        self.daily_rate = daily_rate
        self.free = free

    def rent(self, days):
        if self.free:
            cost = self.daily_rate * days
            self.free = False
            return cost
        return 0

    def return_car(self):
        self.free = True

    def __str__(self):
        return f"{self.year} {self.make} {self.model}"

if __name__ == "__main__":
    car1 = Car("Toyota", "Camry", 2022, 50)
    car2 = Car("Honda", "Accord", 2021, 45)
    car3 = Car("Ford", "Focus", 2020, 40)

    cars = [car1, car2, car3]

    print("free cars:")
    free_cars = [car for car in cars if car.free]
    for car in free_cars:
        print(car)

    selected_car = car1
    rental_days = 3

    for car in cars:
        if car == selected_car:
            total_cost = car.rent(rental_days)
            if total_cost > 0:
                print(f"Rented {selected_car} for {rental_days} days. Total cost: ${total_cost}")
            else:
                print(f"{selected_car} is not free for rental.")
            break

    print("free cars after rental:")
    free_cars = [car for car in cars if car.free]
    for car in free_cars:
        print(car)
