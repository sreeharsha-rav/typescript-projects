import { Battery } from './Battery.ts';

/**
 * Represents a Spindler battery.
 */
export class SpindlerBattery implements Battery {
  /**
   * Determines if the Spindler battery needs service based on the last service date.
   * @param lastServiceDate - The date of the last battery service.
   * @returns True if the battery needs service (more than 3 years since last service), false otherwise.
   */
  needsService(lastServiceDate: Date): boolean {
    const serviceThresholdDate = new Date(lastServiceDate);
    serviceThresholdDate.setFullYear(serviceThresholdDate.getFullYear() + 3);
    return serviceThresholdDate < new Date();
  }
}