import MessageBot from "@/componentes/chat/MessageBot";
import CloudsBackground from "@/componentes/CloudsBackground";
import CustomButton from "@/componentes/CustomButton";
import DatePicker from "@/componentes/DatePicker";
import MapWithAddressInput from "@/componentes/MapWithAddressInput";
import TimeDropdown, { TimePeriod } from "@/componentes/TimeDropdown";
import { useEvent } from "@/contexts/EventContext";
import { LinearGradient } from "expo-linear-gradient";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DateHourScreen = () => {
  const safeArea = useSafeAreaInsets();
  const navigation = useNavigation();
  const { eventData, setDate, setStartTime, setEndTime, getFormattedData } = useEvent();
  const [selectedDate, setSelectedDateLocal] = useState<Date | undefined>(eventData.date);
  const [startTime, setStartTimeLocal] = useState(eventData.startTime);
  const [endTime, setEndTimeLocal] = useState(eventData.endTime);
  const [showHeader, setShowHeader] = useState(true);

  // Verificar si hay ubicación al montar el componente
  useEffect(() => {
    if (!eventData.location) {
      Alert.alert(
        "Ubicación requerida",
        "Primero debes seleccionar una ubicación en el mapa.",
        [
          {
            text: "Volver",
            onPress: () => router.back(),
          },
        ]
      );
    }
  }, [eventData.location]);

  // Sincronizar con el contexto cuando cambian los valores locales
  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate, setDate]);

  useEffect(() => {
    setStartTime(startTime);
  }, [startTime, setStartTime]);

  useEffect(() => {
    setEndTime(endTime);
  }, [endTime, setEndTime]);
  
  

  // Ya no necesitamos manejar la selección de ubicación aquí
  // porque viene del contexto desde la pantalla anterior

  // El formateo ahora se maneja en el contexto con getFormattedData()

  const handleContinue = () => {
    const apiData = getFormattedData();
    if (!apiData) {
      Alert.alert(
        "Datos incompletos",
        "Por favor completa todos los campos: ubicación, fecha y hora de inicio."
      );
      return;
    }
    
    console.log("Datos completos del evento:", apiData);
    console.log("\n--- Resumen del Evento ---");
    console.log(`Ubicación: ${apiData.name}`);
    console.log(`Dirección: ${apiData.address}`);
    console.log(`Coordenadas: ${apiData.latitude}, ${apiData.longitude}`);
    console.log(`Fecha: ${apiData.date}`);
    console.log(`Hora inicio: ${apiData.time_start}`);
    console.log(`Hora fin: ${apiData.end_time}`);
    console.log("-------------------------\n");
    
    // Aquí puedes enviar al backend o navegar a la siguiente pantalla
    Alert.alert(
      "Datos guardados",
      `Ubicación: ${apiData.name}\nFecha: ${apiData.date}\nHora: ${apiData.time_start}`,
      [
        {
          text: "OK",
          onPress: () => {
            // Navegar a la siguiente pantalla si es necesario
            // router.push("/(stack)/siguiente-pantalla");
          },
        },
      ]
    );
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
          {eventData.location ? (
            <MapWithAddressInput
              onLocationSelect={() => {}}
              initialLocation={eventData.location}
              initialRegion={{
                latitude: eventData.location.coordinates.latitude,
                longitude: eventData.location.coordinates.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              showCurrentLocationButton={false}
              showAddressInput={false}
              interactive={false}
              showSelectedLocation={false}
              style={{ flex: 1 }}
            />
          ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 24 }}>
              <Text style={{ color: '#fff', fontSize: 16 }}>No hay ubicación seleccionada</Text>
            </View>
          )}
          
          {/* MessageBot superpuesto al mapa */}
          <View style={styles.messageBotContainer}>
            <MessageBot
              imgUrl="Bot.png"
              message="Perfecto , ahora selecciona la fecha y hora del evento."
            />
          </View>
        </View>

        {/* Formularios de fecha y hora */}
        <View style={styles.formContainer}>
          <View>
            <Text className="text-white text-2xl font-bold pb-2">Fecha</Text>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDateLocal}
              placeholder="Selecciona una fecha"
            />
          </View>

          <View>
            <Text className="text-white text-2xl font-bold pb-2">
              En que momento del dìa realizaras tus planes?
            </Text>
            <TimeDropdown
              value={startTime}
              onSelect={(period: TimePeriod) => setStartTimeLocal(period.value)}
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
            onPress={() => router.push("/(stack)/chat")}
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
    position: "absolute",
    top: 248,
    left: 16,
    right: 16,
    zIndex: 10,
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
    paddingVertical: 48,
    
  },
});

export default DateHourScreen;
