import CloudsBackground from '@/componentes/CloudsBackground';
import CloudyBackground from '@/componentes/CloudyBackground';
import RainyBackground from '@/componentes/RainyBackground';
import SunnyBackground from '@/componentes/sunny';
import { useEvent } from '@/contexts/EventContext';
import { Feather, Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WeatherCard from '../../../componentes/Weathercard';

interface WeatherData {
  temperature: number; // Temperatura promedio
  maxTemp: number;
  minTemp: number;
  precipitation: number; // Porcentaje de precipitación
  humidity: number; // Porcentaje de humedad
  solarRadiation: number; // Radiación solar (puedes usar string si prefieres niveles como "alta", "baja")
  windSpeed: number; // Velocidad del viento en km/h
  recommendations?: string; // Recomendaciones del backend
}
const ResultadosScreen = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const { eventData, getFormattedData } = useEvent();
  
  const [isLoading, setIsLoading] = useState(true);
  
  // Datos iniciales (se actualizarán con la API)
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 20,
    maxTemp: 25,
    minTemp: 15,
    precipitation: 50, // Valor neutral para fondo inicial
    humidity: 60,
    solarRadiation: 500,
    windSpeed: 15
  });

  // Función para determinar la condición climática basada en los datos
  const getWeatherCondition = (data: WeatherData) => {
    if (data.precipitation >= 70) return 'Rainy';
    if (data.precipitation >= 30) return 'Cloudy';
    if (data.solarRadiation > 600 && data.precipitation < 20) return 'Sunny';
    return 'Partly Cloudy';
  };

  // Función para obtener ícono según la condición determinada
  const getWeatherIcon = (data: WeatherData) => {
    const condition = getWeatherCondition(data);
    const conditions: { [key: string]: any } = {
      'Sunny': 'sunny',
      'Cloudy': 'cloudy',
      'Rainy': 'rainy',
      'Stormy': 'thunderstorm',
      'Partly Cloudy': 'partly-sunny'
    };
    return conditions[condition] || 'cloud';
  };

  // Función para obtener ícono de precipitación según porcentaje
  const getPrecipitationIcon = (percentage: number) => {
    if (percentage >= 80) return 'rainy';
    if (percentage >= 50) return 'rainy-outline';
    if (percentage >= 20) return 'cloud-outline';
    return 'sunny-outline';
  };

  // Función para obtener ícono de humedad según porcentaje
  const getHumidityIcon = (percentage: number) => {
    if (percentage >= 80) return 'water';
    if (percentage >= 50) return 'water-outline';
    return 'leaf-outline';
  };

  // Función para obtener ícono de radiación solar (valores numéricos en W/m²)
  const getSolarRadiationIcon = (radiation: number) => {
    if (radiation >= 1000) return 'flame'; // Muy alta
    if (radiation >= 600) return 'sunny'; // Alta
    if (radiation >= 300) return 'sunny-outline'; // Moderada
    return 'partly-sunny'; // Baja
  };

  // Función para obtener el nivel de radiación solar como texto
  const getSolarRadiationLevel = (radiation: number) => {
    if (radiation >= 1000) return 'Very High';
    if (radiation >= 600) return 'High';
    if (radiation >= 300) return 'Moderate';
    return 'Low';
  };

  // Función para obtener ícono de viento según velocidad
  const getWindIcon = (speed: number) => {
    if (speed >= 15) return <Entypo name="air" size={32} color="white" />;
    if (speed <= 15) return 'leaf';
    return 'refresh-outline';
  };

  // Función para obtener descripción de índice UV
  const getUVDescription = (index: number) => {
    if (index <= 2) return 'Bajo';
    if (index <= 5) return 'Moderado';
    if (index <= 7) return 'Alto';
    if (index <= 10) return 'Muy Alto';
    return 'Extremo';
  };

  // Función para obtener el fondo según los datos climáticos
  const getWeatherBackground = (data: WeatherData) => {
    const condition = getWeatherCondition(data);
    if (condition === 'Rainy') {
      return <RainyBackground />;
    }
    else if (condition === 'Sunny') {
      return <SunnyBackground />;
    }
    else if (condition === 'Partly Cloudy') {
      return <CloudsBackground />;
    }
    else {
      return <CloudyBackground />;
    }
  };

  // Función para obtener el color del ícono principal según los datos
  const getIconColor = (data: WeatherData) => {
    const condition = getWeatherCondition(data);
    if (condition === 'Rainy') {
      return '#E5E7EB'; // Gris claro para lluvia
    }
    if (condition === 'Sunny') {
      return '#FDE047'; // Amarillo para soleado
    }
    if (condition === 'Cloudy') {
      return '#9CA3AF'; // Gris para nublado
    }
    return 'white'; // Color por defecto
  };

  // Función para hacer fetch al endpoint de predicción del clima
  const fetchWeatherApi = async () => {
    try {
      setIsLoading(true);
      const apiData = getFormattedData();
      
      if (!apiData) {
        console.error('No hay datos del evento disponibles');
        setIsLoading(false);
        return;
      }

      const url = 'http://localhost:8000/weather/predict/weather/';
      
      console.log('\n=== ENVIANDO DATOS AL BACKEND ===');
      console.log('URL:', url);
      console.log('Datos a enviar:', JSON.stringify(apiData, null, 2));

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { detail: errorText };
        }
        throw new Error(`Error ${response.status}: ${errorData.detail || 'Error desconocido'}`);
      }

      const prediction = await response.json();
      console.log('\n=== PREDICCIÓN RECIBIDA ===');
      console.log('Predicción:', prediction);

      // Actualizar el estado con los datos de la predicción
      setWeatherData({
        temperature: prediction.temperatura || prediction.temperature,
        maxTemp: prediction.maxtemp || prediction.maxTemp || (prediction.temperatura + 5),
        minTemp: prediction.mintemp || prediction.minTemp || (prediction.temperatura - 5),
        precipitation: prediction.precipitation,
        humidity: prediction.humidity,
        solarRadiation: prediction.solarradiation || prediction.solar_radiation,
        windSpeed: prediction.windspeed || prediction.wind_speed,
        recommendations: prediction.recomendaciones || prediction.recommendations,
      });

      console.log('Estado actualizado con predicción');
      console.log('=====================================\n');
    } catch (error) {
      console.error('\n=== ERROR AL OBTENER PREDICCIÓN ===');
      console.error('Error:', error);
      console.error('=====================================\n');
    } finally {
      setIsLoading(false);
    }
  };

  // Log de datos recibidos desde dateHour y llamar a la API
  useEffect(() => {
    const apiData = getFormattedData();
    
    console.log('\n=== DATOS RECIBIDOS EN RESULTADOS ===');
    console.log('EventData del contexto:', eventData);
    console.log('\nDatos formateados para API:', apiData);
    
    if (apiData) {
      console.log('\n--- Resumen ---');
      console.log('Ubicación:', apiData.name);
      console.log('Dirección:', apiData.address);
      console.log('Coordenadas:', `${apiData.latitude}, ${apiData.longitude}`);
      console.log('Fecha:', apiData.date);
      console.log('Hora inicio:', apiData.time_start);
      console.log('Hora fin:', apiData.end_time);
      console.log('Plan:', apiData.plan);
      console.log('Métricas seleccionadas:', apiData.metrics);
      
      // Llamar a la API de predicción
      fetchWeatherApi();
    }
    
    console.log('\nWeather Data actual (placeholder):', weatherData);
    console.log('=====================================\n');
  }, []);

  return (
    <View className='flex-1 bg-blue-900'>
      {getWeatherBackground(weatherData)}

      <View className='flex-row items-center justify-end px-4 py-3' style={{ paddingTop: safeAreaInsets.top }}>

              <TouchableOpacity
              >
                <Feather name="download" size={28} color="white" />
              </TouchableOpacity>
            </View>

      {isLoading ? (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size="large" color="white" />
          <Text className='text-white text-xl mt-4'>Loading prediction...</Text>
        </View>
      ) : (
      <View className='flex-1 items-center justify-start w-full'>
        <Ionicons name={getWeatherIcon(weatherData)} size={100} color={getIconColor(weatherData)} />
        <Text className='text-white text-8xl font-bold'>{weatherData.temperature}°</Text>
        <Text className='text-white text-2xl font-bold'>{getWeatherCondition(weatherData)}</Text>
        <Text className='text-white text-2xl font-bold'>Max: {weatherData.maxTemp}° Min: {weatherData.minTemp}°</Text>

        <View className="mt-4 flex-row flex-wrap justify-center px-4 max-w-[100%] w-full">
          <WeatherCard
            title="Precipitation"
            value={`${weatherData.precipitation}%`}
            iconName={getPrecipitationIcon(weatherData.precipitation)}
          />
          <WeatherCard
            title="Humidity"
            value={`${weatherData.humidity}%`}
            iconName={getHumidityIcon(weatherData.humidity)}
          />
          
          <WeatherCard
            title="Solar Radiation"
            value={`${weatherData.solarRadiation} W/m² (${getSolarRadiationLevel(weatherData.solarRadiation)})`}
            iconName={getSolarRadiationIcon(weatherData.solarRadiation)}
          />
          
          <View className="w-[45%] bg-white rounded-2xl p-3 m-1 border border-white/20" style={{backgroundColor: 'rgba(0,0,0,0.2)', borderColor: 'rgba(255,255,255,0.2)'}}>
            <Text className="text-xs text-slate-300 text-center mb-1">Wind Speed</Text>
            <View className="items-center mb-2">
              {typeof getWindIcon(weatherData.windSpeed) === 'string' ? (
                <Ionicons name={getWindIcon(weatherData.windSpeed) as any} size={32} color="white" />
              ) : (
                getWindIcon(weatherData.windSpeed)
              )}
            </View>
            <Text className="font-semibold text-white text-center">{weatherData.windSpeed} km/h</Text>
          </View>
          
          <View className="w-[92%] bg-black/20 rounded-2xl p-3 m-1 border border-white/20" style={{backgroundColor: 'rgba(0,0,0,0.2)', borderColor: 'rgba(255,255,255,0.2)'}}>
            <Text className="text-2xl text-slate-300 text-center">Recommendations</Text>
            <View className="items-center my-1">
              <Text className='text-white text-lg font-normal text-center px-2'>{weatherData.recommendations || 'Cargando recomendaciones...'}</Text>
            </View>
          </View>
        </View>
        
      </View>
      )}
    </View>
  )
}

export default ResultadosScreen