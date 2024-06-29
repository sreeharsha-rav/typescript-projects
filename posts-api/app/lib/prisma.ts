import { PrismaClient } from '@prisma/client';

class PrismaService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    // Get all posts
    async getAllPosts() {
        try {
            return await this.prisma.post.findMany();
        } catch (error) {
            console.error("Error fetching posts:", error);
            return [];
        }
    }

    // Get a single post
    async getPost(id: string) {
        try {
            return await this.prisma.post.findUnique({
                where: { id }
            });
        } catch (error) {
            console.error("Error fetching post:", error);
            return null;
        }
    }

    // Create a post
    async createPost(title: string, description: string) {
        try {
            return await this.prisma.post.create({
                data: {
                    title,
                    description
                },
            });
        } catch (error) {
            console.error("Error creating post:", error);
            return null;
        }
    }

    // Update a post
    async updatePost(id: string, title: string, description: string) {
        try {
            return await this.prisma.post.update({
                where: { id },
                data: {
                    title,
                    description
                }
            });
        } catch (error) {
            console.error("Error updating post:", error);
            return null;
        }
    }

    // Delete a post
    async deletePost(id: string) {
        try {
            return await this.prisma.post.delete({
                where: { id }
            });
        } catch (error) {
            console.error("Error deleting post:", error);
            return null;
        }
    }
}

export default PrismaService;