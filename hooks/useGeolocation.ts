import { useState } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState('');

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError('');
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setError('Permiso denegado por el usuario.');
              break;
            case err.POSITION_UNAVAILABLE:
              setError('Ubicación no disponible.');
              break;
            case err.TIMEOUT:
              setError('La solicitud de ubicación ha expirado.');
              break;
            default:
              setError('Ocurrió un error al obtener la ubicación.');
          }
        }
      );
    } else {
      setError('La geolocalización no es compatible con este navegador.');
    }
  };

  return { location, error, requestLocation };
};

export default useGeolocation;