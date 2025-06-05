# Weather Forecast App 🌤️

Una aplicación web moderna, rápida y segura para consultar el pronóstico del tiempo, construida con Nuxt.js 3. Este proyecto no solo se enfoca en la funcionalidad, sino también en las mejores prácticas de desarrollo, incluyendo seguridad, experiencia de usuario (UX) y accesibilidad (a11y).

---

## ✨ Características Principales

- **Búsqueda de Clima por Ciudad:** Permite a los usuarios buscar el clima en cualquier ciudad del mundo.
- **Datos en Tiempo Real:** Utiliza la API de [OpenWeatherMap](https://openweathermap.org/) para obtener datos meteorológicos actualizados.
- **🔒 Manejo Seguro de API Keys:** La clave de la API se mantiene segura en el servidor y nunca se expone al cliente, gracias al uso de rutas de servidor de Nuxt.
- **🚀 Experiencia de Usuario Optimizada:**
  - **Skeleton Loaders:** Muestra una previsualización de la tarjeta de resultados mientras se cargan los datos, mejorando la percepción de velocidad.
  - **Manejo de Errores Claro:** Informa al usuario de manera amigable si una ciudad no se encuentra o si ocurre un error en la API.
  - **Diseño Responsivo:** Interfaz limpia y adaptable a cualquier tamaño de pantalla gracias a Nuxt UI.
- **♿ Accesibilidad (a11y):** Elementos de formulario etiquetados correctamente y uso de atributos ARIA para una mejor experiencia con lectores de pantalla.
- **🦾 Tipado Fuerte con TypeScript:** Todo el proyecto está tipado para asegurar la calidad del código, prevenir errores y mejorar la experiencia del desarrollador.

---

## 🛠️ Stack Tecnológico

- **Framework:** [Nuxt.js 3](https://nuxt.com/)
- **Librería de UI:** [Nuxt UI](https://ui.nuxt.com/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) (integrado en Nuxt UI)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **API de Datos:** [OpenWeatherMap API](https://openweathermap.org/api)

---

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para levantar el proyecto en tu máquina local.

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configuración de Variables de Entorno

Este proyecto requiere una API Key de OpenWeatherMap para funcionar.

- Crea una cuenta en [OpenWeatherMap](https://openweathermap.org/) y obtén tu API Key gratuita.
- Primero, crea el archivo `.env`.
- Llena el valor de NUXT_OPENWEATHERMAP_KEY con tu clave de OpenWeatherMap.

### 4. Levantar el Servidor de Desarrollo

```bash
npm run dev
```

### 5. Acceder a la Aplicación

Abre tu navegador y ve a `http://localhost:3000` para ver la aplicación en acción.

---

## 📝 Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).
