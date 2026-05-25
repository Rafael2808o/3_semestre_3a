import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from './Home'
import Cadastro from './Cadastro'
import Relatorio from './Relatorio'
import Graficos from './Grafico'
import Login from './Login'
import NavDrawer from './NavDrawer'

const Stack = createNativeStackNavigator()

const NavStack = () => {            
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>

                <Stack.Screen 
                    name='Home' 
                    component={Home} 
                    options={{
                        title: 'Tela Principal',
                        headerStyle: { backgroundColor: '#2a2a2a' },
                        headerTintColor: '#fff',
                        headerTitleStyle: { fontWeight: 'bold' },
                        headerTitleAlign: 'center',
                        headerShown: false,
                        headerBlurEffect: 'light',
                        headerSearchBarOptions: {
                            placeholder: 'Pesquisar...',
                        },
                    }}
                />

                <Stack.Screen 
                    name='Login' 
                    component={Login} 
                    options={{
                        title: 'Tela de Login',
                        headerStyle: { backgroundColor: '#2a2a2a' },
                        headerTintColor: '#fff',
                        headerTitleStyle: { fontWeight: 'bold' },   
                        headerTitleAlign: 'center',
                        headerLargeTitleShadowVisible: true,
                        headerTransparent: true,
                        headerBackTitle: 'Voltar',
                    }}
                />

                <Stack.Screen 
                    name='NavDrawer' 
                    component={NavDrawer}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen 
                    name='Cadastro' 
                    component={Cadastro} 
                    options={{
                        title: 'Tela de Cadastro',
                        headerStyle: { backgroundColor: '#2a2a2a' },
                        headerTintColor: '#fff',
                        headerTitleStyle: { fontWeight: 'bold' },
                        headerTitleAlign: 'center',
                        headerLargeTitleShadowVisible: true,
                        headerTransparent: true,
                        headerBackTitle: 'Voltar',
                    }}
                />

                <Stack.Screen 
                    name='Relatorios' 
                    component={Relatorio} 
                    options={{
                        title: 'Tela de Relatórios',
                        headerStyle: { backgroundColor: '#2a2a2a' },
                        headerTintColor: '#fff',
                        headerTitleStyle: { fontWeight: 'bold' },
                        headerTitleAlign: 'center', 
                    }}
                />

                <Stack.Screen 
                    name='Graficos' 
                    component={Graficos} 
                    options={{
                        title: 'Tela de Gráfico',
                        headerStyle: { backgroundColor: '#2a2a2a' },
                        headerTintColor: '#fff',
                        headerTitleStyle: { fontWeight: 'bold' },
                        headerTitleAlign: 'center', 
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default NavStack