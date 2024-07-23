import { assertEquals } from "jsr:@std/assert/equals";
import { CarFactory } from "../../factories/CarFactory.ts";
import { CapuletEngine } from "../../models/engine/CapuletEngine.ts";
import { WilloughbyEngine } from "../../models/engine/WilloughbyEngine.ts";
import { SternmanEngine } from "../../models/engine/SternmanEngine.ts";
import { SpindlerBattery } from "../../models/battery/SpindlerBattery.ts";
import { NubbinBattery } from "../../models/battery/NubbinBattery.ts";

Deno.test("CarFactory - creates Calliope with correct engine and battery", () => {
  const car = CarFactory.createCalliope(new Date(), new Date(), 0, 0);
  assertEquals(car.engine instanceof CapuletEngine, true);
  assertEquals(car.battery instanceof SpindlerBattery, true);
});

Deno.test("CarFactory - creates Glissade with correct engine and battery", () => {
  const car = CarFactory.createGlissade(new Date(), new Date(), 0, 0);
  assertEquals(car.engine instanceof WilloughbyEngine, true);
  assertEquals(car.battery instanceof SpindlerBattery, true);
});

Deno.test("CarFactory - creates Palindrome with correct engine and battery", () => {
  const car = CarFactory.createPalindrome(new Date(), new Date(), false);
  assertEquals(car.engine instanceof SternmanEngine, true);
  assertEquals(car.battery instanceof SpindlerBattery, true);
});

Deno.test("CarFactory - creates Rorschach with correct engine and battery", () => {
  const car = CarFactory.createRorschach(new Date(), new Date(), 0, 0);
  assertEquals(car.engine instanceof WilloughbyEngine, true);
  assertEquals(car.battery instanceof NubbinBattery, true);
});

Deno.test("CarFactory - creates Thovex with correct engine and battery", () => {
  const car = CarFactory.createThovex(new Date(), new Date(), 0, 0);
  assertEquals(car.engine instanceof CapuletEngine, true);
  assertEquals(car.battery instanceof NubbinBattery, true);
});