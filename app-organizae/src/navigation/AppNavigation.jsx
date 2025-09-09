import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/Home";
import Trilhas from "../screens/Trilhas";

const Stack = createNativeStackNavigator();
export function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Inicio" }}
        />
        <Stack.Screen
          name="Trilhas"
          component={Trilhas}
          options={{ title: "Adicionar Atividade" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
