import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // Delete all existing data
    await prisma.caption.deleteMany();
    await prisma.image.deleteMany();
    await prisma.user.deleteMany();

    // Seed fresh data
    
    // Create users
    const user1 = await prisma.user.create({
        data: {
            username: "alice",
            password: await bcrypt.hash("password123", 10),
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: "bob",
            password: await bcrypt.hash("password456", 10),
        },
    });

    // Create photos
    const image1 = await prisma.image.create({
        data: {
            url: 'https://picsum.photos/id/237/500',
        },
    });

    const image2 = await prisma.image.create({
        data: {
            url: 'https://picsum.photos/id/12/500',
        },
    });

    // Create captions
    await prisma.caption.createMany({
        data: [
            {
                text: "A cute dog",
                userId: user1.id,
                imageId: image1.id,
            },
            {
                text: "A rocky beach",
                userId: user2.id,
                imageId: image2.id,
            },
        ],
    });

    console.log("🌱 Database has been seeded. 🌱");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });