import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, Text, View } from "react-native";

import { createActivity } from "../api/activity.api";
import { Button } from "../components/Button";
import { DatePickerField } from "../components/DatePickerField";
import { ImagePickerField } from "../components/ImagePickerField";
import { Input } from "../components/Input";
import { Loading } from "../components/Loading";
import { useActivityForm } from "../hooks/useActivityForm";
import { showSuccessAlert } from "../utils/error-handler";
import { SuccessMessages } from "../utils/success-messages";

export default function CreateActivityScreen() {
  const navigation = useNavigation();

  const {
    control,
    errors,
    image,
    setImage,
    handleSubmit,
    reset,
    isSubmitting,
    loading,
    onSubmitWrapper,
  } = useActivityForm(async (formData: FormData) => {
    await createActivity(formData);
    showSuccessAlert(SuccessMessages.activity.created);
    reset();
    setImage(null);
    navigation.goBack();
  });

  if (loading) return <Loading message="Preparando formulário..." />;

  return (
    <ScrollView className="flex-1 bg-secondary-dark p-6">
      <Text className="text-3xl font-bold text-white mb-6 text-center">
        Nova Atividade
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
      <View className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-4">
        <Text className="text-primary text-sm font-semibold">
          ℹ️ Status Inicial
        </Text>
        <Text className="text-white/70 text-sm mt-1">
          Esta atividade será criada com status em andamento automaticamente.
        </Text>
      </View>

      <ImagePickerField onImageSelected={setImage} initialImage={image} />

      <Button
        title="Salvar Atividade"
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
