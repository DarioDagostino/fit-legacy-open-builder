import { useEffect, useRef } from 'react';
import { useBioLedgerStore } from '@/lib/bioledger-store';
import { useNotificationStore } from '@/lib/notification-store';

const STREAK_WARNING_KEY = 'fl-streak-warning-shown';

export function StreakGuard() {
  const stats = useBioLedgerStore((s) => s.stats);
  const lastSessionDate = useBioLedgerStore((s) => s.lastSessionDate);
  const addNotification = useNotificationStore((s) => s.addNotification);
  const notified = useRef(false);

  useEffect(() => {
    if (notified.current) return;
    if (!stats || stats.currentStreak === 0) return;

    const today = new Date().toISOString().slice(0, 10);
    const isActive = lastSessionDate === today;

    if (!isActive && stats.currentStreak >= 1) {
      const hoursSince = lastSessionDate
        ? Math.floor((Date.now() - new Date(lastSessionDate + 'T12:00:00').getTime()) / 3600000)
        : 48;

      if (hoursSince >= 24) {
        const alreadyShown = localStorage.getItem(STREAK_WARNING_KEY);
        if (alreadyShown === today) return;

        addNotification({
          type: 'streak_risk',
          title: '¡Racha en riesgo!',
          body: `Llevás ${stats.currentStreak} día${stats.currentStreak > 1 ? 's' : ''} de racha. Registrá un entrenamiento hoy para no perderla.`,
          action: {
            label: 'Ir a entrenar',
            onClick: () => {
              document.querySelector('[data-tab="catalog"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            },
          },
        });

        localStorage.setItem(STREAK_WARNING_KEY, today);
        notified.current = true;
      }

      if (hoursSince >= 48) {
        addNotification({
          type: 'streak_lost',
          title: 'Racha perdida',
          body: 'Han pasado más de 48h desde tu último registro. Tu racha se ha reiniciado. Volvé a empezar hoy.',
        });
        notified.current = true;
      }
    }
  }, [stats, lastSessionDate, addNotification]);

  return null;
}
