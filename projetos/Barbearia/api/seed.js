import { BD } from './db.js';
import bcrypt from 'bcrypt';

const seedDatabase = async () => {
  try {
    console.log('Limpando dados existentes...');

    await BD.query('DELETE FROM agendamentos');
    await BD.query('DELETE FROM usuarios');
    await BD.query('DELETE FROM servicos');

    await BD.query('ALTER SEQUENCE usuarios_id_usuario_seq RESTART WITH 1');
    await BD.query('ALTER SEQUENCE servicos_id_servico_seq RESTART WITH 1');
    await BD.query('ALTER SEQUENCE agendamentos_id_agendamento_seq RESTART WITH 1');

    console.log('Inserindo usuários...');

    const senhas = ['123456', '123456', '123456', '123456'];
    const usuariosData = [
      { nome: 'Ricardo Silva', email: 'ricardo.cliente@email.com', tipo: 'cliente' },
      { nome: 'Ana Oliveira', email: 'ana.cliente@email.com', tipo: 'cliente' },
      { nome: 'Marcos Barbeiro', email: 'marcos.barba@barbearia.com', tipo: 'barbeiro' },
      { nome: 'Felipe Navalha', email: 'felipe.corte@barbearia.com', tipo: 'barbeiro' }
    ];

    for (let i = 0; i < usuariosData.length; i++) {
      const senhaCriptografada = await bcrypt.hash(senhas[i], 10);
      await BD.query(
        `INSERT INTO usuarios (nome, email, senha, tipo) VALUES($1, $2, $3, $4)`,
        [usuariosData[i].nome, usuariosData[i].email, senhaCriptografada, usuariosData[i].tipo]
      );
    }

    console.log('Inserindo serviços...');

    const servicos = [
      { nome: 'Corte Masculino', preco: 45.00, descricao: 'Corte clássico ou degradê com acabamento simples.' },
      { nome: 'Barba Completa', preco: 30.00, descricao: 'Aparagem, desenho e hidratação com toalha quente.' },
      { nome: 'Combo: Corte + Barba', preco: 65.00, descricao: 'Pacote promocional para cabelo e barba.' },
      { nome: 'Sobrancelha', preco: 15.00, descricao: 'Limpeza e desenho da sobrancelha na pinça ou navalha.' }
    ];

    for (const servico of servicos) {
      await BD.query(
        `INSERT INTO servicos (nome, preco, descricao) VALUES($1, $2, $3)`,
        [servico.nome, servico.preco, servico.descricao]
      );
    }

    console.log('Inserindo agendamentos...');

    const agendamentos = [
      { id_cliente: 1, id_servico: 1, data_hora: '2026-05-10 10:00:00', status: 'confirmado' },
      { id_cliente: 2, id_servico: 4, data_hora: '2026-05-10 11:30:00', status: 'confirmado' },
      { id_cliente: 1, id_servico: 3, data_hora: '2026-05-15 15:00:00', status: 'pendente' },
      { id_cliente: 2, id_servico: 2, data_hora: '2026-04-20 09:00:00', status: 'concluido' }
    ];

    for (const agendamento of agendamentos) {
      await BD.query(
        `INSERT INTO agendamentos (id_cliente, id_servico, data_hora, status) VALUES($1, $2, $3, $4)`,
        [agendamento.id_cliente, agendamento.id_servico, agendamento.data_hora, agendamento.status]
      );
    }

    console.log('✓ Database seeded com sucesso!');
    console.log('\nCredenciais de teste:');
    console.log('Email: ricardo.cliente@email.com');
    console.log('Senha: 123456');

    process.exit(0);
  } catch (error) {
    console.error('Erro ao popular database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
