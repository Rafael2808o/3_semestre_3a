import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Estilos } from '../styles/Estilos';
import { enderecoServidor } from '../utils';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function logar() {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }

    setCarregando(true);
    try {
      const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          senha
        })
      });

      const dados = await resposta.json();

      if (dados.token) {
        await AsyncStorage.setItem('token', dados.token);
        Alert.alert('Sucesso', 'Login realizado!');
        navigation.navigate('MenuDrawer');
      } else {
        Alert.alert('Erro', dados.error || 'Erro ao fazer login');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao conectar com o servidor');
      console.error(error);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={Estilos.conteudo}>
      <Text style={Estilos.titulo}>Login</Text>

      <TextInput
        style={Estilos.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        editable={!carregando}
      />

      <TextInput
        style={Estilos.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        editable={!carregando}
      />

      <Button
        title={carregando ? 'Conectando...' : 'Entrar'}
        onPress={logar}
        disabled={carregando}
      />
    </View>
  );
}