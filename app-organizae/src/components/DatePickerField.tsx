import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";

interface DatePickerFieldProps {
  control: any;
  name: string;
  label: string;
  error?: string;
  minDate?: string; // Formato YYYY-MM-DD
}

export const DatePickerField = ({
  control,
  name,
  label,
  error,
  minDate,
}: DatePickerFieldProps) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  // Função para formatar a data para exibição
  const formatDateForDisplay = (dateString?: string | null) => {
    if (!dateString) return "Selecione uma data";

    const d = new Date(dateString + "T00:00:00");

    if (typeof Intl !== "undefined" && Intl.DateTimeFormat) {
      return new Intl.DateTimeFormat("pt-BR").format(d);
    }

    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  // Pega a data de hoje no formato YYYY-MM-DD
  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const minimumDate = minDate || getTodayString();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View className="mb-4">
          <Text className="text-white text-base font-semibold mb-2">
            {label}
          </Text>

          <TouchableOpacity
            onPress={() => setIsCalendarVisible(true)}
            className={`bg-secondary-light border ${
              error ? "border-red-500" : "border-gray-600"
            } rounded-xl px-4 py-4 flex-row items-center justify-between`}
          >
            <Text
              className={`${value ? "text-white" : "text-gray-400"} text-base`}
            >
              {formatDateForDisplay(value)}
            </Text>
            <Feather name="calendar" size={20} color="#7C3AED" />
          </TouchableOpacity>

          {error && (
            <Text className="text-red-500 text-sm mt-1 ml-1">{error}</Text>
          )}

          {/* Modal com o Calendário */}
          <Modal
            visible={isCalendarVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setIsCalendarVisible(false)}
          >
            <View className="flex-1 bg-black/70 justify-center items-center">
              <View className="bg-secondary-light rounded-2xl p-4 w-11/12 max-w-md">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-white text-xl font-bold">
                    Selecione a Data
                  </Text>
                  <TouchableOpacity onPress={() => setIsCalendarVisible(false)}>
                    <Feather name="x" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>

                <Calendar
                  minDate={minimumDate}
                  onDayPress={(day) => {
                    onChange(day.dateString);
                    setIsCalendarVisible(false);
                  }}
                  markedDates={{
                    [value]: {
                      selected: true,
                      selectedColor: "#7C3AED",
                    },
                  }}
                  theme={{
                    calendarBackground: "#1e293b",
                    textSectionTitleColor: "#10b981",
                    selectedDayBackgroundColor: "#10b981",
                    selectedDayTextColor: "#ffffff",
                    todayTextColor: "#10b981",
                    dayTextColor: "#ffffff",
                    textDisabledColor: "#475569",
                    monthTextColor: "#ffffff",
                    arrowColor: "#10b981",
                    textDayFontWeight: "500",
                    textMonthFontWeight: "bold",
                    textDayHeaderFontWeight: "600",
                  }}
                />

                <View className="mt-4 bg-primary/10 border border-primary/30 rounded-lg p-3">
                  <Text className="text-primary text-lg font-semibold">
                    ℹ️ Não é possível data retroativa
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    />
  );
};
