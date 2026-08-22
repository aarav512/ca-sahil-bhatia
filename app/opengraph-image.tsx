import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}, Chartered Accountant`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#FAF8F5",
          color: "#12324A",
        }}
      >
        <div
          style={{
            fontSize: 16,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#B08D57",
          }}
        >
          Chartered Accountant
        </div>
        <div style={{ fontSize: 64, lineHeight: 1.1 }}>{site.name}</div>
        <div style={{ fontSize: 22, color: "#5E4633" }}>{site.institute}</div>
      </div>
    ),
    { ...size },
  );
}
