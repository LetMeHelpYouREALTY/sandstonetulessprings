import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const APEX_HOST = "sandstonetulessprings.com";
const CANONICAL_HOST = "www.sandstonetulessprings.com";

/** One canonical host for SEO — apex requests redirect to www (matches metadataBase / GSC). */
export function middleware(request: NextRequest) {
	const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
	if (host === APEX_HOST) {
		const url = request.nextUrl.clone();
		url.protocol = "https";
		url.host = CANONICAL_HOST;
		return NextResponse.redirect(url, 308);
	}
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
	],
};
