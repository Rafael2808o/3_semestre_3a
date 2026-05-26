const documentacao = {
    openapi: '3.0.3',
    info: {
        title: 'API Barbearia',
        description: 'API para gerenciar operações de uma barbearia com suporte a usuários, serviços e agendamentos',
        version: '1.0.0',
        contact: {
            name: 'Suporte Barbearia',
            email: 'suporte@barbearia.com'
        },
        license: {
            name: 'MIT'
        }
    },
    servers: [
        { url: 'https://apibarbearia-rho.vercel.app', description: 'Desenvolvimento' },

    ],
    security: [
        { bearerAuth: [] }
    ],
    tags: [
        { name: 'Usuários', description: 'Operações relacionadas aos usuários' },
        { name: 'Serviços', description: 'Operações relacionadas aos serviços' },
        { name: 'Agendamentos', description: 'Operações relacionadas aos agendamentos' }
    ],
    paths: {
        "/usuarios": {
            get: {
                tags: ["Usuários"],
                summary: "Listar todos os usuários",
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Usuarios' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Usuários'],
                summary: 'Cadastrar novo usuário',
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastrar_Usuario" }
                        }
                    }
                },
                responses: {
                    201: { description: "Usuário cadastrado com sucesso!" },
                    500: { description: "Erro interno no servidor" }
                }
            }
        },
        "/usuarios/login": {
            post: {
                tags: ['Usuários'],
                summary: 'Realizar login',
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: {
                                        type: 'string',
                                        example: 'joao@email.com'
                                    },
                                    senha: {
                                        type: 'string',
                                        example: '123456'
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'Login realizado com sucesso',
                        content: {
                            "application/json": {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: {
                                            type: 'string',
                                            example: 'Login realizado com sucesso'
                                        },
                                        usuario: {
                                            type: 'object',
                                            properties: {
                                                id: {
                                                    type: 'integer',
                                                    example: 1
                                                },
                                                nome: {
                                                    type: 'string',
                                                    example: 'João Silva'
                                                },
                                                email: {
                                                    type: 'string',
                                                    example: 'joao@email.com'
                                                },
                                                tipo: {
                                                    type: 'string',
                                                    example: 'cliente'
                                                }
                                            }
                                        },
                                        token: {
                                            type: 'string',
                                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    401: {
                        description: 'Email ou senha incorretos'
                    },
                    500: {
                        description: 'Erro interno no servidor'
                    }
                }
            }
        },

        "/usuarios/{id}": {
            get: {
                tags: ['Usuários'],
                summary: 'Buscar usuário por ID',
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: 'integer', example: 1 }
                }],
                responses: {
                    200: {
                        description: "Usuário encontrado com sucesso!",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Listar_Usuarios" }
                            }
                        }
                    },
                    404: { description: "Usuário não encontrado" }
                }
            },
            put: {
                tags: ['Usuários'],
                summary: 'Atualizar usuário',
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: 'integer', example: 1 }
                }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Usuario" }
                        }
                    }
                },
                responses: {
                    200: { description: "Usuário atualizado com sucesso!" },
                    404: { description: "Usuário não encontrado" }
                }
            },
            delete: {
                tags: ['Usuários'],
                summary: 'Remover usuário',
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: 'integer', example: 1 }
                }],
                responses: {
                    200: { description: "Usuário removido com sucesso!" },
                    404: { description: "Usuário não encontrado" }
                }
            }
        },
        "/servicos": {
            get: {
                tags: ["Serviços"],
                summary: "Listar todos os serviços",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Servicos' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Serviços'],
                summary: 'Cadastrar novo serviço',
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastrar_Servico" }
                        }
                    }
                },
                responses: {
                    201: { description: "Serviço cadastrado com sucesso!" },
                    500: { description: "Erro interno no servidor" }
                }
            }
        },

        "/servicos/{id}": {
            get: {
                tags: ['Serviços'],
                summary: 'Buscar serviço por ID',
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: 'integer', example: 1 }
                }],
                responses: {
                    200: {
                        description: "Serviço encontrado com sucesso!",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Listar_Servicos" }
                            }
                        }
                    },
                    404: { description: "Serviço não encontrado" }
                }
            },
            put: {
                tags: ['Serviços'],
                summary: 'Atualizar serviço',
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: 'integer', example: 1 }
                }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastrar_Servico" }
                        }
                    }
                },
                responses: {
                    200: { description: "Serviço atualizado com sucesso!" },
                    404: { description: "Serviço não encontrado" }
                }
            },
            delete: {
                tags: ['Serviços'],
                summary: 'Remover serviço',
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: 'integer', example: 1 }
                }],
                responses: {
                    200: { description: "Serviço removido com sucesso!" },
                    404: { description: "Serviço não encontrado" }
                }
            }
        },

        "/agendamentos": {
            get: {
                tags: ["Agendamentos"],
                summary: "Listar todos os agendamentos",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Agendamentos' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Agendamentos'],
                summary: 'Cadastrar novo agendamento',
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastrar_Agendamento" }
                        }
                    }
                },
                responses: {
                    201: { description: "Agendamento cadastrado com sucesso!" },
                    500: { description: "Erro interno no servidor" }
                }
            }
        },

        "/agendamentos/{id}": {
            get: {
                tags: ['Agendamentos'],
                summary: 'Buscar agendamento por ID',
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: 'integer', example: 1 }
                }],
                responses: {
                    200: {
                        description: "Agendamento encontrado com sucesso!",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Listar_Agendamentos" }
                            }
                        }
                    },
                    404: { description: "Agendamento não encontrado" }
                }
            },
            put: {
                tags: ['Agendamentos'],
                summary: 'Atualizar agendamento',
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: 'integer', example: 1 }
                }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastrar_Agendamento" }
                        }
                    }
                },
                responses: {
                    200: { description: "Agendamento atualizado com sucesso!" },
                    404: { description: "Agendamento não encontrado" }
                }
            },
            delete: {
                tags: ['Agendamentos'],
                summary: 'Remover agendamento',
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: 'integer', example: 1 }
                }],
                responses: {
                    200: { description: "Agendamento removido com sucesso!" },
                    404: { description: "Agendamento não encontrado" }
                }
            }
        }
    },

    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        },
        schemas: {
            Listar_Usuarios: {
                type: 'object',
                properties: {
                    id: { type: "integer", example: 1 },
                    nome: { type: "string", example: "João Silva" },
                    email: { type: "string", example: "joao@email.com" },
                    tipo: { type: "string", example: "cliente" }
                }
            },

            Cadastrar_Usuario: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "João Silva" },
                    email: { type: "string", example: "joao@email.com" },
                    senha: { type: "string", example: "123456" },
                    tipo: { type: "string", example: "cliente" }
                }
            },

            Atualizar_Usuario: {
                type: 'object',
                properties: {
                    nome: { type: "string" },
                    email: { type: "string" },
                    senha: { type: "string" },
                    tipo: { type: "string" }
                }
            },

            Listar_Servicos: {
                type: 'object',
                properties: {
                    id: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Corte de cabelo" },
                    descricao: { type: "string", example: "Corte padrão com tesoura" },
                    preco: { type: "number", example: 50.00 }
                }
            },

            Cadastrar_Servico: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "Corte de cabelo" },
                    descricao: { type: "string", example: "Corte padrão com tesoura" },
                    preco: { type: "number", example: 50.00 }
                }
            },

            Listar_Agendamentos: {
                type: 'object',
                properties: {
                    id_agendamento: { type: "integer", example: 1 },
                    id_cliente: { type: "integer", example: 1 },
                    id_barbeiro: { type: "integer", example: 1 },
                    id_servico: { type: "integer", example: 1 },
                    data_hora: { type: "string", format: "date-time", example: "2024-05-10T14:30:00" },
                    preco: { type: "number", example: 50.00 },
                    status: { type: "string", example: "confirmado" }
                }
            },

            Cadastrar_Agendamento: {
                type: 'object',
                required: ['id_cliente', 'id_servico', 'id_barbeiro', 'data_hora', 'status'],
                properties: {
                    id_cliente: { type: "integer", example: 1 },
                    id_servico: { type: "integer", example: 1 },
                    id_barbeiro: { type: "integer", example: 1 },
                    data_hora: { type: "string", format: "date-time", example: "2024-05-10T14:30:00" },
                    status: { type: "string", example: "confirmado" }
                }
            }
        }
    }
};

export default documentacao;