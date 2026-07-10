"use client";

import * as React from "react";
import Map, {
  Source,
  Layer,
  Popup,
  NavigationControl,
  type MapRef,
  type MapLayerMouseEvent,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useTheme } from "next-themes";
import { Search } from "lucide-react";
import type { FeatureCollection, Point } from "geojson";
import { usePropertyUi } from "@/stores/property-ui";
import { usePropertyFilters } from "@/hooks/use-property-filters";
import { formatPrice } from "@/lib/utils";
import type { Property } from "@/types/property";
import Link from "next/link";
import Image from "next/image";

const STYLE_LIGHT =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
const STYLE_DARK =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

export function MapCanvas({ items }: { items: Property[] }) {
  const mapRef = React.useRef<MapRef>(null);
  const { resolvedTheme } = useTheme();
  const { activeId, setActiveId } = usePropertyUi();
  const [, setFilters] = usePropertyFilters();
  const [showSearchArea, setShowSearchArea] = React.useState(false);

  const geojson = React.useMemo<FeatureCollection<Point>>(
    () => ({
      type: "FeatureCollection",
      features: items.map((p) => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: [p.longitude, p.latitude] },
        properties: { id: p.id, price: p.price },
      })),
    }),
    [items],
  );

  const active = React.useMemo(
    () => items.find((p) => p.id === activeId) ?? null,
    [items, activeId],
  );

  const initialView = React.useMemo(() => {
    if (items.length === 0) return { longitude: 2.4, latitude: 46.6, zoom: 4.6 };
    const lng = items.reduce((s, p) => s + p.longitude, 0) / items.length;
    const lat = items.reduce((s, p) => s + p.latitude, 0) / items.length;
    return { longitude: lng, latitude: lat, zoom: 4.8 };
  }, [items]);

  const onClick = React.useCallback((e: MapLayerMouseEvent) => {
    const feature = e.features?.[0];
    if (!feature) {
      setActiveId(null);
      return;
    }
    const map = mapRef.current;
    if (feature.layer?.id === "clusters" && map) {
      const source = map.getSource(
        "properties",
      ) as import("maplibre-gl").GeoJSONSource;
      const clusterId = feature.properties?.cluster_id;
      source
        .getClusterExpansionZoom(clusterId)
        .then((zoom) => {
          map.easeTo({
            center: (feature.geometry as Point).coordinates as [number, number],
            zoom,
            duration: 500,
          });
        })
        .catch(() => {});
    } else if (feature.properties?.id) {
      setActiveId(String(feature.properties.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function searchThisArea() {
    const map = mapRef.current;
    if (!map) return;
    const b = map.getBounds();
    const bbox = [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()]
      .map((n) => n.toFixed(5))
      .join(",");
    setFilters({ bbox, page: 1 });
    setShowSearchArea(false);
  }

  return (
    <div className="relative size-full overflow-hidden">
      <Map
        ref={mapRef}
        initialViewState={initialView}
        mapStyle={resolvedTheme === "dark" ? STYLE_DARK : STYLE_LIGHT}
        interactiveLayerIds={["clusters", "unclustered-point"]}
        onClick={onClick}
        onMoveStart={() => setShowSearchArea(true)}
        cursor="pointer"
      >
        <NavigationControl position="top-right" showCompass={false} />

        <Source
          id="properties"
          type="geojson"
          data={geojson}
          cluster
          clusterMaxZoom={12}
          clusterRadius={48}
        >
          {/* Cluster bubbles */}
          <Layer
            id="clusters"
            type="circle"
            filter={["has", "point_count"]}
            paint={{
              "circle-color": "#3452c9",
              "circle-opacity": 0.92,
              "circle-radius": ["step", ["get", "point_count"], 18, 5, 24, 10, 30],
              "circle-stroke-width": 3,
              "circle-stroke-color": "#ffffff",
            }}
          />
          <Layer
            id="cluster-count"
            type="symbol"
            filter={["has", "point_count"]}
            layout={{
              "text-field": ["get", "point_count_abbreviated"],
              "text-size": 13,
              "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
            }}
            paint={{ "text-color": "#ffffff" }}
          />
          {/* Individual points */}
          <Layer
            id="unclustered-point"
            type="circle"
            filter={["!", ["has", "point_count"]]}
            paint={{
              "circle-color": "#c79a3f",
              "circle-radius": 8,
              "circle-stroke-width": 3,
              "circle-stroke-color": "#ffffff",
            }}
          />
        </Source>

        {active && (
          <Popup
            longitude={active.longitude}
            latitude={active.latitude}
            anchor="bottom"
            offset={16}
            closeButton={false}
            closeOnClick={false}
            className="luxestate-popup"
          >
            <Link
              href={`/properties/${active.slug}`}
              className="block w-56 overflow-hidden rounded-xl"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={active.images[0]}
                  alt={active.title}
                  fill
                  sizes="224px"
                  className="object-cover"
                />
              </div>
              <div className="bg-card p-3">
                <p className="text-sm font-semibold text-foreground">
                  {formatPrice(active.price)}
                  {active.listingType === "RENT" && (
                    <span className="font-normal text-muted-foreground">
                      {" "}
                      /mois
                    </span>
                  )}
                </p>
                <p className="line-clamp-1 text-xs text-muted-foreground">
                  {active.title} · {active.city}
                </p>
              </div>
            </Link>
          </Popup>
        )}
      </Map>

      {showSearchArea && (
        <button
          onClick={searchThisArea}
          className="absolute left-1/2 top-4 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium shadow-lift transition-colors hover:bg-accent"
        >
          <Search className="size-4" />
          Rechercher dans cette zone
        </button>
      )}
    </div>
  );
}
