import fastify from "fastify";

const server = fastify();

// Declare a route
server.get("/", async (request, reply) => {
  return "Hello, world!";
});

// Run the server!
server.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});