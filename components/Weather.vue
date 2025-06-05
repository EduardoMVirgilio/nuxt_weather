<script lang="ts" setup>
// El componente ya no necesita conocer GeoLocation
import type { WeatherData } from "~/types/weather";

// Los estados se mantienen igual
const weather = useState<WeatherData | null>("weather", () => null);
const errorMsg = useState<string | null>("weather-error", () => null);
const isLoading = useState<boolean>("weather-loading", () => false);

const form = reactive({
  city: "",
});

// La función onSubmit ahora es mucho más simple y segura
async function onSubmit() {
  isLoading.value = true;
  errorMsg.value = null;
  weather.value = null;

  try {
    // ¡Llamamos a nuestra propia API de servidor!
    // Pasamos la ciudad como un parámetro de consulta (query).
    const weatherData = await $fetch<WeatherData>("/api/weather", {
      query: {
        city: form.city,
      },
    });

    weather.value = weatherData;
  } catch (e: any) {
    errorMsg.value =
      e.data?.statusMessage || e.message || "Ocurrió un error inesperado.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="weather-widget space-y-4">
    <UForm :state="form" @submit="onSubmit" class="flex items-end gap-2">
      <UFormGroup
        label="Ciudad"
        :hint="isLoading ? 'Buscando...' : ''"
        class="flex-grow"
      >
        <UInput
          v-model="form.city"
          type="text"
          placeholder="Ej: Madrid"
          :disabled="isLoading"
          icon="i-heroicons-magnifying-glass"
        />
      </UFormGroup>
      <UButton
        type="submit"
        :loading="isLoading"
        :disabled="isLoading || !form.city"
      >
        Buscar
      </UButton>
    </UForm>

    <div aria-live="polite" role="status">
      <div v-if="isLoading">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <USkeleton
                class="h-[50px] w-[50px]"
                :ui="{ rounded: 'rounded-full' }"
              />
              <USkeleton class="h-8 w-48" />
            </div>
          </template>

          <div class="space-y-2">
            <USkeleton class="h-10 w-24" />
            <USkeleton class="h-6 w-36" />
          </div>

          <template #footer>
            <div class="flex justify-between">
              <USkeleton class="h-5 w-1/3" />
              <USkeleton class="h-5 w-1/4" />
            </div>
          </template>
        </UCard>
      </div>

      <UAlert
        v-else-if="errorMsg"
        icon="i-heroicons-exclamation-triangle"
        color="error"
        variant="soft"
        title="Error"
        :description="errorMsg"
      />

      <UCard v-else-if="weather" class="transition-opacity duration-300">
        <template #header>
          <div class="flex items-center gap-2">
            <img
              v-if="weather.weather[0]?.icon"
              :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
              :alt="`Icono para ${weather.weather[0].description}`"
              width="50"
              height="50"
              class="bg-gray-200 dark:bg-gray-700 rounded-full"
            />
            <h2 class="text-2xl font-bold">
              {{ weather.name }}, {{ weather.sys.country }}
            </h2>
          </div>
        </template>

        <div class="space-y-2">
          <p class="text-4xl font-light">
            {{ Math.round(weather.main.temp) }}°C
          </p>
          <p class="capitalize text-lg text-gray-500 dark:text-gray-400">
            {{ weather.weather[0]?.description }}
          </p>
        </div>

        <template #footer>
          <div class="flex justify-between text-sm">
            <span>Sensación: {{ Math.round(weather.main.feels_like) }}°C</span>
            <span>Humedad: {{ weather.main.humidity }}%</span>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>
