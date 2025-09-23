import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EditarTrilhas from "../screens/EditarTrilhas";
import HomeScreen from "../screens/Home";
import ListaTrilhas from "../screens/ListaTrilhas";
import Trilhas from "../screens/Trilhas";
import TrilhasDetalhes from "../screens/TrilhasDetalhes";

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
          name="EditarTrilhas"
          component={EditarTrilhas}
          options={{ title: "Editar detalhes da trilha" }}
        />
        <Stack.Screen
          name="TrilhasDetalhes"
          component={TrilhasDetalhes}
          options={{ title: "Detalhes da trilha" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
