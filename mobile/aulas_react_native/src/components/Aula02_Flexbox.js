import { View, Text, Image, Button, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function Aula02_Flexbox() {
    return (
        <View style={estilos.conteudo}>
            <Text style={estilos.caixa}>1</Text>
            <Text style={estilos.caixa}>2</Text>
            <Text style={estilos.caixa}>3</Text>
        </View>
    )
}

const estilos = StyleSheet.create({
    conteudo: {
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#121d2a",
    },
    caixa: {
        width: 50,
        height: 50,
        backgroundColor: "lightgray",
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
        fontWeight: "bold",

    }
})