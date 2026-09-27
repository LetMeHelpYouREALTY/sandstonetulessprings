"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AmenityStaticList } from "@/components/amenities/AmenityStaticList";
import {
	AMENITY_CATEGORIES,
	AMENITY_MAP_CENTER,
	AMENITY_MAP_COMMUNITY_DESCRIPTION,
	AMENITY_COMMUNITY_MARKER_LABEL,
	AMENITY_PAGE_COMMUNITY_LABEL,
	buildCommunityMapEmbedUrl,
	buildPlaceDirectionsUrl,
} from "@/lib/amenities/config";
import { getCuratedPlacesByCategory } from "@/lib/amenities/curated-places";
import { searchCategory } from "@/lib/amenities/search-nearby";
import type { AmenityCategoryId } from "@/lib/amenities/types";
import { loadGoogleMaps, mapsAuthFailed } from "@/lib/google-maps-loader";

type MapMode = "idle" | "loading" | "interactive" | "fallback";

type CommunityAmenityMapProps = {
	heightClassName?: string;
	showFullStaticList?: boolean;
	initialCategory?: AmenityCategoryId;
};

const MAP_HEIGHT_CLASS = "min-h-[22rem] sm:min-h-[26rem]";

function resolvePlaceName(displayName: google.maps.places.Place["displayName"]): string {
	if (typeof displayName === "string") return displayName;
	if (displayName && typeof displayName === "object" && "text" in displayName) {
		const text = (displayName as { text?: string }).text;
		if (typeof text === "string") return text;
	}
	return "Place";
}

function buildInfoContent(
	name: string,
	address: string,
	directionsUrl?: string,
): HTMLElement {
	const root = document.createElement("div");
	root.style.maxWidth = "220px";

	const title = document.createElement("strong");
	title.textContent = name;
	root.appendChild(title);

	if (address) {
		const addr = document.createElement("p");
		addr.style.margin = "0.25rem 0";
		addr.textContent = address;
		root.appendChild(addr);
	}

	if (directionsUrl) {
		const linkWrap = document.createElement("p");
		linkWrap.style.margin = "0.5rem 0 0";
		const link = document.createElement("a");
		link.href = directionsUrl;
		link.target = "_blank";
		link.rel = "noopener noreferrer";
		link.textContent = "Directions";
		linkWrap.appendChild(link);
		root.appendChild(linkWrap);
	}

	return root;
}

export function CommunityAmenityMap({
	heightClassName = MAP_HEIGHT_CLASS,
	showFullStaticList = false,
	initialCategory = "grocery",
}: CommunityAmenityMapProps) {
	const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
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

	const enterFallback = useCallback(() => {
		for (const marker of markersRef.current) {
			marker.setMap(null);
		}
		markersRef.current = [];
		communityMarkerRef.current?.setMap(null);
		communityMarkerRef.current = null;
		mapRef.current = null;
		infoRef.current?.close();
		setMode("fallback");
		setShowStaticFallback(true);
	}, []);

	useEffect(() => {
		const onAuthFailure = () => enterFallback();
		window.addEventListener("gmaps:auth-failure", onAuthFailure);
		return () => window.removeEventListener("gmaps:auth-failure", onAuthFailure);
	}, [enterFallback]);

	const clearMarkers = useCallback(() => {
		for (const marker of markersRef.current) {
			marker.setMap(null);
		}
		markersRef.current = [];
	}, []);

	const placeCommunityMarker = useCallback((map: google.maps.Map) => {
		communityMarkerRef.current?.setMap(null);
		const position = {
			lat: AMENITY_MAP_CENTER.latitude,
			lng: AMENITY_MAP_CENTER.longitude,
		};
		const marker = new google.maps.Marker({
			map,
			position,
			title: AMENITY_COMMUNITY_MARKER_LABEL,
			zIndex: 999,
		});
		marker.addListener("click", () => {
			infoRef.current ??= new google.maps.InfoWindow();
			infoRef.current.setContent(
				buildInfoContent(
					AMENITY_COMMUNITY_MARKER_LABEL,
					AMENITY_MAP_COMMUNITY_DESCRIPTION,
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

			const center = {
				lat: AMENITY_MAP_CENTER.latitude,
				lng: AMENITY_MAP_CENTER.longitude,
			};

			try {
				const places = await searchCategory(
					center,
					categoryId,
					[...config.placesTypes],
				);

				infoRef.current ??= new google.maps.InfoWindow();

				if (places.length === 0) {
					setShowStaticFallback(true);
					return;
				}

				for (const place of places) {
					const location = place.location;
					if (!location) continue;
					const { lat, lng } = location.toJSON();
					const name = resolvePlaceName(place.displayName);
					const address = place.formattedAddress ?? "";
					const marker = new google.maps.Marker({
						map,
						position: { lat, lng },
						title: name,
					});
					marker.addListener("click", () => {
						infoRef.current?.setContent(
							buildInfoContent(
								name,
								address,
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
				setShowStaticFallback(curated.length > 0);
			}
		},
		[clearMarkers],
	);

	const initMap = useCallback(async () => {
		if (mapsAuthFailed) {
			enterFallback();
			return;
		}
		if (!apiKey || !containerRef.current) {
			enterFallback();
			return;
		}
		setMode("loading");
		try {
			await loadGoogleMaps(apiKey);
			if (mapsAuthFailed) {
				enterFallback();
				return;
			}
			const mapOptions: google.maps.MapOptions = {
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
			enterFallback();
		}
	}, [apiKey, category, enterFallback, fetchPlaces, mapId, placeCommunityMarker]);

	useEffect(() => {
		if (!apiKey || mode !== "idle" || observerStarted.current || mapsAuthFailed) {
			return;
		}
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
	const useIframe = mode === "fallback";

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
				{useIframe ? (
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

			{showStaticFallback || useIframe ? (
				<div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-lux-bg/50 p-4">
					<p className="text-[length:var(--text-sm)] text-lux-muted">
						Featured places near {AMENITY_PAGE_COMMUNITY_LABEL}
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
