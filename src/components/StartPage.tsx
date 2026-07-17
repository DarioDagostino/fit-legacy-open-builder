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

export function StartPage() {
  const navigate = useNavigate();

  const shuffled = useMemo(() => {
    const arr = [...COLLAGE_IMAGES];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0">
        <div className="grid h-full w-full grid-cols-3 gap-2 p-2 md:grid-cols-4 lg:grid-cols-5">
          {shuffled.map((img, i) => (
            <div
              key={img}
              className="relative overflow-hidden rounded-2xl opacity-30"
              style={{
                gridRow: i % 2 === 0 ? 'span 2' : 'span 1',
                alignSelf: i % 3 === 0 ? 'end' : 'start',
              }}
            >
              <img
                src={`/assets/templates/${img}`}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0.30)_0%,rgba(10,10,10,0.85)_60%,rgba(10,10,10,0.95)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto w-full max-w-lg px-5 text-center"
      >
        <h1 className="mb-3 font-['Montserrat',sans-serif] text-4xl font-black uppercase leading-[1.02] tracking-[-0.04em] text-white">
          Arranca de cero
        </h1>
        <p className="mb-10 text-base leading-relaxed text-[#A79A87]">
          No hay plan cargado. Empeza desde el builder y deja que Legacito te guie paso a paso.
        </p>

        <div className="mb-10 space-y-3">
          {[
            'Agrega ejercicios del catalogo o pedilos por chat',
            'Ajusta series, reps y peso a tu medida',
            'Legacito te sugiere variantes y corrige el plan',
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-5 py-3.5 text-left backdrop-blur-sm">
              <span className="text-sm font-medium text-[#B0A89A]">{item}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/build?start=1')}
          className="group w-full cursor-pointer rounded-2xl border border-[#D4AF37]/25 px-6 py-5 text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.10)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(212,175,55,0.25)]"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
            color: '#D4AF37',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,175,55,0.25), rgba(212,175,55,0.10))'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))'}
        >
          <span className="flex items-center justify-center gap-3">
            Ir al builder
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>

        <p className="mt-4 text-xs text-[#6E6558]">
          No necesitas registrarte para arrancar
        </p>
      </motion.div>
    </div>
  );
}
