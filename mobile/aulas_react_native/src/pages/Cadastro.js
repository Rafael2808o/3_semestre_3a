import { View, Text, Button} from 'react-native'



const Cadastro = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5e7cbe' }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>TELA DE CADASTRO</Text>
            <Button
                title='Ir para Relatórios'
                onPress={() => navigation.navigate('Relatorios')}
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

export default Cadastro