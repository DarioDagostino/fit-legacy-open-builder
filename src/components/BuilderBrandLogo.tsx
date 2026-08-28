import { localAssetUrl } from '../lib/cdn';

const BUILDER_HEADER_LOGO = localAssetUrl('/logo/logo_builder_app_cyan_header.svg');

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
      src={BUILDER_HEADER_LOGO}
      alt={alt}
      className={className}
      draggable={false}
    />
  );
}
