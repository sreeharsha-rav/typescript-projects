/**
 * Represents a car in the rental fleet.
 * Each car has an engine, a battery, and tires.
 */
import { Engine } from "./engine/Engine.ts";
import { Battery } from "./battery/Battery.ts";
import { Tire } from "./tire/Tire.ts";

export class Car {
  /**
   * Creates a new Car instance.
   * @param engine - The car's engine.
   * @param battery - The car's battery.
   * @param tire - The car's tires.
   */
  constructor(
    public engine: Engine, 
    public battery: Battery,
    public tires: Tire
  ) {}
}