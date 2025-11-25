import { COLORS } from "@/src/theme/colors";
import React from "react";
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
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </PaperProvider>
  );
}
