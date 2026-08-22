import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "CA Bhatia",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F5",
    theme_color: "#12324A",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
