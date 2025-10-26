
import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [state, setState] = useState({
    loading: true,
    location: null,
    error: null,
  });

  useEffect(() => {
    const onSuccess = (position) => {
      setState({
        loading: false,
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        error: null,
      });
    };

    const onError = (error) => {
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