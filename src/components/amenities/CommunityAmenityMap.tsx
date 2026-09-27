"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AmenityStaticList } from "@/components/amenities/AmenityStaticList";
import {
	AMENITY_CATEGORIES,
	AMENITY_MAP_CENTER,
	AMENITY_MAP_COMMUNITY_DESCRIPTION,
	AMENITY_COMMUNITY_MARKER_LABEL,
	AMENITY_SEARCH_RADIUS_METERS,
	buildCommunityMapEmbedUrl,
	buildPlaceDirectionsUrl,
} from "@/lib/amenities/config";
import { getCuratedPlacesByCategory } from "@/lib/amenities/curated-places";
import type { AmenityCategoryId } from "@/lib/amenities/types";
import { getGoogleMapsApiKey } from "@/lib/google-business-profile";

type MapMode = "idle" | "loading" | "interactive" | "fallback";

type CommunityAmenityMapProps = {
	heightClassName?: string;
	showFullStaticList?: boolean;
	initialCategory?: AmenityCategoryId;
};

const MAP_HEIGHT_CLASS = "min-h-[22rem] sm:min-h-[26rem]";

let mapsScriptPromise: Promise<void> | null = null;

function loadMapsScript(apiKey: string): Promise<void> {
	if (typeof window === "undefined") {
		return Promise.reject(new Error("Maps unavailable on server"));
	}
	if (window.google?.maps) {
		return Promise.resolve();
	}
	if (mapsScriptPromise) {
		return mapsScriptPromise;
	}

	mapsScriptPromise = new Promise((resolve, reject) => {
		const existing = document.querySelector<HTMLScriptElement>(
			'script[data-community-amenity-map="true"]',
		);
		if (existing) {
			existing.addEventListener("load", () => resolve());
			existing.addEventListener("error", () => reject(new Error("Maps script failed")));
			return;
		}

		const script = document.createElement("script");
		script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&v=weekly&loading=async`;
		script.async = true;
		script.defer = true;
		script.dataset.communityAmenityMap = "true";
		script.onload = () => resolve();
		script.onerror = () => reject(new Error("Maps script failed"));
		document.head.appendChild(script);
	});

	return mapsScriptPromise;
}

function resolvePlaceName(displayName: unknown): string {
	if (typeof displayName === "string") return displayName;
	if (
		displayName &&
		typeof displayName === "object" &&
		"text" in displayName &&
		typeof (displayName as { text?: string }).text === "string"
	) {
		return (displayName as { text: string }).text;
	}
	return "Place";
}

function buildInfoHtml(
	name: string,
	address: string,
	rating?: number,
	directionsUrl?: string,
): string {
	const ratingLine =
		rating !== undefined
			? `<p style="margin:0.25rem 0">Rating: ${rating.toFixed(1)}</p>`
			: "";
	const directions = directionsUrl
		? `<p style="margin:0.5rem 0 0"><a href="${directionsUrl}" target="_blank" rel="noopener noreferrer">Directions</a></p>`
		: "";
	return `<div style="max-width:220px"><strong>${name}</strong><p style="margin:0.25rem 0">${address}</p>${ratingLine}${directions}</div>`;
}

export function CommunityAmenityMap({
	heightClassName = MAP_HEIGHT_CLASS,
	showFullStaticList = false,
	initialCategory = "grocery",
}: CommunityAmenityMapProps) {
	const apiKey = getGoogleMapsApiKey();
	const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID?.trim();
	const tablistId = useId();
	const [category, setCategory] = useState<AmenityCategoryId>(initialCategory);
	const [mode, setMode] = useState<MapMode>(apiKey ? "idle" : "fallback");
	const [showStaticFallback, setShowStaticFallback] = useState(!apiKey);

	const containerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<google.maps.Map | null>(null);
	const markersRef = useRef<google.maps.Marker[]>([]);
	const infoRef = useRef<google.maps.InfoWindow | null>(null);
	const communityMarkerRef = useRef<google.maps.Marker | null>(null);
	const observerStarted = useRef(false);

	const clearMarkers = useCallback(() => {
		for (const marker of markersRef.current) {
			marker.setMap(null);
		}
		markersRef.current = [];
	}, []);

	const placeCommunityMarker = useCallback((map: google.maps.Map) => {
		communityMarkerRef.current?.setMap(null);
		const position = new google.maps.LatLng(
			AMENITY_MAP_CENTER.latitude,
			AMENITY_MAP_CENTER.longitude,
		);
		const marker = new google.maps.Marker({
			map,
			position,
			title: AMENITY_COMMUNITY_MARKER_LABEL,
			zIndex: 999,
		});
		marker.addListener("click", () => {
			infoRef.current ??= new google.maps.InfoWindow();
			infoRef.current.setContent(
				buildInfoHtml(
					AMENITY_COMMUNITY_MARKER_LABEL,
					AMENITY_MAP_COMMUNITY_DESCRIPTION,
					undefined,
					buildPlaceDirectionsUrl(
						AMENITY_COMMUNITY_MARKER_LABEL,
						`${AMENITY_MAP_CENTER.latitude},${AMENITY_MAP_CENTER.longitude}`,
					),
				),
			);
			infoRef.current.open(map, marker);
		});
		communityMarkerRef.current = marker;
	}, []);

	const fetchPlaces = useCallback(
		async (map: google.maps.Map, categoryId: AmenityCategoryId) => {
			const config = AMENITY_CATEGORIES.find((item) => item.id === categoryId);
			if (!config) return;

			clearMarkers();
			setShowStaticFallback(false);

			const center = new google.maps.LatLng(
				AMENITY_MAP_CENTER.latitude,
				AMENITY_MAP_CENTER.longitude,
			);

			try {
				const library = (await google.maps.importLibrary("places")) as {
					Place: typeof google.maps.places.Place;
				};
				const { Place } = library;

				const { places } = await Place.searchNearby({
					fields: [
						"displayName",
						"location",
						"rating",
						"formattedAddress",
						"googleMapsURI",
					],
					locationRestriction: {
						center,
						radius: AMENITY_SEARCH_RADIUS_METERS,
					},
					includedPrimaryTypes: [...config.placesTypes],
					maxResultCount: 15,
				});

				infoRef.current ??= new google.maps.InfoWindow();

				if (places.length === 0) {
					setShowStaticFallback(true);
					return;
				}

				for (const place of places) {
					const location = place.location;
					if (!location) continue;
					const name = resolvePlaceName(place.displayName);
					const address = place.formattedAddress ?? "";
					const marker = new google.maps.Marker({
						map,
						position: location,
						title: name,
					});
					marker.addListener("click", () => {
						infoRef.current?.setContent(
							buildInfoHtml(
								name,
								address,
								place.rating,
								place.googleMapsURI ??
									buildPlaceDirectionsUrl(name, address || name),
							),
						);
						infoRef.current?.open(map, marker);
					});
					markersRef.current.push(marker);
				}
			} catch {
				const curated = getCuratedPlacesByCategory(categoryId);
				if (curated.length === 0) {
					setShowStaticFallback(true);
					return;
				}
				setShowStaticFallback(true);
			}
		},
		[clearMarkers],
	);

	const initMap = useCallback(async () => {
		if (!apiKey || !containerRef.current) {
			setMode("fallback");
			setShowStaticFallback(true);
			return;
		}
		setMode("loading");
		try {
			await loadMapsScript(apiKey);
			const mapOptions: Record<string, unknown> = {
				center: {
					lat: AMENITY_MAP_CENTER.latitude,
					lng: AMENITY_MAP_CENTER.longitude,
				},
				zoom: 13,
				mapTypeControl: false,
				streetViewControl: false,
				fullscreenControl: true,
			};
			if (mapId) {
				mapOptions.mapId = mapId;
			}
			const map = new google.maps.Map(containerRef.current, mapOptions);
			mapRef.current = map;
			placeCommunityMarker(map);
			await fetchPlaces(map, category);
			setMode("interactive");
		} catch {
			setMode("fallback");
			setShowStaticFallback(true);
		}
	}, [apiKey, category, fetchPlaces, mapId, placeCommunityMarker]);

	useEffect(() => {
		if (!apiKey || mode !== "idle" || observerStarted.current) return;
		const node = containerRef.current;
		if (!node) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					observer.disconnect();
					observerStarted.current = true;
					void initMap();
				}
			},
			{ rootMargin: "120px" },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, [apiKey, initMap, mode]);

	useEffect(() => {
		if (mode !== "interactive" || !mapRef.current) return;
		void fetchPlaces(mapRef.current, category);
	}, [category, fetchPlaces, mode]);

	const embedUrl = buildCommunityMapEmbedUrl();

	return (
		<div className="space-y-4">
			<div
				role="tablist"
				id={tablistId}
				aria-label="Filter nearby amenities by category"
				className="flex flex-wrap gap-2"
			>
				{AMENITY_CATEGORIES.map((item) => {
					const selected = item.id === category;
					return (
						<button
							key={item.id}
							type="button"
							role="tab"
							id={`${tablistId}-${item.id}`}
							aria-selected={selected}
							aria-controls={`${tablistId}-panel`}
							className={
								selected
									? "rounded-full border border-lux-gold bg-lux-gold/10 px-3 py-1.5 text-[length:var(--text-sm)] text-lux-text"
									: "rounded-full border border-[var(--border-subtle)] bg-lux-surface px-3 py-1.5 text-[length:var(--text-sm)] text-lux-muted hover:border-lux-gold-soft"
							}
							onClick={() => setCategory(item.id)}
						>
							{item.label}
						</button>
					);
				})}
			</div>

			<div
				id={`${tablistId}-panel`}
				role="tabpanel"
				aria-labelledby={`${tablistId}-${category}`}
				className={`relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-lux-surface ${heightClassName}`}
			>
				{mode === "fallback" ? (
					<iframe
						title="Map of Sandstone at Tule Springs area"
						src={embedUrl}
						className="absolute inset-0 h-full w-full border-0"
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					/>
				) : (
					<div
						ref={containerRef}
						className="absolute inset-0 h-full w-full"
						aria-label="Interactive map of nearby amenities"
					/>
				)}
				{mode === "loading" ? (
					<p
						className="absolute inset-x-0 bottom-0 bg-lux-bg/90 px-4 py-2 text-center text-[length:var(--text-sm)] text-lux-muted"
						role="status"
					>
						Loading map…
					</p>
				) : null}
			</div>

			{showStaticFallback || mode === "fallback" ? (
				<div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-lux-bg/50 p-4">
					<p className="text-[length:var(--text-sm)] text-lux-muted">
						{apiKey
							? "Showing verified nearby destinations for this category."
							: "Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in Vercel for live Places results. Curated destinations:"}
					</p>
					<div className="mt-4">
						{showFullStaticList ? (
							<AmenityStaticList category={category} showAll />
						) : (
							<AmenityStaticList category={category} />
						)}
					</div>
				</div>
			) : null}
		</div>
	);
}
