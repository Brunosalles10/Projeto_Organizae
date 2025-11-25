import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Loading } from "../components/Loading";
import { useAuth } from "../contexts/AuthContext";
import {
  ChangePasswordFormData,
  changePasswordFormSchema,
  ProfileFormData,
  profileSchema,
} from "../schemas/profile.schema";
import { showErrorAlert, showSuccessAlert } from "../utils/error-handler";
import { SuccessMessages } from "../utils/success-messages";

export const ProfileScreen = () => {
  const {
    user,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    signOut,
  } = useAuth();

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  // Form para senha
  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  //carrega perfil
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        await getUserProfile();
        if (user) {
          resetProfile({ name: user.name, email: user.email });
        }
      } catch (error) {
        showErrorAlert(error, "Erro ao carregar perfil");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  //salvar alterações
  const onSave = async (form: ProfileFormData) => {
    try {
      await updateUserProfile(user.id, form);
      showSuccessAlert(SuccessMessages.profile.updated);
      setEditing(false);
    } catch (error) {
      showErrorAlert(error, "Erro ao atualizar perfil");
    }
  };

  // Alterar senha
  const onChangePassword = async (form: ChangePasswordFormData) => {
    try {
      const validatedData = changePasswordFormSchema.parse(form);
      await updateUserProfile(user.id, {
        password: validatedData.newPassword,
      });
      showSuccessAlert("Senha alterada com sucesso!");
      setChangingPassword(false);
      resetPassword();
    } catch (error) {
      showErrorAlert(error, "Erro ao alterar senha");
    }
  };

  //excluir conta
  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteUserProfile(user.id);
      showSuccessAlert(SuccessMessages.profile.deleted);
    } catch (error) {
      showErrorAlert(error, "Erro ao excluir conta");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      showSuccessAlert(SuccessMessages.auth.logout);
    } catch (error) {
      showErrorAlert(error, "Erro ao fazer logout");
    }
  };

  if (loading) return <Loading message="Carregando seu perfil..." />;

  return (
    <ScrollView className="flex-1 bg-secondary-dark p-6">
      <Text className="text-3xl font-bold text-white mb-8 text-center">
        Meu Perfil
      </Text>
      <View className="mb-6">
        <Text className="text-xl font-bold text-white mb-4">
          Informações Pessoais
        </Text>

        <Input
          control={profileControl}
          name="name"
          label="Nome"
          error={profileErrors.name?.message}
          editable={editing}
          placeholder="Seu nome"
        />

        <Input
          control={profileControl}
          name="email"
          label="E-mail"
          error={profileErrors.email?.message}
          editable={editing}
          placeholder="seu@email.com"
        />

        {editing ? (
          <>
            <Button
              title="Salvar Alterações"
              icon="check-circle"
              onPress={handleProfileSubmit(onSave)}
              loading={isProfileSubmitting}
              variant="primary"
            />
            <View className="h-3" />
            <Button
              title="Cancelar"
              icon="close"
              onPress={() => {
                setEditing(false);
                resetProfile({
                  name: user?.name || "",
                  email: user?.email || "",
                });
              }}
              variant="outline"
            />
          </>
        ) : (
          <Button
            title="Editar Perfil"
            icon="edit"
            onPress={() => setEditing(true)}
            variant="secondary"
          />
        )}
      </View>
      <View className="border-t border-gray-700 my-6" />
      {/* SEÇÃO: ALTERAR SENHA  */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-white">Segurança</Text>
          {!changingPassword && (
            <TouchableOpacity
              onPress={() => setChangingPassword(true)}
              className="bg-primary/20 px-4 py-2 rounded-lg"
            >
              <Text className="text-primary font-semibold">Alterar Senha</Text>
            </TouchableOpacity>
          )}
        </View>
        {changingPassword ? (
          <>
            <Input
              control={passwordControl}
              name="newPassword"
              label="Nova Senha"
              secureTextEntry
              placeholder="Digite a nova senha"
              error={passwordErrors.newPassword?.message}
            />
            <Input
              control={passwordControl}
              name="confirmNewPassword"
              label="Confirmar Nova Senha"
              secureTextEntry
              placeholder="Confirme a nova senha"
              error={passwordErrors.confirmNewPassword?.message}
            />

            <Button
              title="Salvar Nova Senha"
              icon="lock"
              onPress={handlePasswordSubmit(onChangePassword)}
              loading={isPasswordSubmitting}
              variant="primary"
            />
            <View className="h-3" />
            <Button
              title="Cancelar"
              icon="close"
              onPress={() => {
                setChangingPassword(false);
                resetPassword();
              }}
              variant="outline"
            />
          </>
        ) : (
          <Text className="text-white/60 text-sm">
            Clique em Alterar Senha para modificar sua senha de acesso.
          </Text>
        )}
      </View>

      <View className="border-t border-gray-700 my-6" />

      {/* SEÇÃO: AÇÕES DA CONTA  */}

      <View className="mt-4" />

      <View>
        <Text className="text-xl font-bold text-white mb-4">Conta</Text>
        <Button
          title="Sair da Conta"
          icon="logout"
          onPress={handleLogout}
          variant="outline"
        />
        <View className="mt-4" />

        <Button
          title="Excluir Conta"
          icon="delete"
          onPress={onDelete}
          variant="danger"
        />
      </View>
    </ScrollView>
  );
};
