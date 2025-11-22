import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { createActivity } from "../api/activity.api";
import { useAuth } from "../contexts/AuthContext";

export default function CreateActivityScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [professor, setProfessor] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<
    "concluído" | "em andamento" | "cancelado"
  >("em andamento");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permissão negada", "Precisamos de acesso à sua galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !professor.trim() ||
      !date.trim() ||
      !link.trim()
    ) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("professor", professor);
    formData.append("date", date);
    formData.append("status", status);
    formData.append("link", link);
    formData.append("userId", String(user?.id));

    if (image) {
      const filename = image.split("/").pop() || "foto.jpg";
      const match = /\.([a-zA-Z0-9]+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image";

      formData.append("image", {
        uri: image,
        name: filename,
        type,
      } as any);
    }

    try {
      setLoading(true);
      await createActivity(formData);
      Alert.alert("Sucesso", "Atividade criada com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao criar atividade:", error);
      Alert.alert("Erro", "Não foi possível criar a atividade.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold mb-4 text-gray-800">
        Nova Atividade
      </Text>

      <TextInput
        className="border border-gray-300 rounded-xl p-3 mb-4 text-base"
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        className="border border-gray-300 rounded-xl p-3 mb-4 text-base"
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        className="border border-gray-300 rounded-xl p-3 mb-4 text-base"
        placeholder="Professor"
        value={professor}
        onChangeText={setProfessor}
      />

      <TextInput
        className="border border-gray-300 rounded-xl p-3 mb-4 text-base"
        placeholder="Data (AAAA-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        className="border border-gray-300 rounded-xl p-3 mb-4 text-base"
        placeholder="Link"
        value={link}
        onChangeText={setLink}
      />

      <TouchableOpacity
        className="rounded-xl bg-indigo-600 py-3 mb-4"
        onPress={pickImage}
      >
        <Text className="text-center text-white font-semibold">
          {image ? "Alterar Imagem" : "Selecionar Imagem"}
        </Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          className="w-full h-48 rounded-xl mb-4"
          resizeMode="cover"
        />
      )}

      <TouchableOpacity
        disabled={loading}
        onPress={handleSubmit}
        className={`rounded-2xl py-3 ${
          loading ? "bg-gray-400" : "bg-green-600"
        }`}
      >
        <Text className="text-center text-white text-lg font-semibold">
          {loading ? "Enviando..." : "Criar Atividade"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
