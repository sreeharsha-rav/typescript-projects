/**
 * Generates a random ID of the specified length.
 * 
 * @param length The length of the generated ID. Default is 8.
 * @returns A string representing the generated ID.
 */
export function generateId(length: number = 8): string {
    return crypto.randomUUID().slice(0, length)
}