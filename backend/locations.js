/**
 * Sensitive location data for server-side verification.
 * Only IDs and coordinates are needed here to keep it lean.
 */
export const LOCATION_COORDINATES = {
    1: { lat: -7.607, lng: 110.203 }, // Borobudur
    2: { lat: -7.752, lng: 110.491 }, // Prambanan
    3: { lat: -7.942, lng: 112.953 }, // Bromo
    4: { lat: -8.058, lng: 114.242 }, // Ijen
    5: { lat: -7.805, lng: 110.364 }, // Keraton Yogyakarta
    6: { lat: -7.577, lng: 110.828 }, // Keraton Surakarta
    7: { lat: -7.556, lng: 112.383 }, // Majapahit
    8: { lat: -7.450, lng: 110.833 }, // Sangiran
    9: { lat: -7.540, lng: 110.446 }, // Merapi
    10: { lat: -6.137, lng: 106.814 }, // Kota Tua
    // ... adding a subset for now, in a real app this would be the full list or a DB
};

// Full list from data.ts would go here. 
// For this demo, I'll include the first 10 for functional testing.
