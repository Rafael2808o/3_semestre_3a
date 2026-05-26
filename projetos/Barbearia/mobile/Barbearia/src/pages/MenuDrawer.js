import { createDrawerNavigator } from '@react-navigation/drawer';
import Agendamentos from './Agendamentos';

const Drawer = createDrawerNavigator();

export default function MenuDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Agendamentos" component={Agendamentos} />
    </Drawer.Navigator>
  );
}