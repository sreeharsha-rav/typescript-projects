import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {

    // Seed fresh data: Create users
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