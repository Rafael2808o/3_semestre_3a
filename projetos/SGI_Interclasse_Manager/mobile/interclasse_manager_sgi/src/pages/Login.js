import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from '../styles/Estilos'; 

export default function Login() {
    const navigation = useNavigation();

    const [showPassword, setShowPassword] = useState(true);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [lembrar, setLembrar] = useState(false);

    async function fazerLogin() {
        try {
            if (!email || !senha) {
                setMensagem('Preencha todos os campos');
                return;
            }

            const response = await fetch(
                'https://interclassemanager-seven.vercel.app/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        senha,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMensagem(data.message || 'Email ou senha inválidos');
                return;
            }

            await AsyncStorage.setItem(
                'Usuario Logado',
                JSON.stringify(data)
            );

            if (lembrar) {
                await AsyncStorage.setItem(
                    'DadosLogin',
                    JSON.stringify({ email, senha })
                );
            } else {
                await AsyncStorage.removeItem('DadosLogin');
            }

            navigation.navigate('Principal');

        } catch (error) {
            console.log(error);
            setMensagem('Erro ao conectar com o servidor');
        }
    }

    useEffect(() => {
        async function verificarLogin() {
            const usuarioLogado =
                await AsyncStorage.getItem('Usuario Logado');

            if (usuarioLogado) {
                const usuario = JSON.parse(usuarioLogado);

                if (usuario) {
                    navigation.navigate('Principal');
                }
            }

            const dadosLogin = await AsyncStorage.getItem('DadosLogin');
            if (dadosLogin) {
                const { email: emailSalvo, senha: senhaSalva } =
                    JSON.parse(dadosLogin);

                setEmail(emailSalvo);
                setSenha(senhaSalva);
                setLembrar(true);
            }
        }

        verificarLogin();
    }, []);

    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <View style={styles.card}>

                    <Image
                        source={require('../../assets/fundo2.png')}
                        style={styles.logo}
                    />

                    <Text style={styles.titulo}>
                        Bem-vindo de volta!
                    </Text>

                    <Text style={styles.subtitulo}>
                        Faça login para continuar
                    </Text>

                    <Text style={styles.label}>E-mail</Text>

                    <View style={styles.inputContainer}>
                        <Feather name="mail" size={22} color="#777" />
                        <TextInput
                            style={styles.input}
                            placeholder="seu@email.com"
                            placeholderTextColor="#777"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>

                    <Text style={styles.label}>Senha</Text>

                    <View style={styles.inputContainer}>
                        <Feather name="lock" size={22} color="#777" />

                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor="#777"
                            secureTextEntry={showPassword}
                            value={senha}
                            onChangeText={setSenha}
                        />

                        <TouchableOpacity
                            onPress={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            <Feather
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={22}
                                color="#777"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.optionsRow}>
                        <View style={styles.checkboxRow}>
                            <Switch
                                value={lembrar}
                                onValueChange={setLembrar}
                                trackColor={{ false: '#444', true: '#ffd36b' }}
                                thumbColor={lembrar ? '#fff' : '#ccc'}
                            />

                            <Text style={styles.rememberText}>
                                Lembrar de mim
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() =>
                                Alert.alert('Aviso', 'Função em desenvolvimento')
                            }
                        >
                            <Text style={styles.forgot}>
                                Esqueci minha senha
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={fazerLogin}
                        style={styles.loginButton}
                    >
                        <Text style={styles.loginText}>
                            ENTRAR
                        </Text>
                    </TouchableOpacity>

                    {mensagem !== '' && (
                        <Text style={styles.error}>
                            {mensagem}
                        </Text>
                    )}

                    <View style={styles.registerRow}>
                        <Text style={styles.registerText}>
                            Ainda não tem uma conta?
                        </Text>

                        <TouchableOpacity>
                            <Text style={styles.registerLink}>
                                Criar conta
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <Text style={styles.footer}>
                    © 2026 Interclasse Manager
                </Text>
            </View>
        </View>
    );
}