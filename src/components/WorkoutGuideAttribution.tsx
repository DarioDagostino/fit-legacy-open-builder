export function WorkoutGuideAttribution({ className = '' }: { className?: string }) {
  return (
    <p className={`text-[11px] leading-relaxed text-white/45 ${className}`}>
      Ilustraciones de ejercicios por{' '}
      <a href="https://bryllim.com" target="_blank" rel="noreferrer" className="underline decoration-white/20 underline-offset-2 hover:text-white/70">
        Bryl Lim
      </a>{' '}
      (<a href="https://github.com/bryllim/workout-guide" target="_blank" rel="noreferrer" className="underline decoration-white/20 underline-offset-2 hover:text-white/70">
        Workout Guide
      </a>
      ) +{' '}
      <a href="https://github.com/everkinetic/data" target="_blank" rel="noreferrer" className="underline decoration-white/20 underline-offset-2 hover:text-white/70">
        Everkinetic
      </a>{' '}
      —{' '}
      <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer" className="underline decoration-white/20 underline-offset-2 hover:text-white/70">
        CC BY-SA 4.0
      </a>
      . Sin cambios al SVG original; derivados bajo la misma licencia.
    </p>
  );
}
