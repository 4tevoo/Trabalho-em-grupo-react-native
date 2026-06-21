import { createStackNavigator } from '@react-navigation/stack';
import { LoginCadastro } from '../pages/LoginCadastro';
import { DrawerRouter } from './drawer';

const Stack = createStackNavigator();

export function StackRouter() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginCadastro} />
      <Stack.Screen name="DrawerRouter" component={DrawerRouter} />
    </Stack.Navigator>
  );
}