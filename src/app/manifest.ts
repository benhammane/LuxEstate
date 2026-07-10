import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LuxEstate — L'immobilier d'exception",
    short_name: "LuxEstate",
    description:
      "Propriétés d'exception, recherche avancée et visites privées.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3452c9",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
