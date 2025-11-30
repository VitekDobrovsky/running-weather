import LocationComponent from ".././components/LocationComponent.tsx";
import { recommendRunningClothes } from ".././lib/recommendRunningClothes";
import { useState } from "react";

function App() {
  const [clothes, setClothes] = useState<Array<string> | null>(null);

  const handleLocationRetrieved = async (lat: number, lng: number) => {
    const data = await fetch(`https://www.meteosource.com/api/v1/free/point?lat=${lat}&lon=${lng}&sections=current&language=en&units=auto&key=${import.meta.env.VITE_METEOSOURCE_API_KEY}`).then(
      (res) => res.json()
    );
    setClothes(recommendRunningClothes(data));
  };

  return (
    <>
      <h1>Doporučené oblečení pro dnešní runec 🏃</h1>
      <LocationComponent onLocationRetrieved={handleLocationRetrieved}></LocationComponent>
      {clothes && (
        <ul>
          {clothes.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
