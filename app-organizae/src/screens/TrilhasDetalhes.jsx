import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TrilhaDetalhes({ route, navigation }) {
  const { trilha } = route.params; // pega os dados enviados pelo card

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{trilha.nome}</Text>

      <Text style={styles.text}>📘 Matéria: {trilha.materia}</Text>
      <Text style={styles.text}>👨‍🏫 Professor: {trilha.professor}</Text>
      <Text style={styles.text}>📅 Data de Entrega: {trilha.dataEntrega}</Text>
      <Text style={styles.text}>📌 Status: {trilha.status}</Text>
      <Text style={styles.text}>🔗 Link: {trilha.LinkTrilha}</Text>

      {/* Botão para ir editar */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EditarTrilhas", { trilha })}
      >
        <Text style={styles.buttonText}>Editar / Deletar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
