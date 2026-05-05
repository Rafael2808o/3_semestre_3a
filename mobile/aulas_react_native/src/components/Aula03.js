import { View, Text, FlatList} from "react-native";
import Hr from "./Hr";
import Aula03_Exercicio from "./Aula03_Exercicio";
import Aula03_Exercicio2 from "./Aula03_Exercicio2";

const Aula03 = () => {
    // Definindo um vetor de turmas como fonte de dados para lista
    const turmas = [
        { id: 1, nome: '3º A', pg: 10, },
        { id: 2, nome: '3º B', pg: 2, },
        { id: 3, nome: '2º A', pg: 6, },
        { id: 4, nome: '2º B', pg: 2, }
    ];
    return (
        <View>
            <Hr />
            <Text> Aula 03 - Lista com FlatList</Text>
            <Text> Aprendendo a manipular listas em React Native</Text>
            <Hr />
            <Text>Lista de Turmas:</Text>
            {
                turmas.map( (linha) => (
                    <Text key={linha.id}>{linha.nome}</Text>
                ))
            }
            <Text> Lista com FlatList </Text>
            <FlatList
                data={turmas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Text>{item.nome}</Text>}
            />
            <Hr/>

            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Interclasse SESI 2026</Text>
            <FlatList
                data={turmas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Text>{item.nome} - Pontuação: {item.pg}</Text>}
            />
            <Hr/>
            <Aula03_Exercicio />
            <Hr/>
            <Aula03_Exercicio2 />

        </View>
    )
}

export default Aula03;