import { View, Text, Button} from 'react-native'

const Relatorio = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5e7cbe' }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>TELA DE RELATÓRIO</Text>
            <Button
                title='Ir para Cadastro'
                onPress={() => navigation.navigate('Cadastro')}
            />
            <Button
                title='Ir para Gráficos'
                onPress={() => navigation.navigate('Graficos')}
            />
            <Button
                title='Voltar'
                onPress={() => navigation.goBack()}
            />
        </View>
    )
}

export default Relatorio