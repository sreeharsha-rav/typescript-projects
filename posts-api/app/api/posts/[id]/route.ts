import { NextResponse, NextRequest } from "next/server";
import PrismaService from "@/app/lib/prisma";

// Initialize Prisma service instance
const postsService = new PrismaService();

// Get post by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const post = await postsService.getPost(id);
    if (post) {
        return NextResponse.json(post);
    } else {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.error();
  }
}

// Update a post by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { title, description } = await req.json();
    const post = await postsService.updatePost(id, title, description);
    if (post) {
        return NextResponse.json(post);
    } else {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.error();
  }
}

// Delete a post by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const post = await postsService.deletePost(id);
    if (post) {
        return NextResponse.json(post);
    } else {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.error();
  }
}