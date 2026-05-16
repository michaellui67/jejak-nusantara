export type Category = 'Heritage' | 'Nature' | 'Sacred' | 'Urban' | 'Hidden Gem';
export type Island = 'Java' | 'Bali' | 'Lombok' | 'Flores' | 'Sulawesi' | 'Sumatra' | 'Kalimantan' | 'Papua';

export interface Location {
    id: number;
    name: string;
    province: string;
    island: Island;
    category: Category;
    lat: number;
    lng: number;
    descriptionEn: string;
    descriptionId: string;
    tipsEn: string;
    tipsId: string;
}

export interface CollectedStamp {
    locationId: number;
    timestamp: number;
    customImage?: string;
}

export interface Badge {
    id: string;
    name: string;
    descriptionEn: string;
    descriptionId: string;
    requiredIds: number[];
}

export interface UserProfile {
    name: string;
    isGuest: boolean;
    profilePicture?: string;
}

export type Language = 'en' | 'id';
export type Tab = 'passport' | 'discovery' | 'collections' | 'profile';

export interface AppState {
    collected: CollectedStamp[];
    language: Language;
    currentLocation: { lat: number; lng: number } | null;
    user: UserProfile | null;
}

declare global {
    interface Window {
        google: any;
    }
}
