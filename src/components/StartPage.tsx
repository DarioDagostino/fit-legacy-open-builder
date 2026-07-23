import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useMemo } from 'react';

const COLLAGE_IMAGES = [
  'athletic_woman_confident_pose.webp',
  'athletic_woman_lunge_pose.webp',
  'athletic_woman_protein.webp',
  'athletic_woman_squat.webp',
  'confident_athlete_standing.webp',
  'confident_coach_standing.webp',
  'dynamic_protein_celebration.webp',
  'victory_jump_illustration.webp',
  'athletic_man_protein.webp',
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function StartPage() {
  const navigate = useNavigate();

  const cells = useMemo(() => {
    const images = shuffle(COLLAGE_IMAGES);
    return images.map((img, i) => {
      const colSpan = i === 0 ? 'col-span-2 row-span-2' : i % 2 === 0 ? 'row-span-2' : '';
      const rotate = (Math.random() - 0.5) * 6;
      const align = ['self-start', 'self-center', 'self-end'][i % 3];
      return { img, colSpan, rotate, align };
    });
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0">
        <div className="grid h-full w-full grid-cols-3 gap-3 p-3 md:grid-cols-4 lg:grid-cols-5">
          {cells.map(({ img, colSpan, rotate, align }) => (
            <div
              key={img}
              className={`relative overflow-hidden rounded-2xl opacity-60 saturate-[1.1] ${colSpan} ${align}`}
              style={{ transform: `rotate(${rotate}deg)` }}
            >
              <img
                src={`/assets/templates/${img}`}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0)_0%,rgba(10,10,10,0.55)_55%,rgba(10,10,10,0.75)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]/80" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto w-full max-w-lg px-5 text-center"
      >
        <h1 className="mb-3 font-['Montserrat',sans-serif] text-4xl font-black uppercase leading-[1.02] tracking-[-0.04em] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
          Arranca de cero
        </h1>
        <p className="mb-10 text-base leading-relaxed text-[#9CA0A6] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
          No hay plan cargado. Empeza desde el builder y deja que Legacito te guie paso a paso.
        </p>

        <div className="mb-10 space-y-3">
          {[
            'Agrega ejercicios del catalogo o pedilos por chat',
            'Ajusta series, reps y peso a tu medida',
            'Legacito te sugiere variantes y corrige el plan',
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/[0.08] bg-black/40 px-5 py-3.5 text-left backdrop-blur-md">
              <span className="text-sm font-medium text-[#C8C0B2] drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">{item}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/build?start=1')}
          className="group w-full cursor-pointer rounded-2xl border border-[#D4AF37]/30 px-6 py-5 text-sm font-black uppercase tracking-widest shadow-[0_0_40px_rgba(212,175,55,0.12)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(212,175,55,0.30)] hover:border-[#D4AF37]/50"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.18), rgba(212,175,55,0.06))',
            color: '#D4AF37',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,175,55,0.28), rgba(212,175,55,0.12))'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,175,55,0.18), rgba(212,175,55,0.06))'}
        >
          <span className="flex items-center justify-center gap-3">
            Ir al builder
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        <p className="mt-4 text-xs text-[#6E6558] drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
          No necesitas registrarte para arrancar
        </p>
      </motion.div>
    </div>
  );
}
