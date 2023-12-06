import React, { useEffect } from 'react';

const LocationSearch = () => {
  useEffect(() => {
    loadGoogleMapsAPI();
  }, []);

  const loadGoogleMapsAPI = () => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBmoVphbRmwLUh-77d1v_G9Wur2MU7YTBQ&libraries=places&callback=initAutocomplete`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  };

  window.initAutocomplete = () => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('location')
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const locationData = {
        location: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      localStorage.setItem('locationData', JSON.stringify(locationData));
      // console.log(locationData);
    });
  };

  return (
    <>
      <input type="location" className="form-control" id="location" name="location" defaultValue="" placeholder="Въведете населено място" />
    </>
  );
};

export default LocationSearch;
