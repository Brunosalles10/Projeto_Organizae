import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "outline";
  icon?: keyof typeof MaterialIcons.glyphMap;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  loading = false,
  variant = "primary",
  icon,
  disabled = false,
  fullWidth = true,
  className = "",
}) => {
  const variants = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    danger: "bg-red-600",
    outline: "bg-transparent border-2 border-primary",
  };

  const textVariants = {
    primary: "text-white",
    secondary: "text-white",
    danger: "text-white",
    outline: "text-primary",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        rounded-xl py-4 px-6
        ${variants[variant]}
        ${(disabled || loading) && "opacity-50"}
        ${fullWidth && "w-full"}
        flex-row items-center justify-center
        ${className}
      `}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? "#7C3AED" : "white"}
        />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon && (
            <MaterialIcons
              name={icon}
              size={20}
              color={variant === "outline" ? "#7C3AED" : "white"}
            />
          )}
          <Text className={`font-semibold text-base ${textVariants[variant]}`}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
