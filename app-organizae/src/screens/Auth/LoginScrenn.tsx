import { LoginFormData, loginSchema } from "@/src/schemas/login.schema";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { z } from "zod";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAuth } from "../../contexts/AuthContext";
import { handleAuthError } from "../../utils/auth-error-handler";

export const LoginScreen = ({ navigation }: any) => {
  const { signIn } = useAuth();
  const [generalError, setGeneralError] = useState<string>("");
  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setErrors({});
      setGeneralError("");
      setLoading(true);
      const validatedData = loginSchema.parse(form);

      await signIn(validatedData.email, validatedData.password);
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
          <View className="mb-10">
            <View className="items-center mb-8">
              <View className="bg-primary rounded-full p-4 mb-4" />
              <Text className="text-white text-2xl font-bold">Bem-vindo</Text>
            </View>

            {/* Mensagem de erro geral */}
            {generalError && (
              <View className="bg-red-500/20 border-2 border-red-500 rounded-xl p-4 mb-4">
                <Text className="text-red-400 text-center font-semibold">
                  {generalError}
                </Text>
              </View>
            )}

            <Input
              label="E-mail"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={errors.email}
              placeholder="exemplo@email.com"
              editable={!loading}
            />

            <Input
              label="Senha"
              value={form.password}
              onChangeText={(text) => setForm({ ...form, password: text })}
              secureTextEntry
              error={errors.password}
              placeholder="Digite sua senha"
              editable={!loading}
            />

            <Button
              title="Entrar"
              onPress={handleLogin}
              loading={loading}
              variant="primary"
              icon="login"
              disabled={loading}
            />
            <View className="h-3" />

            <Button
              title="Criar Conta"
              onPress={() => navigation.navigate("Register")}
              variant="outline"
              fullWidth
              disabled={loading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
