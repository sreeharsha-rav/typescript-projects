import prisma from "@/app/lib/db";
import { NextResponse, NextRequest } from "next/server";

// Get post by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    if (post) {
        return NextResponse.json(post);
    } else {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error fetching post by ID", error }, { status: 500 });
  }
}

// Update a post by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { title, description } = await req.json();
    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
      },
    });

    if (post) {
        return NextResponse.json(post);
    } else {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error updating post", error }, { status: 500 });
  }
}

// Delete a post by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const post = await prisma.post.delete({
      where: {
        id: id,
      },
    });
    
    if (post) {
        return NextResponse.json(post);
    } else {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error deleting post", error }, { status: 500 });
  }
}