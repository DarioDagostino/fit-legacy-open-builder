import { useEffect, useState, type CSSProperties } from 'react';
import { localAssetUrl as assetUrl } from '../../lib/cdn';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { UiIcon } from '../UiIcon';

type Tip = {
  title: string;
  badge: string;
  body: string;
  detail: string;
  focusY: number;
};

const SABIAS_TIPS: Tip[] = [
  {
    title: 'Entrenamiento y nutrición, en un solo plan',
    badge: 'Plan integrado',
    body: 'Podés combinar ejercicios y comidas para construir una estrategia completa desde un mismo lugar.',
    detail: 'Alterná entre Exercises y Meals sin perder el contexto del plan que estás editando.',
    focusY: 16,
  },
  {
    title: 'Tu calendario se actualiza solo',
    badge: 'Planificación',
    body: 'Las rutinas guardadas quedan disponibles en el calendario junto con sus métricas principales.',
    detail: 'Así podés revisar la semana sin volver a cargar cada sesión manualmente.',
    focusY: 14,
  },
  {
    title: 'Compartí una rutina sin instalar nada',
    badge: 'Formato WIR',
    body: 'Cada plan puede convertirse en un enlace .wir para compartirlo con atletas o entrenadores.',
    detail: 'Quien recibe el enlace puede revisar la rutina completa directamente en el navegador.',
    focusY: 25,
  },
  {
    title: 'Legacito revisa la estructura del plan',
    badge: 'Coach IA',
    body: 'El coach analiza la distribución del entrenamiento y señala oportunidades de mejora.',
    detail: 'Usá sus observaciones como apoyo antes de publicar o asignar la rutina.',
    focusY: 12,
  },
  {
    title: 'El catálogo se adapta a tu forma de trabajar',
    badge: 'Personalización',
    body: 'Podés cambiar el fondo y el foco visual del catálogo sin alterar el contenido del plan.',
    detail: 'La configuración permanece disponible cuando volvés a Builder.',
    focusY: 18,
  },
  {
    title: 'Las notas conservan tus claves técnicas',
    badge: 'Ejecución',
    body: 'Cada ejercicio acepta indicaciones sobre técnica, carga, tempo o intención de la serie.',
    detail: 'Es una forma directa de mantener el criterio del entrenador dentro de la sesión.',
    focusY: 20,
  },
];

type BuilderProfile = 'woman' | 'man';

const PROFILE_TIP_IMAGES: Record<BuilderProfile, string[]> = {
  woman: [
    assetUrl('/assets_coach_tips/women_orange_energetico/athletic_woman_protein.webp'),
    assetUrl('/assets_coach_tips/women_orange_energetico/athletic_woman_confident_pose.webp'),
    assetUrl('/assets_coach_tips/women_orange_energetico/victory_jump_illustration.webp'),
    assetUrl('/assets_coach_tips/women_orange_energetico/confident_coach_standing.webp'),
    assetUrl('/assets_coach_tips/women_orange_energetico/athletic_woman_lunge_pose.webp'),
    assetUrl('/assets_coach_tips/women_orange_energetico/athletic_woman_squat.webp'),
  ],
  man: [
    assetUrl('/assets_coach_tips/man_orange_energetico/athletic_man_protein.webp'),
    assetUrl('/assets_coach_tips/man_orange_energetico/confident_athlete_standing.webp'),
    assetUrl('/assets_coach_tips/man_orange_energetico/dynamic_protein_celebration.webp'),
    assetUrl('/assets_coach_tips/man_orange_energetico/751897927_1376542741270294_1485225782041362540_n.webp'),
    assetUrl('/assets_coach_tips/man_orange_energetico/752514664_1665291831230549_680017816444529485_n.webp'),
    assetUrl('/assets_coach_tips/man_orange_energetico/759756342_1063792812889272_5857949442508654311_n.webp'),
  ],
};

