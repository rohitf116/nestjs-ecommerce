import { Injectable } from "@nestjs/common";

@Injectable()
export class OtpService {
  constructor() {}

  generateOtp(): number {
    const min = 100000; // Minimum value (inclusive)
    const max = 999999; // Maximum value (inclusive)

    // Generate a random number between min and max
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNumber;
  }
  generateExpiry() {
    const currentTime = new Date();
    const futureTime = new Date(currentTime.getTime() + 10 * 60000); // Add 10 minutes in milliseconds
    return futureTime;
  }
}
