import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { Place } from "../models/place";

let DefaultIcon = L.icon({
  //@ts-ignore
  iconUrl: icon.src,
  iconAnchor: [9, 44],
  //@ts-ignore
  shadowUrl: iconShadow.src,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Map({ places }: { places: Place[] }) {
  const PlaceMarkers = places.map((place) => (
    <Marker key={place.name} position={[place.lat, place.long]}>
      <Popup>{place.displayName}</Popup>
    </Marker>
  ));
  return (
    <MapContainer
      center={[places[0].lat, places[0].long]}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: "100%",
        width: "80%",
        margin: "auto",
        borderRadius: "5px",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {PlaceMarkers}
    </MapContainer>
  );
}
