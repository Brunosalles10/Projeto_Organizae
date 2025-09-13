import Toast from "react-native-toast-message";
import { toastConfig } from "./src/components/CustomToast";
import { AppNavigation } from "./src/navigation/AppNavigation";

export default function App() {
  return (
    <>
      <AppNavigation />
      <Toast config={toastConfig} />
    </>
  );
}
