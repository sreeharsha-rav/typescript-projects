import { assertEquals } from "jsr:@std/assert/equals";
import { CarFactory } from "../../factories/CarFactory.ts";
import { CapuletEngine } from "../../models/engine/CapuletEngine.ts";
import { WilloughbyEngine } from "../../models/engine/WilloughbyEngine.ts";
import { SternmanEngine } from "../../models/engine/SternmanEngine.ts";
import { SpindlerBattery } from "../../models/battery/SpindlerBattery.ts";
import { NubbinBattery } from "../../models/battery/NubbinBattery.ts";
import { CarriganTire } from "../../models/tire/CarriganTire.ts";
import { OctoprimeTire } from "../../models/tire/OctoprimeTire.ts";

const tireWear = [0.1, 0.2, 0.3, 0.4];

Deno.test("CarFactory - creates Calliope with correct engine, battery, and tires", () => {
  const car = CarFactory.createCalliope(new Date(), new Date(), 0, 0, tireWear);
  assertEquals(car.engine instanceof CapuletEngine, true);
  assertEquals(car.battery instanceof SpindlerBattery, true);
  assertEquals(car.tires instanceof CarriganTire, true);
});

Deno.test("CarFactory - creates Glissade with correct engine, battery, and tires", () => {
  const car = CarFactory.createGlissade(new Date(), new Date(), 0, 0, tireWear);
  assertEquals(car.engine instanceof WilloughbyEngine, true);
  assertEquals(car.battery instanceof SpindlerBattery, true);
  assertEquals(car.tires instanceof OctoprimeTire, true);
});

Deno.test("CarFactory - creates Palindrome with correct engine, battery, and tires", () => {
  const car = CarFactory.createPalindrome(new Date(), new Date(), false, tireWear);
  assertEquals(car.engine instanceof SternmanEngine, true);
  assertEquals(car.battery instanceof SpindlerBattery, true);
  assertEquals(car.tires instanceof CarriganTire, true);
});

Deno.test("CarFactory - creates Rorschach with correct engine, battery, and tires", () => {
  const car = CarFactory.createRorschach(new Date(), new Date(), 0, 0, tireWear);
  assertEquals(car.engine instanceof WilloughbyEngine, true);
  assertEquals(car.battery instanceof NubbinBattery, true);
  assertEquals(car.tires instanceof OctoprimeTire, true);
});

Deno.test("CarFactory - creates Thovex with correct engine, battery, and tires", () => {
  const car = CarFactory.createThovex(new Date(), new Date(), 0, 0, tireWear);
  assertEquals(car.engine instanceof CapuletEngine, true);
  assertEquals(car.battery instanceof NubbinBattery, true);
  assertEquals(car.tires instanceof CarriganTire, true);
});