import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const recipes = [
        {
            name: "Spaghetti Carbonara",
            description: "A classic Italian pasta dish made with cream, eggs, Parmesan cheese, bits of bacon, and plenty of black pepper.",
            imageURL: "https://example.com/images/spaghetti-carbonara.jpg"
        },
        {
            name: "Margherita Pizza",
            description: "Simple yet delicious pizza topped with fresh tomatoes, mozzarella cheese, fresh basil, and extra-virgin olive oil.",
            imageURL: "https://example.com/images/margherita-pizza.jpg"
        },
        {
            name: "Caesar Salad",
            description: "Crisp romaine lettuce tossed with traditional Caesar dressing, croutons, and Parmesan cheese.",
            imageURL: "https://example.com/images/caesar-salad.jpg"
        },
        {
            name: "Beef Bourguignon",
            description: "A French stew made with beef braised in red wine, often red Burgundy, and beef broth, typically flavored with carrots, onions, garlic, and a bouquet garni, and garnished with pearl onions, mushrooms, and bacon.",
            imageURL: "https://example.com/images/beef-bourguignon.jpg"
        },
        {
            name: "Chicken Tikka Masala",
            description: "Chunks of grilled chicken (tikka) cooked in a smooth, creamy, and spicy sauce rich in Indian spices and tomato base.",
            imageURL: "https://example.com/images/chicken-tikka-masala.jpg"
        }
    ];

    for (const recipe of recipes) {
        await prisma.recipe.create({
            data: recipe,
        });
    }

    console.log('Seed data inserted successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
