import { COLORS } from "@/src/theme/colors";
import { getImageUrl } from "@/src/utils/image.utils";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ActivityCardProps {
  activity: {
    id: number;
    title: string;
    description: string;
    professor: string;
    date: string;
    status: "concluído" | "em andamento" | "cancelado";
    imagePath?: string;
  };
  onPress: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onPress,
}) => {
  const [imageError, setImageError] = useState(false);

  const statusConfig = {
    concluído: {
      color: COLORS.success,
      icon: "check-circle" as const,
      text: "Concluído",
    },
    "em andamento": {
      color: COLORS.warning,
      icon: "pending" as const,
      text: "Em Andamento",
    },
    cancelado: {
      color: COLORS.error,
      icon: "cancel" as const,
      text: "Cancelado",
    },
  };

  const config = statusConfig[activity.status];
  const imageUrl = getImageUrl(activity.imagePath);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-secondary-light rounded-2xl overflow-hidden mb-4 shadow-lg"
      activeOpacity={0.9}
    >
      {/* Imagem */}
      {imageUrl && !imageError ? (
        <View className="relative">
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-48"
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        </View>
      ) : (
        <View className="w-full h-48 bg-primary/20 items-center justify-center">
          <MaterialIcons name="image" size={64} color={COLORS.primary.light} />
          {imageError && (
            <Text className="text-gray-400 text-xs mt-2">
              Erro ao carregar imagem
            </Text>
          )}
        </View>
      )}

      <View className="p-4">
        {/* Título */}
        <Text className="text-xl font-bold text-white mb-2" numberOfLines={1}>
          {activity.title}
        </Text>

        {/* Descrição */}
        <Text className="text-gray-300 mb-3 text-sm" numberOfLines={2}>
          {activity.description}
        </Text>

        {/* Professor */}
        <View className="flex-row items-center mb-2">
          <MaterialIcons name="person" size={16} color={COLORS.primary.light} />
          <Text className="text-gray-200 ml-2 text-sm">
            Prof. {activity.professor}
          </Text>
        </View>

        {/* Data */}
        <View className="flex-row items-center mb-3">
          <MaterialIcons
            name="calendar-today"
            size={16}
            color={COLORS.primary.light}
          />
          <Text className="text-gray-200 ml-2 text-sm">
            {new Date(activity.date).toLocaleDateString("pt-BR")}
          </Text>
        </View>

        {/* Status */}
        <View
          className="rounded-full px-4 py-2 flex-row items-center justify-center"
          style={{ backgroundColor: config.color }}
        >
          <MaterialIcons name={config.icon} size={16} color="white" />
          <Text className="text-white font-semibold ml-2 text-sm">
            {config.text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
