import { assertEquals } from "jsr:@std/assert/equals";
import { WilloughbyEngine } from "../../../models/engine/WilloughbyEngine.ts";

Deno.test("WilloughbyEngine - needs service when mileage is 60000", () => {
  const engine = new WilloughbyEngine();
  assertEquals(engine.needsService(60000), true);
});

Deno.test("WilloughbyEngine - needs service when mileage is over 60000", () => {
  const engine = new WilloughbyEngine();
  assertEquals(engine.needsService(60001), true);
});

Deno.test("WilloughbyEngine - doesn't need service when mileage is under 60000", () => {
  const engine = new WilloughbyEngine();
  assertEquals(engine.needsService(59999), false);
});