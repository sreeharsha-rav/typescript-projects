import { assertEquals } from "jsr:@std/assert/equals";
import { CarriganTire } from "../../../models/tire/CarriganTire.ts";

Deno.test("CarriganTire - needs service when one tire wear is 0.9", () => {
  const tire = new CarriganTire();
  assertEquals(tire.needsService([0.1, 0.3, 0.5, 0.9]), true);
});

Deno.test("CarriganTire - needs service when one tire wear is greater than 0.9", () => {
  const tire = new CarriganTire();
  assertEquals(tire.needsService([0.1, 0.3, 0.5, 0.95]), true);
});

Deno.test("CarriganTire - doesn't need service when all tire wear is less than 0.9", () => {
  const tire = new CarriganTire();
  assertEquals(tire.needsService([0.1, 0.3, 0.5, 0.8]), false);
});