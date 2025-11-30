import { useState, useCallback, useEffect } from "react";
import { MapPin, Loader2, AlertCircle } from "lucide-react";

type LocationComponentProps = {
  onLocationRetrieved?: (lat: number, lng: number) => void;
};

const LocationComponent: React.FC<LocationComponentProps> = ({ onLocationRetrieved }) => {
  const [location, setLocation] = useState<{ lat: number | null; lng: number | null }>({ lat: null, lng: null });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          onLocationRetrieved?.(position.coords.latitude, position.coords.longitude);
          setError(null);
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError("Geolokace není podporována tímto prohlížečem.");
    }
  }, [onLocationRetrieved]);

  useEffect(() => {
    // Use setTimeout to avoid "setState synchronously within an effect" warning
    const timer = setTimeout(() => {
      getLocation();
    }, 0);
    return () => clearTimeout(timer);
  }, [getLocation]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-white rounded-xl shadow-sm border border-slate-100 w-full">
      <div className="flex items-center space-x-2 text-slate-700">
        <MapPin className="w-5 h-5 text-blue-500" />
        <span className="font-medium">Your Location</span>
      </div>

      {loading && (
        <div className="flex items-center space-x-2 text-slate-500">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Locating...</span>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 text-red-500 bg-red-50 px-4 py-2 rounded-lg text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {location.lat && location.lng && !loading && (
        <div className="text-xs text-slate-400 font-mono">
          {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </div>
      )}

      <button
        onClick={getLocation}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {loading ? "Locating..." : location.lat ? "Update Location" : "Get Location"}
      </button>
    </div>
  );
};

export default LocationComponent;
