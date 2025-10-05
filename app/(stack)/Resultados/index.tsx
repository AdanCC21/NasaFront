import CloudsBackground from '@/componentes/CloudsBackground';
import CloudyBackground from '@/componentes/CloudyBackground';
import RainyBackground from '@/componentes/RainyBackground';
import SunnyBackground from '@/componentes/sunny';
import { Feather, Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WeatherCard from '../../../componentes/Weathercard';

interface WeatherData {
  temperature: number;
  maxTemp: number;
  minTemp: number;
  precipitation: number;
  humidity: number;
  solarRadiation: number;
  windSpeed: number;
}

const ResultadosScreen = () => {
  const safeAreaInsets = useSafeAreaInsets();
  
  // Hook para recibir parámetros de la navegación
  // const params = useLocalSearchParams();

  // Estados para almacenar los datos del clima, las recomendaciones y el estado de carga
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [recommendations, setRecommendations] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

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
    if (speed < 15) return 'leaf';
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

  // useEffect se ejecuta una vez cuando el componente se monta para buscar los datos
  useEffect(() => {
    const fetchWeatherData = async () => { // esto no va acaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      const requestBody = {
        time: {
          // day: parseInt(day as string),
          // month: parseInt(month as string),
          // start_time: startTime as string,
          // end_time: endTime as string,
          
          // Datos de ejemplo para prueba:
          day: 10,
          month: 4,
          start_time: "14:30",
          end_time: "15:30"
        },
        location: {
          // latitud: parseFloat(lat as string),
          // longitud: parseFloat(lon as string),
          
          // Datos de ejemplo para prueba:
          latitud: 40.4168,
          longitud: -3.7038
        }
      };

      try {
        const response = await fetch('http://127.0.0.1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();

        // Asumiendo que el backend devuelve un objeto con `weather` y `recommendations`
        setWeatherData(data.weather);
        setRecommendations(data.recommendations || 'No recommendations available.');

      } catch (error) {
        console.error("Error al obtener los datos del clima:", error);
        setRecommendations('Could not load data. Check server connection.');
        
        // Datos de fallback en caso de error
        setWeatherData({
          temperature: 18,
          maxTemp: 25,
          minTemp: 15,
          precipitation: 85,
          humidity: 72,
          solarRadiation: 850,
          windSpeed: 24
        });
      } finally {
        setIsLoading(false); // Termina la carga, ya sea con éxito o error
      }
    };

    fetchWeatherData();
  }, []); // El array vacío `[]` significa que se ejecuta solo una vez al montar el componente

  // Pantalla de carga mientras se obtienen los datos
  if (isLoading) {
    return (
      <View className='flex-1 bg-blue-900 items-center justify-center'>
        <ActivityIndicator size="large" color="white" />
        <Text className='text-white text-xl mt-4'>Loading weather data...</Text>
      </View>
    );
  }

  // Si no hay datos después de la carga, mostrar error
  if (!weatherData) {
    return (
      <View className='flex-1 bg-blue-900 items-center justify-center px-4'>
        <Ionicons name="cloud-offline" size={100} color="white" />
        <Text className='text-white text-xl text-center mt-4'>Unable to load weather data</Text>
        <TouchableOpacity 
          onPress={() => router.push('/home')}
          className='mt-4 bg-white/20 px-6 py-3 rounded-lg'
        >
          <Text className='text-white font-bold'>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className='flex-1 bg-blue-900'>
      {weatherData && getWeatherBackground(weatherData)}

      <View className='flex-row items-center justify-end px-4 py-3' style={{ paddingTop: safeAreaInsets.top }}>

              <TouchableOpacity
              >
                <Feather name="download" size={28} color="white" />
              </TouchableOpacity>
            </View>

      <View className='flex-1 items-center justify-start w-full'>
        {weatherData && (
          <>
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
                <View className="items-center my-2">
                  <Text className='text-white text-base text-center leading-6'>{recommendations}</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default ResultadosScreen