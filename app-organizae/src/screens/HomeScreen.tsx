import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";

export const HomeScreen = ({ navigation }: any) => {
  const { fetchActivities, deleteActivity, user } = useAuth();
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega as atividades ao montar o componente
  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      const data = await fetchActivities();
      setActivities(data);
    } catch (error) {
      console.error("Erro ao carregar atividades:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteActivity(id);
      await loadActivities(); // atualiza lista
    } catch (error) {
      console.error("Erro ao deletar atividade:", error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-white">
      <Text variant="headlineMedium" className="mb-4 text-center">
        Olá, {user?.name || "usuário"}
      </Text>

      {activities.length === 0 ? (
        <Text className="text-center text-gray-500">
          Nenhuma atividade encontrada.
        </Text>
      ) : (
        <FlatList
          data={activities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-4 mb-3 bg-gray-100 rounded-xl"
              onPress={() =>
                navigation.navigate("ActivityDetails", { id: item.id })
              }
            >
              <Text variant="titleMedium">{item.title}</Text>
              <Text className="text-gray-500">{item.description}</Text>
              <Button
                mode="text"
                textColor="red"
                onPress={() => handleDelete(item.id)}
              >
                Excluir
              </Button>
            </TouchableOpacity>
          )}
        />
      )}

      <Button
        mode="contained"
        className="mt-6"
        onPress={() => navigation.navigate("CreateActivity")}
      >
        Nova Atividade
      </Button>
    </View>
  );
};
