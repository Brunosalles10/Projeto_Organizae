import { useState } from "react";
import MaskInput, { Masks } from "react-native-mask-input";

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function Trilhas({ navigation }) {
  const [titulo, setTitulo] = useState("");
  const [materia, setMateria] = useState("");
  const [professor, setProfessor] = useState("");
  const [link, setLink] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    // validação simples dos campos obrigatórios
    if (!titulo || !materia || !professor || !dataEntrega) {
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

    // cria o objeto da nova trilha
    const novaTrilha = {
      nome: titulo,
      materia,
      professor,
      dataEntrega,
      status: "Em andamento",
      LinkTrilha: link,
    };
    try {
      // chamada da api (POST /trilhas)
      setLoading(true); // inicia o loading
      const response = await fetch("http://10.0.0.194:3000/api/trilhas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaTrilha),
      });

      if (response.ok) {
        setTimeout(() => {
          setLoading(false);
          Toast.show({
            type: "success",
            text1: "Sucesso!",
            text2: "Sua atividade foi salva com sucesso 🚀",
          });
          navigation.goBack();
        }, 5000);
      } else {
        setLoading(false);
        const erro = await response.text();
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Não foi possível salvar a atividade: " + erro,
        });
      }
    } catch (err) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Erro de conexão",
        text2: "Não foi possível conectar ao servidor",
      });
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
      <MaskInput
        style={styles.input}
        value={dataEntrega}
        onChangeText={(masked, unmasked) => {
          setDataEntrega(masked); // exemplo: "12/09/2025"
        }}
        mask={Masks.DATE_DDMMYYYY}
        placeholder="dd/mm/aaaa"
      />

      <Text style={styles.label}>Link</Text>
      <TextInput
        style={styles.input}
        value={link}
        onChangeText={setLink}
        placeholder="Digite o link"
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007bff"
          style={{ marginTop: 20 }}
        />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      )}
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
