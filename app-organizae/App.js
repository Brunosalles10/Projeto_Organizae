import { Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/components/CustomToast";
import { AuthProvider } from "./src/contexts/AuthContext";
import AppNavigation from "./src/navigation/AppNavigation";

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <AppNavigation />
        <Toast config={toastConfig} />
      </AuthProvider>
    </PaperProvider>
  );
}
