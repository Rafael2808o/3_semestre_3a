import { ScrollView } from "react-native"; // Importação do componente View do React Native para criar contêineres de layout
import Aula01 from "./src/components/Aula01"; // Importação do componente Aula01, que é a tela principal do aplicativo
import Aula02 from "./src/components/Aula02";
export default function App() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Aula01 />
      <Aula02 />

    </ScrollView>
  );
}