export function SabiasQueBanner({ profile }: { profile: BuilderProfile }) {
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    document.body.classList.toggle('builder-tip-open', !dismissed);
    return () => document.body.classList.remove('builder-tip-open');
  }, [dismissed]);

  const nextTip = () => setIndex((current) => (current + 1) % SABIAS_TIPS.length);
  const previousTip = () => setIndex((current) => (current - 1 + SABIAS_TIPS.length) % SABIAS_TIPS.length);

  if (dismissed) {
    return (
      <motion.button
        type="button"
        className="builder-sq-restore"
        onClick={() => setDismissed(false)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        aria-label="Ver tips de Builder"
        title="Ver tips de Builder"
      >
        <UiIcon name="tips" size={16} active={false} />
        <span>Tips</span>
      </motion.button>
    );
  }

  const tip = SABIAS_TIPS[index];
  const tipImage = PROFILE_TIP_IMAGES[profile][index];
  const accent = profile === 'woman' ? '#ef7aa6' : '#d7a532';

  return (
    <motion.aside
      className="builder-sq-banner"
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 14, scale: 0.97 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Guía de Builder"
      style={{ '--builder-sq-accent': accent } as CSSProperties}
    >
      <div className="builder-sq-hero">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={`${profile}-${index}`}
            src={tipImage}
            alt=""
            className="builder-sq-hero-image"
            style={{ objectPosition: `50% ${tip.focusY}%` }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />
        </AnimatePresence>
        <div className="builder-sq-hero-overlay" />
        <div className="builder-sq-actions">
          <span className="builder-sq-counter">{index + 1}/{SABIAS_TIPS.length}</span>
          <button
            type="button"
            className="builder-sq-icon-button"
            onClick={() => setExpanded((current) => !current)}
            aria-label={expanded ? 'Minimizar tip' : 'Expandir tip'}
          >
            {expanded ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
          </button>
          <button
            type="button"
            className="builder-sq-icon-button builder-sq-close"
            onClick={() => setDismissed(true)}
            aria-label="Cerrar tip"
          >
            <UiIcon name="cancel-2" size={15} variant="duo" />
          </button>
        </div>
      </div>

      <div className="builder-sq-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={tip.title}
            className="builder-sq-header"
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.22 }}
          >
            <div className="builder-sq-lightbulb" aria-hidden="true">
              <UiIcon name="tips" size={18} active={expanded} />
            </div>
            <div className="builder-sq-header-text">
              <div className="builder-sq-meta">
                <span className="builder-sq-eyebrow">¿Sabías que?</span>
                <span className="builder-sq-badge">{tip.badge}</span>
              </div>
              <h4 className="builder-sq-title">{tip.title}</h4>
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              className="builder-sq-body"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={tip.body}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                  aria-live="polite"
                >
                  <div className="builder-sq-accent-line" />
                  <p className="builder-sq-body-main">{tip.body}</p>
                  <p className="builder-sq-body-detail">{tip.detail}</p>
                </motion.div>
              </AnimatePresence>

              <div className="builder-sq-nav" aria-label="Navegar tips">
                <button type="button" className="builder-sq-nav-button" onClick={previousTip} aria-label="Tip anterior">
                  <ChevronLeft size={13} />
                </button>
                <div className="builder-sq-dots" aria-label="Seleccionar tip">
                  {SABIAS_TIPS.map((_item, dotIndex) => (
                    <button
                      key={dotIndex}
                      type="button"
                      className={`builder-sq-dot${dotIndex === index ? ' is-active' : ''}`}
                      onClick={() => setIndex(dotIndex)}
                      aria-label={`Tip ${dotIndex + 1}`}
                      aria-current={dotIndex === index ? 'true' : undefined}
                    />
                  ))}
                </div>
                <button type="button" className="builder-sq-nav-button" onClick={nextTip} aria-label="Tip siguiente">
                  <ChevronRight size={13} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}
