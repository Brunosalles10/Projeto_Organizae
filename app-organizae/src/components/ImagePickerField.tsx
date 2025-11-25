import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Alert, Image, View } from "react-native";
import { Button } from "./Button";

interface ImagePickerFieldProps {
  label?: string;
  onImageSelected: (uri: string | null) => void;
  initialImage?: string | null;
}

export const ImagePickerField: React.FC<ImagePickerFieldProps> = ({
  label = "Selecionar Imagem",
  onImageSelected,
  initialImage = null,
}) => {
  const [imageUri, setImageUri] = useState<string | null>(initialImage);

  // Atualiza a imagem quando initialImage mudar
  useEffect(() => {
    if (initialImage) {
      setImageUri(initialImage);
    }
  }, [initialImage]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permissão negada", "Precisamos de acesso à galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      onImageSelected(uri);
    }
  };

  return (
    <View className="mb-6 mt-2">
      <Button
        title={label}
        icon="image"
        onPress={pickImage}
        variant="outline"
      />

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          className="w-full h-48 rounded-xl mt-3 border border-gray-700"
          resizeMode="cover"
        />
      )}
    </View>
  );
};
