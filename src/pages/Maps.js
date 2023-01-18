import * as React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { mapIcon } from '../mapHelpers'
import LocationMarker from '../components/LocationMarker'

const homeCoords = [-32.966354389487094, -60.649609185572004]

const placesOfInterest = [
    {
        title: 'Casita',
        address: '27 de Febrero 1544',
        description: 'Acá se come rico y sin gluten!',
        coords: [-32.966354389487094, -60.649609185572004]
    },
    {
        title: 'Exquisito Sin Gluten',
        address: 'Av. Franklin Delano Roosevelt 20100',
        description: 'Abierto de lunes a viernes de 12 a 15 hrs y de 19.30 a 23 hrs Sábados de 12 a 15 hrs y de 19 a 00 hrs',
        coords: [-34.93231875382866, -54.94186450035297]
    },
]
const MapsPage = () => {
  return (
    <MapContainer center={homeCoords} zoom={13} style={{ height: "70vh" }}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {placesOfInterest.map((place) => (
        <Marker position={place.coords} icon={mapIcon}>
            <Popup>
                <b>{place.title}</b> <br/>
                <i>{place.address}</i> <br/>
                {place.description}
            </Popup>
        </Marker>
      ))}
      <LocationMarker />
    </MapContainer>
  )
}

export default MapsPage