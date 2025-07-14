// "use client"

// import { useState, useEffect } from "react"
// import { MapPin, Navigation, Search, X, ChevronDown } from "lucide-react"

// const LocationSelector = ({
//   value = "",
//   onChange,
//   placeholder = "Select location",
//   showCurrentLocation = true,
//   required = false,
//   className = "",
//   disabled = false,
// }) => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [suggestions, setSuggestions] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [currentLocation, setCurrentLocation] = useState(null)
//   const [gettingLocation, setGettingLocation] = useState(false)

//   // Mock location data - in real app, this would come from an API
//   const mockLocations = [
//     { id: 1, name: "Bandra West", city: "Mumbai", pincode: "400050", state: "Maharashtra" },
//     { id: 2, name: "Andheri East", city: "Mumbai", pincode: "400069", state: "Maharashtra" },
//     { id: 3, name: "Powai", city: "Mumbai", pincode: "400076", state: "Maharashtra" },
//     { id: 4, name: "Juhu", city: "Mumbai", pincode: "400049", state: "Maharashtra" },
//     { id: 5, name: "Malad West", city: "Mumbai", pincode: "400064", state: "Maharashtra" },
//     { id: 6, name: "Thane West", city: "Thane", pincode: "400601", state: "Maharashtra" },
//     { id: 7, name: "Koregaon Park", city: "Pune", pincode: "411001", state: "Maharashtra" },
//     { id: 8, name: "Whitefield", city: "Bangalore", pincode: "560066", state: "Karnataka" },
//     { id: 9, name: "Indiranagar", city: "Bangalore", pincode: "560038", state: "Karnataka" },
//     { id: 10, name: "Gurgaon Sector 14", city: "Gurgaon", pincode: "122001", state: "Haryana" },
//   ]

//   useEffect(() => {
//     if (searchQuery.length > 2) {
//       setLoading(true)
//       // Simulate API call
//       setTimeout(() => {
//         const filtered = mockLocations.filter(
//           (location) =>
//             location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             location.pincode.includes(searchQuery),
//         )
//         setSuggestions(filtered)
//         setLoading(false)
//       }, 300)
//     } else {
//       setSuggestions([])
//     }
//   }, [searchQuery])

//   const getCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported by this browser.")
//       return
//     }

//     setGettingLocation(true)

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords

//         try {
//           // In real app, use reverse geocoding API
//           // For demo, we'll simulate the response
//           await new Promise((resolve) => setTimeout(resolve, 1000))

//           const mockCurrentLocation = {
//             name: "Current Location",
//             address: "Bandra West, Mumbai, Maharashtra 400050",
//             pincode: "400050",
//             coordinates: { lat: latitude, lng: longitude },
//           }

//           setCurrentLocation(mockCurrentLocation)
//           onChange({
//             address: mockCurrentLocation.address,
//             pincode: mockCurrentLocation.pincode,
//             coordinates: mockCurrentLocation.coordinates,
//           })
//           setIsOpen(false)
//         } catch (error) {
//           alert("Failed to get location details. Please try again.")
//         } finally {
//           setGettingLocation(false)
//         }
//       },
//       (error) => {
//         setGettingLocation(false)
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             alert("Location access denied. Please enable location permissions.")
//             break
//           case error.POSITION_UNAVAILABLE:
//             alert("Location information is unavailable.")
//             break
//           case error.TIMEOUT:
//             alert("Location request timed out.")
//             break
//           default:
//             alert("An unknown error occurred while getting location.")
//             break
//         }
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 300000, // 5 minutes
//       },
//     )
//   }

//   const selectLocation = (location) => {
//     const locationData = {
//       address: `${location.name}, ${location.city}, ${location.state} ${location.pincode}`,
//       pincode: location.pincode,
//       name: location.name,
//       city: location.city,
//       state: location.state,
//     }

//     onChange(locationData)
//     setIsOpen(false)
//     setSearchQuery("")
//   }

//   const clearLocation = () => {
//     onChange("")
//     setCurrentLocation(null)
//     setSearchQuery("")
//   }

//   const displayValue = value?.address || value || ""

