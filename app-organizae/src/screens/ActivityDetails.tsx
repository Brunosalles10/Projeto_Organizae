import {
  deleteActivity,
  getActivityById,
  updateActivity,
} from "@/src/api/activity.api";
import { useAuth } from "@/src/contexts/AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ActivityDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: number };
  const { user } = useAuth();

  const [activity, setActivity] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivity();
  }, [id]);

  const loadActivity = async () => {
    try {
      setLoading(true);
      const data = await getActivityById(id);
      setActivity(data);
    } catch (error) {
      console.error("Erro ao carregar atividade:", error);
      Alert.alert("Erro", "Não foi possível carregar a atividade.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    try {
      await updateActivity(id, { status: newStatus });
      Alert.alert("Sucesso", "Status atualizado!");
      loadActivity();
    } catch (error) {
      Alert.alert("Erro", "Falha ao atualizar o status.");
    }
  };

  const handleDelete = async () => {
    Alert.alert("Confirmar", "Tem certeza que deseja excluir esta atividade?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteActivity(id);
            Alert.alert("Sucesso", "Atividade excluída com sucesso.");
            navigation.goBack();
          } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir.");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-600">Carregando atividade...</Text>
      </View>
    );
  }

  if (!activity) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Atividade não encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold text-gray-800 mb-2">
        {activity.title}
      </Text>
      <Text className="text-gray-600 mb-4">
        Professor: {activity.professor}
      </Text>
      <Text className="text-gray-700 mb-2">{activity.description}</Text>

      {activity.imagePath && (
        <Image
          source={{ uri: activity.imagePath }}
          className="w-full h-60 rounded-2xl my-4"
          resizeMode="cover"
        />
      )}

      <Text className="text-gray-700 mb-2">Data: {activity.date}</Text>
      <Text className="text-gray-700 mb-2">Status: {activity.status}</Text>

      <TouchableOpacity
        className="bg-indigo-600 rounded-xl py-3 mt-4"
        onPress={() => handleUpdateStatus("concluído")}
      >
        <Text className="text-center text-white font-semibold">
          Marcar como Concluído
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-yellow-500 rounded-xl py-3 mt-3"
        onPress={() => handleUpdateStatus("em andamento")}
      >
        <Text className="text-center text-white font-semibold">
          Marcar como Em Andamento
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-red-600 rounded-xl py-3 mt-3"
        onPress={handleDelete}
      >
        <Text className="text-center text-white font-semibold">
          Excluir Atividade
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="border border-gray-400 rounded-xl py-3 mt-5"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-center text-gray-600 font-semibold">Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
