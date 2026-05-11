import { useState, useEffect, use } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StatusBar, Image } from 'react-native';
import Estilos, { corPrincipal, corSecundaria, corTextos, corFundo, corFundo2, corPlaceholder } from './Estilos';
import { MaterialIcons } from '@expo/vector-icons';
import { firestore } from '../firebase.config';
import { collection, addDoc, getDocs, query, updateDoc, deleteDoc, where, orderBy, doc } from 'firebase/firestore';

const ListaCompras = () => {
    const [item, setItem] = useState('');
    const [listaCompras, setListaCompras] = useState([]);

    async function buscarDados() {
        const comando = query(collection(firestore, 'compras Rafael'), orderBy('produto', 'asc'));
        const dadosBD = await getDocs(comando);
        const lista = dadosBD.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setListaCompras(lista);
    }

    useEffect(() => {
        buscarDados();
    }, []);

    const botaoAdicionar = async () => {
        const novoItem = { produto: item, comprado: false };
        const docRef = await addDoc(collection(firestore, 'compras Rafael'), novoItem);
        console.log(docRef);

        setItem('');
        buscarDados();
    };

    async function botaoExcluir(id) {
        await deleteDoc(doc(firestore, 'compras Rafael', id));
        buscarDados();
    }

    const exibirItens = ({ item }) => {
        return (
            <TouchableOpacity style={Estilos.botaoItem} onPress={async () => {
                await updateDoc(doc(firestore, 'compras Rafael', item.id), { comprado: !item.comprado });
                buscarDados();
            }}>
                <Text style={[
                    Estilos.textoBotaoItem,
                    item.comprado && Estilos.textoItemComprado
                ]}>
                    {item.produto}
                </Text>
                <MaterialIcons name='delete-outline' size={24} color={corPrincipal} onPress={() => botaoExcluir(item.id)} />
            </TouchableOpacity>
        );
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