import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";

export const ProfileScreen = () => {
  const { user, getUserProfile, updateUserProfile, deleteUserProfile } =
    useAuth();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      await getUserProfile();
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || "", email: user.email || "" });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await updateUserProfile(form);
      setEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteUserProfile(); // remove conta e limpa storage
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-5 bg-white">
      <Text variant="headlineMedium" className="mb-6 text-center">
        Meu Perfil 👤
      </Text>

      <TextInput
        label="Nome"
        mode="outlined"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
        disabled={!editing}
        className="mb-4"
      />

      <TextInput
        label="Email"
        mode="outlined"
        value={form.email}
        disabled
        className="mb-4"
      />

      {editing ? (
        <Button mode="contained" onPress={handleSave}>
          Salvar Alterações
        </Button>
      ) : (
        <Button mode="contained" onPress={() => setEditing(true)}>
          Editar Perfil
        </Button>
      )}

      <Button
        mode="outlined"
        className="mt-4"
        onPress={loadProfile}
        icon="refresh"
      >
        Atualizar Dados
      </Button>
      <Button
        mode="contained-tonal"
        className="mt-6"
        onPress={handleDelete}
        textColor="red"
      >
        Excluir Conta
      </Button>
    </ScrollView>
  );
};