//   return (
//     <div className={`relative ${className}`}>
//       <div className="relative">
//         <button
//           type="button"
//           onClick={() => !disabled && setIsOpen(!isOpen)}
//           disabled={disabled}
//           className={`w-full flex items-center justify-between px-3 py-2 text-left border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//             disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white text-gray-900 hover:bg-gray-50"
//           } ${!displayValue ? "text-gray-500" : ""}`}
//         >
//           <div className="flex items-center flex-1 min-w-0">
//             <MapPin className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
//             <span className="truncate">{displayValue || placeholder}</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             {displayValue && !disabled && (
//               <button
//                 type="button"
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   clearLocation()
//                 }}
//                 className="p-1 hover:bg-gray-200 rounded-full"
//               >
//                 <X className="h-4 w-4 text-gray-400" />
//               </button>
//             )}
//             <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
//           </div>
//         </button>
//         {required && !displayValue && (
//           <div className="absolute inset-y-0 right-8 flex items-center">
//             <span className="text-red-500">*</span>
//           </div>
//         )}
//       </div>

//       {isOpen && !disabled && (
//         <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
//           <div className="p-3 border-b border-gray-200">
//             <div className="relative">
//               <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search location..."
//                 className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 autoFocus
//               />
//             </div>
//           </div>

//           <div className="max-h-60 overflow-y-auto">
//             {showCurrentLocation && (
//               <button
//                 type="button"
//                 onClick={getCurrentLocation}
//                 disabled={gettingLocation}
//                 className="w-full flex items-center px-3 py-3 text-left hover:bg-gray-50 border-b border-gray-100 disabled:opacity-50"
//               >
//                 <Navigation className={`h-5 w-5 text-blue-600 mr-3 ${gettingLocation ? "animate-spin" : ""}`} />
//                 <div>
//                   <div className="font-medium text-blue-600">
//                     {gettingLocation ? "Getting location..." : "Use current location"}
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     {gettingLocation ? "Please wait..." : "Automatically detect your location"}
//                   </div>
//                 </div>
//               </button>
//             )}

//             {loading ? (
//               <div className="px-3 py-4 text-center text-gray-500">
//                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
//                 Searching...
//               </div>
//             ) : suggestions.length > 0 ? (
//               suggestions.map((location) => (
//                 <button
//                   key={location.id}
//                   type="button"
//                   onClick={() => selectLocation(location)}
//                   className="w-full flex items-center px-3 py-3 text-left hover:bg-gray-50"
//                 >
//                   <MapPin className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
//                   <div className="flex-1 min-w-0">
//                     <div className="font-medium text-gray-900 truncate">{location.name}</div>
//                     <div className="text-sm text-gray-500 truncate">
//                       {location.city}, {location.state} - {location.pincode}
//                     </div>
//                   </div>
//                 </button>
//               ))
//             ) : searchQuery.length > 2 ? (
//               <div className="px-3 py-4 text-center text-gray-500">No locations found for "{searchQuery}"</div>
//             ) : (
//               <div className="px-3 py-4 text-center text-gray-500">Type to search for locations</div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default LocationSelector


"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import maplibregl from "maplibre-gl";
import debounce from "lodash.debounce";
import {
  MapPin,
  Navigation,
  Search,
  X,
  ChevronDown,
  LocateFixed,
} from "lucide-react";

const GEO_KEY = import.meta.env.VITE_GEOAPIFY_KEY;          // required
const STYLE_URL = `https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=${GEO_KEY}`;

const AUTOCOMPLETE = (q, lat, lon) =>
  `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
    q
  )}&limit=6&lang=en&lat=${lat}&lon=${lon}&format=json&apiKey=${GEO_KEY}`;

const REVERSE = (lat, lon) =>
  `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&lang=en&format=json&apiKey=${GEO_KEY}`;

/* ============================================================= */
/*                          COMPONENT                            */
/* ============================================================= */

