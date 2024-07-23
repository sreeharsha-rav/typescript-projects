import { assertEquals } from "jsr:@std/assert/equals";
import { SternmanEngine } from "../../../models/engine/SternmanEngine.ts";

Deno.test("SternmanEngine - needs service when warning light is on", () => {
  const engine = new SternmanEngine(true);
  assertEquals(engine.needsService(0), true);
});

Deno.test("SternmanEngine - doesn't need service when warning light is off", () => {
  const engine = new SternmanEngine(false);
  assertEquals(engine.needsService(0), false);
});