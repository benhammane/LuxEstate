"use client";

import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useTheme } from "next-themes";
import { MapPin } from "lucide-react";

const STYLE_LIGHT =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
const STYLE_DARK =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

export function PropertyLocationMap({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) {
  const { resolvedTheme } = useTheme();
  return (
    <div className="h-72 w-full overflow-hidden rounded-2xl border border-border">
      <Map
        initialViewState={{ longitude, latitude, zoom: 12.5 }}
        mapStyle={resolvedTheme === "dark" ? STYLE_DARK : STYLE_LIGHT}
        scrollZoom={false}
        attributionControl={false}
      >
        <Marker longitude={longitude} latitude={latitude} anchor="bottom">
          <span className="relative flex">
            <span className="absolute inline-flex size-10 animate-ping rounded-full bg-primary/30" />
            <span className="relative inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift">
              <MapPin className="size-5" />
            </span>
          </span>
        </Marker>
      </Map>
    </div>
  );
}
