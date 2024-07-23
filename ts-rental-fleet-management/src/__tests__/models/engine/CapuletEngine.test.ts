import { assertEquals } from "jsr:@std/assert";
import { CapuletEngine } from "../../../models/engine/CapuletEngine.ts";

Deno.test("CapuletEngine - needs service when mileage is 30000", () => {
  const engine = new CapuletEngine();
  assertEquals(engine.needsService(30000), true);
});

Deno.test("CapuletEngine - needs service when mileage is over 30000", () => {
  const engine = new CapuletEngine();
  assertEquals(engine.needsService(30001), true);
});

Deno.test("CapuletEngine - doesn't need service when mileage is under 30000", () => {
  const engine = new CapuletEngine();
  assertEquals(engine.needsService(29999), false);
});