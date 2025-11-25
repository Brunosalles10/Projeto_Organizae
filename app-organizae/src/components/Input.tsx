import React from "react";
import { Control, Controller } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputPropsWithControl extends TextInputProps {
  label: string;
  name: string;
  control: Control<any>;
  error?: string;
}

interface InputPropsWithoutControl extends TextInputProps {
  label: string;
  name?: never;
  control?: never;
  error?: string;
  value: string;
  onChangeText?: (text: string) => void;
}

type InputProps = InputPropsWithControl | InputPropsWithoutControl;

export const Input: React.FC<InputProps> = ({
  label,
  name,
  control,
  error,
  ...props
}) => {
  // Se tem control, usa Controller (React Hook Form)
  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="mb-4">
            <Text className="text-white font-semibold mb-2 text-base">
              {label}
            </Text>
            <TextInput
              {...props}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              className={`bg-white rounded-xl p-4 text-base text-secondary ${
                error ? "border-2 border-red-500" : "border border-gray-200"
              }`}
              placeholderTextColor="#9CA3AF"
            />
            {error && (
              <Text className="text-red-400 text-sm mt-1">{error}</Text>
            )}
          </View>
        )}
      />
    );
  }

  // Se não tem control, usa input direto
  return (
    <View className="mb-4">
      <Text className="text-white font-semibold mb-2 text-base">{label}</Text>
      <TextInput
        {...props}
        className={`bg-white rounded-xl p-4 text-base text-secondary ${
          error ? "border-2 border-red-500" : "border border-gray-200"
        }`}
        placeholderTextColor="#9CA3AF"
      />
      {error && <Text className="text-red-400 text-sm mt-1">{error}</Text>}
    </View>
  );
};
