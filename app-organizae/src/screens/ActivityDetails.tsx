import { MaterialIcons } from "@expo/vector-icons";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  deleteActivity,
  getActivityById,
  updateActivity,
} from "../api/activity.api";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
import { COLORS } from "../theme/colors";
import { showErrorAlert, showSuccessAlert } from "../utils/error-handler";
import { getImageUrl } from "../utils/image.utils";
import { SuccessMessages } from "../utils/success-messages";

export default function ActivityDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: number };
  const [activity, setActivity] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const loadActivity = async () => {
    try {
      setLoading(true);
      const data = await getActivityById(id);
      setActivity(data);
    } catch (error) {
      showErrorAlert(error, "Erro ao carregar atividade");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadActivity();
    }, [id])
  );
  const handleUpdateStatus = async (newStatus: string) => {
    try {
      const formData = new FormData();
      formData.append("status", newStatus);
      await updateActivity(id, formData);
      showSuccessAlert("Status atualizado com sucesso!");
      loadActivity();
    } catch (error) {
      showErrorAlert(error, "Falha ao atualizar o status");
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteActivity(id);
      showSuccessAlert(SuccessMessages.activity.deleted);
      navigation.goBack();
    } catch (error) {
      showErrorAlert(error, "Erro ao excluir atividade");
    }
  };

  if (loading) return <Loading message="Carregando atividade..." />;

  if (!activity) {
    return (
      <View className="flex-1 items-center justify-center bg-secondary-dark">
        <MaterialIcons
          name="error-outline"
          size={64}
          color={COLORS.primary.light}
        />
        <Text className="text-white mt-4 text-lg">
          Atividade não encontrada.
        </Text>
        <Button
          title="Voltar"
          onPress={() => navigation.goBack()}
          variant="outline"
          className="mt-4"
        />
      </View>
    );
  }

  const formattedDate = new Date(activity.date).toLocaleDateString("pt-BR");

  return (
    <ScrollView className="flex-1 bg-secondary-dark p-6">
      <Text className="text-3xl font-bold text-white mb-2">
        {activity.title}
      </Text>
      <Text className="text-white/80 mb-4 text-lg">
        Professor: <Text className="font-bold">{activity.professor}</Text>
      </Text>

      {activity.imagePath && (
        <TouchableOpacity
          onPress={() => (navigation as any).navigate("EditActivity", { id })}
        >
          <Image
            source={{ uri: getImageUrl(activity.imagePath) ?? undefined }}
            className="w-full h-56 rounded-2xl mb-6 bg-gray-700"
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}

      <View className="bg-primary-dark/30 p-4 rounded-xl mb-6">
        <Text className="text-white text-base mb-3 leading-6">
          {activity.description}
        </Text>
        <View className="flex-row justify-between mt-2">
          <Text className="text-white/60">{formattedDate}</Text>
          <Text
            className={`font-bold ${
              activity.status === "concluído"
                ? "text-green-400"
                : activity.status === "cancelado"
                  ? "text-red-400"
                  : "text-yellow-400"
            }`}
          >
            {activity.status?.toUpperCase() || "SEM STATUS"}
          </Text>
        </View>
      </View>

      <View className="space-y-3 pb-10">
        {/* Só mostra botão de concluir se NÃO estiver concluído */}
        {activity.status !== "concluído" && (
          <Button
            title="Marcar como Concluído"
            icon="check-circle"
            onPress={() => handleUpdateStatus("concluído")}
            variant="primary"
          />
        )}
        {/* Só mostra botão de em andamento se estiver concluído */}
        {activity.status === "concluído" && (
          <Button
            title="Reabrir Atividade"
            icon="pending"
            onPress={() => handleUpdateStatus("em andamento")}
            variant="secondary"
          />
        )}

        <Button
          title="Editar Atividade"
          icon="edit"
          onPress={() => {
            (navigation as any).navigate("EditActivity", { id });
          }}
          variant="outline"
        />
        <Button
          title="Excluir Atividade"
          icon="delete"
          onPress={handleDelete}
          variant="danger"
        />
        <View className="mt-2">
          <Button
            title="Voltar"
            icon="arrow-back"
            onPress={() => navigation.goBack()}
            variant="outline"
          />
        </View>
      </View>
    </ScrollView>
  );
}
