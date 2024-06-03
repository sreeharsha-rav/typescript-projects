import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Create users
    const user1 = await prisma.user.create({
        data: {
            username: "alice",
            password: "password123",
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: "bob",
            password: "password456",
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