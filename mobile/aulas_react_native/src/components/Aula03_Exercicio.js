import { View, Text, FlatList} from "react-native";
import Hr from "./Hr";  

const Aula03_Exercicio = () => {
    const alunos = [
        { id: 1, nome: 'Rafael', matéria: 'Matemática', faltas: 0, média: 9.0 },
        { id: 2, nome: 'Rafaela', matéria: 'Português', faltas: 1, média: 8.5 },
        { id: 3, nome: 'Carlos', matéria: 'Ciências', faltas: 3, média: 7.5 },
        { id: 4, nome: 'Mariana', matéria: 'História', faltas: 2, média: 8.5 },
    ];
    return (
        <View>
            <Hr />
            <Text>Lista de Alunos:</Text>
            {
                alunos.map( (linha) => (
                    <Text key={linha.id}>{linha.nome} - {linha.matéria} - Faltas: {linha.faltas} - Média: {linha.média}</Text>
                ))
            }
            <Text> Lista com FlatList </Text>
            <FlatList
                data={alunos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Text>{item.nome} - {item.matéria} - Faltas: {item.faltas} - Média: {item.média}</Text>}
            />
        </View>
    )
}

export default Aula03_Exercicio;