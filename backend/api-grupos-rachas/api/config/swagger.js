const documentacao = {
    openapi: '3.0.3',
    info: {
        title: 'API Grupos & Rachas',
        description: 'API para gerenciar grupos e atividades compartilhadas com amigos. Crie grupos e organize atividades como racha de futebol, grupos de estudos e vaquinhas.',
        version: '1.0.0',
        contact: {
            name: 'Suporte',
            email: 'suporte@gruposrachas.com'
        },
        license: {
            name: 'MIT'
        }
    },
    servers: [
        { url: 'http://localhost:3000', description: 'Desenvolvimento' },
        { url: 'https://api.gruposrachas.com', description: 'Produção' }
    ],
    tags: [
        { name: 'Autenticação', description: 'Registro e login de usuários' },
        { name: 'Usuários', description: 'Operações relacionadas aos usuários' },
        { name: 'Categorias', description: 'Operações relacionadas às categorias de grupos' },
        { name: 'Grupos', description: 'Operações relacionadas aos grupos' },
        { name: 'Membros', description: 'Operações de participação em grupos' }
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
                tags: ['Autenticação'],
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
                        description: "Usuário encontrado",
                        content: {
                            "application/json": {
                                schema: { $ref: '#/components/schemas/Listar_Usuarios' }
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

        "/login": {
            post: {
                tags: ['Autenticação'],
                summary: 'Fazer login',
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
                    },
                    401: { description: "Credenciais inválidas" }
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
                    201: { description: "Categoria criada com sucesso" }
                }
            }
        },

        "/categorias/{id}": {
            put: {
                tags: ['Categorias'],
                summary: 'Atualizar categoria',
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
                            schema: { $ref: "#/components/schemas/Cadastrar_Categoria" }
                        }
                    }
                },
                responses: {
                    200: { description: "Categoria atualizada com sucesso!" }
                }
            },
            delete: {
                tags: ['Categorias'],
                summary: 'Remover categoria',
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: 'integer' }
                }],
                responses: {
                    200: { description: "Categoria removida com sucesso!" }
                }
            }
        },

        "/grupos": {
            get: {
                tags: ["Grupos"],
                summary: "Listar grupos ativos",
                parameters: [
                    {
                        name: "categoria_id",
                        in: "query",
                        schema: { type: 'integer' },
                        description: "Filtrar por categoria"
                    },
                    {
                        name: "com_vagas",
                        in: "query",
                        schema: { type: 'boolean' },
                        description: "Mostrar apenas grupos com vagas disponíveis"
                    }
                ],
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Grupos' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Grupos'],
                summary: 'Criar novo grupo',
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Criar_Grupo" }
                        }
                    }
                },
                responses: {
                    201: { description: "Grupo criado com sucesso" }
                }
            }
        },

        "/grupos/{id}": {
            get: {
                tags: ['Grupos'],
                summary: 'Obter detalhes do grupo',
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: 'integer' }
                }],
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: { $ref: '#/components/schemas/Listar_Grupos' }
                            }
                        }
                    }
                }
            },
            put: {
                tags: ['Grupos'],
                summary: 'Atualizar grupo (apenas criador)',
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: 'integer' }
                }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Grupo" }
                        }
                    }
                },
                responses: {
                    200: { description: "Grupo atualizado com sucesso!" }
                }
            }
        },

        "/grupos/{id}/encerrar": {
            post: {
                tags: ['Grupos'],
                summary: 'Encerrar grupo (apenas criador)',
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: 'integer' }
                }],
                responses: {
                    200: { description: "Grupo encerrado com sucesso!" }
                }
            }
        },

        "/grupos/{id}/membros": {
            get: {
                tags: ['Membros'],
                summary: 'Listar membros de um grupo',
                parameters: [{
                    name: "id",
                    in: "path",
                    required: true,
                    schema: { type: 'integer' }
                }],
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Membros' }
                                }
                            }
                        }
                    }
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
                    nome: { type: "string", example: "Pedro" },
                    email: { type: "string", example: "pedro@email.com" },
                    criado_em: { type: "string", format: "date-time" }
                }
            },

            Cadastrar_Usuario: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "Pedro Silva" },
                    email: { type: "string", example: "pedro@email.com" },
                    senha: { type: "string", example: "senha123" }
                },
                required: ['nome', 'email', 'senha']
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
                },
                required: ['email', 'senha']
            },

            Resposta_Login: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    usuario: {
                        type: 'object',
                        properties: {
                            id: { type: "integer" },
                            nome: { type: "string" }
                        }
                    }
                }
            },

            Listar_Categorias: {
                type: 'object',
                properties: {
                    id: { type: "integer" },
                    nome: { type: "string", example: "esporte" }
                }
            },

            Cadastrar_Categoria: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "esporte" }
                },
                required: ['nome']
            },

            Listar_Grupos: {
                type: 'object',
                properties: {
                    id: { type: "integer" },
                    nome: { type: "string" },
                    descricao: { type: "string" },
                    vagas: { type: "integer" },
                    ativo: { type: "boolean" },
                    categoria_id: { type: "integer" },
                    criador_id: { type: "integer" },
                    criado_em: { type: "string", format: "date-time" }
                }
            },

            Criar_Grupo: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "Racha de Futebol" },
                    descricao: { type: "string", example: "Racha de futebol aos domingos" },
                    vagas: { type: "integer", example: 11 },
                    categoria_id: { type: "integer", example: 1 },
                    usuario_id: { type: "integer", example: 1 }
                },
                required: ['nome', 'vagas', 'categoria_id', 'usuario_id']
            },

            Atualizar_Grupo: {
                type: 'object',
                properties: {
                    nome: { type: "string" },
                    descricao: { type: "string" },
                    vagas: { type: "integer" }
                }
            },

            Listar_Membros: {
                type: 'object',
                properties: {
                    id: { type: "integer" },
                    usuario_id: { type: "integer" },
                    grupo_id: { type: "integer" },
                    nome_usuario: { type: "string" },
                    papel: { type: "string", example: "dono" },
                    entrou_em: { type: "string", format: "date-time" }
                }
            }
        }
    }
};

export default documentacao;
