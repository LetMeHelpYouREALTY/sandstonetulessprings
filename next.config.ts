import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
	// Pin workspace root so Turbopack/dev does not pick up a parent lockfile on local machines.
	turbopack: {
		root: projectRoot,
	},
};

export default nextConfig;

// Cloudflare local dev only — skip on Vercel/production builds.
if (process.env.NODE_ENV === "development" && process.env.VERCEL !== "1") {
	void import("@opennextjs/cloudflare").then(({ initOpenNextCloudflareForDev }) => {
		initOpenNextCloudflareForDev();
	});
}
