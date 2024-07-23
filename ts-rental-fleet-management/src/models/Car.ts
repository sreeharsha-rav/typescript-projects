/**
 * Represents a car in the rental fleet.
 */
import { Engine } from "./engine/Engine.ts";
import { Battery } from "./battery/Battery.ts";

export class Car {
  /**
   * Creates a new Car instance.
   * @param engine - The car's engine.
   * @param battery - The car's battery.
   */
  constructor(public engine: Engine, public battery: Battery) {}
}