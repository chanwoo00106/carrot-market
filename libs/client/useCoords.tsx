import { useEffect, useState } from "react";

interface UseCoordState {
  latitude: null | number;
  longitude: null | number;
}

export default function useCoords() {
  const [coords, setCoords] = useState<UseCoordState>({
    latitude: null,
    longitude: null,
  });

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setCoords({ latitude, longitude });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  return coords;
}
