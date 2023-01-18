import React, { useState, useEffect } from 'react'
import { useMap, Marker, Popup } from 'react-leaflet'
import { locationIcon } from '../mapHelpers'

const LocationMarker = () => {
    const [position, setPosition] = useState(null);

    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    }, [map]);

    return position === null ? null : (
      <Marker position={position} icon={locationIcon}>
        <Popup>
          Estamos acá
        </Popup>
      </Marker>
    );
  }

export default LocationMarker