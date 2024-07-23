import { assertEquals } from "jsr:@std/assert/equals";
import { CarService } from "../../services/CarService.ts";
import { Car } from "../../models/Car.ts";
import { Engine } from "../../models/engine/Engine.ts";
import { Battery } from "../../models/battery/Battery.ts";
import { Tire } from "../../models/tire/Tire.ts";

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

class MockTire implements Tire {
  constructor(private shouldService: boolean) {}
  needsService(_tireWear: number[]): boolean {
    return this.shouldService;
  }
}

Deno.test("CarService - needs service when engine needs service", () => {
  const car = new Car(new MockEngine(true), new MockBattery(false), new MockTire(false));
  assertEquals(CarService.needsService(car, 0, new Date(), [0, 0, 0, 0]), true);
});

Deno.test("CarService - needs service when battery needs service", () => {
  const car = new Car(new MockEngine(false), new MockBattery(true), new MockTire(false));
  assertEquals(CarService.needsService(car, 0, new Date(), [0, 0, 0, 0]), true);
});

Deno.test("CarService - needs service when tires need service", () => {
  const car = new Car(new MockEngine(false), new MockBattery(false), new MockTire(true));
  assertEquals(CarService.needsService(car, 0, new Date(), [0, 0, 0, 0]), true);
});

Deno.test("CarService - needs service when all components need service", () => {
  const car = new Car(new MockEngine(true), new MockBattery(true), new MockTire(true));
  assertEquals(CarService.needsService(car, 0, new Date(), [0, 0, 0, 0]), true);
});

Deno.test("CarService - doesn't need service when no component needs service", () => {
  const car = new Car(new MockEngine(false), new MockBattery(false), new MockTire(false));
  assertEquals(CarService.needsService(car, 0, new Date(), [0, 0, 0, 0]), false);
});