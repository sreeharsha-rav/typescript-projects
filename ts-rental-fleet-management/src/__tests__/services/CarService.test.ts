import { assertEquals } from "jsr:@std/assert/equals";
import { CarService } from "../../services/CarService.ts";
import { Car } from "../../models/Car.ts";
import { Engine } from "../../models/engine/Engine.ts";
import { Battery } from "../../models/battery/Battery.ts";

class MockEngine implements Engine {
  constructor(private shouldService: boolean) {}
  needsService(_mileage: number): boolean {
    return this.shouldService;
  }
}

class MockBattery implements Battery {
  constructor(private shouldService: boolean) {}
  needsService(_lastServiceDate: Date): boolean {
    return this.shouldService;
  }
}

Deno.test("CarService - needs service when engine needs service", () => {
  const car = new Car(new MockEngine(true), new MockBattery(false));
  assertEquals(CarService.needsService(car, 0, new Date()), true);
});

Deno.test("CarService - needs service when battery needs service", () => {
  const car = new Car(new MockEngine(false), new MockBattery(true));
  assertEquals(CarService.needsService(car, 0, new Date()), true);
});

Deno.test("CarService - needs service when both engine and battery need service", () => {
  const car = new Car(new MockEngine(true), new MockBattery(true));
  assertEquals(CarService.needsService(car, 0, new Date()), true);
});

Deno.test("CarService - doesn't need service when neither engine nor battery need service", () => {
  const car = new Car(new MockEngine(false), new MockBattery(false));
  assertEquals(CarService.needsService(car, 0, new Date()), false);
});