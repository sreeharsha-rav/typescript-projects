import { assertEquals } from "jsr:@std/assert/equals";
import { SpindlerBattery } from "../../../models/battery/SpindlerBattery.ts";

Deno.test("SpindlerBattery - needs service after 2 years", () => {
  const battery = new SpindlerBattery();
  const currentDate = new Date();
  const lastServiceDate = new Date(currentDate);
  lastServiceDate.setFullYear(lastServiceDate.getFullYear() - 2);
  lastServiceDate.setDate(lastServiceDate.getDate() - 1);
  
  assertEquals(battery.needsService(lastServiceDate), true);
});

Deno.test("SpindlerBattery - doesn't need service before 2 years", () => {
  const battery = new SpindlerBattery();
  const currentDate = new Date();
  const lastServiceDate = new Date(currentDate);
  lastServiceDate.setFullYear(lastServiceDate.getFullYear() - 1);
  
  assertEquals(battery.needsService(lastServiceDate), false);
});