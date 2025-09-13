import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green", backgroundColor: "#e6ffe6" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "green",
      }}
      text2Style={{
        fontSize: 14,
        color: "#2e7d32",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "red", backgroundColor: "#ffe6e6" }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "red",
      }}
      text2Style={{
        fontSize: 14,
        color: "#c62828",
      }}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "blue", backgroundColor: "#e6f0ff" }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        color: "blue",
      }}
      text2Style={{
        fontSize: 14,
        color: "#1565c0",
      }}
    />
  ),
};
