import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DetalhesTrilha from "../screens/DetalheTrilha";
import HomeScreen from "../screens/Home";
import ListaTrilhas from "../screens/ListaTrilhas";
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
        <Stack.Screen
          name="ListaTrilhas"
          component={ListaTrilhas}
          options={{ title: "Todas as trilhas adicionadas" }}
        />
        <Stack.Screen
          name="DetalhesTrilha"
          component={DetalhesTrilha}
          options={{ title: "Detalhes da trilha" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
