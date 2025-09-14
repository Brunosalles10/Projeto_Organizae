// DetalheTrilha.tsx
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";
import Toast from "react-native-toast-message";

export default function DetalheTrilha({ route, navigation }) {
  const { trilha } = route.params;
  const [nome, setNome] = useState(trilha.nome);
  const [materia, setMateria] = useState(trilha.materia);
  const [professor, setProfessor] = useState(trilha.professor);
  const [dataEntrega, setDataEntrega] = useState(trilha.dataEntrega);
  const [status, setStatus] = useState(trilha.status);
  const [link, setLink] = useState(trilha.LinkTrilha);
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    // validação simples dos campos obrigatórios
    if (!nome || !materia || !professor || !dataEntrega) {
      Toast.show({
        type: "error",
        text1: "Campos obrigatórios",
        text2: "Por favor, preencha todos os campos.",
      });
      return;
    }
    // validação simples da data
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regexData.test(dataEntrega)) {
      Toast.show({
        type: "error",
        text1: "Data inválida",
        text2: "Use o formato dd/mm/yyyy",
      });
      return;
    }

    const novaTrilha = {
      nome,
      materia,
      professor,
      dataEntrega,
      status,
      LinkTrilha: link,
    };

    try {
      setLoading(true); // inicia o loading
      const response = await fetch(
        `http://10.0.0.194:3000/api/trilhas/${trilha.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(novaTrilha),
        }
      );

      if (response.ok) {
        setTimeout(() => {
          setLoading(false);
          Toast.show({
            type: "success",
            text1: "Atualizado",
            text2: "Trilha salva com sucesso ✅",
          });
          navigation.goBack();
        }, 3000);
      } else {
        setLoading(false);
        const erro = await response.text();
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Não foi possível salvar" + erro,
        });
      }
    } catch (err) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Falha de conexão",
        text3: err,
      });
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://10.0.0.194:3000/api/trilhas/${trilha.id}`,
        {
          method: "DELETE",
        }
      );
      setLoading(false);
      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Deletado",
          text2: "Trilha removida ❌",
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Não foi possível deletar",
        });
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Falha de conexão",
        text3: err,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Trilha</Text>
      <Text style={styles.label}>Título da atividade</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o título"
      />
      <Text style={styles.label}>Matéria</Text>
      <TextInput
        style={styles.input}
        value={materia}
        onChangeText={setMateria}
        placeholder="Matéria"
      />
      <Text style={styles.label}>Professor</Text>
      <TextInput
        style={styles.input}
        value={professor}
        onChangeText={setProfessor}
        placeholder="Professor"
      />

      <Text style={styles.label}>Data de entrega</Text>
      <MaskInput
        style={styles.input}
        value={dataEntrega}
        onChangeText={(masked, unmasked) => {
          setDataEntrega(masked); // exemplo: "12/09/2025"
        }}
        mask={Masks.DATE_DDMMYYYY}
        placeholder="dd/mm/aaaa"
      />

      <Text style={styles.label}>Status</Text>
      <TextInput
        style={styles.input}
        value={status}
        onChangeText={setStatus}
        placeholder="Status"
      />

      <Text style={styles.label}>Link</Text>
      <TextInput
        style={styles.input}
        value={link}
        onChangeText={setLink}
        placeholder="Link"
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007bff"
          style={{ marginTop: 20 }}
        />
      ) : (
        <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
          <Ionicons name="save" size={20} color="#fff" />
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Ionicons name="trash" size={20} color="#fff" />
        <Text style={styles.buttonText}>Deletar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  saveButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  deleteButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, marginLeft: 8 },
});
