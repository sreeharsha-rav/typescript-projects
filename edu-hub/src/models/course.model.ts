// src/models/courseModel.ts
export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
}

export const courses: Course[] = [];
