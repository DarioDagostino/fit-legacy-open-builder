import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BuilderBrandLogo } from './BuilderBrandLogo';

interface LoadingScreenProps {
  onFinished: () => void;
}

export function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2200;
    const intervalTime = 30;
    const increment = (100 / duration) * intervalTime;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinished, 320);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onFinished]);

  return (
    <div className="builder-boot" aria-live="polite" aria-busy="true">
      <div className="builder-boot-backdrop" aria-hidden="true">
        <span className="builder-boot-orb builder-boot-orb-cyan" />
        <span className="builder-boot-orb builder-boot-orb-teal" />
        <span className="builder-boot-grid" />
      </div>

      <div className="builder-boot-stack">
        <motion.div
          className="builder-boot-logo-wrap"
          initial={{ opacity: 0, scale: 0.88, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="builder-boot-logo-halo" aria-hidden="true" />
          <BuilderBrandLogo className="builder-boot-logo" alt="" />
        </motion.div>

        <motion.h1
          className="builder-boot-title"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          Builder
        </motion.h1>

        <motion.p
          className="builder-boot-tagline"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.92, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          for fitness
        </motion.p>

        <motion.p
          className="builder-boot-byline"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.12, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          No brand · by Fit Legacy
        </motion.p>

        <motion.div
          className="builder-boot-progress"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.28, duration: 0.45 }}
          aria-hidden="true"
        >
          <span className="builder-boot-progress-fill" style={{ width: `${progress}%` }} />
        </motion.div>
      </div>
    </div>
  );
}
