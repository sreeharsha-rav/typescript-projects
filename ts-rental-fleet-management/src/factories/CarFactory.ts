import { Car } from "../models/Car.ts";
import { CapuletEngine } from "../models/engine/CapuletEngine.ts";
import { WilloughbyEngine } from "../models/engine/WilloughbyEngine.ts";
import { SternmanEngine } from "../models/engine/SternmanEngine.ts";
import { SpindlerBattery } from "../models/battery/SpindlerBattery.ts";
import { NubbinBattery } from "../models/battery/NubbinBattery.ts";
import { CarriganTire } from "../models/tire/CarriganTire.ts";
import { OctoprimeTire } from "../models/tire/OctoprimeTire.ts";

/**
 * Factory class for creating different car models.
 */
export class CarFactory {
  /**
   * Creates a Calliope model car.
   * @param currentDate The current date.
   * @param lastServiceDate The date of the last service.
   * @param currentMileage The current mileage of the car.
   * @param lastServiceMileage The mileage at the last service.
   * @param tireWear An array of four numbers between 0 and 1, representing the wear of each tire.
   * @returns A new Calliope model car.
   */
  static createCalliope(currentDate: Date, lastServiceDate: Date, currentMileage: number, lastServiceMileage: number, tireWear: number[]): Car {
    const engine = new CapuletEngine();
    const battery = new SpindlerBattery();
    const tires = new CarriganTire();
    return new Car(engine, battery, tires);
  }

  /**
   * Creates a Glissade model car.
   * @param currentDate The current date.
   * @param lastServiceDate The date of the last service.
   * @param currentMileage The current mileage of the car.
   * @param lastServiceMileage The mileage at the last service.
   * @param tireWear An array of four numbers between 0 and 1, representing the wear of each tire.
   * @returns A new Glissade model car.
   */
  static createGlissade(currentDate: Date, lastServiceDate: Date, currentMileage: number, lastServiceMileage: number, tireWear: number[]): Car {
    const engine = new WilloughbyEngine();
    const battery = new SpindlerBattery();
    const tires = new OctoprimeTire();
    return new Car(engine, battery, tires);
  }

  /**
   * Creates a Palindrome model car.
   * @param currentDate The current date.
   * @param lastServiceDate The date of the last service.
   * @param warningLightOn Whether the warning light is on.
   * @param tireWear An array of four numbers between 0 and 1, representing the wear of each tire.
   * @returns A new Palindrome model car.
   */
  static createPalindrome(currentDate: Date, lastServiceDate: Date, warningLightOn: boolean, tireWear: number[]): Car {
    const engine = new SternmanEngine(warningLightOn);
    const battery = new SpindlerBattery();
    const tires = new CarriganTire();
    return new Car(engine, battery, tires);
  }

  /**
   * Creates a Rorschach model car.
   * @param currentDate The current date.
   * @param lastServiceDate The date of the last service.
   * @param currentMileage The current mileage of the car.
   * @param lastServiceMileage The mileage at the last service.
   * @param tireWear An array of four numbers between 0 and 1, representing the wear of each tire.
   * @returns A new Rorschach model car.
   */
  static createRorschach(currentDate: Date, lastServiceDate: Date, currentMileage: number, lastServiceMileage: number, tireWear: number[]): Car {
    const engine = new WilloughbyEngine();
    const battery = new NubbinBattery();
    const tires = new OctoprimeTire();
    return new Car(engine, battery, tires);
  }

  /**
   * Creates a Thovex model car.
   * @param currentDate The current date.
   * @param lastServiceDate The date of the last service.
   * @param currentMileage The current mileage of the car.
   * @param lastServiceMileage The mileage at the last service.
   * @param tireWear An array of four numbers between 0 and 1, representing the wear of each tire.
   * @returns A new Thovex model car.
   */
  static createThovex(currentDate: Date, lastServiceDate: Date, currentMileage: number, lastServiceMileage: number, tireWear: number[]): Car {
    const engine = new CapuletEngine();
    const battery = new NubbinBattery();
    const tires = new CarriganTire();
    return new Car(engine, battery, tires);
  }
}