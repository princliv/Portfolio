import { useResourceLoader } from '@/hooks/useResourceLoader';
import { LoadingSpinner } from './LoadingSpinner';

export function AppLoader() {
  const { isLoading, progress } = useResourceLoader();

  if (!isLoading) return null;

  return <LoadingSpinner progress={progress} />;
}

