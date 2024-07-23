import { Tire } from "./Tire.ts";

/**
 * Represents Carrigan tires.
 * These tires need service when any tire's wear is 0.9 or greater.
 */
export class CarriganTire implements Tire {
  /**
   * Determines if the Carrigan tires need service based on their wear.
   * @param tireWear An array of four numbers between 0 and 1, representing the wear of each tire.
   * @returns True if any tire's wear is 0.9 or greater, false otherwise.
   */
  needsService(tireWear: number[]): boolean {
    return tireWear.some(wear => wear >= 0.9);
  }
}