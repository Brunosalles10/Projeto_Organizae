import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary.dark,
    padding: 20,
  },
  title: {
    color: COLORS.text.primary,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
