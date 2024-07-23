import { Battery } from './Battery.ts';

/**
 * Represents a Nubbin battery.
 */
export class NubbinBattery implements Battery {
  /**
   * Determines if the Nubbin battery needs service based on the last service date.
   * @param lastServiceDate - The date of the last battery service.
   * @returns True if the battery needs service (more than 4 years since last service), false otherwise.
   */
  needsService(lastServiceDate: Date): boolean {
    const serviceThresholdDate = new Date(lastServiceDate);
    serviceThresholdDate.setFullYear(serviceThresholdDate.getFullYear() + 4);
    return serviceThresholdDate < new Date();
  }
}