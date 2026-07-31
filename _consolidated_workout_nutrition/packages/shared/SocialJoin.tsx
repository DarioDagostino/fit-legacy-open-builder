export const FIT_LEGACY_SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://www.instagram.com/fitlegacy.company', icon: InstagramIcon },
  { name: 'TikTok', href: 'https://www.tiktok.com/@fitlegacy.company', icon: TikTokIcon },
  { name: 'YouTube', href: 'https://www.youtube.com/@FitLegacyAcademy', icon: YouTubeIcon },
  { name: 'Reddit', href: 'https://www.reddit.com/r/FitLegacy/', icon: RedditIcon },
];

interface SocialJoinProps {
  className?: string;
  title?: string;
  variant?: 'light' | 'dark';
  align?: 'left' | 'center';
  compact?: boolean;
}

export function SocialJoin({
  className = '',
  title = 'Únete',
  variant = 'light',
  align = 'left',
  compact = false,
}: SocialJoinProps) {
  const isDark = variant === 'dark';

  return (
    <div className={className}>
      <h4
        className={[
          `${compact ? 'mb-2' : 'mb-5'} text-xs font-bold uppercase tracking-[0.15em] font-sans`,
          align === 'center' ? 'text-center' : '',
          isDark ? 'text-white/45' : 'text-neutral-400',
        ].filter(Boolean).join(' ')}
      >
        {title}
      </h4>
      <div className={['flex gap-3', align === 'center' ? 'justify-center' : ''].filter(Boolean).join(' ')}>
        {FIT_LEGACY_SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              `${compact ? 'h-8 w-8' : 'h-9 w-9'} flex items-center justify-center rounded-xl transition-all duration-200`,
              isDark
                ? 'border border-white/10 bg-white/[0.055] text-white/45 shadow-[0_10px_28px_rgba(0,0,0,0.18)] hover:border-white/20 hover:bg-white/[0.09] hover:text-white'
                : 'border border-black/[0.08] bg-white text-neutral-400 shadow-sm hover:border-black/20 hover:text-[#0A0A0A]',
            ].join(' ')}
            title={name}
            aria-label={name}
          >
            <Icon className="h-[15px] w-[15px]" />
          </a>
        ))}
      </div>
    </div>
  );
}

function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function YouTubeIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 8.5a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3v-7Z" />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function RedditIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4.5a2.5 2.5 0 1 0 2.5 2.5c0-.14-.02-.27-.05-.4l1.3-.77.25.77a2.5 2.5 0 1 0 2.5-2.5 2.5 2.5 0 0 0-2.3 3.5l-.56-1.72a.5.5 0 0 0-.61-.32l-1.92 1.14c-1.3-.8-2.9-1.3-4.7-1.4l.73-3.04a.5.5 0 0 0-.38-.6L10.5 2 9 6.5a2.5 2.5 0 0 0-3 2.5A2.5 2.5 0 0 0 8.5 11.5c1.4 0 2.6-.77 3.3-1.9a17.2 17.2 0 0 0 6.4 1.4c0 3.3-2.8 6-6.2 6s-6.2-2.7-6.2-6c0-1.2.34-2.32.93-3.25" />
      <circle cx="9" cy="13" r=".5" fill="currentColor" />
      <circle cx="15" cy="13" r=".5" fill="currentColor" />
      <path d="M10 16.5c.5.5 1.2.8 2 .8s1.5-.3 2-.8" />
    </svg>
  );
}
