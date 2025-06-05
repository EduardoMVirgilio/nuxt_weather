// Importamos los tipos que ya habías creado, ¡muy útil!
import type { GeoLocation, WeatherData } from "~/types/weather";

export default defineEventHandler(async (event) => {
  // 1. Obtenemos la clave secreta desde la configuración del servidor.
  const config = useRuntimeConfig(event);
  const apiKey = config.NUXT_OPENWEATHERMAP_KEY;

  // 2. Obtenemos el parámetro 'city' que nos enviará el cliente.
  const { city } = getQuery(event);

  if (!city) {
    // Si no se proporciona una ciudad, devolvemos un error.
    throw createError({
      statusCode: 400,
      statusMessage: 'El parámetro "city" es requerido.',
    });
  }

  // 3. Este bloque try/catch manejará errores de las llamadas a la API externa.
  try {
    // --- Llamada 1: Obtener coordenadas de la ciudad ---
    const locations = await $fetch<GeoLocation[]>(
      "https://api.openweathermap.org/geo/1.0/direct",
      {
        query: {
          q: city,
          limit: 1,
          appid: apiKey, // La clave secreta se usa aquí, en el servidor.
        },
      }
    );

    if (!locations || locations.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: `No se pudo encontrar la ciudad "${city}".`,
      });
    }

    const cityData = locations[0];

    // --- Llamada 2: Obtener el clima usando las coordenadas ---
    const weatherData = await $fetch<WeatherData>(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        query: {
          lat: cityData.lat,
          lon: cityData.lon,
          units: "metric",
          lang: "es",
          appid: apiKey, // La clave secreta también se usa aquí.
        },
      }
    );

    // 4. Si todo va bien, devolvemos los datos del clima.
    return weatherData;
  } catch (error: any) {
    // Si algo sale mal en las llamadas a OpenWeatherMap, lo capturamos y devolvemos un error.
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage:
        error.data?.message || "Error al contactar la API de clima.",
    });
  }
});
