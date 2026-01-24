import { useEffect, useState } from 'react';

export function useResourceLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const images = Array.from(document.querySelectorAll('img'));
    const totalImages = images.length;
    let loadedImages = 0;

    if (totalImages === 0) {
      setIsLoading(false);
      setProgress(100);
      return;
    }

    const updateProgress = () => {
      loadedImages++;
      const newProgress = Math.round((loadedImages / totalImages) * 100);
      setProgress(newProgress);

      if (loadedImages === totalImages) {
        // Small delay to ensure smooth transition
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        updateProgress();
      } else {
        img.addEventListener('load', updateProgress);
        img.addEventListener('error', updateProgress);
      }
    });

    // Fallback timeout
    const timeout = setTimeout(() => {
      setIsLoading(false);
      setProgress(100);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      images.forEach((img) => {
        img.removeEventListener('load', updateProgress);
        img.removeEventListener('error', updateProgress);
      });
    };
  }, []);

  return { isLoading, progress };
}

