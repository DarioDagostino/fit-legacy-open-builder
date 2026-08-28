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
  cta?: string;
  ctaTarget?: BuilderTipTarget;
};

type BuilderTipTarget = 'home' | 'build' | 'train' | 'oneRm' | 'timer' | 'food' | 'catalog' | 'draft' | 'calendar' | 'export' | 'coach';
export type BuilderTipContext = 'home' | 'plan' | 'catalog' | 'draft' | 'meals' | 'train' | 'oneRm' | 'timer' | 'calendar' | 'export' | 'coach';

const CONTEXT_TIPS: Record<BuilderTipContext, Tip[]> = {
  home: [
    { title: 'Elegí una sola acción para empezar', badge: 'Hoy', body: 'Desde Hoy podés abrir tu plan, cargar ejercicios o entrar directo a la sesión.', detail: 'Una decisión clara reduce el ruido antes de entrenar.', focusY: 16, cta: 'Abrir mi plan', ctaTarget: 'build' },
    { title: 'Tu día se ordena desde el primer paso', badge: 'Punto de partida', body: 'Builder reúne tu sesión, tu rutina y tus comidas en un mismo recorrido.', detail: 'El progreso aparece cuando una acción queda registrada.', focusY: 14, cta: 'Ver calendario', ctaTarget: 'calendar' },
  ],
  plan: [
    { title: 'Un día puede tener muchos ejercicios', badge: 'Mi plan', body: 'Armá cada día con varios movimientos y ajustá series, repeticiones y carga antes de confirmar.', detail: 'El resumen solo muestra lo guardado; la edición vive en el borrador.', focusY: 18, cta: 'Abrir catálogo', ctaTarget: 'catalog' },
    { title: 'Editar no cambia tu plan por accidente', badge: 'Control', body: 'Los cambios se mantienen como borrador hasta que confirmás la composición completa.', detail: 'Podés quitar, reordenar o volver al catálogo sin perder lo guardado.', focusY: 20, cta: 'Editar rutina', ctaTarget: 'catalog' },
  ],
  catalog: [
    { title: 'Seleccioná sin cerrar el catálogo', badge: 'Ejercicios', body: 'Tocá varios ejercicios para preparar el Día 1 y revisalos desde la bandeja superior.', detail: 'La selección queda local hasta que confirmás el borrador.', focusY: 18, cta: 'Revisar borrador', ctaTarget: 'draft' },
    { title: 'El foco filtra, no borra', badge: 'Catálogo', body: 'Usá los filtros por grupo muscular para encontrar variantes sin abandonar la composición.', detail: 'Cambiar el foco conserva todos los elementos ya seleccionados.', focusY: 22, cta: 'Ver mi plan', ctaTarget: 'build' },
  ],
  draft: [
    { title: 'Confirmá la composición completa', badge: 'Borrador', body: 'Este es el lugar para definir nombre, día, hora, series, repeticiones y carga.', detail: 'Nada entra en tu plan hasta tocar Confirmar.', focusY: 20, cta: 'Volver al catálogo', ctaTarget: 'catalog' },
    { title: 'Ordená el estímulo antes de guardar', badge: 'Secuencia', body: 'Reordená los ejercicios para que la sesión tenga una intención clara.', detail: 'La posición también comunica prioridades dentro del entrenamiento.', focusY: 16, cta: 'Abrir mi plan', ctaTarget: 'build' },
  ],
  meals: [
    { title: 'Hasta seis comidas, cada una con horario', badge: 'Meals', body: 'Desayuno, media mañana, almuerzo, pre, post y cena viven como composiciones separadas.', detail: 'Cada slot puede tener varios ingredientes y una hora propia.', focusY: 16, cta: 'Agregar comida', ctaTarget: 'food' },
    { title: 'Los macros pertenecen a la comida completa', badge: 'Rendimiento', body: 'Al sumar ingredientes, Meals calcula calorías, proteína, carbohidratos y grasas del slot.', detail: 'Así decidís por el total del día, no por alimentos aislados.', focusY: 22, cta: 'Ver mi plan', ctaTarget: 'food' },
  ],
  train: [
    { title: 'Registrar una serie convierte esfuerzo en evidencia', badge: 'Entrenar', body: 'Completá la sesión y guardá lo que realmente pasó, no solo lo que estaba previsto.', detail: 'Ese registro alimenta tu calendario y las lecturas de Analytics.', focusY: 20, cta: 'Abrir Timer', ctaTarget: 'timer' },
    { title: 'La técnica también cuenta', badge: 'Ejecución', body: 'Usá las notas del ejercicio para recordar tempo, intención y ajustes entre series.', detail: 'Una sesión precisa deja mejores señales para la próxima decisión.', focusY: 18, cta: 'Abrir mi plan', ctaTarget: 'build' },
  ],
  oneRm: [
    { title: 'El 1RM es una referencia, no una orden', badge: 'Fuerza', body: 'Compará métodos y elegí el cálculo que mejor describe tu serie real.', detail: 'La carga sugerida sirve para planificar; no reemplaza cómo te sentís hoy.', focusY: 20, cta: 'Volver a entrenar', ctaTarget: 'train' },
    { title: 'Las series de aproximación preparan el intento', badge: 'Calentamiento', body: 'Tu arsenal de carga organiza porcentajes y repeticiones antes de la serie efectiva.', detail: 'Subí la carga con criterio y conservá margen para ejecutar bien.', focusY: 14, cta: 'Ver mi plan', ctaTarget: 'build' },
  ],
  timer: [
    { title: 'El descanso también se entrena', badge: 'Timer', body: 'Elegí un intervalo que acompañe el objetivo de la serie: fuerza, hipertrofia o técnica.', detail: 'El aro muestra el tiempo restante; el ajuste rápido evita perder ritmo.', focusY: 16, cta: 'Volver a entrenar', ctaTarget: 'train' },
    { title: 'Cronometrá lo que después querés mejorar', badge: 'Ritmo', body: 'El cronógrafo registra la duración real de la sesión y el timer ordena cada pausa.', detail: 'Medir el tiempo vuelve comparable tu esfuerzo semana a semana.', focusY: 22, cta: 'Abrir calendario', ctaTarget: 'calendar' },
  ],
  calendar: [
    { title: 'Cada confirmación aparece en el calendario', badge: 'Registro', body: 'Rutinas y comidas guardadas se agrupan por día, fecha y hora.', detail: 'El calendario es la memoria compartida entre Builder y Analytics.', focusY: 16, cta: 'Abrir mi plan', ctaTarget: 'build' },
    { title: 'Buscá patrones, no días perfectos', badge: 'Constancia', body: 'Una semana útil se construye con señales repetidas: sesiones, descansos y comidas.', detail: 'Volvé al próximo paso y dejá que la tendencia se forme.', focusY: 20, cta: 'Entrenar ahora', ctaTarget: 'train' },
  ],
  export: [
    { title: 'El formato WIR conserva tu estructura', badge: 'Compartir', body: 'Rutina, ejercicios, comidas y metadatos viajan en una copia editable.', detail: 'Quien recibe el enlace puede revisar el plan sin instalar nada.', focusY: 20, cta: 'Abrir mi plan', ctaTarget: 'build' },
    { title: 'Compartir también es parte del plan', badge: 'Coach', body: 'Prepará una vista clara antes de enviar tu rutina a un atleta o entrenador.', detail: 'La información importante queda visible y ordenada.', focusY: 18, cta: 'Entrenar ahora', ctaTarget: 'train' },
  ],
  coach: [
    { title: 'Legacito explica antes de proponer', badge: 'Coach IA', body: 'La lectura toma tu plan, tu sesión y tus registros recientes como contexto.', detail: 'Usá la recomendación como apoyo; la confirmación siempre queda en tus manos.', focusY: 14, cta: 'Editar mi plan', ctaTarget: 'build' },
    { title: 'Una señal útil termina en una acción', badge: 'Decisión', body: 'Convertí la observación del coach en una modificación concreta del entrenamiento.', detail: 'Podés volver al borrador sin perder el razonamiento.', focusY: 22, cta: 'Abrir mi plan', ctaTarget: 'build' },
  ],
};

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

