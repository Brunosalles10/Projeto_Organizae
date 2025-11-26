import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityCard } from "../components/ActivityCard";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
import { useAuth } from "../contexts/AuthContext";
import { COLORS } from "../theme/colors";
import { showErrorAlert, showSuccessAlert } from "../utils/error-handler";
import { SuccessMessages } from "../utils/success-messages";

export const HomeScreen = ({ navigation }: any) => {
  const { fetchActivities, user } = useAuth();
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadActivities = async (shouldShowLoading = true) => {
    try {
      if (shouldShowLoading) setLoading(true);
      const data = await fetchActivities();
      setActivities(data);
      showSuccessAlert(SuccessMessages.activity.loaded);
    } catch (error) {
      showErrorAlert(error, "Erro ao carregar atividades");
    } finally {
      if (shouldShowLoading) setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadActivities(false);
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadActivities();
    }, [])
  );

  if (loading) return <Loading message="Carregando suas atividades..." />;

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      className="flex-1 bg-secondary-dark"
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary.dark}
      />

      <View className="flex-1">
        {/* Header Fixo */}
        <View className="bg-primary-dark px-6 pt-4 pb-6 shadow-lg">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-white mb-1">
                Olá, {user?.name?.split(" ")[0] || "Estudante"}!
              </Text>
              <Text className="text-white/80 text-sm">
                {activities.length}{" "}
                {activities.length === 1
                  ? "atividade registrada"
                  : "atividades registradas"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              className="bg-white/10 rounded-full p-3"
            >
              <MaterialIcons name="logout" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Conteúdo */}
        {activities.length === 0 ? (
          <View className="flex-1 items-center justify-center px-6 bg-secondary-dark">
            <View className="items-center bg-secondary-light rounded-3xl p-8 shadow-lg">
              <View className="bg-primary/20 rounded-full p-6 mb-4">
                <MaterialIcons
                  name="assignment"
                  size={64}
                  color={COLORS.primary.light}
                />
              </View>
              <Text className="text-white text-xl font-bold text-center mb-2">
                Nenhuma atividade
              </Text>
              <Text className="text-white/70 text-center mb-6 text-sm">
                Crie sua primeira atividade para começar!
              </Text>
              <Button
                title="Criar Atividade"
                onPress={() => navigation.navigate("CreateActivity")}
                icon="add-circle-outline"
                variant="primary"
              />
            </View>
          </View>
        ) : (
          <View className="flex-1 bg-secondary-dark">
            <FlatList
              data={activities}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ActivityCard
                  activity={item}
                  onPress={() =>
                    navigation.navigate("ActivityDetails", { id: item.id })
                  }
                />
              )}
              contentContainerStyle={{
                padding: 16,
                paddingBottom: 120,
              }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={COLORS.primary.light}
                  colors={[COLORS.primary.DEFAULT]}
                />
              }
              showsVerticalScrollIndicator={false}
            />

            {/* Botão Flutuante de Adicionar */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("CreateActivity")}
              className="absolute bottom-24 right-6 shadow-2xl"
              style={{
                backgroundColor: COLORS.primary.DEFAULT,
                width: 60,
                height: 60,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
                elevation: 8,
                shadowColor: COLORS.primary.DEFAULT,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
              }}
            >
              <MaterialIcons name="add" size={32} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
