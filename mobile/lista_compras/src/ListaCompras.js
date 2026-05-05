import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StatusBar, Image } from 'react-native';
import Estilos, { corPrincipal, corSecundaria, corTextos, corFundo, corFundo2, corPlaceholder } from './Estilos';
import { MaterialIcons } from '@expo/vector-icons';
const ListaCompras = () => {
    const [item, setItem] = useState('');
    const [listaCompras, setListaCompras] = useState([
        { id: '1', produto: '1 cartela de ovo 🥚', comprado: false },
        { id: '2', produto: '1 kg de arroz 🍚', comprado: true },
    ]);

    const botaoAdicionar = () => {
        if (item.trim() === '') return; // Evita adicionar itens vazios
        const novoItem = {
            id: Date.now().toString(),
            produto: item,
            comprado: false,
        };
        setListaCompras([...listaCompras, novoItem]);
        setItem(''); // Limpa o campo de input
    };

const exibirItens = ({ item }) => {
    return (
        <TouchableOpacity style={Estilos.botaoItem}>
            <Text style={[
                Estilos.textoBotaoItem, 
                item.comprado && Estilos.textoItemComprado // Só aplica se for true
            ]}>
                {item.produto}
            </Text>
            <MaterialIcons name='delete-outline' size={24} color={corPrincipal} />
        </TouchableOpacity>
    )
};

    return (
        <View style={Estilos.conteudo}>
            <StatusBar backgroundColor={corFundo} barStyle="light-content" />
            <View style={Estilos.header}>
                    <Image source={require('../assets/logo.png')} style={Estilos.logo} />
            </View>
            <View style={Estilos.corpo}>
                <View style={Estilos.inputContainer}>
                    <TextInput
                        placeholder="Adcione um novo item na lista"
                        style={Estilos.input}
                        value={item} onChangeText={setItem}
                        placeholderTextColor={corPlaceholder}
                    />
                    <TouchableOpacity style={Estilos.botao} onPress={botaoAdicionar}>
                        <Text style={Estilos.textoBotao}>+</Text>
                    </TouchableOpacity>
                </View>
                            {/* Lista dos produtos */}
                <FlatList
                data={ listaCompras }
                renderItem={exibirItens}
                keyExtractor={ item => item.id}
                />
            </View>
        </View>
    )
}

export default ListaCompras;