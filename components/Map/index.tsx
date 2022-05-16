import L, { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { Place } from "../../models/place";
import {
  createRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";

let DefaultIcon = L.icon({
  //@ts-ignore
  iconUrl: icon.src,
  iconAnchor: [9, 44],
  //@ts-ignore
  shadowUrl: iconShadow.src,
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Props {
  places: Place[];
  setPopupRefs: (refs: MutableRefObject<L.Popup | null>[]) => void;
  setMapRef: (ref: MutableRefObject<L.Map | null>) => void;
}

export default function Map({ places, setPopupRefs, setMapRef }: Props) {
  const [refs, setRefs] = useState(places.map((place) => createRef<L.Popup>()));
  const tileRef = useRef<L.Map>(null);
  const PlaceMarkers = places.map((place, index) => {
    return (
      <Marker key={place.name} position={[place.lat, place.long]}>
        <Popup ref={refs[index]}>{place.displayName}</Popup>
      </Marker>
    );
  });
  useEffect(() => {
    setPopupRefs(refs);
    setMapRef(tileRef);
  }, []);

  const center: LatLngTuple = !!places[0]
    ? [places[0].lat, places[0].long]
    : [0, 0];
  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      ref={tileRef}
      style={{
        height: "100%",
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
