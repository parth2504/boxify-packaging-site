import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export function useModel(url: string, maxRetries = 3) {
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [modelUrl, setModelUrl] = useState(url);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const response = await fetch(modelUrl);
        if (!response.ok) {
          throw new Error(`Failed to load model: ${response.statusText}`);
        }
        
        // If successful, preload the model
        await useGLTF.preload(modelUrl);
        setError(null);
        
      } catch (err) {
        console.error(`Model loading error (attempt ${retryCount + 1}/${maxRetries}):`, err);
        
        if (retryCount < maxRetries) {
          // Try alternative URL if initial fails
          if (retryCount === 0 && modelUrl === '/model.glb') {
            setModelUrl('/src/assets/boxmodel.glb');
          }
          setRetryCount(prev => prev + 1);
        } else {
          setError(err as Error);
        }
      }
    };

    if (retryCount < maxRetries && error) {
      const timer = setTimeout(loadModel, 1000 * retryCount); // Exponential backoff
      return () => clearTimeout(timer);
    }
  }, [modelUrl, retryCount, maxRetries, error]);

  return {
    modelUrl,
    error,
    isLoading: retryCount < maxRetries && error !== null
  };
}