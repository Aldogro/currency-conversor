import L from 'leaflet'
import greenPin from './assets/map-pin-green.png'
import location from './assets/orange-icon.svg'

export const mapIcon = L.icon({
    iconUrl: greenPin,
    iconSize: [50, 50],
    iconAnchor: [20, 20],
    popupAnchor: [0, 0],
})

export const locationIcon = L.icon({
    iconUrl: location,
    iconSize: [50, 50],
    iconAnchor: [20, 20],
    popupAnchor: [0, 0],
})
