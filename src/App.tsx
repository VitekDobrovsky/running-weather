import LocationComponent from "./components/LocationComponent";
import { recommendRunningClothes } from "./lib/recommendRunningClothes";
import { useState, useCallback } from "react";
import { Shirt, Wind, Thermometer, CloudRain, CheckCircle2 } from "lucide-react";
import { type WeatherData } from "./types";

// Helper to map clothes to icons/display names
const getClothingItem = (item: string) => {
  switch (item) {
    case "tank top":
      return { icon: Shirt, label: "Tank Top", color: "bg-yellow-100 text-yellow-700" };
    case "shirt":
      return { icon: Shirt, label: "Running Shirt", color: "bg-blue-100 text-blue-700" };
    case "thermo compression shirt":
      return { icon: Thermometer, label: "Thermal Top", color: "bg-orange-100 text-orange-700" };
    case "windbreaker":
      return { icon: Wind, label: "Windbreaker", color: "bg-slate-200 text-slate-700" };
    case "shorts":
      return { icon: Shirt, label: "Shorts", color: "bg-green-100 text-green-700" };
    case "thermo compression pants":
      return { icon: Thermometer, label: "Thermal Tights", color: "bg-indigo-100 text-indigo-700" };
    case "gloves":
      return { icon: CloudRain, label: "Gloves", color: "bg-purple-100 text-purple-700" };
    case "hat":
      return { icon: CloudRain, label: "Hat", color: "bg-red-100 text-red-700" };
    default:
      return { icon: CheckCircle2, label: item, color: "bg-gray-100 text-gray-700" };
  }
};

function App() {
  const [clothes, setClothes] = useState<Array<string> | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleLocationRetrieved = useCallback(async (lat: number, lng: number) => {
    try {
      const data = await fetch(`https://www.meteosource.com/api/v1/free/point?lat=${lat}&lon=${lng}&sections=current&language=en&units=auto&key=${import.meta.env.VITE_METEOSOURCE_API_KEY}`).then(
        (res) => res.json()
      );
      setWeatherData(data);
      setClothes(recommendRunningClothes(data));
    } catch (e) {
      console.error("Failed to fetch weather", e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Running weather 🏃</h1>
          <p className="text-slate-500">Smart clothing recommendations for your run</p>
        </header>

        <LocationComponent onLocationRetrieved={handleLocationRetrieved} />

        {weatherData && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-around items-center">
            <div className="text-center">
              <div className="text-sm text-slate-500">Temperature</div>
              <div className="text-2xl font-bold">{weatherData.current.temperature}°C</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-500">Wind</div>
              <div className="text-2xl font-bold">{weatherData.current.wind.speed} m/s</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-500">Precipitation</div>
              <div className="text-2xl font-bold">{weatherData.current.precipitation.total} mm</div>
            </div>
          </div>
        )}

        {clothes && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-slate-800">Recommended Gear</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {clothes.map((item, index) => {
                const { icon: Icon, label, color } = getClothingItem(item);
                return (
                  <div key={index} className={`flex items-center space-x-4 p-4 rounded-xl border border-transparent ${color} bg-opacity-50 transition-transform hover:scale-[1.02]`}>
                    <div className={`p-2 rounded-full bg-white bg-opacity-60`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-medium text-lg">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
