import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { COLORS } from "../theme/colors";

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  message = "Carregando...",
}) => {
  return (
    <View className="flex-1 items-center justify-center bg-secondary-dark">
      <ActivityIndicator size="large" color={COLORS.primary.DEFAULT} />
      <Text className="text-white mt-4 text-base">{message}</Text>
    </View>
  );
};
