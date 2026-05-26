import { View, Text, Button, TextInput} from 'react-native'
import { useState } from 'react'
import { EnderecoServidor } from '../utils'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagem, setMensagem] = useState('')
    async function botaoEntrar() {
        try {
            if (!email.trim() || !senha.trim()) {
                setMensagem('Preencha todos os campos');
                return;
            }
            const login = {
                "email": email,
                "senha": senha
            };
            const resposta = await fetch(EnderecoServidor + '/login', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });

            if (resposta.status === 404) {
                setMensagem('Rota não encontrada: ' + resposta.url);
                return;
            }
            const dados = await resposta.json();
            if (resposta.status === 500) {
                setMensagem('Erro no servidor: ' + dados.message);
                return;
            }
            if (resposta.ok) {
               AsyncStorage.setItem('UsuarioLogado', JSON.stringify(dados));
                setMensagem('Login realizado com sucesso!');
                navigation.navigate('MenuDrawer');
            }
            else {
                setMensagem('Email ou senha incorretos: ' + dados.message);
            }
        } catch (error) {
            console.error('Erro ao fazer login', error.message);
            setMensagem('Erro ao fazer login: ' + error.message);
        }
    }

        return (
        <View className="login">
            <Text>Tela de Login</Text>
            <Text>Email</Text>
            <TextInput
                placeholder="Digite seu email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <Text>Senha</Text>
            <TextInput
                placeholder="Digite sua senha"
                value={senha}
                onChangeText={(text) => setSenha(text)}
                secureTextEntry
            />
            <Button title="Entrar" onPress={botaoEntrar} />
            <Text style={{ color: '#f00' }}>{mensagem}</Text>
        </View>
    )
}