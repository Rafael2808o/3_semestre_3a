const documentacao = {
    // gyf
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
        { url: 'https://api-financontrol-sooty.vercel.app', description: 'Render' }

    ],
    security: [
        { bearerAuth: [] }
    ],
tags: [
    { name: 'Autenticação', description: 'Autenticação e login do sistema' },
    { name: 'Usuários', description: 'Operações relacionadas aos usuários' },
    { name: 'Categorias', description: 'Operações relacionadas às categorias' },
    { name: 'Subcategorias', description: 'Operações relacionadas às subcategorias' },
    { name: 'Transações', description: 'Operações relacionadas às transações' },
    { name: 'Dashboard', description: 'Indicadores e relatórios financeiros' }
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
                security: [{ bearerAuth: [] }],
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
                security: [],
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

        "/categorias/{id_categoria}": {
            put: {
                tags: ['Categorias'],
                summary: 'Atualizar categoria',
                parameters: [{
                    name: "id_categoria",
                    in: "path",
                    required: true,
                    schema: { type: 'integer', example: 1 }
                }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Categoria" }
                        }
                    }
                },
                responses: {
                    200: { description: "Categoria atualizada com sucesso" },
                    404: { description: "Categoria não encontrada" },
                    500: { description: "Erro ao atualizar categoria" }
                }
            },
            patch: {
                tags: ['Categorias'],
                summary: 'Atualizar parcialmente categoria',
                parameters: [{
                    name: "id_categoria",
                    in: "path",
                    required: true,
                    schema: { type: 'integer', example: 1 }
                }],
                requestBody: {
                    required: false,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Categoria" }
                        }
                    }
                },
                responses: {
                    200: { description: "Categoria atualizada parcialmente com sucesso" },
                    404: { description: "Categoria não encontrada" },
                    500: { description: "Erro ao atualizar categoria" }
                }
            },
            delete: {
                tags: ['Categorias'],
                summary: 'Remover categoria',
                parameters: [{
                    name: "id_categoria",
                    in: "path",
                    required: true,
                    schema: { type: 'integer', example: 1 }
                }],
                responses: {
                    200: { description: "Categoria removida com sucesso" },
                    404: { description: "Categoria não encontrada" },
                    500: { description: "Erro ao remover categoria" }
                }
            }
        },

        "/subcategorias": {
            get: {
                tags: ["Subcategorias"],
                summary: "Listar todas as subcategorias",
                responses: {
                    200: {
                        description: "Subcategorias listadas com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Subcategorias' }
                                }
                            }
                        }
                    },
                    500: { description: "Erro ao listar subcategorias" }
                }
            },
            post: {
                tags: ['Subcategorias'],
                summary: 'Cadastrar nova subcategoria',
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastrar_Subcategoria" }
                        }
                    }
                },
                responses: {
                    201: { description: "Subcategoria cadastrada com sucesso" },
                    500: { description: "Erro ao cadastrar subcategoria" }
                }
            }
        },

        "/subcategorias/{id_subcategoria}": {
            put: {
                tags: ['Subcategorias'],
                summary: 'Atualizar subcategoria',
                parameters: [{
                    name: "id_subcategoria",
                    in: "path",
                    required: true,
                    schema: { type: 'integer', example: 1 }
                }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Subcategoria" }
                        }
                    }
                },
                responses: {
                    200: { description: "Subcategoria atualizada com sucesso" },
                    404: { description: "Subcategoria não encontrada" },
                    500: { description: "Erro ao atualizar subcategoria" }
                }
            },
            patch: {
                tags: ['Subcategorias'],
                summary: 'Atualizar parcialmente subcategoria',
                parameters: [{
                    name: "id_subcategoria",
                    in: "path",
                    required: true,
                    schema: { type: 'integer', example: 1 }
                }],
                requestBody: {
                    required: false,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Subcategoria" }
                        }
                    }
                },
                responses: {
                    200: { description: "Subcategoria atualizada parcialmente com sucesso" },
                    404: { description: "Subcategoria não encontrada" },
                    500: { description: "Erro ao atualizar subcategoria" }
                }
            },
            delete: {
                tags: ['Subcategorias'],
                summary: 'Remover subcategoria',
                parameters: [{
                    name: "id_subcategoria",
                    in: "path",
                    required: true,
                    schema: { type: 'integer', example: 1 }
                }],
                responses: {
                    200: { description: "Subcategoria removida com sucesso" },
                    404: { description: "Subcategoria não encontrada" },
                    500: { description: "Erro ao remover subcategoria" }
                }
            }
        },

        "/transacoes": {
            get: {
                tags: ["Transações"],
                summary: "Listar transações",
                security: [{ bearerAuth: [] }],
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
                security: [{ bearerAuth: [] }],
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
                security: [{ bearerAuth: [] }],
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
                security: [{ bearerAuth: [] }],
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
                security: [{ bearerAuth: [] }],
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
"/dashboard": {
    get: {
        tags: ["Dashboard"],
        summary: "Obter dados completos do dashboard",
        description: "Retorna resumo financeiro, gastos por categoria, maiores gastos, extrato, últimas transações e evolução semanal",
        security: [{ bearerAuth: [] }],
        responses: {
            200: {
                description: "Dados obtidos com sucesso",
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                resumoMesAtual: {
                                    type: "object",
                                    properties: {
                                        entradas: {
                                            type: "number",
                                            example: 5000.00
                                        },
                                        saidas: {
                                            type: "number",
                                            example: 2500.00
                                        },
                                        saldo: {
                                            type: "number",
                                            example: 2500.00
                                        }
                                    }
                                },
                                gastosPorCategoria: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            categoria: {
                                                type: "string",
                                                example: "Alimentação"
                                            },
                                            total: {
                                                type: "number",
                                                example: 1200.00
                                            }
                                        }
                                    }
                                },
                                maioresGastos: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            descricao: {
                                                type: "string",
                                                example: "Aluguel"
                                            },
                                            valor: {
                                                type: "number",
                                                example: 1800.00
                                            }
                                        }
                                    }
                                },
                                extrato: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            descricao: {
                                                type: "string",
                                                example: "Mercado"
                                            },
                                            valor: {
                                                type: "number",
                                                example: 150.00
                                            },
                                            tipo: {
                                                type: "string",
                                                example: "D"
                                            },
                                            data_registro: {
                                                type: "string",
                                                example: "2026-05-26T10:30:00.000Z"
                                            }
                                        }
                                    }
                                },
                                ultimasTransacoes: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            descricao: {
                                                type: "string",
                                                example: "Salário"
                                            },
                                            valor: {
                                                type: "number",
                                                example: 3000.00
                                            },
                                            tipo: {
                                                type: "string",
                                                example: "R"
                                            },
                                            data_registro: {
                                                type: "string",
                                                example: "2026-05-26T10:30:00.000Z"
                                            }
                                        }
                                    }
                                },
                                evolucao: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            semana: {
                                                type: "string",
                                                example: "2026-05-04T00:00:00.000Z"
                                            },
                                            entradas: {
                                                type: "number",
                                                example: 4000.00
                                            },
                                            saidas: {
                                                type: "number",
                                                example: 2500.00
                                            },
                                            saldo: {
                                                type: "number",
                                                example: 1500.00
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            401: {
                description: "Token inválido ou não informado"
            },
            500: {
                description: "Erro interno do servidor"
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
                    id_usuario: { type: "integer", example: 1 },
                    nome: { type: "string", example: "João Silva" },
                    email: { type: "string", example: "joao.silva@email.com" },
                    ativo: { type: "boolean", example: true }
                }
            },

            Cadastrar_Usuario: {
                type: 'object',
                required: ['nome', 'email', 'senha'],
                properties: {
                    nome: { type: "string", example: "João Silva" },
                    email: { type: "string", example: "joao.silva@email.com" },
                    senha: { type: "string", example: "senha123456" }
                }
            },

            Atualizar_Usuario: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "João Silva Santos" },
                    email: { type: "string", example: "joao.silva.santos@email.com" },
                    senha: { type: "string", example: "novaSenha123456" }
                }
            },

            Login_Usuario: {
                type: 'object',
                required: ['email', 'senha'],
                properties: {
                    email: { type: "string", example: "joao.silva@email.com" },
                    senha: { type: "string", example: "senha123456" }
                }
            },

            Resposta_Login: {
                type: 'object',
                properties: {
                    message: { type: 'string', example: 'Login realizado com sucesso!' },
                    usuario: {
                        type: 'object',
                        properties: {
                            id_usuario: { type: "integer", example: 1 },
                            nome: { type: "string", example: "João Silva" },
                            email: { type: "string", example: "joao.silva@email.com" },
                            ativo: { type: "boolean", example: true }
                        }
                    },
                    token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
                }
            },

            Listar_Categorias: {
                type: 'object',
                properties: {
                    id_categoria: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Alimentação" },
                    descricao: { type: "string", example: "Despesas com alimentos e refeições" },
                    cor: { type: "string", example: "#FF5733" },
                    icone: { type: "string", example: "🍔" },
                    tipo: { type: "string", example: "S", description: "S = saída" },
                    ativo: { type: "boolean", example: true }
                }
            },

            Cadastrar_Categoria: {
                type: 'object',
                required: ['nome', 'cor', 'icone', 'tipo'],
                properties: {
                    nome: { type: "string", example: "Alimentação" },
                    descricao: { type: "string", example: "Despesas com alimentos e refeições" },
                    cor: { type: "string", example: "#FF5733" },
                    icone: { type: "string", example: "🍔" },
                    tipo: { type: "string", enum: ["E", "S"], example: "S", description: "E = entrada, S = saída" },
                    ativo: { type: "boolean", example: true }
                }
            },

            Atualizar_Categoria: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "Alimentação Premium" },
                    descricao: { type: "string", example: "Despesas com alimentos, restaurantes e refeições" },
                    cor: { type: "string", example: "#FF8C42" },
                    icone: { type: "string", example: "🍽️" },
                    tipo: { type: "string", enum: ["E", "S"], example: "S" },
                    ativo: { type: "boolean", example: true }
                }
            },

            Listar_Subcategorias: {
                type: 'object',
                properties: {
                    id_subcategoria: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Alimentação" },
                    ativo: { type: "boolean", example: true },
                    id_categoria: { type: "integer", example: 1 }
                }
            },

            Cadastrar_Subcategoria: {
                type: 'object',
                required: ['nome', 'ativo', 'id_categoria'],
                properties: {
                    nome: { type: "string", example: "Alimentação" },
                    ativo: { type: "boolean", example: true },
                    id_categoria: { type: "integer", example: 1 }
                }
            },

            Atualizar_Subcategoria: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "Alimentação" },
                    ativo: { type: "boolean", example: true },
                    id_categoria: { type: "integer", example: 1 }
                }
            },

            Listar_Transacoes: {
                type: 'object',
                properties: {
                    id_transacao: { type: "integer", example: 1 },
                    valor: { type: "number", example: 150.50 },
                    descricao: { type: "string", example: "Compra no supermercado" },
                    data_registro: { type: "string", example: "26/05/2024" },
                    data_vencimento: { type: "string", example: "26/05/2024" },
                    data_pagamento: { type: "string", example: "26/05/2024" },
                    tipo: { type: "string", enum: ["E", "S"], example: "S", description: "E = entrada, S = saída" },
                    categoria: { type: "string", example: "Alimentação" },
                    subcategoria: { type: "string", example: "Supermercado" }
                }
            },

            Listar_Transacoes_Periodo: {
                type: 'object',
                properties: {
                    id_transacao: { type: "integer", example: 5 },
                    valor: { type: "number", example: 2500.00 },
                    descricao: { type: "string", example: "Aluguel do mês" },
                    data_vencimento: { type: "string", example: "01/06/2024" },
                    data_pagamento: { type: "string", example: "01/06/2024" },
                    data_registro: { type: "string", example: "31/05/2024" },
                    tipo: { type: "string", enum: ["E", "S"], example: "S", description: "E = entrada, S = saída" },
                    categoria: { type: "string", example: "Moradia" },
                    subcategoria: { type: "string", example: "Aluguel" }
                }
            },

            Cadastrar_Transacao: {
                type: 'object',
                required: ['valor', 'tipo'],
                properties: {
                    valor: { type: "number", example: 150.50 },
                    descricao: { type: "string", example: "Supermercado" },
                    data_vencimento: { type: "string", format: "date", example: "2024-06-15" },
                    data_pagamento: { type: "string", format: "date", example: "2024-06-15" },
                    tipo: { type: "string", enum: ["E", "S"], example: "S", description: "E = entrada, S = saída" },
                    id_categoria: { type: "integer", example: 1 },
                    id_subcategoria: { type: "integer", example: 3 }
                }
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    }
};

export default documentacao;