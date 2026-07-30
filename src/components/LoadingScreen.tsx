import { AppLoadingScreen } from './AppLoadingScreen';
import cyanLogo from '@/assets/legacy-logo/cyan.svg';

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
