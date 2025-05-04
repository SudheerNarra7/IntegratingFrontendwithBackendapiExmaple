export default {
  openapi: '3.0.0',
  info: {
    title: 'Node.js API with .NET-like Structure',
    version: '1.0.0',
    description: 'A RESTful API built with Express.js that follows conventions similar to ASP.NET Web API',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'The user ID',
          },
          name: {
            type: 'string',
            description: 'The user name',
          },
          email: {
            type: 'string',
            description: 'The user email',
          },
          role: {
            type: 'string',
            description: 'The user role',
          },
        },
      },
      Product: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'The product ID',
          },
          name: {
            type: 'string',
            description: 'The product name',
          },
          price: {
            type: 'number',
            description: 'The product price',
          },
          description: {
            type: 'string',
            description: 'The product description',
          },
          category: {
            type: 'string',
            description: 'The product category',
          },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address',
          },
          password: {
            type: 'string',
            format: 'password',
            description: 'User password',
          },
        },
      },
      RegisterRequest: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: {
            type: 'string',
            description: 'User full name',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address',
          },
          password: {
            type: 'string',
            format: 'password',
            description: 'User password',
          },
        },
      },
    },
  },
  paths: {
    '/api/v1/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Login to the application',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    token: {
                      type: 'string',
                      description: 'JWT token',
                    },
                    user: {
                      $ref: '#/components/schemas/User',
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Authentication failed',
          },
        },
      },
    },
    '/api/v1/auth/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RegisterRequest',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Registration successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    user: {
                      $ref: '#/components/schemas/User',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Invalid request',
          },
        },
      },
    },
    '/api/v1/users': {
      get: {
        tags: ['Users'],
        summary: 'Get all users',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of users',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/User',
                      },
                    },
                    count: {
                      type: 'integer',
                      description: 'Total number of users',
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
          },
        },
      },
      post: {
        tags: ['Users'],
        summary: 'Create a new user',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'role'],
                properties: {
                  name: {
                    type: 'string',
                    description: 'User name',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    description: 'User email',
                  },
                  role: {
                    type: 'string',
                    description: 'User role',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      $ref: '#/components/schemas/User',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Invalid request',
          },
          '401': {
            description: 'Unauthorized',
          },
        },
      },
    },
    '/api/v1/products': {
      get: {
        tags: ['Products'],
        summary: 'Get all products',
        responses: {
          '200': {
            description: 'List of products',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Product',
                      },
                    },
                    count: {
                      type: 'integer',
                      description: 'Total number of products',
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Products'],
        summary: 'Create a new product',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'price', 'category'],
                properties: {
                  name: {
                    type: 'string',
                    description: 'Product name',
                  },
                  price: {
                    type: 'number',
                    description: 'Product price',
                  },
                  description: {
                    type: 'string',
                    description: 'Product description',
                  },
                  category: {
                    type: 'string',
                    description: 'Product category',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Product created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      $ref: '#/components/schemas/Product',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Invalid request',
          },
          '401': {
            description: 'Unauthorized',
          },
        },
      },
    },
  },
};