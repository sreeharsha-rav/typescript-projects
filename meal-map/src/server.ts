import { build } from './app';

// Start the server
const start = async () => {
    const app = await build();
    const port = process.env.PORT || 3000;

    try {
        await app.listen({ port: port as number });
        console.log(`Server listening on http://localhost:${port} 🚀`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();