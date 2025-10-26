
import { useState, useEffect } from 'react';
import type { Location } from '../types';

interface GeolocationState {
  loading: boolean;
  location: Location | null;
  error: string | null;
}

export const useGeolocation = (): GeolocationState => {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    location: null,
    error: null,
  });

  useEffect(() => {
    const onSuccess = (position: GeolocationPosition) => {
      setState({
        loading: false,
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        error: null,
      });
    };

    const onError = (error: GeolocationPositionError) => {
      setState({
        loading: false,
        location: null,
        error: error.message,
      });
    };

    if (!navigator.geolocation) {
      setState({
        loading: false,
        location: null,
        error: 'Geolocation is not supported by your browser.',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    });
    
  }, []);

  return state;
};
