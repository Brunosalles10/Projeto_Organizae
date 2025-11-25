import React from "react";
import { Control, Controller } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

interface SelectProps {
  label: string;
  name: string;
  control: Control<any>;
  error?: string;
  options: { label: string; value: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  control,
  error,
  options,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View className="mb-4">
          <Text className="text-white font-semibold mb-2 text-base">
            {label}
          </Text>
          <View className="flex-row gap-2">
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() =>
                  onChange(value === option.value ? null : option.value)
                }
                className={`flex-1 p-3 rounded-xl border-2 ${
                  value === option.value
                    ? "bg-primary border-primary"
                    : "bg-white border-gray-200"
                }`}
              >
                <Text
                  className={`text-center font-semibold ${
                    value === option.value ? "text-white" : "text-secondary"
                  }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {error && <Text className="text-red-400 text-sm mt-1">{error}</Text>}
        </View>
      )}
    />
  );
};
