import React from 'react';

interface BatikIllustrationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const BatikIllustration: React.FC<BatikIllustrationProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      {/* Main batik shape */}
      <div className="absolute inset-0 bg-gradient-to-br from-batik-600 to-batik-800 rounded-full flex items-center justify-center">
        {/* Batik pattern */}
        <div className="absolute inset-2 bg-gradient-to-br from-batik-400 to-batik-600 rounded-full"></div>
        
        {/* Central motif */}
        <div className="absolute w-8 h-8 bg-batik-200 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-batik-700 rounded-full"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-batik-300 rounded-full"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 bg-batik-300 rounded-full"></div>
        <div className="absolute top-2 right-2 w-3 h-3 bg-batik-300 rounded-full"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 bg-batik-300 rounded-full"></div>
      </div>
      
      {/* Outer ring */}
      <div className="absolute inset-0 border-2 border-batik-300 rounded-full"></div>
    </div>
  );
};

export default BatikIllustration;