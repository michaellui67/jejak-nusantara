import React, { useState, useEffect } from 'react';
import { X, MapPin, Wifi, AlertTriangle } from 'lucide-react';
import { calculateDistance, detectMockLocation } from '../utils';

interface LocationVerificationModalProps {
  location: any;
  currentLocation: { lat: number; lng: number } | null;
  onClose: () => void;
  onVerify: () => void;
  lang: 'en' | 'id';
}

const LocationVerificationModal: React.FC<LocationVerificationModalProps> = ({
  location,
  currentLocation,
  onClose,
  onVerify,
  lang
}) => {
  const [distance, setDistance] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [mockDetectionResult, setMockDetectionResult] = useState<boolean | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const t = {
    en: {
      verifying: 'Verifying Location...',
      distance: 'Distance to Location:',
      withinRange: '✓ Within 100m Range',
      outsideRange: '✗ Outside 100m Range',
      spoofingDetected: '⚠ Spoofing Detected',
      normalLocation: '✓ Normal Location',
      verify: 'Verify Location',
      close: 'Close',
      gpsStatus: 'GPS Status',
      accuracy: 'Accuracy:',
      lastUpdate: 'Last Update:',
      unlock: 'Unlock Stamp'
    },
    id: {
      verifying: 'Memverifikasi Lokasi...',
      distance: 'Jarak ke Lokasi:',
      withinRange: '✓ Dalam Jangkauan 100m',
      outsideRange: '✗ Di Luar Jangkauan 100m',
      spoofingDetected: '⚠ Pemalsuan Terdeteksi',
      normalLocation: '✓ Lokasi Normal',
      verify: 'Verifikasi Lokasi',
      close: 'Tutup',
      gpsStatus: 'Status GPS',
      accuracy: 'Akurasi:',
      lastUpdate: 'Pembaruan Terakhir:',
      unlock: 'Buka Stempel'
    }
  }[lang];

  useEffect(() => {
    if (!currentLocation) return;
    
    const calculatedDistance = calculateDistance(
      currentLocation.lat,
      currentLocation.lng,
      location.lat,
      location.lng
    );
    
    setDistance(calculatedDistance);
    
    // Check if within 100m (0.1km)
    const isWithinRange = calculatedDistance <= 0.1;
    setIsVerified(isWithinRange);
    
    // Mock location detection
    const mockDetected = detectMockLocation(
      currentLocation,
      null, // Previous location - for demo purposes
      Date.now()
    );
    
    setMockDetectionResult(mockDetected);
    setLastUpdate(new Date());
    setIsChecking(false);
  }, [currentLocation, location]);

  const handleVerify = () => {
    if (isVerified && !mockDetectionResult) {
      onVerify();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 bg-batik-800 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">{t.verify}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6 p-4 bg-batik-50 rounded-xl border border-batik-200">
            <div className="w-12 h-12 bg-batik-600 rounded-full flex items-center justify-center">
              <MapPin size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{location.name}</h3>
              <p className="text-sm text-gray-600">{location.province}, {location.island}</p>
            </div>
          </div>
          
          {isChecking ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-batik-600 mb-4"></div>
              <p className="text-gray-600">{t.verifying}</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Wifi size={16} className="text-batik-600" />
                    <span className="font-medium">{t.gpsStatus}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${isVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {isVerified ? t.withinRange : t.outsideRange}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{t.distance}</span>
                  <span className="font-bold text-batik-700">
                    {distance !== null ? (
                      distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(2)}km`
                    ) : 'Calculating...'}
                  </span>
                </div>
                
                {mockDetectionResult !== null && (
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={16} className="text-red-600" />
                      <span className="font-medium">Spoofing Detection</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${mockDetectionResult ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {mockDetectionResult ? t.spoofingDetected : t.normalLocation}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{t.accuracy}</span>
                  <span className="text-sm text-gray-600">High Precision</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{t.lastUpdate}</span>
                  <span className="text-sm text-gray-600">
                    {lastUpdate ? lastUpdate.toLocaleTimeString() : 'N/A'}
                  </span>
                </div>
              </div>
              
              <button
                onClick={handleVerify}
                disabled={!isVerified || mockDetectionResult}
                className={`w-full py-3 rounded-xl font-bold transition-all shadow-md ${isVerified && !mockDetectionResult 
                  ? 'bg-batik-600 text-white hover:bg-batik-700 active:scale-95' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                {t.unlock}
              </button>
              
              {!isVerified && (
                <p className="text-center text-xs text-red-500 mt-2">
                  You must be within 100m to unlock this stamp.
                </p>
              )}
              
              {mockDetectionResult && (
                <p className="text-center text-xs text-red-500 mt-2">
                  ⚠ Location spoofing detected. Please ensure your GPS is accurate.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationVerificationModal;