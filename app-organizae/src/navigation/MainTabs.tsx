import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ActivityDetailsScreen from "../screens/ActivityDetails";
import CreateActivityScreen from "../screens/CreateActivity";
import EditActivityScreen from "../screens/EditActivity";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

// função que encapsula as telas da stack do Home
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen
        name="ActivityDetails"
        component={ActivityDetailsScreen}
      />
    </HomeStack.Navigator>
  );
}

// função que define as tabs principais do app
export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4F46E5",
        tabBarStyle: { backgroundColor: "#fff", borderTopWidth: 0.3 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Início",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="CreateActivity"
        component={CreateActivityScreen}
        options={{
          tabBarLabel: "Adicionar",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="add-circle-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="EditActivity"
        component={EditActivityScreen}
        options={{
          tabBarLabel: "Editar",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="edit" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
