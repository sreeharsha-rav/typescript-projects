/**
 * Represents the common interface for all types of car tires.
 */
export interface Tire {
    /**
     * Determines if the tires need service based on their wear.
     * @param tireWear An array of four numbers between 0 and 1, representing the wear of each tire.
     * @returns True if the tires need service, false otherwise.
     */
    needsService(tireWear: number[]): boolean;
}