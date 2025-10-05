import MessageBot from "@/componentes/chat/MessageBot";
import CloudsBackground from "@/componentes/CloudsBackground";
import CustomButton from "@/componentes/CustomButton";
import DatePicker from "@/componentes/DatePicker";
import MapWithAddressInput from "@/componentes/MapWithAddressInput";
import TimeDropdown, { TimePeriod } from "@/componentes/TimeDropdown";
import { LocationSelectionResult } from "@/types/location";
import { LinearGradient } from "expo-linear-gradient";
import { router, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DateHourScreen = () => {
  const safeArea = useSafeAreaInsets();
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState(""); // Formato HH:mm:ss
  const [endTime, setEndTime] = useState(""); // Formato HH:mm:ss
  const [showHeader, setShowHeader] = useState(true);

  const handleLocationSelect = (location: LocationSelectionResult) => {
    console.log("Ubicación seleccionada:", {
      name: location.name,
      address: location.address,
      coordinates: location.coordinates,
    });
  };

  // Formatear fecha a YYYY-MM-DD
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Formatear para la API en formato UTC: YYYY-MM-DDThh:mm:ss
  const formatForAPI = () => {
    if (!selectedDate || !startTime) {
      console.log("Faltan datos");
      return;
    }

    const dateStr = formatDate(selectedDate);
    const timeStart = `${dateStr}T${startTime}`;
    
    // Si no hay endTime, usar el mismo día a las 23:59:59
    const timeEnd = endTime ? `${dateStr}T${endTime}` : `${dateStr}T23:59:59`;

    console.log("time_start:", timeStart);
    console.log("end_time:", timeEnd);

    // Aquí puedes enviar al backend
    return { time_start: timeStart, end_time: timeEnd };
  };

  const handleContinue = () => {
    const apiData = formatForAPI();
    if (apiData) {
      console.log("Datos para API:", apiData);
      // Navegar a la siguiente pantalla o enviar al backend
    }
  };

  // Manejar el scroll para ocultar/mostrar el header
  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const HEADER_SCROLL_DISTANCE = 50; // Distancia de scroll para ocultar el header

    if (scrollY > HEADER_SCROLL_DISTANCE && showHeader) {
      setShowHeader(false);
    } else if (scrollY <= HEADER_SCROLL_DISTANCE && !showHeader) {
      setShowHeader(true);
    }
  };

  // Configurar el header dinámicamente
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: showHeader,
    });
  }, [navigation, showHeader]);

  return (
    <LinearGradient
      colors={["#94A8D8", "#5074C9"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <CloudsBackground />
      <ScrollView
        style={[styles.container, { paddingTop: safeArea.top + 50 }]}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Mapa más pequeño */}
        <View style={styles.mapContainer}>
          <MapWithAddressInput
            onLocationSelect={handleLocationSelect}
            showCurrentLocationButton={false}
            showAddressInput={false}
            interactive={false}
            showSelectedLocation={false}
            style={{ flex: 1 }}
          />
        </View>

        {/* MessageBot */}
        <View style={styles.messageBotContainer}>
          <MessageBot
            imgUrl="Bot.png"
            message="Perfecto , ahora selecciona la fecha y hora del evento."
          />
        </View>

        {/* Formularios de fecha y hora */}
        <View style={styles.formContainer}>
          <View>
            <Text className="text-white text-2xl font-bold pb-2">Fecha</Text>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              placeholder="Selecciona una fecha"
            />
          </View>

          <View>
            <Text className="text-white text-2xl font-bold pb-2">
              En que momento del dìa realizaras tus planes?
            </Text>
            <TimeDropdown
              value={startTime}
              onSelect={(period: TimePeriod) => setStartTime(period.value)}
              placeholder="Selecciona período"
            />
          </View>
        </View>

        {/* Botón de continuar */}
        <View style={styles.buttonContainer}>
          <CustomButton
            icon="chatbubble-ellipses-outline"
            iconPosition="left"
            children="Chat"
            color="#4684FF"
            onPress={() => router.push("/(stack)/map")}
            className="mt-2"
          />
          <CustomButton
            icon="send"
            iconPosition="right"
            children="Enviar"
            color="#4684FF"
            onPress={handleContinue}
            className="mt-2"
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    height: 325, // Mapa más pequeño
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 16,
  },
  messageBotContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  formContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "flex-end",

    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: "center",
  },
});

export default DateHourScreen;
