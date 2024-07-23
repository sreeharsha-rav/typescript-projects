import { Engine } from './Engine.ts';

/**
 * Represents a Willoughby engine.
 */
export class WilloughbyEngine implements Engine {
  /**
   * Determines if the Willoughby engine needs service based on mileage.
   * @param mileage - The current mileage of the car.
   * @returns True if the engine needs service (mileage >= 60,000), false otherwise.
   */
  needsService(mileage: number): boolean {
    return mileage >= 60000;
  }
}