import { View, Text, TextInput, Button, ScrollView, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Estilos } from '../styles/Estilos';
import { enderecoServidor } from '../utils';

export default function Agendamentos({ navigation }) {
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [idCliente, setIdCliente] = useState('');
  const [idServico, setIdServico] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [status, setStatus] = useState('');
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    listarAgendamentos();
  }, []);

  async function listarAgendamentos() {
    setCarregando(true);
    try {
      const token = await AsyncStorage.getItem('token');

      const resposta = await fetch(`${enderecoServidor}/agendamentos`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const dados = await resposta.json();
      setAgendamentos(dados || []);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar agendamentos');
      console.error(error);
    } finally {
      setCarregando(false);
    }
  }

  async function cadastrarAgendamento() {
    if (!idCliente || !idServico || !dataHora || !status) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const metodo = idEditando ? 'PUT' : 'POST';
    const url = idEditando
      ? `${enderecoServidor}/agendamentos/${idEditando}`
      : `${enderecoServidor}/agendamentos`;

    try {
      const token = await AsyncStorage.getItem('token');

      const resposta = await fetch(url, {
        method: metodo,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          id_cliente: parseInt(idCliente),
          id_servico: parseInt(idServico),
          data_hora: dataHora,
          status
        })
      });

      if (resposta.ok) {
        Alert.alert('Sucesso', idEditando ? 'Agendamento atualizado!' : 'Agendamento criado!');
        limparCampos();
        listarAgendamentos();
      } else {
        Alert.alert('Erro', 'Erro ao salvar agendamento');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar com o servidor');
      console.error(error);
    }
  }

  function editarAgendamento(agendamento) {
    setIdEditando(agendamento.id_agendamento);
    setIdCliente(String(agendamento.id_cliente));
    setIdServico(String(agendamento.id_servico));
    setDataHora(agendamento.data_hora);
    setStatus(agendamento.status);
  }

  async function deletarAgendamento(id) {
    Alert.alert(
      'Confirmar',
      'Tem certeza que deseja deletar este agendamento?',
      [
        {
          text: 'Cancelar',
          onPress: () => { },
          style: 'cancel'
        },
        {
          text: 'Deletar',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('token');

              await fetch(`${enderecoServidor}/agendamentos/${id}`, {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });

              Alert.alert('Sucesso', 'Agendamento deletado!');
              listarAgendamentos();
            } catch (error) {
              Alert.alert('Erro', 'Erro ao deletar agendamento');
              console.error(error);
            }
          },
          style: 'destructive'
        }
      ]
    );
  }

  function limparCampos() {
    setIdCliente('');
    setIdServico('');
    setDataHora('');
    setStatus('');
    setIdEditando(null);
  }

  if (carregando) {
    return (
      <View style={[Estilos.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#d4a574" />
      </View>
    );
  }

  return (
    <ScrollView style={Estilos.container} contentContainerStyle={Estilos.scrollContainer}>
      <Text style={Estilos.titulo}>CRUD Agendamentos</Text>

      <TextInput
        style={Estilos.input}
        placeholder="ID Cliente"
        placeholderTextColor="#999"
        value={idCliente}
        onChangeText={setIdCliente}
        keyboardType="numeric"
      />

      <TextInput
        style={Estilos.input}
        placeholder="ID Serviço"
        placeholderTextColor="#999"
        value={idServico}
        onChangeText={setIdServico}
        keyboardType="numeric"
      />

      <TextInput
        style={Estilos.input}
        placeholder="Data e Hora (YYYY-MM-DD HH:mm:ss)"
        placeholderTextColor="#999"
        value={dataHora}
        onChangeText={setDataHora}
      />

      <TextInput
        style={Estilos.input}
        placeholder="Status"
        placeholderTextColor="#999"
        value={status}
        onChangeText={setStatus}
      />

      <TouchableOpacity style={Estilos.botao} onPress={cadastrarAgendamento}>
        <Text style={Estilos.textoBotao}>
          {idEditando ? 'Atualizar' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      {idEditando && (
        <TouchableOpacity style={[Estilos.botao, { backgroundColor: '#666' }]} onPress={limparCampos}>
          <Text style={Estilos.textoBotao}>Cancelar Edição</Text>
        </TouchableOpacity>
      )}

      <Text style={[Estilos.titulo, { marginTop: 20, marginBottom: 12 }]}>
        Total: {agendamentos.length}
      </Text>

      {agendamentos.map((agendamento) => (
        <View key={agendamento.id_agendamento} style={Estilos.listItem}>
          <Text style={Estilos.texto}>
            Cliente: {agendamento.id_cliente}
          </Text>
          <Text style={Estilos.texto}>
            Serviço: {agendamento.id_servico}
          </Text>
          <Text style={Estilos.texto}>
            Data: {agendamento.data_hora}
          </Text>
          <Text style={Estilos.texto}>
            Status: {agendamento.status}
          </Text>

          <View style={Estilos.rowBotoes}>
            <TouchableOpacity
              style={Estilos.botaoPequeno}
              onPress={() => editarAgendamento(agendamento)}
            >
              <Text style={Estilos.textoBotao}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={Estilos.botaoDeletar}
              onPress={() => deletarAgendamento(agendamento.id_agendamento)}
            >
              <Text style={Estilos.textoBotao}>Deletar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}