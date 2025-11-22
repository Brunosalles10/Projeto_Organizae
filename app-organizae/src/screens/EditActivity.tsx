import { getActivityById, updateActivity } from "@/src/api/activity.api";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function EditActivityScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: number };
  const { user } = useAuth();

  const [activity, setActivity] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    loadActivity();
  }, [id]);

  const loadActivity = async () => {
    try {
      setLoading(true);
      const data = await getActivityById(id);
      setActivity(data);
      setImage(data.imagePath || null);
    } catch (error) {
      console.error("Erro ao carregar atividade:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados da atividade.");
    } finally {
      setLoading(false);
    }
  };

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

  const handleSave = async () => {
    if (
      !activity.title.trim() ||
      !activity.description.trim() ||
      !activity.professor.trim() ||
      !activity.date.trim()
    ) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const formData = new FormData();
    formData.append("title", activity.title);
    formData.append("description", activity.description);
    formData.append("professor", activity.professor);
    formData.append("date", activity.date);
    formData.append("status", activity.status);
    formData.append("link", activity.link);
    formData.append("userId", String(user?.id));

    if (image && image !== activity.imagePath) {
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
      await updateActivity(id, formData);
      Alert.alert("Sucesso", "Atividade atualizada com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao atualizar atividade:", error);
      Alert.alert("Erro", "Não foi possível atualizar a atividade.");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !activity) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-600">Carregando dados...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold mb-4 text-gray-800">
        Editar Atividade
      </Text>

      <TextInput
        className="border border-gray-300 rounded-xl p-3 mb-4 text-base"
        placeholder="Título"
        value={activity.title}
        onChangeText={(text) => setActivity({ ...activity, title: text })}
      />

      <TextInput
        className="border border-gray-300 rounded-xl p-3 mb-4 text-base"
        placeholder="Descrição"
        value={activity.description}
        onChangeText={(text) => setActivity({ ...activity, description: text })}
        multiline
      />

      <TextInput
        className="border border-gray-300 rounded-xl p-3 mb-4 text-base"
        placeholder="Professor"
        value={activity.professor}
        onChangeText={(text) => setActivity({ ...activity, professor: text })}
      />

      <TextInput
        className="border border-gray-300 rounded-xl p-3 mb-4 text-base"
        placeholder="Data (AAAA-MM-DD)"
        value={activity.date}
        onChangeText={(text) => setActivity({ ...activity, date: text })}
      />

      <TextInput
        className="border border-gray-300 rounded-xl p-3 mb-4 text-base"
        placeholder="Link"
        value={activity.link}
        onChangeText={(text) => setActivity({ ...activity, link: text })}
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
        onPress={handleSave}
        className={`rounded-2xl py-3 ${
          loading ? "bg-gray-400" : "bg-green-600"
        }`}
      >
        <Text className="text-center text-white text-lg font-semibold">
          {loading ? "Salvando..." : "Salvar Alterações"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="border border-gray-400 rounded-xl py-3 mt-4"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-center text-gray-600 font-semibold">
          Cancelar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
