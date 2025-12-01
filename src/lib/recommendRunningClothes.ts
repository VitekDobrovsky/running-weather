import { type WeatherData } from "../types";

function calculateWindChill(temp: number, windSpeed: number): number {
  if (temp > 10) return temp;
  const windKph = windSpeed * 3.6;
  return 13.12 + 0.6215 * temp - 11.37 * Math.pow(windKph, 0.16) + 0.3965 * temp * Math.pow(windKph, 0.16);
}

export function recommendRunningClothes(weather: WeatherData): string[] {
  const temp = weather.current.temperature;
  const windSpeed = weather.current.wind.speed;
  const precipTotal = weather.current.precipitation.total;
  const windChill = calculateWindChill(temp, windSpeed);
  const runningAdjustedTemp = windChill + 10; // Offset for body heat
  const recommendations: string[] = [];

  // Base recommendations by adjusted temp
  if (runningAdjustedTemp > 20) {
    recommendations.push("tank top", "shorts (really light)");
  } else if (runningAdjustedTemp >= 15) {
    recommendations.push("shirt", "shorts (really light)");
  } else if (runningAdjustedTemp >= 10) {
    recommendations.push("thermo compression shirt", "shorts (normal)");
  } else if (runningAdjustedTemp >= 5) {
    recommendations.push("thermo compression shirt", "windbreaker", "shorts (compression-layered)");
  } else if (runningAdjustedTemp >= 0) {
    recommendations.push("thermo compression shirt", "shirt", "windbreaker", "shorts (compression-layered)", "thermo compression pants");
  } else {
    recommendations.push("thermo compression shirt", "shirt", "windbreaker", "shorts (compression-layered)", "thermo compression pants");
  }

  // Conditionals for lighter options
  if (runningAdjustedTemp >= 10 && (windSpeed > 5 || precipTotal > 0)) {
    if (!recommendations.includes("windbreaker")) recommendations.push("windbreaker");
    if (runningAdjustedTemp < 12) recommendations.push("thermo compression pants"); // Optional bottoms layer
  }
  if (runningAdjustedTemp >= 5 && windSpeed > 5) {
    recommendations.push("shirt"); // Optional mid if windy
  }

  // Accessories
  if (runningAdjustedTemp < 12 || (windSpeed > 5 && runningAdjustedTemp < 12)) recommendations.push("gloves");
  if (runningAdjustedTemp < 12 || ((precipTotal > 0 || windSpeed > 5) && runningAdjustedTemp < 12)) recommendations.push("hat");

  // Precipitation and wind adjustments (ensure but allow removal)
  if (precipTotal > 0 && !recommendations.includes("windbreaker")) {
    recommendations.push("windbreaker");
  }

  // Remove duplicates
  return [...new Set(recommendations)];
}
