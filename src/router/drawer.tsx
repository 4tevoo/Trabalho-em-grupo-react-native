import { createDrawerNavigator } from '@react-navigation/drawer';
import { Sobre } from '../pages/Sobre';
import { ParametrosRotasDrawer } from './navigation';
import { TabsRouter } from './tabs';

const Drawer = createDrawerNavigator<ParametrosRotasDrawer>();

export function DrawerRouter() {
  return (
    <Drawer.Navigator screenOptions={{
        drawerPosition: 'right',
        drawerLabelStyle: {
          fontSize: 18
        }
        }}>
      <Drawer.Screen name="TabsRouter" component={TabsRouter} options={{
        headerShown: false,
        drawerLabel: 'Home'
        }}/>
      <Drawer.Screen name="DrawerSobre" component={Sobre} options={{ drawerLabel: 'Sobre' }}/>
    </Drawer.Navigator>
  );
}