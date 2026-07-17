import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function StartPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-5">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-lg"
      >
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-500/20 bg-cyan-500/10">
            <Sparkles className="h-7 w-7 text-cyan-400" />
          </div>
        </div>

        <h1 className="mb-3 text-center text-4xl font-black uppercase leading-[1.02] tracking-[-0.04em] text-white">
          Arranca de cero
        </h1>
        <p className="mb-8 text-center text-base leading-relaxed text-neutral-400">
          No hay plan cargado. Empeza desde el builder y deja que Legacito te guie paso a paso.
        </p>

        <div className="mb-10 space-y-3">
          {[
            'Agrega ejercicios del catalogo o pedilos por chat',
            'Ajusta series, reps y peso a tu medida',
            'Legacito te sugiere variantes y corrige el plan',
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
              <span className="text-sm font-medium text-neutral-300">{item}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/build?start=1')}
          className="w-full cursor-pointer rounded-2xl bg-cyan-500/10 px-6 py-4 text-sm font-black uppercase tracking-widest text-cyan-300 transition-all hover:bg-cyan-500/20"
        >
          Ir al builder
        </button>

        <p className="mt-4 text-center text-xs text-neutral-500">
          No necesitas registrarte para arrancar
        </p>
      </motion.div>
    </div>
  );
}
