import { Tire } from "./Tire.ts";

/**
 * Represents Octoprime tires.
 * These tires need service when the sum of all tire wear values is 3 or greater.
 */
export class OctoprimeTire implements Tire {
  /**
   * Determines if the Octoprime tires need service based on their wear.
   * @param tireWear An array of four numbers between 0 and 1, representing the wear of each tire.
   * @returns True if the sum of all tire wear values is 3 or greater, false otherwise.
   */
  needsService(tireWear: number[]): boolean {
    return tireWear.reduce((sum, wear) => sum + wear, 0) >= 3;
  }
}