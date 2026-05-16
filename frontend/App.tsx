import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Book, Map as MapIcon, Award, User, X, CheckCircle2, MapPin, Info, Settings, Share2, Camera, LogOut, Download } from 'lucide-react';
import { toJpeg } from 'html-to-image';
import { LOCATIONS, BADGES, TRANSLATIONS } from './data';
import { calculateDistance, playGongSound, getRank, resizeImage } from './utils';
import { AppState, Location, Tab, Language, CollectedStamp, UserProfile } from './types';
import { signInWithGoogle, logout as firebaseLogout, savePassportData, loadPassportData, uploadStampImage } from './firebase';

// --- Components ---

const StampGrid: React.FC<{
    locations: Location[];
    collected: CollectedStamp[];
    onSelect: (loc: Location) => void;
}> = ({ locations, collected, onSelect }) => {
    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {locations.map(loc => {
                const collectedStamp = collected.find(c => c.locationId === loc.id);
                const isCollected = !!collectedStamp;
                const imgSrc = collectedStamp?.customImage || `https://picsum.photos/seed/${loc.id}/200/200`;
                
                return (
                    <div 
                        key={loc.id} 
                        onClick={() => onSelect(loc)}
                        className="flex flex-col items-center cursor-pointer transform transition-transform active:scale-95"
                    >
                        <div className={`w-24 h-24 rounded-full overflow-hidden border-4 flex items-center justify-center bg-white shadow-sm
                            ${isCollected ? 'border-batik-700' : 'border-dashed border-gray-300'}`}>
                            <img 
                                src={imgSrc} 
                                alt={loc.name}
                                className={`w-full h-full object-cover transition-all duration-500
                                    ${isCollected 
                                        ? '' 
                                        : 'grayscale opacity-20'}`}
                            />
                        </div>
                        <span className="text-xs text-center mt-2 font-medium text-batik-900 line-clamp-2 h-8">
                            {loc.name}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

const LocationModal: React.FC<{
    location: Location;
    collectedStamp?: CollectedStamp;
    lang: Language;
    onClose: () => void;
    onUnlock: (id: number) => void;
    onImageUpload?: (id: number, imageData: string) => void;
    currentDistance?: number;
}> = ({ location, collectedStamp, lang, onClose, onUnlock, onImageUpload, currentDistance }) => {
    const t = TRANSLATIONS[lang];
    const isUnlockable = currentDistance !== undefined && currentDistance <= 0.1; // 100m
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onImageUpload) {
            setIsUploading(true);
            try {
                // Resize to max 800x800 to prevent localStorage quota issues
                const resizedDataUrl = await resizeImage(file, 800, 800);
                onImageUpload(location.id, resizedDataUrl);
            } catch (err) {
                console.error("Failed to resize image", err);
            } finally {
                setIsUploading(false);
            }
        }
    };

    const imgSrc = collectedStamp?.customImage || `https://picsum.photos/seed/${location.id}/600/400`;

    return (
        <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-batik-50 w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                <div className="relative h-48 shrink-0">
                    <img 
                        src={imgSrc} 
                        alt={location.name}
                        className={`w-full h-full object-cover ${collectedStamp ? '' : 'grayscale'}`}
                    />
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white">
                        <X size={20} />
                    </button>
                    
                    {collectedStamp && (
                        <>
                            <div className="absolute bottom-4 left-4">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    ref={fileInputRef} 
                                    onChange={handleFileChange} 
                                />
                                <button 
                                    onClick={() => fileInputRef.current?.click()} 
                                    disabled={isUploading}
                                    className="bg-white/90 backdrop-blur text-batik-900 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-lg hover:bg-white transition-colors active:scale-95 disabled:opacity-50"
                                >
                                    <Camera size={16} />
                                    {isUploading ? '...' : (collectedStamp.customImage ? t.changePhoto : t.uploadPhoto)}
                                </button>
                            </div>
                            <div className="absolute bottom-4 right-4 bg-batik-700 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                                <CheckCircle2 size={16} />
                                {new Date(collectedStamp.timestamp).toLocaleDateString()}
                            </div>
                        </>
                    )}
                </div>
                
                <div className="p-6 overflow-y-auto">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-2xl font-bold text-batik-900">{location.name}</h2>
                    </div>
                    <p className="text-batik-600 font-medium mb-4 flex items-center gap-1">
                        <MapPin size={16} /> {location.province}, {location.island}
                    </p>
                    
                    <div className="flex gap-2 mb-6">
                        <span className="px-3 py-1 bg-batik-200 text-batik-800 rounded-full text-xs font-bold uppercase tracking-wider">
                            {location.category}
                        </span>
                        {currentDistance !== undefined && (
                            <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                {currentDistance < 1 ? `${Math.round(currentDistance * 1000)}${t.m}` : `${currentDistance.toFixed(1)}${t.km}`}
                            </span>
                        )}
                    </div>

                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p>{lang === 'en' ? location.descriptionEn : location.descriptionId}</p>
                        
                        <div className="bg-batik-100 p-4 rounded-xl border border-batik-200">
                            <h3 className="font-bold text-batik-900 mb-2 flex items-center gap-2">
                                <Info size={18} /> {t.tips}
                            </h3>
                            <p className="text-sm">{lang === 'en' ? location.tipsEn : location.tipsId}</p>
                        </div>
                    </div>
                </div>

                {!collectedStamp && (
                    <div className="p-4 bg-white border-t border-batik-200 shrink-0">
                        <button 
                            onClick={() => onUnlock(location.id)}
                            disabled={!isUnlockable}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-md
                                ${isUnlockable 
                                    ? 'bg-batik-600 text-white hover:bg-batik-700 active:scale-95' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                        >
                            {t.unlock}
                        </button>
                        {!isUnlockable && (
                            <p className="text-center text-xs text-red-500 mt-2">
                                You must be within 100m to unlock.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const UnlockCeremony: React.FC<{ location: Location; onComplete: () => void }> = ({ location, onComplete }) => {
    useEffect(() => {
        playGongSound();
        const timer = setTimeout(onComplete, 4000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-batik-900/90 backdrop-blur-xl overflow-hidden">
            {/* Burst Effect */}
            <div className="absolute w-64 h-64 bg-batik-400 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-burst"></div>
            <div className="absolute w-96 h-96 bg-batik-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-burst [animation-delay:200ms]"></div>
            
            {/* Confetti Elements (CSS only) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute w-3 h-3 bg-batik-300 rounded-sm animate-confetti-pop"
                        style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${40 + Math.random() * 20}%`,
                            animationDelay: `${Math.random() * 500}ms`,
                            transform: `rotate(${Math.random() * 360}deg)`
                        }}
                    ></div>
                ))}
            </div>

            <div className="flex flex-col items-center animate-stamp-drop z-10">
                <div className="w-64 h-64 rounded-full border-8 border-white flex items-center justify-center bg-white shadow-[0_0_50px_rgba(255,255,255,0.4)] relative overflow-hidden">
                    <img 
                        src={`https://picsum.photos/seed/${location.id}/400/400`} 
                        alt="Stamp"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 border-[12px] border-batik-700/30 rounded-full mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
                </div>
                <h2 className="text-4xl font-black text-white mt-12 text-center px-4 drop-shadow-lg tracking-tight">
                    {location.name}
                </h2>
                <p className="text-batik-200 text-xl mt-4 font-bold tracking-[0.3em] uppercase opacity-0 animate-fade-in [animation-delay:600ms]">
                    Stamp Unlocked
                </p>
            </div>
        </div>
    );
};

const BadgeCelebration: React.FC<{ badge: Badge; onComplete: () => void; lang: Language }> = ({ badge, onComplete, lang }) => {
    useEffect(() => {
        playGongSound();
        const timer = setTimeout(onComplete, 5000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-batik-900/95 backdrop-blur-2xl p-6">
            <div className="max-w-xs w-full flex flex-col items-center text-center">
                <div className="relative mb-12">
                    {/* Multiple Burst Rings */}
                    <div className="absolute inset-0 bg-batik-400 rounded-full animate-burst opacity-40"></div>
                    <div className="absolute inset-0 bg-batik-200 rounded-full animate-burst [animation-delay:300ms] opacity-30"></div>
                    
                    <div className="w-48 h-48 bg-gradient-to-b from-batik-300 to-batik-600 rounded-3xl rotate-45 flex items-center justify-center shadow-2xl animate-scale-in relative z-10 border-4 border-white">
                        <div className="-rotate-45">
                            <Award size={80} className="text-white drop-shadow-md" />
                        </div>
                    </div>
                </div>

                <div className="opacity-0 animate-slide-up [animation-delay:400ms]">
                    <h3 className="text-batik-200 font-bold uppercase tracking-[0.2em] mb-2">Collection Complete</h3>
                    <h2 className="text-4xl font-black text-white mb-6 leading-tight">
                        {badge.name}
                    </h2>
                    <p className="text-batik-100 text-lg leading-relaxed px-4">
                        {lang === 'en' ? badge.descriptionEn : badge.descriptionId}
                    </p>
                </div>

                <button 
                    onClick={onComplete}
                    className="mt-12 px-12 py-4 bg-white text-batik-900 rounded-2xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-transform opacity-0 animate-fade-in [animation-delay:1200ms]"
                >
                    AWESOME!
                </button>
            </div>
        </div>
    );
};

const ShareModal: React.FC<{
    user: UserProfile | null;
    collected: CollectedStamp[];
    rankName: string;
    lang: Language;
    onClose: () => void;
}> = ({ user, collected, rankName, lang, onClose }) => {
    const t = TRANSLATIONS[lang];
    const cardRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const recentStamps = [...collected].reverse().slice(0, 8);

    const generateImage = async () => {
        if (!cardRef.current) return null;
        setIsGenerating(true);
        try {
            const dataUrl = await toJpeg(cardRef.current, { quality: 0.9, pixelRatio: 2 });
            return dataUrl;
        } catch (err) {
            console.error('Failed to generate image', err);
            return null;
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownload = async () => {
        const dataUrl = await generateImage();
        if (dataUrl) {
            const link = document.createElement('a');
            link.download = 'jejak-nusantara-passport.jpg';
            link.href = dataUrl;
            link.click();
        }
    };

    const handleShare = async () => {
        const dataUrl = await generateImage();
        if (!dataUrl) return;

        try {
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], 'passport.jpg', { type: 'image/jpeg' });
            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: 'My Jejak Nusantara Passport',
                    text: `I've collected ${collected.length} stamps and reached ${rankName}!`,
                    files: [file]
                });
            } else {
                // Fallback to download if Web Share API doesn't support files
                handleDownload();
            }
        } catch (err) {
            console.error('Share failed', err);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full text-white hover:bg-white/40 transition-colors">
                <X size={24} />
            </button>

            {/* The Card to be exported */}
            <div 
                ref={cardRef}
                className="bg-batik-50 w-[320px] rounded-2xl shadow-2xl overflow-hidden relative border-4 border-batik-800"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23a14526\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
            >
                <div className="bg-batik-800 text-batik-50 p-4 text-center">
                    <h2 className="text-xl font-bold tracking-widest uppercase">Jejak Nusantara</h2>
                    <p className="text-xs text-batik-200">Digital Explorer Passport</p>
                </div>
                
                <div className="p-6 flex flex-col items-center">
                    <div className="w-20 h-20 bg-batik-100 rounded-full flex items-center justify-center mb-3 border-2 border-batik-600 overflow-hidden">
                        {user?.profilePicture ? (
                            <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" crossOrigin="anonymous" />
                        ) : (
                            <User size={40} className="text-batik-800" />
                        )}
                    </div>
                    <h3 className="text-xl font-bold text-batik-900">{user?.name || t.guest}</h3>
                    <p className="text-batik-600 font-medium mb-4">{rankName}</p>
                    
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-batik-100 w-full text-center mb-6">
                        <span className="block text-2xl font-bold text-batik-700">{collected.length}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">{t.stampsCollected}</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 w-full">
                        {recentStamps.map(stamp => {
                            const loc = LOCATIONS.find(l => l.id === stamp.locationId);
                            const imgSrc = stamp.customImage || `https://picsum.photos/seed/${stamp.locationId}/100/100`;
                            return (
                                <div key={stamp.locationId} className="aspect-square rounded-full overflow-hidden border-2 border-batik-700 bg-white">
                                    <img src={imgSrc} alt={loc?.name} className="w-full h-full object-cover" crossOrigin="anonymous" />
                                </div>
                            );
                        })}
                        {/* Fill empty slots if less than 8 */}
                        {Array.from({ length: Math.max(0, 8 - recentStamps.length) }).map((_, i) => (
                            <div key={`empty-${i}`} className="aspect-square rounded-full border-2 border-dashed border-batik-200 bg-batik-50/50"></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-4 w-[320px]">
                <button 
                    onClick={handleDownload}
                    disabled={isGenerating}
                    className="flex-1 py-3 bg-white text-batik-900 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50 transition-transform"
                >
                    <Download size={20} />
                    {isGenerating ? t.generating : t.download}
                </button>
                <button 
                    onClick={handleShare}
                    disabled={isGenerating}
                    className="flex-1 py-3 bg-batik-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50 transition-transform"
                >
                    <Share2 size={20} />
                    {isGenerating ? t.generating : t.shareToApps}
                </button>
            </div>
        </div>
    );
};

// --- Main App Component ---

export default function App() {
    const [state, setState] = useState<AppState>(() => {
        const saved = localStorage.getItem('jejak_nusantara_state');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.user === undefined) {
                    parsed.user = null;
                }
                return parsed;
            } catch (e) {
                console.error("Failed to parse state", e);
            }
        }
        return {
            collected: [],
            language: 'en',
            currentLocation: null,
            user: null
        };
    });

    const [activeTab, setActiveTab] = useState<Tab>('passport');
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [unlockingLocation, setUnlockingLocation] = useState<Location | null>(null);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const profilePicRef = useRef<HTMLInputElement>(null);

    // Save state on change (local fallback)
    useEffect(() => {
        try {
            localStorage.setItem('jejak_nusantara_state', JSON.stringify(state));
        } catch (e) {
            console.error("Failed to save state to localStorage.", e);
        }
    }, [state]);

    // Geolocation tracking
    useEffect(() => {
        if (state.isSpoofing) {
            setState(s => ({
                ...s,
                currentLocation: { lat: s.spoofLat || 0, lng: s.spoofLng || 0 }
            }));
            return;
        }

        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (pos) => {
                    setState(s => {
                        if (s.isSpoofing) return s;
                        return {
                            ...s,
                            currentLocation: { lat: pos.coords.latitude, lng: pos.coords.longitude }
                        };
                    });
                },
                (err) => console.warn("Geolocation error:", err),
                { enableHighAccuracy: true, maximumAge: 10000 }
            );
            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, [state.isSpoofing, state.spoofLat, state.spoofLng]);

    const t = TRANSLATIONS[state.language];

    const handleGoogleLogin = async () => {
        try {
            const user = await signInWithGoogle();
            if (user) {
                setState(s => ({
                    ...s,
                    user: {
                        uid: user.uid,
                        name: user.displayName || 'Explorer',
                        isGuest: false,
                        profilePicture: user.photoURL || undefined
                    }
                }));
            }
        } catch (e) {
            console.error("Google Login failed", e);
        }
    };

    const handleGuestLogin = () => {
        setState(s => ({
            ...s,
            user: {
                uid: 'guest-' + Date.now(),
                name: t.guest,
                isGuest: true,
                profilePicture: undefined
            }
        }));
    };

    const handleLogout = async () => {
        try {
            await firebaseLogout();
            setState(s => ({ ...s, user: null, collected: [] }));
            localStorage.removeItem('jejak_nusantara_state');
        } catch (e) {
            console.error("Logout failed", e);
        }
    };

    // Firestore Sync: Load data on login
    useEffect(() => {
        const loadCloudData = async () => {
            if (state.user && !state.user.isGuest) {
                try {
                    const cloudData = await loadPassportData(state.user.uid);
                    if (cloudData && cloudData.collectedStamps) {
                        setState(s => ({
                            ...s,
                            collected: cloudData.collectedStamps
                        }));
                    }
                } catch (e) {
                    console.error("Failed to load cloud data", e);
                }
            }
        };
        loadCloudData();
    }, [state.user?.uid]);

    // Firestore Sync: Save data on change
    useEffect(() => {
        const saveCloudData = async () => {
            if (state.user && !state.user.isGuest && state.collected.length > 0) {
                try {
                    await savePassportData(state.user.uid, state.collected);
                } catch (e) {
                    console.error("Failed to save cloud data", e);
                }
            }
        };
        saveCloudData();
    }, [state.collected, state.user?.uid]);

    const handleUnlock = useCallback(async (id: number) => {
        const loc = LOCATIONS.find(l => l.id === id);
        if (!loc || !state.currentLocation) return;
        
        try {
            const response = await fetch('/api/verify-location', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    locationId: id,
                    userLat: state.currentLocation.lat,
                    userLng: state.currentLocation.lng
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                setState(s => {
                    if (s.collected.some(c => c.locationId === id)) return s;
                    return {
                        ...s,
                        collected: [...s.collected, { locationId: id, timestamp: result.timestamp }]
                    };
                });
                setSelectedLocation(null);
                setUnlockingLocation(loc);
            } else {
                alert(result.error || "Verification failed");
            }
        } catch (error) {
            console.error("Unlock failed", error);
            alert("Network error during verification");
        }
    }, [state.currentLocation]);

    const handleImageUpload = useCallback(async (id: number, imageData: string) => {
        if (!state.user) return;

        try {
            let finalImageUrl = imageData;
            
            // If logged in as non-guest, upload to Firebase Storage
            if (!state.user.isGuest) {
                finalImageUrl = await uploadStampImage(state.user.uid, id, imageData);
            }

            setState(s => ({
                ...s,
                collected: s.collected.map(c => 
                    c.locationId === id ? { ...c, customImage: finalImageUrl } : c
                )
            }));
        } catch (error) {
            console.error("Failed to upload image", error);
            alert("Error saving image to cloud storage");
        }
    }, [state.user]);

    const handleProfilePicUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && state.user) {
            try {
                const resized = await resizeImage(file, 400, 400);
                let finalImageUrl = resized;

                if (!state.user.isGuest) {
                    // Reusing uploadStampImage with a special ID or creating a profile path
                    // For now, let's use a convention for profile pictures
                    const storageRef = ref(storage, `profiles/${state.user.uid}.jpg`);
                    await uploadString(storageRef, resized, 'data_url');
                    finalImageUrl = await getDownloadURL(storageRef);
                }

                setState(s => ({
                    ...s,
                    user: s.user ? { ...s.user, profilePicture: finalImageUrl } : null
                }));
            } catch (err) {
                console.error("Failed to resize/upload profile picture", err);
            }
        }
    };

    const toggleLanguage = () => {
        setState(s => ({ ...s, language: s.language === 'en' ? 'id' : 'en' }));
    };

    // Derived data
    const locationsWithDistance = useMemo(() => {
        if (!state.currentLocation) return LOCATIONS.map(l => ({ ...l, distance: undefined }));
        return LOCATIONS.map(l => ({
            ...l,
            distance: calculateDistance(state.currentLocation!.lat, state.currentLocation!.lng, l.lat, l.lng)
        })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }, [state.currentLocation]);

    const earnedBadges = useMemo(() => {
        const collectedIds = new Set(state.collected.map(c => c.locationId));
        return BADGES.filter(b => b.requiredIds.every(id => collectedIds.has(id)));
    }, [state.collected]);

    const rankKey = getRank(state.collected.length);
    const rankName = t.ranks[rankKey as keyof typeof t.ranks];

    // Login Screen
    if (!state.user) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center bg-batik-50 relative max-w-md mx-auto shadow-2xl overflow-hidden p-6">
                {/* Background Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23a14526\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
                
                <div className="relative z-10 w-full flex flex-col items-center animate-slide-up">
                    <div className="w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center mb-8 border-4 border-batik-600 animate-float">
                        <MapIcon size={48} className="text-batik-700" />
                    </div>
                    
                    <div className="text-center mb-12 opacity-0 animate-fade-in [animation-delay:200ms]">
                        <h1 className="text-4xl font-bold text-batik-900 mb-2">Jejak Nusantara</h1>
                        <p className="text-batik-600 font-medium">Your Digital Explorer Passport</p>
                    </div>
                    
                    <div className="w-full space-y-4 flex flex-col items-center opacity-0 animate-fade-in [animation-delay:400ms]">
                        <button 
                            onClick={handleGoogleLogin}
                            className="w-full py-4 bg-white text-gray-700 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all border border-gray-100 hover:bg-gray-50"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2449V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4749 19 23.7449 15.92 23.7449 12.27Z" fill="#4285F4"/>
                                <path d="M12.2449 24C15.4849 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8649 19.22 12.2449 19.22C9.12489 19.22 6.47489 17.11 5.52489 14.3H1.54489V17.38C3.52489 21.31 7.55489 24 12.2449 24Z" fill="#34A853"/>
                                <path d="M5.52489 14.3C5.27489 13.55 5.14489 12.75 5.14489 11.92C5.14489 11.09 5.27489 10.29 5.52489 9.54V6.46H1.54489C0.694894 8.1 0.214894 9.96 0.214894 11.92C0.214894 13.88 0.694894 15.74 1.54489 17.38L5.52489 14.3Z" fill="#FBBC05"/>
                                <path d="M12.2449 4.78C14.0049 4.78 15.5849 5.39 16.8249 6.57L20.2649 3.13C18.1949 1.14 15.4749 0 12.2449 0C7.55489 0 3.52489 2.69 1.54489 6.62L5.52489 9.7C6.47489 6.89 9.12489 4.78 12.2449 4.78Z" fill="#EA4335"/>
                            </svg>
                            {t.login}
                        </button>
                        
                        <div className="w-full flex items-center gap-4 my-2">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <span className="text-gray-400 text-xs font-bold tracking-widest">ATAU</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>

                        <button 
                            onClick={handleGuestLogin}
                            className="w-full py-4 bg-batik-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all hover:bg-batik-800"
                        >
                            <User size={20} />
                            {t.loginGuest}
                        </button>
                    </div>
                    
                    <p className="mt-12 text-[10px] text-gray-400 font-bold uppercase tracking-widest opacity-0 animate-fade-in [animation-delay:800ms]">
                        Indonesian Tourism Heritage
                    </p>
                </div>
            </div>
        );
    }

    // Views
    const renderPassport = () => (
        <div className="flex-1 overflow-y-auto pb-24 animate-fade-in">
            <div className="p-6 bg-batik-800 text-batik-50 shadow-md">
                <h1 className="text-3xl font-bold mb-1">Jejak Nusantara</h1>
                <p className="text-batik-200">{state.collected.length} / {LOCATIONS.length} {t.stampsCollected}</p>
            </div>
            <StampGrid 
                locations={LOCATIONS} 
                collected={state.collected} 
                onSelect={setSelectedLocation} 
            />
        </div>
    );

    const renderDiscovery = () => (
        <div className="flex-1 overflow-y-auto pb-24 bg-gray-50 animate-fade-in">
            <div className="p-4 bg-white shadow-sm sticky top-0 z-10 flex justify-between items-center">
                <h2 className="text-xl font-bold text-batik-900">{t.nearby}</h2>
            </div>
            <div className="p-4 space-y-4">
                {locationsWithDistance.slice(0, 20).map(loc => {
                    const collectedStamp = state.collected.find(c => c.locationId === loc.id);
                    const isCollected = !!collectedStamp;
                    const imgSrc = collectedStamp?.customImage || `https://picsum.photos/seed/${loc.id}/100/100`;

                    return (
                        <div 
                            key={loc.id} 
                            onClick={() => setSelectedLocation(loc)}
                            className={`bg-white p-4 rounded-2xl shadow-sm border flex gap-4 items-center cursor-pointer transition-all active:scale-[0.98]
                                ${isCollected ? 'border-batik-200 opacity-70' : 'border-transparent'}`}
                        >
                            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                                <img 
                                    src={imgSrc} 
                                    alt={loc.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 truncate">{loc.name}</h3>
                                <p className="text-sm text-gray-500 truncate">{loc.province}</p>
                                <div className="flex gap-2 mt-1">
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                        {loc.category}
                                    </span>
                                    {loc.distance !== undefined && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider bg-batik-50 text-batik-700 px-2 py-0.5 rounded-full">
                                            {loc.distance < 1 ? `${Math.round(loc.distance * 1000)}${t.m}` : `${loc.distance.toFixed(1)}${t.km}`}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {isCollected && <CheckCircle2 className="text-batik-600 shrink-0" size={24} />}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const renderCollections = () => (
        <div className="flex-1 overflow-y-auto pb-24 animate-fade-in">
            <div className="p-6 bg-batik-800 text-batik-50 shadow-md">
                <h1 className="text-2xl font-bold">{t.collections}</h1>
                <p className="text-batik-200">{earnedBadges.length} / {BADGES.length} {t.badgesEarned}</p>
            </div>
            <div className="p-4 space-y-4">
                {BADGES.map(badge => {
                    const collectedInBadge = badge.requiredIds.filter(id => state.collected.some(c => c.locationId === id)).length;
                    const totalInBadge = badge.requiredIds.length;
                    const isEarned = collectedInBadge === totalInBadge;
                    const progress = (collectedInBadge / totalInBadge) * 100;

                    return (
                        <div key={badge.id} className={`p-4 rounded-2xl border-2 transition-all
                            ${isEarned ? 'bg-batik-50 border-batik-500 shadow-md' : 'bg-white border-gray-100'}`}>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className={`font-bold text-lg ${isEarned ? 'text-batik-900' : 'text-gray-700'}`}>
                                        {badge.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {state.language === 'en' ? badge.descriptionEn : badge.descriptionId}
                                    </p>
                                </div>
                                {isEarned && <Award className="text-batik-600" size={28} />}
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between text-xs font-bold mb-1 text-gray-500">
                                    <span>Progress</span>
                                    <span>{collectedInBadge} / {totalInBadge}</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full transition-all duration-1000 ${isEarned ? 'bg-batik-600' : 'bg-batik-300'}`}
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const renderProfile = () => (
        <div className="flex-1 overflow-y-auto pb-24 bg-gray-50 animate-fade-in">
            <div className="p-8 bg-batik-800 text-batik-50 flex flex-col items-center justify-center text-center shadow-md">
                <h2 className="text-2xl font-bold mb-4">{state.user?.name || t.guest}</h2>
                <div className="relative">
                    <div 
                        className="w-24 h-24 bg-batik-100 rounded-full flex items-center justify-center mb-4 border-4 border-batik-600 overflow-hidden relative group cursor-pointer"
                        onClick={() => profilePicRef.current?.click()}
                    >
                        {state.user?.profilePicture ? (
                            <img src={state.user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User size={48} className="text-batik-800" />
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera size={24} className="text-white" />
                        </div>
                    </div>
                    <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        ref={profilePicRef} 
                        onChange={handleProfilePicUpload} 
                    />
                </div>
                <p className="text-batik-200 mb-1">{rankName}</p>
                <p className="text-batik-200 text-sm">{state.collected.length} {t.stampsCollected}</p>
            </div>

            <div className="p-6 space-y-6">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Settings size={20} /> Settings
                    </h3>
                    
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-700 font-medium">Language</span>
                        <button 
                            onClick={toggleLanguage}
                            className="px-4 py-1.5 bg-gray-100 rounded-full text-sm font-bold text-gray-700"
                        >
                            {state.language.toUpperCase()}
                        </button>
                    </div>

                    <div className="flex items-center justify-between py-3">
                        <span className="text-gray-700 font-medium">{t.logout}</span>
                        <button 
                            onClick={handleLogout}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>

                    {/* GPS Spoofing for Test Branch */}
                    <div className="flex flex-col gap-2 py-3 border-t border-gray-100 mt-2">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-700 font-medium">GPS Spoofing (Test)</span>
                            <button 
                                onClick={() => setState(s => ({ ...s, isSpoofing: !s.isSpoofing }))}
                                className={`px-4 py-1.5 rounded-full text-sm font-bold ${state.isSpoofing ? 'bg-batik-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                            >
                                {state.isSpoofing ? 'ON' : 'OFF'}
                            </button>
                        </div>
                        {state.isSpoofing && (
                            <div className="flex flex-col gap-2 mt-2">
                                <select 
                                    className="w-full p-2 border rounded-lg bg-white text-sm"
                                    onChange={(e) => {
                                        const loc = LOCATIONS.find(l => l.id === parseInt(e.target.value));
                                        if (loc) {
                                            setState(s => ({ ...s, spoofLat: loc.lat, spoofLng: loc.lng }));
                                        }
                                    }}
                                    defaultValue=""
                                >
                                    <option value="" disabled>-- Teleport to Location --</option>
                                    {LOCATIONS.map(loc => (
                                        <option key={loc.id} value={loc.id}>{loc.name} ({loc.province})</option>
                                    ))}
                                </select>
                                <div className="flex gap-2">
                                    <input 
                                        type="number" 
                                        value={state.spoofLat || ''}
                                        onChange={e => setState(s => ({ ...s, spoofLat: parseFloat(e.target.value) || 0 }))}
                                        placeholder="Lat"
                                        className="border rounded px-2 py-1 flex-1 w-full text-sm bg-gray-50"
                                        step="any"
                                    />
                                    <input 
                                        type="number" 
                                        value={state.spoofLng || ''}
                                        onChange={e => setState(s => ({ ...s, spoofLng: parseFloat(e.target.value) || 0 }))}
                                        placeholder="Lng"
                                        className="border rounded px-2 py-1 flex-1 w-full text-sm bg-gray-50"
                                        step="any"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <button 
                    onClick={() => setIsShareModalOpen(true)}
                    className="w-full py-4 bg-white border-2 border-batik-600 text-batik-700 rounded-xl font-bold flex items-center justify-center gap-2 active:bg-batik-50 transition-colors"
                >
                    <Share2 size={20} /> {t.share}
                </button>
            </div>
        </div>
    );

    return (
        <div className="h-full w-full flex flex-col bg-batik-50 relative max-w-md mx-auto shadow-2xl overflow-hidden">
            {/* Main Content Area */}
            {activeTab === 'passport' && renderPassport()}
            {activeTab === 'discovery' && renderDiscovery()}
            {activeTab === 'collections' && renderCollections()}
            {activeTab === 'profile' && renderProfile()}

            {/* Bottom Navigation */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center pb-safe pt-2 px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-30">
                {[
                    { id: 'passport', icon: Book, label: t.passport },
                    { id: 'discovery', icon: MapIcon, label: t.discovery },
                    { id: 'collections', icon: Award, label: t.collections },
                    { id: 'profile', icon: User, label: t.profile },
                ].map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as Tab)}
                            className={`flex flex-col items-center p-2 w-20 transition-colors
                                ${isActive ? 'text-batik-700' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'mb-1' : 'mb-1'} />
                            <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Modals & Overlays */}
            {selectedLocation && (
                <LocationModal
                    location={selectedLocation}
                    collectedStamp={state.collected.find(c => c.locationId === selectedLocation.id)}
                    lang={state.language}
                    onClose={() => setSelectedLocation(null)}
                    onUnlock={handleUnlock}
                    onImageUpload={handleImageUpload}
                    currentDistance={locationsWithDistance.find(l => l.id === selectedLocation.id)?.distance}
                />
            )}

            {unlockingLocation && (
                <UnlockCeremony 
                    location={unlockingLocation} 
                    onComplete={() => setUnlockingLocation(null)} 
                />
            )}

            {isShareModalOpen && (
                <ShareModal
                    user={state.user}
                    collected={state.collected}
                    rankName={rankName}
                    lang={state.language}
                    onClose={() => setIsShareModalOpen(false)}
                />
            )}
        </div>
    );
}
