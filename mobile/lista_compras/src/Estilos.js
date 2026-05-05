import { StyleSheet } from 'react-native';

export const corPrincipal = '#59b6ff';
export const corSecundaria = '#706ef9'
export const corTextos = '#f2f2f2';
export const corFundo = '#0d0d0d';
export const corFundo2 = '#262626';
export const corPlaceholder = '#808080';

const Estilos = StyleSheet.create({
    conteudo: {
        flex: 1,
        backgroundColor: corFundo,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    logo: {
        width: 300,
        height: 40,
        resizeMode: 'contain',
    },
    corpo: {
        flex: 1,
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: corFundo2,
        borderRadius: 6,
        borderWidth: 1,
        marginRight: 6,
        borderColor: corPrincipal,
        paddingHorizontal: 10,
        color: corTextos,
        fontSize: 16,
    },
    botao: {
        width: 50,
        backgroundColor: corPrincipal,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoBotao: {
        color: corTextos,
        fontWeight: 'bold',
        fontSize: 26,
        marginBottom: 5,

    },
    botaoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: corFundo2,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: corPlaceholder,
        padding: 12,
    },
textoBotaoItem: {
    color: corTextos,
    fontSize: 16,
},
textoItemComprado: {
    color: corPlaceholder,
    textDecorationLine: 'line-through',
}
});

export default Estilos;