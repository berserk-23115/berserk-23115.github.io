import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Anushk Kumar — Computational Matter",
    short_name: "Anushk Kumar",
    start_url: "/",
    display: "browser",
    background_color: "#101112",
    theme_color: "#101112",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
