// NavDrawer.js

import { createDrawerNavigator } from '@react-navigation/drawer'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Home from './Home'
import Cadastro from './Cadastro'
import Relatorio from './Relatorio'
import Graficos from './Grafico'
import Aula01 from '../components/Aula01'
import Aula02 from '../components/Aula02'
import Aula02_Flexbox from '../components/Aula02_Flexbox';
import Aula03 from '../components/Aula03'
import Aula04 from '../components/Aula04'
import Aula05 from '../components/Aula05'
import Aula06 from '../components/Aula06'
import aula07 from '../components/Aula07'

const Drawer = createDrawerNavigator()

const NavDrawer = () => {            
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
                drawerStyle: {backgroundColor:'rgb(195, 188, 199)'},
                drawerLabelStyle: {fontSize: 18, fontWeight: 'bold', color: '#2a2a2a'},
                drawerActiveBackgroundColor: '#e9e9e9',
                drawerActiveTintColor: '#76a1ba',
            }}
        >

            <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="home" size={size} color={color} />
                    ),
                    title: 'Tela Principal',
                    headerStyle: {
                        backgroundColor: '#2a2a2a',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                    headerBlurEffect: 'light',
                    headerSearchBarOptions: {
                        placeholder: 'Pesquisar...',
                    },
                }}
            />

            <Drawer.Screen 
                name='Cadastro' 
                component={Cadastro} 
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="add-box" size={24} color="black" />
                    ),
                    title: 'Tela de Cadastro',
                    headerStyle: { backgroundColor: '#2a2a2a' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerTitleAlign: 'center',
                    headerLargeTitleShadowVisible: true,
                    headerBackTitle: 'Voltar',
                }}
            />

            <Drawer.Screen 
                name='Relatorios' 
                component={Relatorio} 
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="report" size={24} color="black" />
                    ),
                    title: 'Tela de Relatórios',
                    headerStyle: { backgroundColor: '#2a2a2a' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerTitleAlign: 'center', 
                }}
            />

            <Drawer.Screen 
                name='Graficos' 
                component={Graficos} 
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="auto-graph" size={24} color="black" />
                    ),
                    title: 'Tela de Gráfico',
                    headerStyle: { backgroundColor: '#2a2a2a' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerTitleAlign: 'center', 
                }}
            />

            <Drawer.Screen 
                name='Aula 01' 
                component={Aula01} 
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="class" size={24} color="black" />
                    )
                }}
            />

            <Drawer.Screen 
                name='Aula 02' 
                component={Aula02}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="class" size={24} color="black" />
                    )
                }}
            />

            <Drawer.Screen 
                name='Aula 02 Flexbox' 
                component={Aula02_Flexbox}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="class" size={24} color="black" />
                    )
                }}
            />

            <Drawer.Screen 
                name='Aula 03' 
                component={Aula03} 
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="class" size={24} color="black" />
                    )
                }}
            />

            <Drawer.Screen 
                name='Aula 04' 
                component={Aula04} 
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="class" size={24} color="black" />
                    )
                }}
            />

            <Drawer.Screen 
                name='Aula 05' 
                component={Aula05}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="class" size={24} color="black" />
                    )
                }}
            />

            <Drawer.Screen 
                name='Aula 06' 
                component={Aula06}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="class" size={24} color="black" />
                    )
                }}
            />

            <Drawer.Screen 
                name='Aula 07' 
                component={aula07}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="class" size={24} color="black" />
                     )
                }}
                />

        </Drawer.Navigator>
    )
}

export default NavDrawer