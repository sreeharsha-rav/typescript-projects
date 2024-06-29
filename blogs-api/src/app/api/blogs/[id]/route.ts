import { NextRequest, NextResponse } from "next/server";

export async function GET ({ params }: { params: { id: string } }) {
    const { id } = params;
    return NextResponse.json({"message": "Get a specific blog", id});
}

export async function PUT (request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const { title, content } = await request.json();
    return NextResponse.json({"message": "Update a specific blog", id});
}

export async function DELETE ({ params }: { params: { id: string } }) {
    const { id } = params;
    return NextResponse.json({"message": "Delete a specific blog", id});
}