import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellRing, Flame, AlertTriangle, Trophy, X } from 'lucide-react';
import { useNotificationStore, type AppNotification } from '@/lib/notification-store';

const ICON_MAP: Record<string, React.ReactNode> = {
  streak_risk: <AlertTriangle className="h-3.5 w-3.5 text-[#F2A468]" />,
  streak_lost: <Flame className="h-3.5 w-3.5 text-[#8A2F14]" />,
  milestone: <Trophy className="h-3.5 w-3.5 text-[#E0793C]" />,
};

export function NotificationBell() {
  const notifications = useNotificationStore((s) => s.notifications);
  const markRead = useNotificationStore((s) => s.markRead);
  const dismiss = useNotificationStore((s) => s.dismiss);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => { setOpen(!open); if (!open) notifications.forEach((n) => markRead(n.id)); }}
        className={`relative flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
          open ? 'bg-[#E0793C]/10 text-[#E0793C]' : 'text-[#6E6558] hover:text-[#A79A87] hover:bg-[#2A2520]'
        }`}
        aria-label="Notificaciones"
      >
        {unread > 0 ? <BellRing className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#8A2F14] text-[7px] font-black text-white shadow-lg">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-[#2A2520] bg-[#1E1A16] shadow-2xl shadow-black/50 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-[#2A2520]">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#6E6558]">Notificaciones</p>
            </div>

            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <Bell className="mx-auto mb-2 h-6 w-6 text-[#3A3228]" />
                <p className="text-xs font-medium text-[#6E6558]">Sin notificaciones</p>
              </div>
            ) : (
              <div className="max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <NotificationItem key={n.id} notification={n} onDismiss={dismiss} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NotificationItem({ notification, onDismiss }: { notification: AppNotification; onDismiss: (id: string) => void }) {
  return (
    <div className={`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-[#2A2520]/50 ${notification.read ? 'opacity-60' : ''}`}>
      <div className="mt-0.5 shrink-0">{ICON_MAP[notification.type] || <Bell className="h-3.5 w-3.5 text-[#6E6558]" />}</div>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-bold text-[#FAF5EC] leading-tight">{notification.title}</p>
        <p className="mt-0.5 text-[10px] font-medium text-[#A79A87] leading-relaxed">{notification.body}</p>
        {notification.action && (
          <button
            onClick={notification.action.onClick}
            className="mt-1.5 rounded-lg bg-[#E0793C]/10 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-[#E0793C] hover:bg-[#E0793C]/20 transition-colors"
          >
            {notification.action.label}
          </button>
        )}
      </div>
      <button
        onClick={() => onDismiss(notification.id)}
        className="shrink-0 rounded-full p-1 text-[#6E6558] hover:text-[#FAF5EC] hover:bg-[#2A2520] transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
