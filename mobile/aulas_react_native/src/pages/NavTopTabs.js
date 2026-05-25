import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'

import Home from './Home'
import Cadastro from './Cadastro'
import Relatorio from './Relatorio'
import Graficos from './Grafico'
import Login from './Login'
import NavDrawer from './NavDrawer'

const Tab = createMaterialTopTabNavigator()

const NavTopTab = () => {            
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='Login'>

                <Tab.Screen 
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

                <Tab.Screen 
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

                <Tab.Screen 
                    name='NavDrawer' 
                    component={NavDrawer}
                    options={{
                        title: 'Tela de Menu',
                        headerStyle: { backgroundColor: '#2a2a2a' },
                        headerTintColor: '#fff',
                        headerTitleStyle: { fontWeight: 'bold' },
                        headerTitleAlign: 'center',
                    }}
                />

                <Tab.Screen 
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

                <Tab.Screen 
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

                <Tab.Screen 
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

            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default NavTopTab