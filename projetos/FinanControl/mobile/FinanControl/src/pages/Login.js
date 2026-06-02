import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, Text, TextInput, TouchableOpacity, Image, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { EnderecoServidor } from '../utils';
import { corPrincipal, corFundo2 } from '../styles/Estilos';
import { EstilosLogin } from '../styles/EstilosLogin';
import logo from '../../assets/logo.png';

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('ria@email.com');
    const [senha, setSenha] = useState('123');
    const [mensagem, setMensagem] = useState('');
    const [lembrar, setLembrar] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    async function botaoEntrar() {
        if (!email.trim() || !senha.trim()) {
            setMensagem('Preencha todos os campos');
            return;
        }

        try {
            const dadosLogin = { email, senha };

            const resposta = await fetch(EnderecoServidor + '/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosLogin)
            });

            const dados = await resposta.json();

            if (resposta.status === 404) {
                setMensagem('Rota não encontrada: ' + resposta.url);
                return;
            }

            if (resposta.status === 500) {
                setMensagem('Erro no servidor: ' + (dados.message || dados.error || ''));
                return;
            }

            if (resposta.ok) {
                await AsyncStorage.setItem('UsuarioLogado', JSON.stringify(dados));
                setMensagem('Login realizado com sucesso!');
                navigation.navigate('MenuDrawer');
            } else {
                setMensagem(dados.message || dados.error || 'Email ou senha incorretos');
            }
        } catch (error) {
            console.error('Erro ao fazer login', error.message);
            setMensagem('Erro ao fazer login: ' + error.message);
        }
    }

    return (
        <LinearGradient colors={[corFundo2, corPrincipal]} style={EstilosLogin.container}>
            <KeyboardAvoidingView
                style={EstilosLogin.containerTeclado}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={EstilosLogin.scrollContainer} keyboardShouldPersistTaps='handled'>
                    <View style={EstilosLogin.cabecalho}>
                        <Image source={logo} style={EstilosLogin.iconeLogo} />
                        <View>
                            <Text style={EstilosLogin.nomeApp}>FinanControl</Text>
                            <Text style={EstilosLogin.subtituloApp}>O seu Controle Financeiro</Text>
                        </View>
                    </View>

                    <View style={EstilosLogin.conteudoPrincipal}>
                        <View style={EstilosLogin.formularioLogin}>
                            <Text style={EstilosLogin.titulo}>Acesse sua conta</Text>

                            <View style={EstilosLogin.grupoInput}>
                                <MaterialIcons name='email' size={20} style={EstilosLogin.iconeInput} />
                                <TextInput
                                    style={EstilosLogin.input}
                                    placeholder='Digite seu email'
                                    placeholderTextColor='#aaaaaa'
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>

                            <View style={EstilosLogin.grupoInput}>
                                <MaterialIcons name='lock' size={20} style={EstilosLogin.iconeInput} />
                                <TextInput
                                    style={EstilosLogin.input}
                                    placeholder='Digite sua senha'
                                    placeholderTextColor='#aaaaaa'
                                    secureTextEntry={!mostrarSenha}
                                    value={senha}
                                    onChangeText={setSenha}
                                />
                                <TouchableOpacity
                                    style={EstilosLogin.alternarVisibilidade}
                                    onPress={() => setMostrarSenha(!mostrarSenha)}
                                >
                                    <MaterialIcons
                                        name={mostrarSenha ? 'visibility-off' : 'visibility'}
                                        size={22}
                                        color='#888'
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={EstilosLogin.entreOpcoes}>
                                <View style={EstilosLogin.containerSwitch}>
                                    <Switch
                                        value={lembrar}
                                        onValueChange={setLembrar}
                                        trackColor={{ false: '#767577', true: corPrincipal }}
                                        thumbColor={lembrar ? '#ffffff' : '#f4f3f4'}
                                        ios_backgroundColor='#3e3e3e'
                                    />
                                    <Text style={EstilosLogin.rotuloCheckbox}>Lembrar-me</Text>
                                </View>
                                <TouchableOpacity>
                                    <Text style={EstilosLogin.esqueceuSenha}>Esqueci a senha</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={EstilosLogin.botaoEntrar} onPress={botaoEntrar}>
                                <Text style={EstilosLogin.textoBotaoEntrar}>Entrar</Text>
                            </TouchableOpacity>

                            <Text style={EstilosLogin.mensagemFeedback}>{mensagem}</Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}
