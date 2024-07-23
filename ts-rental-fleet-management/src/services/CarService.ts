import { Car } from '../models/Car.ts';

/**
 * Provides service-related functionality for cars.
 */
export class CarService {
  /**
   * Determines if a car needs service based on its engine and battery conditions.
   * @param car - The car to check for service.
   * @param mileage - The current mileage of the car.
   * @param lastServiceDate - The date of the last service.
   * @returns True if the car needs service, false otherwise.
   */
  static needsService(car: Car, mileage: number, lastServiceDate: Date): boolean {
    return car.engine.needsService(mileage) || car.battery.needsService(lastServiceDate);
  }
}