import { build } from './app';
import { config } from './config/environment';

// Start the server
const start = async () => {
    const app = await build();

    try {
        await app.listen({ port: config.port as number, host: config.host });
        app.log.info(`Server listening on ${config.host}:${config.port}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();