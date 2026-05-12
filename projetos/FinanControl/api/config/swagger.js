const documentacao = {
    openapi: '3.0.3',
    info: {
        title: 'API FinanControl',
        description: 'API para gerenciar finanças pessoais com suporte a usuários, categorias, subcategorias e transações',
        version: '1.0.0',
        contact: {
            name: 'Suporte FinanControl',
            email: 'suporte@financecontrol.com'
        },
        license: {
            name: 'MIT'
        }
    },
    servers: [
        { url: 'http://localhost:3000', description: 'Desenvolvimento' },
        { url: 'https://api.financecontrol.com', description: 'Produção' }
    ],
    tags: [
        { name: 'Autenticação', description: 'Autenticação e login do sistema' },
        { name: 'Usuários', description: 'Operações relacionadas aos usuários' },
        { name: 'Categorias', description: 'Operações relacionadas às categorias' },
        { name: 'Subcategorias', description: 'Operações relacionadas às subcategorias' },
        { name: 'Transações', description: 'Operações relacionadas às transações' }
    ],
    paths: {
        "/usuarios": {
            get: {
                tags: ["Usuários"],
                summary: "Listar todos os usuários",
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

        "/usuarios/{id_usuario}": {
            put: {
                tags: ['Usuários'],
                summary: 'Atualizar usuário',
                parameters: [{
                    name: "id_usuario",
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
                    name: "id_usuario",
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

        "/login": {
            post: {
                tags: ['Autenticação'],
                summary: 'Login',
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Login_Usuario" }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Login realizado com sucesso!",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Resposta_Login" }
                            }
                        }
                    }
                }
            }
        },

        "/categorias": {
            get: {
                tags: ["Categorias"],
                summary: "Listar categorias",
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Categorias' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Categorias'],
                summary: 'Cadastrar categoria',
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastrar_Categoria" }
                        }
                    }
                },
                responses: {
                    201: { description: "Categoria criada" }
                }
            }
        },

        "/transacoes": {
            get: {
                tags: ["Transações"],
                summary: "Listar transações",
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Transacoes' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Transações'],
                summary: 'Cadastrar transação',
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastrar_Transacao" }
                        }
                    }
                },
                responses: {
                    201: { description: "Transação cadastrada" }
                }
            }
        },

        "/transacoes/tipo/{tipo}": {
            get: {
                tags: ['Transações'],
                summary: 'Filtrar por tipo',
                description: 'E = entrada | S = saída',
                parameters: [{
                    name: "tipo",
                    in: "path",
                    required: true,
                    schema: {
                        type: "string",
                        enum: ["E", "S"],
                        example: "E"
                    }
                }],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Listar_Transacoes" }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Tipo inválido"
                    }
                }
            }
        },
        "/transacoes/categoria/{id_categoria}": {
            get: {
                tags: ['Transações'],
                summary: 'Filtrar transações por categoria',
                parameters: [{
                    name: 'id_categoria',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'integer',
                        example: 1
                    }
                }],
                responses: {
                    200: {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Listar_Transacoes' }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/transacoes/subcategoria/{id_subcategoria}": {
            get: {
                tags: ['Transações'],
                summary: 'Filtrar transações por subcategoria',
                parameters: [{
                    name: 'id_subcategoria',
                    in: 'path',
                    required: true,
                    schema: {
                        type: 'integer',
                        example: 1
                    }
                }],
                responses: {
                    200: {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Listar_Transacoes' }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/transacoes/periodo": {
            get: {
                tags: ['Transações'],
                summary: 'Filtrar transações por período',
                parameters: [
                    {
                        name: 'data_inicio',
                        in: 'query',
                        required: true,
                        schema: {
                            type: 'string',
                            format: 'date',
                            example: '2024-01-01'
                        },
                        description: 'Data de início (YYYY-MM-DD)'
                    },
                    {
                        name: 'data_fim',
                        in: 'query',
                        required: true,
                        schema: {
                            type: 'string',
                            format: 'date',
                            example: '2024-12-31'
                        },
                        description: 'Data de fim (YYYY-MM-DD)'
                    }
                ],
                responses: {
                    200: {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Listar_Transacoes_Periodo' }
                                }
                            }
                        }
                    },
                    400: {
                        description: 'Data de início e data de fim são obrigatórias'
                    },
                    500: {
                        description: 'Erro ao listar transações por período'
                    }
                }
            }
        }
    },
    "/transacoes/agendar": {
        post: {
            tags: ['Transações'],
            summary: 'Agendar transação',
            description: 'Permite agendar uma transação para uma data futura, com opção de definir data de vencimento e pagamento',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Cadastrar_Transacao' }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Transação agendada com sucesso'
                },
                400: {
                    description: 'Dados inválidos para agendamento da transação'
                }
            }
        }
    },


    components: {
        schemas: {
            Listar_Usuarios: {
                type: 'object',
                properties: {
                    id: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Ricardo" },
                    email: { type: "string", example: "ricardo@email.com" }
                }
            },

            Cadastrar_Usuario: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "Ricardo" },
                    email: { type: "string", example: "ricardo@email.com" },
                    senha: { type: "string", example: "123456" },
                    tipo_acesso: { type: "string", example: "admin" }
                }
            },

            Atualizar_Usuario: {
                type: 'object',
                properties: {
                    nome: { type: "string" },
                    email: { type: "string" },
                    senha: { type: "string" }
                }
            },

            Login_Usuario: {
                type: 'object',
                properties: {
                    email: { type: "string" },
                    senha: { type: "string" }
                }
            },

            Resposta_Login: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    usuario: {
                        type: 'object',
                        properties: {
                            id_usuario: { type: "integer" },
                            nome: { type: "string" }
                        }
                    }
                }
            },

            Listar_Categorias: {
                type: 'object',
                properties: {
                    id_categoria: { type: "integer" },
                    nome: { type: "string" },
                    tipo: { type: "string", example: "S" }
                }
            },

            Listar_Transacoes: {
                type: 'object',
                properties: {
                    id_transacao: { type: "integer" },
                    valor: { type: "number" },
                    descricao: { type: "string" },
                    tipo: { type: "string", enum: ["E", "S"], example: "S" },
                    categoria: { type: "string" },
                    subcategoria: { type: "string" }
                }
            },

            Listar_Transacoes_Periodo: {
                type: 'object',
                properties: {
                    id_transacao: { type: "integer" },
                    valor: { type: "number" },
                    descricao: { type: "string" },
                    data_vencimento: { type: "string", example: "01/01/2024" },
                    data_pagamento: { type: "string", example: "01/01/2024" },
                    data_registro: { type: "string", example: "01/01/2024" },
                    tipo: { type: "string", enum: ["E", "S"], example: "S" },
                    categoria: { type: "string" },
                    subcategoria: { type: "string" }
                }
            },

            Cadastrar_Transacao: {
                type: 'object',
                properties: {
                    valor: { type: "number" },
                    tipo: { type: "string", example: "E" },
                    id_categoria: { type: "integer" }
                }
            }
        }
    }
};

export default documentacao;