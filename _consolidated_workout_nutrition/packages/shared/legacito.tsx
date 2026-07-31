import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export type LegacitoMood = 'neutral' | 'happy' | 'celebrating' | 'thinking' | 'worried' | 'vision';
export type LegacitoSkin = 'none' | 'legacy-ai' | 'rose' | 'gold' | 'aurora' | 'crown' | 'band' | 'glasses';

interface LegacitoProps {
  mood?: LegacitoMood;
  size?: number;
  className?: string;
  isSpeaking?: boolean;
  skinId?: LegacitoSkin;
}

export const Legacito: React.FC<LegacitoProps> = ({ 
  mood = 'neutral', 
  size = 100,
  className = "",
  isSpeaking = false,
  skinId = 'none'
}) => {

  // Paleta de colores base
  const colors = {
    panel: '#080808',
    chassisLight: ['legacy-ai', 'rose', 'gold'].includes(skinId) ? '#25282A' : '#FFFFFF',
    chassisDark: ['legacy-ai', 'rose', 'gold'].includes(skinId) ? '#090B0C' : '#F0F0F0',
    border: '#76E8FF',
  };

  const getMoodColor = (currentMood: LegacitoMood) => {
    switch (currentMood) {
      case 'celebrating': return '#F5C45E';
      case 'worried': return '#FF88BE';
      case 'thinking': return '#FF9FBD';
      case 'vision': return '#76E8FF';
      case 'happy': return '#7DF4FF';
      case 'neutral':
      default: return '#76E8FF';
    }
  };

  const [isGlitching, setIsGlitching] = React.useState(false);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setIsGlitching(true);
      window.setTimeout(() => setIsGlitching(false), 480);
    }, 6800);
    return () => clearInterval(intervalId);
  }, []);

  // â”€â”€â”€ AMBIENT EYE DARTING (AUTONOMOUS LIFE) â”€â”€â”€
  const [ambientLook, setAmbientLook] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const looks = [
      { x: 0, y: 0 },
      { x: 3.2, y: -1.2 },
      { x: 0, y: 0 },
      { x: -3.8, y: 1.4 },
      { x: 1.8, y: 0.8 },
      { x: 0, y: 0 },
    ];
    let index = 0;
    const intervalId = setInterval(() => {
      index = (index + 1) % looks.length;
      setAmbientLook(looks[index]);
    }, 2600);
    return () => clearInterval(intervalId);
  }, []);

  // â”€â”€â”€ CURSOR TRACKING (LIFE) â”€â”€â”€
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  React.useEffect(() => {
    let raf: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        mouseX.set(e.clientX / window.innerWidth);
        mouseY.set(e.clientY / window.innerHeight);
        raf = null;
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mouseX, mouseY]);

  const smoothMouseX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  // Mapear la posicion [0, 1] a un sutil desplazamiento de pixeles para los ojos
  const eyeXOffset = useTransform(smoothMouseX, [0, 1], [-5, 5]);
  const eyeYOffset = useTransform(smoothMouseY, [0, 1], [-6, 6]);

  // Sutil paralaje para el chasis
  const headXOffset = useTransform(smoothMouseX, [0, 1], [-1, 1]);
  const headYOffset = useTransform(smoothMouseY, [0, 1], [-1, 1]);

  const effectiveMood = isGlitching ? 'vision' : mood;
  // Color skins pin the mascot to a deliberate brand family. `none` and
  // `aurora` preserve the original mood-driven palette.
  const skinColor = skinId === 'legacy-ai'
    ? '#76E8FF'
    : skinId === 'rose'
      ? '#FF9FBD'
      : skinId === 'gold'
        ? '#F5C45E'
        : undefined;
  const moodColor = skinColor || getMoodColor(effectiveMood);
  
  // â”€â”€â”€ AURORA DYNAMIC COLORS (LIVING AI) â”€â”€â”€
  // We use an array of our brand colors for the idle state
  const auroraColors = ['#76E8FF', '#FFF1B8', '#FF9FBD', '#7DF4FF', '#F5C45E'];
  const isNeutral = effectiveMood === 'neutral' && (skinId === 'none' || skinId === 'aurora');

  // â”€â”€â”€ REACTIVE SPRING ANIMATION â”€â”€â”€
  const [scaleReact, setScaleReact] = React.useState(1);
  React.useEffect(() => {
    setScaleReact(1.18);
    const t = setTimeout(() => setScaleReact(1), 300);
    return () => clearTimeout(t);
  }, [mood, isSpeaking]);

  return (
    <motion.div 
      className={`relative inline-block ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: scaleReact, opacity: 1 }}
      transition={{ scale: { type: "spring", stiffness: 300, damping: 15 } }}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
      >
        {/* ── AURA / GLOW ── */}
          <motion.circle
          cx="50"
          cy="50"
          r={45}
          initial={{ r: 45 }}
          animate={{ 
            opacity: isSpeaking ? [0.15, 0.45, 0.15] : [0.1, 0.25, 0.1],
            fill: isNeutral ? auroraColors : moodColor
          }}
          transition={{ 
            opacity: { duration: isSpeaking ? 1.2 : 4, repeat: Infinity, ease: "easeInOut" },
            fill: isNeutral 
              ? { duration: 20, repeat: Infinity, ease: "linear" } 
              : { duration: 0.5 }
          }}
        />

        {/* â”€â”€ ORBIT PARTICLES â”€â”€ */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: isSpeaking ? 12 : 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '50px 50px', willChange: 'transform' }}
        >
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <motion.circle
              key={i}
              cx={(50 + Math.cos(angle * Math.PI / 180) * 48).toString()}
              cy={(50 + Math.sin(angle * Math.PI / 180) * 20).toString()}
              r={1.5}
              fill={isNeutral ? auroraColors[i % auroraColors.length] : moodColor}
            />
          ))}
        </motion.g>

        {/* â”€â”€ HEAD BATCH (Chassis) â”€â”€ */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: 'transform' }}
        >
          <motion.g style={{ x: headXOffset, y: headYOffset }}>
            {/* Shadow */}
            <circle cx="50" cy="54" r={38} fill="rgba(0,0,0,0.15)" />
          
          {/* Main Chassis */}
          <motion.circle 
            cx="50" cy="50" r={38} 
            fill={`url(#chassisGradient)`}
            strokeWidth="1.2"
            animate={{ stroke: isNeutral ? auroraColors : moodColor }}
            transition={{ duration: isNeutral ? 20 : 0.5, repeat: isNeutral ? Infinity : 0, ease: "linear" }}
          />

          {/* Face Panel (Screen) */}
          <circle cx="50" cy="50" r={32} fill={colors.panel} />

          {/* speaking soundwave mouth */}
          {isSpeaking && (
            <motion.g
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="pointer-events-none"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.rect
                  key={i}
                  x={41 + i * 4.5}
                  y={60}
                  width={2.5}
                  height={6}
                  rx={1.2}
                  fill={moodColor}
                  animate={{
                    scaleY: [1, 2.5, 0.8, 2.2, 1],
                    y: [-1, -4.5, 1, -3, -1],
                  }}
                  transition={{
                    duration: 0.5 + i * 0.12,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ originY: "63px" }}
                />
              ))}
            </motion.g>
          )}

          {/* Glass Reflection */}
          <path 
            d="M 25 35 A 25 25 0 0 1 75 35" 
            fill="none" 
            stroke="white" 
            strokeWidth="3" 
            strokeLinecap="round" 
            opacity="0.05" 
          />

          {/* â”€â”€ EYES (Mood Logic) â”€â”€ */}
          <motion.g style={{ x: eyeXOffset, y: eyeYOffset }}>
            <motion.g 
              animate={{ x: ambientLook.x, y: ambientLook.y }} 
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Left Eye */}
              <Eye side="left" mood={effectiveMood} color={moodColor} />
              {/* Right Eye */}
              <Eye side="right" mood={effectiveMood} color={moodColor} />
            </motion.g>
          </motion.g>

          {/* â”€â”€ COSMETICS / SKINS â”€â”€ */}
          {skinId === 'crown' && (
            <motion.g
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 120 }}
            >
              {/* Golden Crown */}
              <path
                d="M 34 22 L 30 10 L 40 16 L 50 6 L 60 16 L 70 10 L 66 22 Z"
                fill="#FBBF24"
                stroke="#B45309"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* Crown Jewels */}
              <circle cx="50" cy="6" r={1.8} fill="#EF4444" />
              <circle cx="30" cy="10" r={1.5} fill="#3B82F6" />
              <circle cx="70" cy="10" r={1.5} fill="#3B82F6" />
            </motion.g>
          )}

          {skinId === 'band' && (
            <motion.g
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            >
              {/* Main band across the forehead */}
              <path
                d="M 20 34 Q 50 28 80 34"
                fill="none"
                stroke="#EF4444"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              {/* Metal plate in center */}
              <rect x="42" y="27" width="16" height="6.5" rx="1.2" fill="#D1D5DB" stroke="#374151" strokeWidth="0.8" />
              {/* Logo symbol on the metal plate */}
              <circle cx="50" cy="30.2" r={1.5} fill="#111827" />
              {/* Ribbon tails at the side */}
              <path
                d="M 78 34 L 88 40 M 78 34 L 86 45"
                stroke="#EF4444"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </motion.g>
          )}

          {skinId === 'glasses' && (
            <motion.g
              initial={{ scale: 0, y: -15 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 12 }}
            >
              {/* Cyber Shades */}
              <polygon
                points="26,43 46,43 44,52 30,52"
                fill="rgba(244, 63, 94, 0.82)"
                stroke="#F43F5E"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <polygon
                points="54,43 74,43 70,52 56,52"
                fill="rgba(244, 63, 94, 0.82)"
                stroke="#F43F5E"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* Bridge */}
              <rect x="45" y="45" width="10" height="2" fill="#F43F5E" rx="0.5" />
            </motion.g>
          )}

        </motion.g>
      </motion.g>

        {/* â”€â”€ FLOATING BASE (Core) â”€â”€ */}
        <motion.ellipse
          cx="50" cy="90" rx="14" ry="3"
          opacity="0.3"
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ 
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* DEFINITIONS */}
        <defs>
          <radialGradient id="chassisGradient" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor={colors.chassisLight} />
            <stop offset="100%" stopColor={colors.chassisDark} />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

