import { ImageResponse } from "next/og";
import { SITE_BUSINESS_NAME } from "@/lib/site-contact";

export const alt = SITE_BUSINESS_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					width: "100%",
					height: "100%",
					padding: 64,
					background: "linear-gradient(135deg, #1e3a5f 0%, #3d6b8c 50%, #8b7355 100%)",
					color: "#ffffff",
					fontFamily: "system-ui, sans-serif",
				}}
			>
				<div style={{ fontSize: 28, opacity: 0.9, marginBottom: 16 }}>
					North Las Vegas · 89084
				</div>
				<div
					style={{
						fontSize: 52,
						fontWeight: 700,
						lineHeight: 1.15,
						maxWidth: 900,
					}}
				>
					{SITE_BUSINESS_NAME}
				</div>
				<div style={{ fontSize: 26, marginTop: 24, opacity: 0.95, maxWidth: 800 }}>
					Sandstone at Tule Springs · KB Home Landings · Buyer representation
				</div>
			</div>
		),
		{ ...size },
	);
}
