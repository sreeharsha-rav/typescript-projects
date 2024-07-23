import { assertEquals } from "jsr:@std/assert/equals";
import { OctoprimeTire } from "../../../models/tire/OctoprimeTire.ts";

Deno.test("OctoprimeTire - needs service when sum of tire wear is 3", () => {
  const tire = new OctoprimeTire();
  assertEquals(tire.needsService([1.0, 0.8, 0.7, 0.5]), true);
});

Deno.test("OctoprimeTire - needs service when sum of tire wear is greater than 3", () => {
  const tire = new OctoprimeTire();
  assertEquals(tire.needsService([1.0, 1.0, 0.8, 0.3]), true);
});

Deno.test("OctoprimeTire - doesn't need service when sum of tire wear is less than 3", () => {
  const tire = new OctoprimeTire();
  assertEquals(tire.needsService([0.8, 0.7, 0.5, 0.9]), false);
});