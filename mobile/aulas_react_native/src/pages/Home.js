import { View, Text, Button} from 'react-native'

const Home = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#d5edb9' }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>TELA PRINCIPAL</Text>
            <Button
                title='Ir para Cadastro'
                onPress={() => navigation.navigate('Cadastro')}
            />
            <Button
                title='Ir para Relatórios'
                onPress={() => navigation.navigate('Relatorios')}
            />
                        <Button
                            title='Ir para Gráficos'
                            onPress={() => navigation.navigate('Graficos')}
                        />
        </View>
    )
}

export default Home