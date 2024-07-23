import { Engine } from './Engine.ts';

/**
 * Represents a Sternman engine.
 */
export class SternmanEngine implements Engine {
  /**
   * Creates a new SternmanEngine instance.
   * @param warningLightOn - The state of the warning light.
   */
  constructor(private warningLightOn: boolean) {}

  /**
   * Determines if the Sternman engine needs service based on the warning light.
   * @param mileage - The current mileage of the car (not used for this engine type).
   * @returns True if the warning light is on, false otherwise.
   */
  needsService(mileage: number): boolean {
    return this.warningLightOn;
  }
}