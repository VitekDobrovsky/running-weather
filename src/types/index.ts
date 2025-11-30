export interface WeatherData {
  current: {
    temperature: number;
    wind: {
      speed: number;
    };
    precipitation: {
      total: number;
    };
  };
}
