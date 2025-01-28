/// <reference types="vite/client" />

declare module "leaflet" {
  export interface Map {
    on: (event: string, callback: () => void) => void;
    getCenter: () => { lat: number; lng: number };
    getZoom: () => number;
  }
}
