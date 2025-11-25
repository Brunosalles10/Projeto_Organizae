import { registerSchema } from "@/src/schemas/register.schema";
import { SuccessMessages } from "@/src/utils/success-messages";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import z from "zod";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Loading } from "../../components/Loading";
import { useAuth } from "../../contexts/AuthContext";
import { handleAuthError } from "../../utils/auth-error-handler";
import { showSuccessAlert } from "../../utils/error-handler";

export const RegisterScreen = ({ navigation }: any) => {
  const { signUp } = useAuth();
  const [generalError, setGeneralError] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setGeneralError("");
      const validatedData = registerSchema.parse(form);

      setLoading(true);
      await signUp({
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password,
      });

      showSuccessAlert(SuccessMessages.auth.register);
      navigation.replace("Login");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((e) => {
          const key = String(e.path[0]);
          if (key) fieldErrors[key] = e.message;
        });
        setErrors(fieldErrors);
        return;
      }

      setGeneralError(handleAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading message="Criando conta..." />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-secondary-dark"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-6 justify-center"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center">
          <Text className="text-2xl font-bold text-white text-center mb-8">
            Criar Conta
          </Text>

          {/* Mensagem de erro geral */}
          {generalError && (
            <View className="bg-red-500/20 border-2 border-red-500 rounded-xl p-4 mb-4">
              <Text className="text-red-400 text-center font-semibold">
                {generalError}
              </Text>
            </View>
          )}

          <Input
            label="Nome"
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
            placeholder="Digite seu nome"
            error={errors.name}
          />

          <Input
            label="E-mail"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            placeholder="exemplo@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            autoCorrect={false}
          />

          <Input
            label="Senha"
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
            secureTextEntry
            placeholder="Crie uma senha"
            error={errors.password}
          />

          <Input
            label="Confirmar Senha"
            value={form.confirmPassword}
            onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
            secureTextEntry
            placeholder="Confirme sua senha"
            error={errors.confirmPassword}
          />

          <Button
            title="Registrar"
            onPress={handleRegister}
            loading={loading}
            variant="primary"
            icon="person-add"
          />
          <View className="h-3" />

          <Button
            title="Já tenho uma conta"
            onPress={() => navigation.navigate("Login")}
            variant="outline"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
