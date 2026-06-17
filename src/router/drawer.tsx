import { createDrawerNavigator } from '@react-navigation/drawer';
import { Sobre } from '../pages/Sobre';
import { ParametrosRotasDrawer } from './navigation';
import { TabsRouter } from './tabs';

const Drawer = createDrawerNavigator<ParametrosRotasDrawer>();

export function DrawerRouter() {
  return (
    <Drawer.Navigator screenOptions={{
        drawerPosition: 'right'
        }}>
      <Drawer.Screen name="TabsRouter" component={TabsRouter} options={{headerShown: false}}/>
      <Drawer.Screen name="DrawerSobre" component={Sobre} />
    </Drawer.Navigator>
  );
}