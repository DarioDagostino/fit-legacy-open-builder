import cyanLogoUrl from '@/assets/legacy-logo/cyan.svg';

type BuilderBrandLogoProps = {
  className?: string;
  alt?: string;
};

export function BuilderBrandLogo({
  className = 'h-full w-full object-contain',
  alt = 'Fit Legacy Builder',
}: BuilderBrandLogoProps) {
  return (
    <img
      src={cyanLogoUrl}
      alt={alt}
      className={className}
      draggable={false}
    />
  );
}
