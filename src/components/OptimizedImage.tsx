import { useState, useRef } from 'react';
import type { FC } from 'react';
import './OptimizedImage.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

const OptimizedImage: FC<OptimizedImageProps> = ({ src, alt, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoaded(false);
    setHasError(true);
    console.error(`Failed to load image: ${src}`);
  };

  return (
    <div className={`optimized-image-container ${className}`}>
      {(!isLoaded && !hasError) && <div className="skeleton-loader" />}
      {hasError && (
        <div className="skeleton-loader error" style={{ background: '#f5f2ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#b5a692', fontSize: '0.8rem' }}>Image unavailable</span>
        </div>
      )}
      <img
        ref={imgRef}
        key={src} // Force re-mount on src change
        src={src}
        alt={alt}
        decoding="async"
        className={`optimized-image ${isLoaded ? 'loaded' : 'loading'} ${hasError ? 'error' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default OptimizedImage;