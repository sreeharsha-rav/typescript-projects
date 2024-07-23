/**
 * Represents the interface for all battery types.
 */
export interface Battery {
    /**
     * Determines if the battery needs service based on the last service date.
     * @param lastServiceDate - The date of the last battery service.
     * @returns True if the battery needs service, false otherwise.
     */
    needsService(lastServiceDate: Date): boolean;
}