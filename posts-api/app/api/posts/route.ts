import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";

// Get all posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ message: "Error fetching posts", error }, { status: 500 });
  }
}

// Create a post
export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json();
    const post = await prisma.post.create({
      data: {
        title,
        description,
      },
    });
    return NextResponse.json({ message: "Post created", post, status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ message: "Error creating post", error }, { status: 500 });
  }
}