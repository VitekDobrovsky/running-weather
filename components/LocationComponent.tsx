import { useState, useEffect } from "react";

type LocationComponentProps = {
  onLocationRetrieved?: (lat: number, lng: number) => void;
};

const LocationComponent: React.FC<LocationComponentProps> = ({ onLocationRetrieved }) => {
  const [location, setLocation] = useState<{ lat: number | null; lng: number | null }>({ lat: null, lng: null });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getLocation = () => {
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
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 } // Optional options for accuracy
      );
    } else {
      setError("Geolokace není podporována tímto prohlížečem.");
    }
  };

  // Optionally fetch on component mount
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {location.lat && location.lng && (
        <p>
          Lat: {location.lat}, Lng: {location.lng}
        </p>
      )}
      <button onClick={getLocation}>Získat polohu</button>
    </div>
  );
};

export default LocationComponent;
