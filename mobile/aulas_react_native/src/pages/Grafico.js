import { View, Text, Button} from 'react-native'



const Grafico = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5ebe70' }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>TELA DE GRÁFICO</Text>
            <Button
                title='Ir para Relatórios'
                onPress={() => navigation.navigate('Relatorios')}
            />
            <Button
                title='Ir para Cadastro'
                onPress={() => navigation.navigate('Cadastro')}
            />
            <Button
                title='Voltar'
                onPress={() => navigation.goBack()}
            />
        </View>
    )
}

export default Grafico