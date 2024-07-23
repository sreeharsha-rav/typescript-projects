import { assertEquals } from "jsr:@std/assert/equals";
import { SpindlerBattery } from "../../../models/battery/SpindlerBattery.ts";

Deno.test("SpindlerBattery - needs service after 3 years", () => {
  const battery = new SpindlerBattery();
  const currentDate = new Date();
  const lastServiceDate = new Date(currentDate);
  lastServiceDate.setFullYear(lastServiceDate.getFullYear() - 3);
  lastServiceDate.setDate(lastServiceDate.getDate() - 1);
  
  assertEquals(battery.needsService(lastServiceDate), true);
});

Deno.test("SpindlerBattery - doesn't need service before 3 years", () => {
  const battery = new SpindlerBattery();
  const currentDate = new Date();
  const lastServiceDate = new Date(currentDate);
  lastServiceDate.setFullYear(lastServiceDate.getFullYear() - 2);
  lastServiceDate.setDate(lastServiceDate.getDate() + 364);
  
  assertEquals(battery.needsService(lastServiceDate), false);
});