export default function LocationSelector({
  value = null,
  onChange,
  placeholder = "Select location",
  required = false,
  className = "",
  disabled = false,
}) {
  /* ---------- state ---------- */
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------- helper → live user fix (one-shot) ---------- */
  const detectPosition = () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject("no-geo");
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos.coords),
        (err) => reject(err),
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
      );
    });

  /* ---------- initialise map once ---------- */
  useEffect(() => {
    if (!isOpen || mapRef.current) return;

    (async () => {
      /* fallback centre → Connaught Place, Delhi */
      let center = { lng: 77.219, lat: 28.631 };

      try {
        const { latitude, longitude } = await detectPosition();
        center = { lng: longitude, lat: latitude };
      } catch (_) {
        /* swallow – keep fallback */
      }

      /* map */
      const map = new maplibregl.Map({
        container: "mapbox", // div id
        style: STYLE_URL,
        center: [center.lng, center.lat],
        zoom: 15,
      });
      mapRef.current = map;

      /* draggable marker */
      markerRef.current = new maplibregl.Marker({ draggable: true })
        .setLngLat([center.lng, center.lat])
        .addTo(map);

      /* if user drags -> update address preview */
      markerRef.current.on("dragend", async () => {
        const { lat, lng } = markerRef.current.getLngLat();
        await updateAddress(lat, lng);
      });
    })();

    return () => mapRef.current?.remove(); // unmount clean-up
  }, [isOpen]);

  /* ---------- reverse-geocode helper ---------- */
  const updateAddress = async (lat, lon) => {
    const res = await fetch(REVERSE(lat, lon));
    const { results } = await res.json();
    if (!results?.length) return;

    const best = results[0];
    const payload = {
      address: best.formatted,
      pincode: best.postcode,
      coordinates: { lat, lng: lon },
    };
    console.log("Selected address:", payload);
    onChange(payload);
  };

  /* ---------- autocomplete (debounced) ---------- */
  const doSearch = useCallback(
    debounce(async (text) => {
      if (text.length < 3) return setSuggestions([]);
      setLoading(true);

      /* bias search to current marker position if present */
      const pos = markerRef.current?.getLngLat() || { lat: 28.631, lng: 77.219 };
      const res = await fetch(AUTOCOMPLETE(text, pos.lat, pos.lng));
      const { results } = await res.json();
      setSuggestions(results || []);
      setLoading(false);
    }, 350),
    []
  );

  useEffect(() => {
    if (query) doSearch(query);
  }, [query]);

  /* ---------- handlers ---------- */
  const chooseSuggestion = (s) => {
    const { lat, lon } = s;
    markerRef.current?.setLngLat([lon, lat]);
    mapRef.current?.flyTo({ center: [lon, lat], zoom: 16 });
    setQuery(s.formatted);
    setSuggestions([]);
    onChange({
      address: s.formatted,
      pincode: s.postcode,
      coordinates: { lat, lng: lon },
    });
    setIsOpen(false);
  };

  const clearLocation = () => {
    onChange(null);
    setQuery("");
  };

  /* ---------- UI ---------- */
  return (
    <div className={`relative ${className}`}>
      {/* collapsed input */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center gap-2 rounded border px-3 py-2 text-left"
      >
        <MapPin size={18} />
        <span className="flex-1 truncate text-sm">
          {value?.address || placeholder}
        </span>
        {value && <X size={14} onClick={clearLocation} />}
        <ChevronDown size={16} />
      </button>

      {/* modal / dropdown */}
      {isOpen && (
        <div className="absolute z-20 mt-2 w-full rounded bg-white p-3 shadow-lg">
          {/* search box */}
          <div className="relative mb-2">
            <Search size={16} className="absolute left-2 top-3 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search address or landmark"
              className="w-full rounded border pl-8 pr-3 py-2 text-sm"
            />
            {loading && (
              <div className="absolute right-3 top-3 h-3 w-3 animate-spin rounded-full border-2 border-t-transparent" />
            )}
          </div>

          {/* suggestions */}
          {!!suggestions.length && (
            <ul className="max-h-48 overflow-y-auto border-y py-1 text-sm">
              {suggestions.map((s) => (
                <li
                  key={s.place_id}
                  onClick={() => chooseSuggestion(s)}
                  className="cursor-pointer px-3 py-1 hover:bg-gray-100"
                >
                  {s.formatted}
                </li>
              ))}
            </ul>
          )}

          {/* map panel */}
          <div id="mapbox" className="h-64 w-full rounded" />

          {/* action row */}
          <div className="mt-2 flex justify-between">
            <button
              type="button"
              onClick={async () => {
                try {
                  const { latitude, longitude } = await detectPosition();
                  markerRef.current?.setLngLat([longitude, latitude]);
                  mapRef.current?.flyTo({ center: [longitude, latitude], zoom: 16 });
                  await updateAddress(latitude, longitude);
                  setIsOpen(false);
                } catch (_) {
                  alert("Unable to detect current location.");
                }
              }}
              className="flex items-center gap-1 rounded bg-gray-100 px-3 py-2 text-xs"
            >
              <LocateFixed size={14} /> Use current
            </button>

            <button
              type="button"
              onClick={() => {
                const { lat, lng } = markerRef.current.getLngLat();
                updateAddress(lat, lng);
                setIsOpen(false);
              }}
              className="rounded bg-primary px-4 py-2 text-xs text-white"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* license credit */}
      <p className="mt-1 text-right text-[10px] text-gray-400">
        © OpenStreetMap contributors | © Geoapify
      </p>
    </div>
  );
}
