/**
 * Represents the interface for all engine types.
 */
export interface Engine {
    /**
     * Determines if the engine needs service based on mileage.
     * @param mileage - The current mileage of the car.
     * @returns True if the engine needs service, false otherwise.
     */
    needsService(mileage: number): boolean;
}