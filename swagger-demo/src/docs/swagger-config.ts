const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Typescript Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Typescript, Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        // contact: {
        //   name: "Harsha",
        //   url: "https://www.harsha.com",
        //   email: "inf.harsha@email.com",
        // },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["src/routes/*.ts"],
};

const specs = swaggerJSDoc(options);

export default specs;