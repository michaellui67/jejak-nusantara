import React, { useState, useEffect } from 'react';
import { calculateDistance, detectMockLocation } from '../utils';

interface GPSVerificationProps {
  currentLocation: { lat: number; lng: number } | null;
  targetLocation: { lat: number; lng: number };
  onLocationVerified: (verified: boolean) => void;
  onDistanceChanged?: (distance: number) => void;
}

const GPSVerification: React.FC<GPSVerificationProps> = ({
  currentLocation,
  targetLocation,
  onLocationVerified,
  onDistanceChanged
}) => {
  const [distance, setDistance] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [mockDetectionResult, setMockDetectionResult] = useState<boolean | null>(null);

  useEffect(() => {
    if (!currentLocation) return;
    
    const calculatedDistance = calculateDistance(
      currentLocation.lat,
      currentLocation.lng,
      targetLocation.lat,
      targetLocation.lng
    );
    
    setDistance(calculatedDistance);
    onDistanceChanged?.(calculatedDistance);
    
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
    
    // If we're within range, verify
    if (isWithinRange) {
      onLocationVerified(true);
    } else {
      onLocationVerified(false);
    }
    
    setIsChecking(false);
  }, [currentLocation, targetLocation, onLocationVerified, onDistanceChanged]);

  if (isChecking) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-batik-600 mb-2"></div>
        <p className="text-gray-600">Verifying location...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Distance to location:</span>
        <span className="text-sm font-bold text-batik-700">
          {distance !== null ? (
            distance < 1 ? `${Math.round(distance * 1000)}m` : `${distance.toFixed(2)}km`
          ) : 'Calculating...'}
        </span>
      </div>
      
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Verification Status:</span>
        <span className={`text-sm font-bold ${isVerified ? 'text-green-600' : 'text-red-600'}`}>
          {isVerified ? '✓ Verified' : '✗ Not Verified'}
        </span>
      </div>
      
      {mockDetectionResult !== null && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Spoofing Detection:</span>
          <span className={`text-sm font-bold ${mockDetectionResult ? 'text-red-600' : 'text-green-600'}`}>
            {mockDetectionResult ? '⚠ Suspicious Activity' : '✓ Normal'}
          </span>
        </div>
      )}
      
      {!isVerified && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            You must be within 100 meters of the location to unlock this stamp.
          </p>
        </div>
      )}
      
      {mockDetectionResult && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">
            ⚠ Location spoofing detected. Please ensure your GPS is accurate.
          </p>
        </div>
      )}
    </div>
  );
};

export default GPSVerification;