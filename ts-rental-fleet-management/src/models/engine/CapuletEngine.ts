import { Engine } from './Engine.ts';

/**
 * Represents a Capulet engine.
 */
export class CapuletEngine implements Engine {
  /**
   * Determines if the Capulet engine needs service based on mileage.
   * @param mileage - The current mileage of the car.
   * @returns True if the engine needs service (mileage >= 30,000), false otherwise.
   */
  needsService(mileage: number): boolean {
    return mileage >= 30000;
  }
}