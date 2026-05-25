// Login.js

import { View, Text, Button } from 'react-native'

const Login = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>TELA DE LOGIN</Text>

            <Button
                title='Entrar'
                onPress={() => navigation.navigate('NavDrawer')}
            />

        </View>
    )
}

export default Login