import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Trilhas({ navigation }) {
  const [titulo, setTitulo] = useState("");
  const [materia, setMateria] = useState("");
  const [professor, setProfessor] = useState("");
  const [link, setLink] = useState("");
  const [dataEntrega, setDataEntrega] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dataEntrega;
    setShowDatePicker(Platform.OS === "ios");
    setDataEntrega(currentDate);
  };

  // Função para formatar a data no formato dd/mm/yyyy
  const formatarData = (date) => {
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const handleSalvar = async () => {
    // chamada da api (POST /trilhas)
    const novaTrilha = {
      nome: titulo,
      materia,
      professor,
      dataEntrega: formatarData(dataEntrega), // formato yyyy-mm-dd
      status: "Em andamento",
      LinkTrilha: link,
    };
    try {
      const response = await fetch("http://localhost:3000/api/trilhas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaTrilha),
      });
      if (response.ok) {
        Alert.alert("Sucesso", "Trilha salva com sucesso!");
        navigation.goBack();
      } else {
        const erro = await response.text();
        Alert.alert("Erro", `Falha ao salvar: ${erro}`);
      }
    } catch (err) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Atividade</Text>

      <Text style={styles.label}>Título da atividade</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Digite o título"
      />

      <Text style={styles.label}>Matéria</Text>
      <TextInput
        style={styles.input}
        value={materia}
        onChangeText={setMateria}
        placeholder="Digite a matéria"
      />

      <Text style={styles.label}>Professor</Text>
      <TextInput
        style={styles.input}
        value={professor}
        onChangeText={setProfessor}
        placeholder="Digite o professor"
      />

      <Text style={styles.label}>Data de entrega</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{dataEntrega.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dataEntrega}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <Text style={styles.label}>Link</Text>
      <TextInput
        style={styles.input}
        value={link}
        onChangeText={setLink}
        placeholder="Digite o link"
      />

      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Salvar</Text>
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
    marginTop: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
