import { type WeatherData } from "../types";

export function recommendRunningClothes(weather: WeatherData): string[] {
  const temp = weather.current.temperature;
  const windSpeed = weather.current.wind.speed;
  const precipTotal = weather.current.precipitation.total;

  const recommendations: string[] = [];

  // Base recommendations based on temperature ranges
  if (temp > 10) {
    // Above 10 °C: Light top and shorts
    recommendations.push("tank top"); // Lighter option for warmer weather
    recommendations.push("shorts");
  } else if (temp >= 5 && temp <= 10) {
    // 5 °C to 10 °C: Light top, windbreaker, shorts
    recommendations.push("shirt");
    recommendations.push("windbreaker");
    recommendations.push("shorts");
  } else if (temp > 0 && temp < 5) {
    // 0 °C to 5 °C: Thermal top, windbreaker, shorts (or tights, but borderline - suggest shorts)
    recommendations.push("thermo compression shirt");
    recommendations.push("windbreaker");
    recommendations.push("shorts");
  } else if (temp >= -5 && temp <= 0) {
    // 0 °C and below (down to -5): Thermal tights + shorts, thermal top, windbreaker
    recommendations.push("thermo compression shirt");
    recommendations.push("thermo compression pants");
    recommendations.push("shorts"); // Pants only with shorts
    recommendations.push("windbreaker");
  } else if (temp < -5) {
    // Below –5 °C: Thermal tights + shorts, thermal top, mid-layer, windbreaker
    recommendations.push("thermo compression shirt");
    recommendations.push("shirt"); // As thin mid-layer
    recommendations.push("thermo compression pants");
    recommendations.push("shorts"); // Pants only with shorts
    recommendations.push("windbreaker");
  }

  // Extras
  if (temp < 5) {
    recommendations.push("gloves");
  }
  if (temp < 0) {
    recommendations.push("hat");
  }

  // Adjustments for weather conditions
  // If there's precipitation, ensure windbreaker is included for protection
  if (precipTotal > 0 && !recommendations.includes("windbreaker")) {
    recommendations.push("windbreaker");
  }

  // If wind is strong (e.g., > 5 m/s), ensure windbreaker
  if (windSpeed > 5 && !recommendations.includes("windbreaker")) {
    recommendations.push("windbreaker");
  }

  // Remove duplicates if any
  return [...new Set(recommendations)];
}

// Example usage with the provided JSON data
const exampleWeather: WeatherData = {
  current: {
    temperature: 1.2,
    wind: {
      speed: 2.4,
    },
    precipitation: {
      total: 0,
    },
  },
};

const exampleRecommendations = recommendRunningClothes(exampleWeather);
console.log(exampleRecommendations);
// Output: ['thermo compression shirt', 'windbreaker', 'shorts', 'gloves']
