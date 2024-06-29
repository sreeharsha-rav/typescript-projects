import { NextRequest, NextResponse } from "next/server";
import PrismaService from "@/app/lib/prisma";

// Initialize Prisma service instance
const postsService = new PrismaService();

// Get all posts
export async function GET() {
  try {
    const posts = await postsService.getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.error();
  }
}

// Create a post
export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json();
    const post = await postsService.createPost(title, description);
    return NextResponse.json({ message: "Post created", post, status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.error();
  }
}