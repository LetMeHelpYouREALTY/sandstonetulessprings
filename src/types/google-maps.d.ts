/** Minimal typings for lazy-loaded Maps JavaScript API + Places (New). */
declare namespace google.maps {
	class LatLng {
		constructor(lat: number, lng: number);
	}

	class Map {
		constructor(element: HTMLElement, opts?: Record<string, unknown>);
		setCenter(latLng: LatLng): void;
		setZoom(zoom: number): void;
	}

	class Marker {
		constructor(opts?: Record<string, unknown>);
		setMap(map: Map | null): void;
		addListener(event: string, handler: () => void): void;
	}

	class InfoWindow {
		constructor(opts?: Record<string, unknown>);
		setContent(content: string): void;
		open(map?: Map, anchor?: Marker): void;
		close(): void;
	}

	class Circle {
		constructor(opts?: Record<string, unknown>);
	}

	enum places {
		SearchNearbyRankPreference,
	}

	namespace places {
		class Place {
			static searchNearby(
				request: Record<string, unknown>,
			): Promise<{ places: Place[] }>;
			displayName?: string | { text?: string };
			location?: LatLng;
			rating?: number;
			formattedAddress?: string;
			googleMapsURI?: string;
		}
	}

	function importLibrary(name: string): Promise<unknown>;
}

interface Window {
	google?: typeof google;
}