// â”€â”€â”€ ASTROBOY BASE EYE â”€â”€â”€
const AstroboyEyeBase: React.FC<{ side: 'left' | 'right', color: string, xBase: number, yBase: number }> = ({ side, color, xBase, yBase }) => (
  <motion.g
    style={{ transformOrigin: `${xBase}px ${yBase}px`, willChange: 'transform' }}
    animate={{ scale: [1, 1.035, 1], opacity: [0.96, 1, 0.98] }}
    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
  >
    <motion.ellipse
      cx={xBase}
      cy={yBase}
      rx="10.5"
      ry="17"
      fill={color}
      opacity="0.18"
      animate={{ opacity: [0.14, 0.30, 0.16], scale: [0.96, 1.06, 0.98] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: `${xBase}px ${yBase}px` }}
    />
    <motion.ellipse
      cx={xBase}
      cy={yBase}
      rx="8.5"
      ry="15"
      fill={color}
      opacity="0.22"
      animate={{ opacity: [0.15, 0.28, 0.15] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Giant Highlights */}
    <ellipse
      cx={xBase - (side === 'left' ? 2.5 : -2.5)} cy={yBase - 6} rx="3" ry="5" 
      fill="white" opacity="0.88"
      transform={`rotate(${side === 'left' ? -15 : 15} ${xBase} ${yBase - 6})`} 
    />
    <circle
      cx={xBase + (side === 'left' ? 3.5 : -3.5)}
      cy={yBase + 6}
      r={2}
      fill="white"
      opacity="0.55"
    />
  </motion.g>
);

const Eye: React.FC<{ side: 'left' | 'right', mood: LegacitoMood, color: string }> = ({ side, mood, color }) => {
  const xBase = side === 'left' ? 38 : 62;
  const yBase = 50;
  const glyph = side === 'left' ? "F" : "L";
  const phaseDelay = side === 'left' ? 0 : 0.18;

  if (mood === 'vision') {
    // Alternating FL display vision: the eyes collapse into a readable scanner glyph, then breathe back.
    return (
      <motion.g
        style={{ transformOrigin: `${xBase}px ${yBase}px` }}
        animate={{
          x: [0, side === 'left' ? -1.2 : 1.2, 0.4, 0, 0],
          y: [0, -0.7, 0.4, 0, 0],
          scaleX: [1, 1.04, 0.98, 1, 1],
        }}
        transition={{ duration: 1.35, repeat: Infinity, repeatDelay: 0.55, ease: 'easeInOut' }}
      >
        <motion.ellipse
          cx={xBase}
          cy={yBase}
          rx="13"
          ry="17"
          fill="rgba(118,232,255,0.12)"
          animate={{
            opacity: [0.08, 0.28, 0.18, 0.08],
            scale: [0.94, 1.08, 1.02, 0.96],
            fill: ['rgba(118,232,255,0.10)', 'rgba(255,159,189,0.16)', 'rgba(255,241,184,0.12)', 'rgba(118,232,255,0.10)'],
          }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.45, ease: 'easeInOut' }}
          style={{ transformOrigin: `${xBase}px ${yBase}px` }}
        />
        <motion.g
          animate={{
            opacity: [1, 0.82, 0.2, 0.06, 0.28, 0.82, 1],
            scaleY: [1, 0.92, 0.48, 0.18, 0.42, 0.88, 1],
            x: [0, 0, side === 'left' ? -0.8 : 0.8, 0, 0],
          }}
          transition={{ duration: 1.55, repeat: Infinity, repeatDelay: 0.55, delay: phaseDelay, ease: 'easeInOut' }}
          style={{ transformOrigin: `${xBase}px ${yBase}px` }}
        >
          <AstroboyEyeBase side={side} color={color} xBase={xBase} yBase={yBase} />
        </motion.g>
        <motion.rect
          x={xBase - 12}
          y={yBase - 15}
          width="24"
          height="30"
          rx="10"
          fill="none"
          stroke="#76e8ff"
          strokeWidth="0.65"
          opacity="0.18"
          animate={{
            opacity: [0, 0.2, 0.06, 0.18, 0],
            strokeDasharray: ['2 7', '9 3', '1 6', '5 4', '2 7'],
            rotate: [0, side === 'left' ? -1.6 : 1.6, 0],
          }}
          transition={{ duration: 1.55, repeat: Infinity, repeatDelay: 0.55, delay: phaseDelay, ease: 'easeInOut' }}
          style={{ transformOrigin: `${xBase}px ${yBase}px` }}
        />
        <motion.rect
          x={xBase - 10}
          y={yBase - 3}
          width="20"
          height="6"
          rx="3"
          fill="#76e8ff"
          opacity="0"
          animate={{
            opacity: [0, 0.08, 0.46, 0.08, 0],
            scaleX: [0.4, 0.72, 1.14, 0.86, 0.4],
            y: [yBase - 3, yBase - 3, yBase - 2, yBase - 3, yBase - 3],
          }}
          transition={{ duration: 1.55, repeat: Infinity, repeatDelay: 0.55, delay: phaseDelay + 0.06, ease: 'easeInOut' }}
          style={{
            transformOrigin: `${xBase}px ${yBase}px`,
          }}
        />
        <motion.text
          x={xBase - 1.8} y={yBase + 7}
          fill="#ff88be"
          fontSize="22"
          fontWeight="900"
          fontFamily="monospace"
          textAnchor="middle"
          opacity="0.38"
          animate={{ opacity: [0, 0.08, 0.42, 0.12, 0], x: [xBase - 1.8, xBase - 2.8, xBase - 1.2, xBase - 2.2, xBase - 1.8] }}
          transition={{ duration: 1.55, repeat: Infinity, repeatDelay: 0.55, delay: phaseDelay, ease: 'easeInOut' }}
        >
          {glyph}
        </motion.text>
        <motion.text
          x={xBase + 1.8} y={yBase + 7}
          fill="#fff1b8"
          fontSize="22"
          fontWeight="900"
          fontFamily="monospace"
          textAnchor="middle"
          opacity="0.28"
          animate={{ opacity: [0, 0.06, 0.28, 0.1, 0], x: [xBase + 1.8, xBase + 2.8, xBase + 1.4, xBase + 2.4, xBase + 1.8] }}
          transition={{ duration: 1.55, repeat: Infinity, repeatDelay: 0.55, delay: phaseDelay + 0.06, ease: 'easeInOut' }}
        >
          {glyph}
        </motion.text>
        <motion.text
          x={xBase} y={yBase + 7}
          fill={color}
          fontSize="22"
          fontWeight="900"
          fontFamily="monospace"
          textAnchor="middle"
          initial={{ opacity: 1 }}
          animate={{
            opacity: [0, 0.12, 0.96, 0.88, 0.18, 0],
            scaleY: [0.82, 0.72, 1.08, 1, 0.86, 0.72],
            scaleX: [0.94, 1.08, 1, 0.98, 1.04, 0.94],
            y: [yBase + 7.8, yBase + 7.4, yBase + 6.6, yBase + 7, yBase + 7.4, yBase + 7.8],
          }}
          transition={{ duration: 1.55, repeat: Infinity, repeatDelay: 0.55, delay: phaseDelay, ease: "easeInOut" }}
        >
          {glyph}
        </motion.text>
        <motion.text
          x={xBase}
          y={yBase + 7}
          fill="#0b0b0b"
          fontSize="22"
          fontWeight="900"
          fontFamily="monospace"
          textAnchor="middle"
          animate={{ opacity: [0, 0, 0.16, 0, 0.08, 0] }}
          transition={{ duration: 1.55, repeat: Infinity, repeatDelay: 0.55, delay: phaseDelay + 0.1, ease: 'linear' }}
        >
          {glyph}
        </motion.text>
        <motion.rect
          x={xBase - 9}
          y={yBase - 8}
          width="18"
          height="2"
          rx="1"
          fill="#76e8ff"
          opacity="0.5"
          animate={{
            y: [yBase - 12, yBase - 6, yBase + 9, yBase - 4, yBase - 12],
            opacity: [0, 0.24, 0.58, 0.16, 0],
            scaleX: [0.62, 0.95, 1.18, 0.84, 0.62],
          }}
          transition={{ duration: 1.55, repeat: Infinity, repeatDelay: 0.55, delay: phaseDelay, ease: 'easeInOut' }}
        />
      </motion.g>
    );
  }

  if (mood === 'celebrating') {
    // Astroboy double blink of joy
    return (
      <motion.g
        style={{ transformOrigin: `${xBase}px ${yBase}px` }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: [1, 0.1, 1, 0.2, 1] }} 
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
      >
        <AstroboyEyeBase side={side} color={color} xBase={xBase} yBase={yBase} />
      </motion.g>
    );
  }

  if (mood === 'worried') {
    // Astroboy tilting eyes inwards and looking down
    return (
      <motion.g
        style={{ transformOrigin: `${xBase}px ${yBase}px` }}
        initial={{ rotate: 0, translateY: 0 }}
        animate={{ 
          rotate: side === 'left' ? [0, 15, 0] : [0, -15, 0],
          translateY: [0, 4, 0] 
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <AstroboyEyeBase side={side} color={color} xBase={xBase} yBase={yBase} />
      </motion.g>
    );
  }

  if (mood === 'thinking') {
    // Astroboy looking up and to the side
    return (
      <motion.g
        style={{ transformOrigin: `${xBase}px ${yBase}px` }}
        initial={{ translateX: 0, translateY: 0 }}
        animate={{ 
          translateX: side === 'left' ? [0, 4, 0] : [0, 4, 0],
          translateY: [0, -4, 0] 
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <AstroboyEyeBase side={side} color={color} xBase={xBase} yBase={yBase} />
      </motion.g>
    );
  }

  // DEFAULT / NEUTRAL - Astroboy Eyes (Base)
  return (
    <motion.g
      style={{ transformOrigin: `${xBase}px ${yBase}px` }}
      initial={{ scaleY: 1 }}
      animate={{ scaleY: [1, 0.1, 1] }} // Blink
      transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
    >
      <AstroboyEyeBase side={side} color={color} xBase={xBase} yBase={yBase} />
    </motion.g>
  );
};
