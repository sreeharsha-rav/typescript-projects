// src/models/userModel.ts
export interface User {
  username: string;
  password: string;
  purchasedCourses: number[];
}

export const users: User[] = [];
