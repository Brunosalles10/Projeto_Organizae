import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useLayoutEffect } from "react";

export default function HomeScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../assets/logo.png")}
            style={{ width: 32, height: 32, marginRight: 8 }}
            resizeMode="contain"
          />
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            Organizae
          </Text>
        </View>
      ),
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: "#4B9CD3" },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.Titulo}>Seja bem-vindo!</Text>
      <Text style={styles.subtitle}>
      Organize suas trilhas de aprendizado de forma simples e prática.
      Comece adicionando uma nova trilha ou explore as que já criou
</Text>
      <Image source={require("../assets/aluno.png")} style={styles.aluno} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Trilhas")}
      >
        <Text style={styles.buttonText}>Adicionar Trilha</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ListaTrilhas")}
      >
        <Text style={styles.buttonText}>Ver todas trilhas adicionadas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    alignSelf: "left",
  },
  aluno: {
    width: 180,
    height: 180,
    marginBottom: 0,
    alignSelf: "center",
  },
   Titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000000ff",
  },
  subtitle: {
  fontSize: 16,
  color: "#555",
  textAlign: "center",
  marginBottom: 20,
  paddingHorizontal: 20,
},
});
