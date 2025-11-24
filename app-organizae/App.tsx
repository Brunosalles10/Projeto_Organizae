import { COLORS } from "@/src/theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { MD3LightTheme, Provider as PaperProvider } from "react-native-paper";
import "./global.css";
import { AuthProvider } from "./src/contexts/AuthContext";
import AppNavigation from "./src/navigation/AppNavigator";

// Tema global do Paper
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: COLORS.primary.DEFAULT,
    background: COLORS.secondary.dark,
    surface: COLORS.secondary.DEFAULT,
    text: COLORS.text.primary,
  },
};

export default function App() {
  useEffect(() => {
    const clearOldData = async () => {
      try {
        await AsyncStorage.clear();
        console.log("🧹 AsyncStorage limpo - dados antigos removidos");
      } catch (error) {
        console.error("❌ Erro ao limpar storage:", error);
      }
    };

    clearOldData();
  }, []);
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </PaperProvider>
  );
}
