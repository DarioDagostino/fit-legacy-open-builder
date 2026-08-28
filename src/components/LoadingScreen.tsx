import { AppLoadingScreen } from './AppLoadingScreen';
import { localAssetUrl } from '../lib/cdn';

const builderUrlLogo = localAssetUrl('/logo/logo_builder_app_cyan_url.svg');

interface LoadingScreenProps {
  onFinished: () => void;
}

export function LoadingScreen({ onFinished }: LoadingScreenProps) {
  return (
    <AppLoadingScreen
      name="Builder"
      description="Diseñá entrenamientos y planes de comidas con asistencia de IA."
      eyebrow="FIT LEGACY · WORKOUT BUILDER"
      logo={builderUrlLogo}
      logoAlt="Fit Legacy Builder"
      accent="#00b8c8"
      statusLines={['Cargando catálogo', 'Preparando canvas', 'Builder listo']}
      onFinished={onFinished}
    />
  );
}
