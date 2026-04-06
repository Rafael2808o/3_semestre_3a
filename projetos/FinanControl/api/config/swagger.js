const documentacao = {
    openapi: '3.0.3',
    info: {
        title: 'API FinanControl',
        description: 'Documentação da API FinanControl',
        version: '1.0.0'
    },
    servers: [
        { url: 'http://localhost:3000', description: 'localhost' }
    ],
    tags: [
        { name: 'Usuários', description: 'Operações relacionadas aos usuários' },
        { name: 'Categorias', description: 'Operações relacionadas às categorias' },
        { name: 'Subcategorias', description: 'Operações relacionadas às subcategorias' },
        { name: 'Transações', description: 'Operações relacionadas às transações' },
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
                            "apllication/json": {
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
                description: "Recebe nome, email, senha para cadastrar novo usuário",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Usuario"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Usuário cadastrado com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/usuarios/{id_usuario}": {
            put: {
                tags: ['Usuários'],
                summary: 'Atualizar todos os dados do usuário',
                description: 'Atualiza todos os dados de um usuário existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        description: "ID do usuário a ser atualizado",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Usuario" },
                            example: {
                                nome: "Ricardo Santos",
                                email: "ricardo5@sesisp.com",
                                senha: "senhaAtualizada"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Usuário atualizado com sucesso!"
                    },
                    404: {
                        description: "Usuário não encontrado",
                        content: {
                            "application/json": {
                                example: { message: "Usuário não encontrado" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }

            },
            delete: {
                tags: ['Usuários'],
                summary: 'Remover Usuário',
                description: 'Remove usuário existente pelo ID',
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        description: "ID do usuário a ser removido",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Usuário removido com sucesso!"
                    },
                    404: {
                        description: "Usuário não encontrado",
                        content: {
                            "application/json": {
                                example: { message: "Usuário não encontrado" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }
            },

        },
        "/login": {
            post: {
                tags: ['Autenticação'],
                summary: 'Realizar Login',
                description: "Autentica um usuario e retorna id e nome",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Login_Usuario"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Login realizado com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Resposta_Login"
                                }
                            }
                        }
                    },
                    400: { description: "Email e senha são obrigatorios" },
                    401: { description: "Credenciais inválidas" },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/categorias": {
            get: {
                tags: ["Categorias"],
                summary: "Listar todas as categorias",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
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
                summary: 'Cadastrar nova categoria',
                description: "Recebe nome, descricao, cor, icone, tipo, ativo para cadastrar nova categoria",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Categoria"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Categoria cadastrada com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/categorias/{id_categoria}": {
            put: {
                tags: ['Categorias'],
                summary: 'Atualizar todos os dados da categoria',
                description: 'Atualiza todos os dados de uma categoria existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_categoria",
                        in: "path",
                        required: true,
                        description: "ID da categoria a ser atualizada",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Categoria" },
                            example: {
                                nome: "Transporte",
                                descricao: "Gastos com transporte",
                                cor: "#00FF00",
                                icone: "car",
                                tipo: "D",
                                ativo: true
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Categoria atualizada com sucesso!"
                    },
                    404: {
                        description: "Categoria não encontrada",
                        content: {
                            "application/json": {
                                example: { message: "Categoria não encontrada" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }

            },
            delete: {
                tags: ['Categorias'],
                summary: 'Remover Categoria',
                description: 'Remove categoria existente pelo ID',
                parameters: [
                    {
                        name: "id_categoria",
                        in: "path",
                        required: true,
                        description: "ID da categoria a ser removida",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Categoria removida com sucesso!"
                    },
                    404: {
                        description: "Categoria não encontrada",
                        content: {
                            "application/json": {
                                example: { message: "Categoria não encontrada" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }
            },

        },

        "/subcategorias": {
            get: {
                tags: ["Subcategorias"],
                summary: "Listar todas as subcategorias",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Subcategorias' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Subcategorias'],
                summary: 'Cadastrar nova subcategoria',
                description: "Recebe nome, ativo, id_categoria para cadastrar nova subcategoria",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Subcategoria"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Subcategoria cadastrada com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/subcategorias/{id_subcategoria}": {
            put: {
                tags: ['Subcategorias'],
                summary: 'Atualizar todos os dados da subcategoria',
                description: 'Atualiza todos os dados de uma subcategoria existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_subcategoria",
                        in: "path",
                        required: true,
                        description: "ID da subcategoria a ser atualizada",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Subcategoria" },
                            example: {
                                nome: "Restaurante",
                                ativo: true,
                                id_categoria: 1
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Subcategoria atualizada com sucesso!"
                    },
                    404: {
                        description: "Subcategoria não encontrada",
                        content: {
                            "application/json": {
                                example: { message: "Subcategoria não encontrada" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }

            },
            delete: {
                tags: ['Subcategorias'],
                summary: 'Remover Subcategoria',
                description: 'Remove subcategoria existente pelo ID',
                parameters: [
                    {
                        name: "id_subcategoria",
                        in: "path",
                        required: true,
                        description: "ID da subcategoria a ser removida",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Subcategoria removida com sucesso!"
                    },
                    404: {
                        description: "Subcategoria não encontrada",
                        content: {
                            "application/json": {
                                example: { message: "Subcategoria não encontrada" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }
            },

        },

        "/transacoes": {
            get: {
                tags: ["Transações"],
                summary: "Listar todas as transações",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
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
                summary: 'Cadastrar nova transação',
                description: "Recebe valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria para cadastrar nova transação",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Transacao"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Transação cadastrada com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/transacoes/{id_transacao}": {
            put: {
                tags: ['Transações'],
                summary: 'Atualizar todos os dados da transação',
                description: 'Atualiza todos os dados de uma transação existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_transacao",
                        in: "path",
                        required: true,
                        description: "ID da transação a ser atualizada",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Transacao" },
                            example: {
                                valor: 150.00,
                                descricao: "Compra de supermercado",
                                data_vencimento: "2023-12-01",
                                data_pagamento: "2023-12-01",
                                tipo: "D",
                                id_subcategoria: 1,
                                id_categoria: 1
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Transação atualizada com sucesso!"
                    },
                    404: {
                        description: "Transação não encontrada",
                        content: {
                            "application/json": {
                                example: { message: "Transação não encontrada" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }

            },

            delete: {
                tags: ['Transações'],
                summary: 'Remover Transação',
                description: 'Remove transação existente pelo ID',
                parameters: [
                    {
                        name: "id_transacao",
                        in: "path",
                        required: true,
                        description: "ID da transação a ser removida",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Transação removida com sucesso!"
                    },
                    404: {
                        description: "Transação não encontrada",
                        content: {
                            "application/json": {
                                example: { message: "Transação não encontrada" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }
            },

        },

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
                    email: { type: "string", example: "ricardo2@email.com" },
                    senha: { type: "string", example: "Senha123" },
                    tipo_acesso: { type: "string", example: "admin" }
                }
            },
            Atualizar_Usuario: {
                type: 'object',
                required: ["nome", "email", "senha"],
                properties: {
                    nome: { type: "string", example: "Nina" },
                    email: { type: "string", example: "nina@email.com" },
                    senha: { type: "string", example: "Senha123" },
                    tipo_acesso: { type: "string", example: "admin" }
                }
            },
            Login_Usuario: {
                type: 'object',
                required: true,
                properties: {
                    nome: { type: "string", example: "Ricardo" },
                    email: { type: "string", example: "ricardo2@email.com" },
                    senha: { type: "string", example: "Senha123" }
                }
            },
            Reposta_Login: {
                type: 'object',
                properties: {
                    message: { type: 'string', example: 'Login realizado com sucesso' },
                    usuario: {
                        type: 'object',
                        properties: {
                            id_usuario: { type: "string", example: 1 },
                            nome: { type: "string", example: "Ricardo" },
                        }
                    }
                }
            },
            Listar_Categorias: {
                type: 'object',
                properties: {
                    id_categoria: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Alimentação" },
                    descricao: { type: "string", example: "Gastos com comida" },
                    cor: { type: "string", example: "#FF0000" },
                    icone: { type: "string", example: "food" },
                    tipo: { type: "string", example: "D" },
                    ativo: { type: "boolean", example: true }
                }
            },
            Cadastrar_Categoria: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "Alimentação" },
                    descricao: { type: "string", example: "Gastos com comida" },
                    cor: { type: "string", example: "#FF0000" },
                    icone: { type: "string", example: "food" },
                    tipo: { type: "string", example: "D" },
                    ativo: { type: "boolean", example: true }
                }
            },
            Atualizar_Categoria: {
                type: 'object',
                required: ["nome", "descricao", "cor", "icone", "tipo", "ativo"],
                properties: {
                    nome: { type: "string", example: "Transporte" },
                    descricao: { type: "string", example: "Gastos com transporte" },
                    cor: { type: "string", example: "#00FF00" },
                    icone: { type: "string", example: "car" },
                    tipo: { type: "string", example: "D" },
                    ativo: { type: "boolean", example: true }
                }
            },
            Listar_Subcategorias: {
                type: 'object',
                properties: {
                    id_subcategoria: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Restaurante" },
                    ativo: { type: "boolean", example: true },
                    id_categoria: { type: "integer", example: 1 }
                }
            },
            Cadastrar_Subcategoria: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "Restaurante" },

                    ativo: { type: "boolean", example: true },
                    id_categoria: { type: "integer", example: 1 }
                }
            },
            Atualizar_Subcategoria: {
                type: 'object',
                required: ["nome", "ativo", "id_categoria"],
                properties: {
                    nome: { type: "string", example: "Supermercado" },
                    ativo: { type: "boolean", example: true },
                    id_categoria: { type: "integer", example: 1 }
                }
            },
            Listar_Transacoes: {
                type: 'object',
                properties: {
                    id_transacao: { type: "integer", example: 1 },
                    valor: { type: "number", format: "decimal", example: 150.00 },
                    descricao: { type: "string", example: "Compra de supermercado" },
                    data_vencimento: { type: "string", example: "01/12/2023" },
                    data_pagamento: { type: "string", example: "01/12/2023" },
                    data_registro: { type: "string", example: "01/11/2023" },
                    tipo: { type: "string", enum: ["E", "S"], example: "D" },
                    categoria: { type: "string", example: "Alimentação" },
                    subcategoria: { type: "string", example: "Supermercado" }
                }
            },
            Cadastrar_Transacao: {
                type: 'object',
                required: ["valor", "tipo", "id_categoria"],
                properties: {
                    valor: { type: "number", format: "decimal", example: 150.00 },
                    descricao: { type: "string", example: "Compra de supermercado" },
                    data_vencimento: { type: "string", format: "date", example: "2023-12-01" },
                    data_pagamento: { type: "string", format: "date", example: "2023-12-01" },
                    data_registro: { type: "string", format: "date", example: "2023-11-01" },
                    tipo: { type: "string", example: "D" },
                    id_subcategoria: { type: "integer", example: 1 },
                    id_categoria: { type: "integer", example: 1 }
                }
            },
            Atualizar_Transacao: {
                type: 'object',
                required: ["valor", "tipo", "id_categoria"],
                properties: {
                    valor: { type: "number", format: "decimal", example: 200.00 },
                    descricao: { type: "string", example: "Compra atualizada" },
                    data_vencimento: { type: "string", format: "date", example: "2023-12-01" },
                    data_pagamento: { type: "string", format: "date", example: "2023-12-01" },
                    tipo: { type: "string", example: "D" },
                    id_subcategoria: { type: "integer", example: 1 },
                    id_categoria: { type: "integer", example: 1 }
                }
            }
        }
    }
}
export default documentacao