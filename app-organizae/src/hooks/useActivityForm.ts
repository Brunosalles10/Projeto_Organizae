import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Platform } from "react-native";
import { ActivityFormData, activitySchema } from "../schemas/activity.schema";
import { showErrorAlert } from "../utils/error-handler";

export function useActivityForm(
  onSubmitCallback: (formData: FormData) => Promise<void>
) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      title: "",
      description: "",
      professor: "",
      date: "",
      link: "",
      status: "em andamento",
    },
  });

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      showErrorAlert("Precisamos de permissão para acessar suas fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitWrapper = async (data: ActivityFormData) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("professor", data.professor);
      formData.append("date", data.date);
      formData.append("link", data.link);
      if (data.status) {
        formData.append("status", data.status);
      }

      if (image) {
        if (Platform.OS === "web") {
          // No Web: converter para Blob
          const response = await fetch(image);
          const blob = await response.blob();
          formData.append("image", blob, "image.jpg");
        } else {
          // no mobile formato normal
          const filename = image.split("/").pop() || "upload.jpg";
          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `image/${match[1]}` : "image/jpeg";

          formData.append("image", {
            uri: image,
            name: filename,
            type,
          } as any);
        }
      }

      await onSubmitCallback(formData);
    } catch (error: any) {
      // Tentar extrair mensagem amigável do backend, se houver
      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Erro desconhecido";
      showErrorAlert(backendMessage, "Erro ao processar formulário");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    control,
    handleSubmit,
    reset,
    onSubmitWrapper,
    pickImage,
    errors,
    image,
    setImage,
    loading,
    setLoading,
    isSubmitting,
  };
}
