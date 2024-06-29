import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({"message": "Get all blogs"});

}

export async function POST(request: NextRequest) {
    const { title, content } = await request.json();
    return NextResponse.json({"message": "Create a new blog", title, content});
}