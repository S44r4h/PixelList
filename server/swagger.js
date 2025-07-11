import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "PixelList-api",
    version: "1.0.0",
    description: "My API Description",
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
