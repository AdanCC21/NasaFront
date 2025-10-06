# Integración Frontend-Backend

Este documento explica como usar los servicios del backend desde el frontend React Native.

## Configuración

### 1. Variables de Entorno
El archivo `.env` en la raíz del proyecto frontend contiene:
```
EXPO_PUBLIC_API_BASE_URL=http://localhost:8000
EXPO_PUBLIC_API_TIMEOUT=30000
```

### 2. Configuración de API
El archivo `config/api.ts` contiene la configuración centralizada:
- URL base del backend
- Endpoints disponibles
- Headers por defecto
- Timeout de peticiones

## Servicios Disponibles

### 1. Chat Service
**Endpoint**: `/chat/weather/`
**Método**: POST

**Uso**:
```typescript
import { useChat } from '@/hooks/useAPI';

const { sendMessage, loading, error, data } = useChat();

const handleSendMessage = async () => {
  const chatData = {
    prompt: "¿Está lloviendo hoy?",
    time: {
      day: 15,
      month: 10,
      start_time: "09:00",
      end_time: "17:00"
    },
    location: {
      lat: 40.4168,
      lon: -3.7038
    }
  };
  
  try {
    const response = await sendMessage(chatData);
    console.log('Respuesta del chat:', response);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### 2. Weather Prediction Service
**Endpoint**: `/predict/weather`
**Método**: POST

**Uso**:
```typescript
import { useWeatherPrediction } from '@/hooks/useAPI';

const { getWeatherPrediction, loading, error, data } = useWeatherPrediction();

const fetchWeather = async () => {
  const weatherData = {
    time: {
      day: 15,
      month: 10,
      start_time: "09:00",
      end_time: "17:00"
    },
    location: {
      lat: 40.4168,
      lon: -3.7038
    }
  };
  
  try {
    const response = await getWeatherPrediction(weatherData);
    console.log('Predicción del clima:', response);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### 3. CSV Generation Service
**Endpoint**: `/csv/generate-csv/` y `/csv/download-csv/{filename}`
**Método**: POST y GET

**Uso**:
```typescript
import { useCSV } from '@/hooks/useAPI';

const { generateCSV, downloadCSV, generateState, downloadState } = useCSV();

const handleGenerateCSV = async () => {
  const csvData = {
    location: {
      lat: 40.4168,
      lon: -3.7038
    },
    time_start: "2024-06-01T03:00:00",
    time_end: "2024-07-30T21:00:00"
  };
  
  try {
    const response = await generateCSV(csvData);
    console.log('CSV generado:', response);
    
    // Descargar el archivo
    if (response.filename) {
      const blob = await downloadCSV(response.filename);
      console.log('Archivo descargado:', blob);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## Integración en Componentes

### Chat Screen
La pantalla de chat (`app/(stack)/chat/index.tsx`) ahora:
- Usa el hook `useChat()` para manejar mensajes
- Convierte datos del contexto al formato esperado por la API
- Maneja estados de loading y error
- Muestra respuestas del backend en tiempo real

### Results Screen
La pantalla de resultados (`app/(stack)/Resultados/index.tsx`) ahora:
- Usa el hook `useWeatherPrediction()` para obtener datos del clima
- Convierte datos del contexto al formato de API
- Transforma respuestas de la API al formato local
- Genera recomendaciones basadas en los datos obtenidos

## Contexto de Datos

El `EventContext` almacena:
- **Ubicación**: Coordenadas y dirección seleccionada
- **Fecha**: Fecha del evento
- **Horas**: Hora de inicio y fin
- **Plan**: Descripción de la actividad

Estos datos se convierten automáticamente al formato requerido por las APIs.

## Manejo de Errores

Todos los servicios incluyen:
- **Loading states**: Indicadores de carga mientras se procesan peticiones
- **Error handling**: Captura y muestra errores de red o servidor
- **Fallback data**: Datos de ejemplo cuando las APIs fallan
- **Timeout**: Límite de tiempo para evitar peticiones colgadas

## Formato de Datos

### Time Format
```typescript
{
  day: number,        // 1-31
  month: number,      // 1-12
  start_time: string, // "HH:mm"
  end_time: string    // "HH:mm"
}
```

### Location Format
```typescript
{
  lat: number,  // Latitud
  lon: number   // Longitud
}
```

### Weather Response Format
```typescript
{
  temperatura: number,
  temperatura_min: number,
  temperatura_max: number,
  nubosidad: string,
  precipitacion: number,
  humedad: number,
  radiacion_solar: number,
  velocidad_viento: number
}
```

## Comandos para Desarrollo

1. **Iniciar Backend**:
   ```bash
   cd NasaBack
   python main.py
   ```

2. **Iniciar Frontend**:
   ```bash
   cd NasaFront
   npm start
   ```

3. **Configurar URL del Backend**:
   - Para desarrollo local: `http://localhost:8000`
   - Para dispositivo físico: `http://[IP_DE_TU_COMPUTADORA]:8000`

## Notas Importantes

- Asegúrate de que el backend esté ejecutándose antes de usar el frontend
- Las APIs requieren CORS habilitado (ya configurado en el backend)
- Los datos de ejemplo se usan como fallback cuando las APIs fallan
- Todos los servicios son asíncronos y devuelven Promises
- Los hooks manejan automáticamente los estados de loading y error