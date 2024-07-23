import { CarFactory } from "./factories/CarFactory.ts";
import { CarService } from './services/CarService.ts';

/**
 * Main function to demonstrate the usage of the rental fleet management system.
 */
function main() {
  // Set up example dates and mileage
  const currentDate = new Date();
  const lastServiceDate = new Date(currentDate);
  lastServiceDate.setFullYear(lastServiceDate.getFullYear() - 1);
  const currentMileage = 30000;
  const lastServiceMileage = 0;

  // Create a Calliope
  console.log("Creating a Calliope model car...");
  const calliope = CarFactory.createCalliope(currentDate, lastServiceDate, currentMileage, lastServiceMileage);

  // Check if the Calliope needs service
  console.log("Checking if the Calliope needs service...");
  if (CarService.needsService(calliope, currentMileage, lastServiceDate)) {
    console.log("The Calliope needs service.");
  } else {
    console.log("The Calliope does not need service.");
  }

  // Example with a Palindrome
  console.log("\nCreating a Palindrome model car...");
  const palindrome = CarFactory.createPalindrome(currentDate, lastServiceDate, true);

  console.log("Checking if the Palindrome needs service...");
  if (CarService.needsService(palindrome, currentMileage, lastServiceDate)) {
    console.log("The Palindrome needs service.");
  } else {
    console.log("The Palindrome does not need service.");
  }

  // You can add more examples here for other car models
}

// Run the main function
main();