import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { getActivityById, updateActivity } from "../api/activity.api";
import { Button } from "../components/Button";
import { DatePickerField } from "../components/DatePickerField";
import { ImagePickerField } from "../components/ImagePickerField";
import { Input } from "../components/Input";
import { Loading } from "../components/Loading";
import { Select } from "../components/Select";
import { useActivityForm } from "../hooks/useActivityForm";
import { showErrorAlert, showSuccessAlert } from "../utils/error-handler";
import { getImageUrl } from "../utils/image.utils";
import { SuccessMessages } from "../utils/success-messages";

export default function EditActivityScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: number };

  // Armazena o imagePath original do servidor
  const [originalImagePath, setOriginalImagePath] = useState<string | null>(
    null
  );

  const {
    control,
    errors,
    image,
    setImage,
    handleSubmit,
    reset,
    isSubmitting,
    loading,
    setLoading,
    onSubmitWrapper,
  } = useActivityForm(async (formData) => {
    if (
      image &&
      originalImagePath &&
      image === getImageUrl(originalImagePath)
    ) {
      formData.delete("image");
    }
    await updateActivity(id, formData);
    showSuccessAlert(SuccessMessages.activity.updated);
    navigation.goBack();
  });

  useEffect(() => {
    const loadActivity = async () => {
      try {
        setLoading(true);
        const data = await getActivityById(id);
        const formattedDate = data.date.split("T")[0];
        reset({
          title: data.title,
          description: data.description,
          professor: data.professor,
          date: formattedDate,
          link: data.link,
          status: data.status,
        });

        setOriginalImagePath(data.imagePath);

        const imageUrl = getImageUrl(data.imagePath);
        setImage(imageUrl);
      } catch (error) {
        showErrorAlert(error, "Erro ao carregar atividade");
      } finally {
        setLoading(false);
      }
    };
    loadActivity();
  }, [id, reset, setLoading, setImage]);

  if (loading) return <Loading message="Carregando dados da atividade..." />;

  const statusOptions = [
    { label: "Em Andamento", value: "em andamento" },
    { label: "Concluído", value: "concluído" },
    { label: "Cancelado", value: "cancelado" },
  ];

  return (
    <ScrollView className="flex-1 bg-secondary-dark p-6">
      <Text className="text-3xl font-bold text-white mb-6 text-center">
        Editar Atividade
      </Text>

      <Input
        control={control}
        name="title"
        label="Título"
        error={errors.title?.message}
      />
      <Input
        control={control}
        name="description"
        label="Descrição"
        error={errors.description?.message}
        multiline
      />
      <Input
        control={control}
        name="professor"
        label="Professor"
        error={errors.professor?.message}
      />
      <DatePickerField
        control={control}
        name="date"
        label="Data de Entrega"
        error={errors.date?.message}
      />
      <Input
        control={control}
        name="link"
        label="Link"
        error={errors.link?.message}
      />

      {/* Campo de Status */}
      <Select
        control={control}
        name="status"
        label="Status"
        options={statusOptions}
        error={errors.status?.message}
      />

      {/* Upload de imagem */}
      <ImagePickerField
        onImageSelected={setImage}
        initialImage={image}
        label="Alterar Imagem"
      />

      <Button
        title="Salvar Alterações"
        icon="check-circle"
        onPress={handleSubmit(onSubmitWrapper)}
        loading={isSubmitting}
        variant="primary"
      />
      <View className="h-3" />
      <Button
        title="Cancelar"
        icon="close"
        onPress={() => navigation.goBack()}
        variant="secondary"
      />
    </ScrollView>
  );
}
