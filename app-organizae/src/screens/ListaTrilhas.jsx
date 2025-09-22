import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ListaTrilhas({ navigation }) {
  const [trilhas, setTrilhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pesquisa, setPesquisa] = useState("");
  // carrega as trilhas ao montar o componente
  useEffect(() => {
    const carregarTrilhas = async () => {
      try {
        const response = await fetch("http://10.0.0.194:3000/api/trilhas", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        //api retorna um objeto(que não tem metodo filter), por isso o setTrilhas fica desse jeito data.data
        setTrilhas(data.data);
      } catch (err) {
        console.error("Erro ao carregar trilhas:", err);
      } finally {
        setLoading(false);
      }
    };

    carregarTrilhas();
  }, []);

  // filtra as trilhas com base na pesquisa
  const trilhasFiltradas = trilhas.filter(
    (t) =>
      t.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      t.materia.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetalhesTrilha", { trilha: item })}
    >
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.nome}</Text>
          {(() => {
            const status = item.status?.toLowerCase().trim();
            if (status === "pendente") {
              return <Ionicons name="close-circle" size={24} color="red" />;
            }
            if (status === "em andamento") {
              return <Ionicons name="time" size={24} color="orange" />;
            }
            if (status === "concluído" || status === "concluido") {
              return (
                <Ionicons name="checkmark-circle" size={24} color="green" />
              );
            }
            return null;
          })()}
        </View>

        <Text style={styles.cardText}>📘 Matéria: {item.materia}</Text>
        <Text style={styles.cardText}>👨‍🏫 Professor: {item.professor}</Text>
        <Text style={styles.cardText}>📅 Entrega: {item.dataEntrega}</Text>
        <Text style={styles.cardText}>📌 Status: {item.status}</Text>
        <Text style={styles.cardText}>🔗 Link: {item.LinkTrilha}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Barra de Pesquisa */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#aaa"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar trilhas..."
          value={pesquisa}
          onChangeText={setPesquisa}
        />
      </View>

      {/* Lista de Trilhas */}
      {trilhasFiltradas.length > 0 ? (
        <FlatList
          data={trilhasFiltradas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.emptyText}>Nenhuma trilha encontrada.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    marginTop: 3,
  },
  statusIcon: {
    width: 24,
    height: 24,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: "#777",
  },
});
