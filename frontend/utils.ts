// Haversine formula to calculate distance between two lat/lng points in km
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
};

const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
};

// Synthesize a Gamelan/Gong sound using Web Audio API
export const playGongSound = () => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        
        const ctx = new AudioContext();
        
        // Main fundamental frequency (low gong)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(120, ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 2);
        
        gain1.gain.setValueAtTime(0, ctx.currentTime);
        gain1.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.05);
        gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);
        
        // Higher harmonic for metallic strike
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(360, ctx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 1.5);
        
        gain2.gain.setValueAtTime(0, ctx.currentTime);
        gain2.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);

        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);

        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 2);
        osc2.stop(ctx.currentTime + 1.5);
    } catch (e) {
        console.error("Audio playback failed", e);
    }
};

export const getRank = (stampCount: number): string => {
    if (stampCount <= 5) return 'pelancong';
    if (stampCount <= 20) return 'penjelajah';
    if (stampCount <= 50) return 'petualang';
    return 'penjaga';
};

// Resize image to prevent localStorage quota exceeded errors
export const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round(height * (maxWidth / width));
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round(width * (maxHeight / height));
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    resolve(e.target?.result as string); // fallback to original if canvas fails
                    return;
                }
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compress to 70% quality JPEG
            };
            img.onerror = reject;
            img.src = e.target?.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

// Mock location detection to prevent spoofing
export const detectMockLocation = (currentLocation: { lat: number; lng: number }, 
                                  previousLocation: { lat: number; lng: number } | null,
                                  timestamp: number): boolean => {
    // If no previous location, assume it's valid
    if (!previousLocation) return false;
    
    // Calculate distance between locations
    const distance = calculateDistance(
        currentLocation.lat, 
        currentLocation.lng, 
        previousLocation.lat, 
        previousLocation.lng
    );
    
    // Calculate time difference in minutes (using current time for simplicity)
    const timeDiff = (Date.now() - timestamp) / 60000; // in minutes
    
    // If moving too fast (more than 50km/h) or too slow (0km/h) in short time, likely spoofed
    if (timeDiff > 0) {
        const speed = distance / (timeDiff / 60); // km/h
        // Very high speed (>50km/h) over short period suggests spoofing
        if (speed > 50) {
            return true;
        }
        // Very low speed (<1km/h) over long period suggests spoofing
        if (speed < 1 && timeDiff > 5) {
            return true;
        }
    }
    
    // If location changed dramatically without enough time passed, likely spoofed
    if (distance > 10 && timeDiff < 1) {
        return true;
    }
    
    return false;
};
