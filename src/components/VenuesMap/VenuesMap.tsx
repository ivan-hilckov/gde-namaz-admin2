import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "leaflet.pm/dist/leaflet.pm.css";
import * as L from "leaflet";
import clsx from "clsx";

import { VENUE_TYPE_TEXT } from "@/constants";
import styles from "./VenuesMap.module.css";

// Импорт изображений маркеров
import markerIcon2x from "../../assets/images/marker-icon-2x.png";
import markerIcon from "../../assets/images/marker-icon.png";
import markerShadow from "../../assets/images/marker-shadow.png";

// @ts-ignore
const customMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export interface IVenue {
  id: string;
  type: "mosque" | "prayer_room";
  lat: number;
  lng: number;
  isOpen: boolean;
}

const mapState = {
  lat: 42.979286,
  lng: 47.500844,
  zoom: 10,
};

function Map() {
  const [data, setData] = useState<IVenue[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getVenus = async () => {
      const token = Cookies.get("X-Access-Token");
      const { data: venues } = await axios.get<IVenue[]>(`/api/map`, {
        headers: { "X-Access-Token": token },
      });

      setData(venues);
      setIsLoading(false);
    };

    getVenus();
  }, []);

  const handleEditClick = (venueId: string) => {
    console.log(venueId);
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <MapContainer
      // @ts-ignore
      center={[mapState.lat, mapState.lng]}
      zoom={mapState.zoom}
      className={styles.map}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data.map((item) => {
        return (
          <Marker
            key={item.id}
            position={[item.lat, item.lng]}
            // @ts-ignore
            icon={customMarkerIcon}
          >
            <Popup>
              <div>{VENUE_TYPE_TEXT[item.type]}</div>
              <div>{item.isOpen ? "Открыто" : "Закрыто"}</div>
              <button onClick={() => handleEditClick(item.id)}>✍️</button>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default Map;
