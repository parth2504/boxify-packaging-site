import { useState, useEffect, useCallback } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Group } from 'three';
import { useErrorTracking } from '../utils/errorTracking';

interface UseModelOptions {
  url: string;
  onLoad?: (model: Group) => void;
  onError?: (error: Error) => void;
}

interface UseModelReturn {
  model: Group | null;
  isLoading: boolean;
  error: Error | null;
  reset: () => void;
}

export const useModel = ({ url, onLoad, onError }: UseModelOptions): UseModelReturn => {
  const [model, setModel] = useState<Group | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { logError } = useErrorTracking();

  const loadModel = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const loader = new GLTFLoader();
      
      const gltf: GLTF = await new Promise((resolve, reject) => {
        loader.load(
          url,
          resolve,
          // Progress callback
          (progress) => {
            if (progress.lengthComputable) {
              const percentComplete = (progress.loaded / progress.total) * 100;
              console.debug(`Loading model: ${Math.round(percentComplete)}%`);
            }
          },
          reject
        );
      });

      const modelGroup = gltf.scene;
      
      // Apply default transformations
      modelGroup.scale.set(1, 1, 1);
      modelGroup.rotation.set(0, 0, 0);
      modelGroup.position.set(0, 0, 0);

      setModel(modelGroup);
      onLoad?.(modelGroup);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load model');
      setError(error);
      onError?.(error);
      logError({
        message: 'Failed to load 3D model',
        additionalInfo: { url },
        stack: error.stack
      });
    } finally {
      setIsLoading(false);
    }
  }, [url, onLoad, onError, logError]);

  const reset = useCallback(() => {
    setModel(null);
    setIsLoading(true);
    setError(null);
    loadModel();
  }, [loadModel]);

  useEffect(() => {
    loadModel();
  }, [loadModel]);

  return {
    model,
    isLoading,
    error,
    reset
  };
};