export function SabiasQueBanner({ profile, context = 'home', onNavigateTab }: { profile: BuilderProfile; context?: BuilderTipContext; onNavigateTab?: (target: BuilderTipTarget) => void }) {
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [index, setIndex] = useState(0);

  const tips = CONTEXT_TIPS[context] ?? CONTEXT_TIPS.home;

  useEffect(() => {
    setIndex(0);
    setExpanded(true);
  }, [context]);

  useEffect(() => {
    document.body.classList.toggle('builder-tip-open', !dismissed);
    return () => document.body.classList.remove('builder-tip-open');
  }, [dismissed]);

  const nextTip = () => setIndex((current) => (current + 1) % tips.length);
  const previousTip = () => setIndex((current) => (current - 1 + tips.length) % tips.length);

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

  const visibleIndex = index % tips.length;
  const tip = tips[visibleIndex];
  const tipImage = PROFILE_TIP_IMAGES[profile][visibleIndex % PROFILE_TIP_IMAGES[profile].length];
  const accent = profile === 'woman' ? '#ef7aa6' : '#d7a532';

  return (
    <motion.aside
      className="builder-sq-banner"
      data-builder-tip-context={context}
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
            key={`${profile}-${context}-${visibleIndex}`}
            src={tipImage}
            alt=""
            className="builder-sq-hero-image"
            style={{ objectPosition: `50% ${tip.focusY}%` }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
            onError={(event) => {
              const image = event.currentTarget;
              const fallback = assetUrl('/assets_coach_tips/athletic_duo_hero 1.svg');
              if (!image.src.endsWith('athletic_duo_hero%201.svg') && !image.src.endsWith('athletic_duo_hero 1.svg')) image.src = fallback;
            }}
          />
        </AnimatePresence>
        <div className="builder-sq-hero-overlay" />
        <div className="builder-sq-actions">
          <span className="builder-sq-counter">{visibleIndex + 1}/{tips.length}</span>
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
                  {tip.cta && (
                    <button
                      type="button"
                      className="builder-sq-cta"
                      onClick={() => {
                        if (tip.ctaTarget && onNavigateTab) onNavigateTab(tip.ctaTarget);
                        setDismissed(true);
                      }}
                    >
                      {tip.cta}
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="builder-sq-nav" aria-label="Navegar tips">
                <button type="button" className="builder-sq-nav-button" onClick={previousTip} aria-label="Tip anterior">
                  <ChevronLeft size={13} />
                </button>
                <div className="builder-sq-dots" aria-label="Seleccionar tip">
                  {tips.map((_item, dotIndex) => (
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
