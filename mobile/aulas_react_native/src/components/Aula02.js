import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
    StyleSheet,
} from "react-native";
import Logo from "../../assets/icon.png";
import { useState } from "react";
import {LinearGradient} from 'expo-linear-gradient';
import Aula02_Flexbox from "./Aula02_Flexbox";

const Aula02 = () => {
  const [nome, setNome] = useState("");

  return (
    <View>
      <Text>-------------------------------------------</Text>
      <Text>Aula 02 - Componentes Básicos</Text>
      <Text>Conhecendo os principais componentes do React Native</Text>
      <Image
        source={{ uri: "https://picsum.photos/300/200" }}
        style={{ width: 300, height: 200 }}
      />
      {/* imagem react */}
      <Image
        source={require("../../assets/icon.png")}
        style={{ width: 30, height: 20 }}
      />
      <Image source={Logo} style={{ width: 30, height: 20 }} />

      {/* input */}
      <TextInput
        placeholder="Digite seu nome"
        style={{
          borderWidth: 1,
          borderColor: "#000",
          padding: 10,
          marginBottom: 20,
        }}
        value={nome}
        onChangeText={setNome}
      />
      <Text>Olá, {nome}!</Text>

      <Button title="Clique aqui" onPress={() => console.log(nome)} />


        <TouchableOpacity
            style={estilos.botao}
            onPress={() => console.log('Botão personalizado clicado!')}
        >
            <Image source={Logo} style={{ width: 30, height: 20 }} />
            <Text style={estilos.botaoTexto}>Botão Personalizado</Text>
        </TouchableOpacity>

        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={{ padding: 15, alignItems: 'center', borderRadius: 5, marginTop: 20 }}
        >
            <Text style={{ backgroundColor: 'transparent', fontSize: 15, color: '#fff' }}>
                Botão com Gradiente
            </Text>
        </LinearGradient>
        {/* agr degrade de lado */}
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ padding: 15, alignItems: 'center', borderRadius: 5, marginTop: 20 }}
        >
            <Text style={{ backgroundColor: 'transparent', fontSize: 15, color: '#fff' }}>
                Botão com Gradiente Lateral
            </Text>
        </LinearGradient>

        <Aula02_Flexbox />


    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
    botao: {  
                backgroundColor: 'blue',
                padding: 12,
                borderRadius: 8,
                alignItems: 'center',
                marginTop: 20,
            },
    botaoTexto: { color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }

});

export default Aula02;
