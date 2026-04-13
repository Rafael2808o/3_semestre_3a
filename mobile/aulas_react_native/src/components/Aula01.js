import { StatusBar } from "expo-status-bar"; // Importação do componente StatusBar do Expo para gerenciar a barra de status do dispositivo
import { StyleSheet, Text, View } from "react-native"; // Importação dos componentes necessários do React Native

export default function Aula01() {
  return (
    <View style={styles.container}>
      {/* Componente para mostrar o conteúdo do aplicativo */}
      <Text style={styles.titulo}>
        Open up App.js to start working on your app!
      </Text>
      <Text style={styles.titulo}>Hello, World!</Text>
      <Text style={styles.titulo}>Olá, esse é o meu primeiro app!</Text>
      <View style={styles.fullWidthBox}>
        <Text style={styles.leftText}>Texto </Text>
        <Text style={styles.rightText}>Texto </Text>
        <Text style={styles.centerText}>Texto </Text>
      </View>
      <StatusBar style="auto" />{" "}
      {/* Componente para configurar a barra de status, com estilo automático */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  fullWidthBox: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  leftText: {
    color: "blue",
    textAlign: "left",
    fontSize: 18,
    marginBottom: 10,
  },
  rightText: {
    color: "#000",
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  centerText: {
    color: "red",
    textAlign: "center",
    fontSize: 18,
  },
});
