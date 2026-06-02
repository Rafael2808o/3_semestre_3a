import { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Principal() {
    const navigation = useNavigation();

    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        async function carregarUsuario() {
            const dados = await AsyncStorage.getItem('UsuarioLogado');

            if (!dados) {
                navigation.navigate('Login');
                return;
            }

            setUsuario(JSON.parse(dados));
        }

        carregarUsuario();
    }, []);

    async function fazerLogout() {
        await AsyncStorage.removeItem('UsuarioLogado');
        await AsyncStorage.removeItem('CredenciaisSalvas');

        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
    }

    return (
        <View
            style={{
                flex: 1,
                paddingTop: 60,
                paddingHorizontal: 20
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}
                >
                    {usuario ? `Usuário: ${usuario.nome}` : 'Carregando...'}
                </Text>

                <TouchableOpacity
                    onPress={fazerLogout}
                    style={{
                        backgroundColor: '#ff6b6b',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        borderRadius: 10
                    }}
                >
                    <Text
                        style={{
                            color: '#fff',
                            fontWeight: 'bold'
                        }}
                    >
                        Sair
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}