import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Coredex Solutions",
    short_name: "Coredex",
    description: "Leading Digital Agency in Lebanon",
    start_url: "/en",
    display: "standalone",
    background_color: "#FAFBFF",
    theme_color: "#802cf5",
    // TODO: Add icons back when generated
    // icons: [
    //   {
    //     src: "/icon-192x192.png",
    //     sizes: "192x192",
    //     type: "image/png",
    //   },
    //   {
    //     src: "/icon-512x512.png",
    //     sizes: "512x512",
    //     type: "image/png",
    //   },
    // ],
  };
}
