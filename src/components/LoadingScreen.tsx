import { AppLoadingScreen } from './AppLoadingScreen';
import cyanLogo from '@/assets/legacy-logo/cyan.svg';

// Use the bundled cyan mark so the boot screen is independent of the
// optional public /logo folder.

interface LoadingScreenProps {
  onFinished: () => void;
}

export function LoadingScreen({ onFinished }: LoadingScreenProps) {
  return (
    <AppLoadingScreen
      name="Builder"
      description="Diseñá entrenamientos y planes de comidas con asistencia de IA."
      eyebrow="FIT LEGACY · WORKOUT BUILDER"
      logo={cyanLogo}
      logoAlt="Fit Legacy Builder"
      accent="#00b8c8"
      statusLines={['Cargando catálogo', 'Preparando canvas', 'Builder listo']}
      onFinished={onFinished}
    />
  );
}
