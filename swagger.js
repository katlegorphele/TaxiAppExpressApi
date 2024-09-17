import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TaxiApp Backend System',
      version: '0.0.1',
      description: 'Test backend system to test data models for taxiApp',
    },
  },
  apis: ['./apiRoutes.js'], // Path to your API routes
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
