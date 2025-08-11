const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API',
      version: '1.0.0',
      description: 'A simple Express API documented with Swagger',
    },
    components: {
      schemas: {
        Note: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'UUID' },
            title: { type: 'string', description: 'Title of the note' },
            content: { type: 'string', description: 'Content of the note' },
            createdAt: { type: 'string', format: 'date-time', description: 'Created ISO datetime' },
            updatedAt: { type: 'string', format: 'date-time', description: 'Last updated ISO datetime' }
          },
          required: ['id', 'title', 'createdAt', 'updatedAt']
        },
        NoteInput: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'Title of the note' },
            content: { type: 'string', description: 'Content of the note' }
          },
          required: ['title']
        }
      }
    }
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
