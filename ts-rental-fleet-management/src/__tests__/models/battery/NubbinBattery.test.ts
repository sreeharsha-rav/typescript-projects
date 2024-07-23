import { assertEquals } from "jsr:@std/assert/equals";
import { NubbinBattery } from "../../../models/battery/NubbinBattery.ts";

Deno.test("NubbinBattery - needs service after 4 years", () => {
  const battery = new NubbinBattery();
  const currentDate = new Date();
  const lastServiceDate = new Date(currentDate);
  lastServiceDate.setFullYear(lastServiceDate.getFullYear() - 4);
  lastServiceDate.setDate(lastServiceDate.getDate() - 1);
  
  assertEquals(battery.needsService(lastServiceDate), true);
});

Deno.test("NubbinBattery - doesn't need service before 4 years", () => {
  const battery = new NubbinBattery();
  const currentDate = new Date();
  const lastServiceDate = new Date(currentDate);
  lastServiceDate.setFullYear(lastServiceDate.getFullYear() - 3);
  
  assertEquals(battery.needsService(lastServiceDate), false);
});