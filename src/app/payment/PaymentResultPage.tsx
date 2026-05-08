import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle, XCircle, Clock, RotateCcw, ArrowRight } from 'lucide-react';

type PaymentStatus = 'success' | 'failure' | 'pending';

interface StatusConfig {
    icon: React.ElementType;
    iconColor: string;
    title: string;
    subtitle: string;
    bgGlow: string;
    cta: string;
    ctaHref: string;
}

const STATUS_CONFIG: Record<PaymentStatus, StatusConfig> = {
    success: {
        icon: CheckCircle,
        iconColor: 'text-emerald-400',
        title: '¡Bienvenido al Legado!',
        subtitle: 'Tu suscripción está activa. La élite te espera.',
        bgGlow: 'bg-emerald-500/10',
        cta: 'Ir al Dashboard',
        ctaHref: '/athlete',
    },
    failure: {
        icon: XCircle,
        iconColor: 'text-red-400',
        title: 'El pago no se procesó',
        subtitle: 'No se realizó ningún cargo. Puedes intentarlo nuevamente.',
        bgGlow: 'bg-red-500/10',
        cta: 'Volver a intentar',
        ctaHref: '/#pricing',
    },
    pending: {
        icon: Clock,
        iconColor: 'text-amber-400',
        title: 'Pago en proceso',
        subtitle: 'Estamos verificando tu pago. Te notificaremos por email cuando se confirme.',
        bgGlow: 'bg-amber-500/10',
        cta: 'Ir al inicio',
        ctaHref: '/',
    },
};

interface PaymentResultPageProps {
    status: PaymentStatus;
}

export function PaymentResultPage({ status }: PaymentResultPageProps) {
    const [searchParams] = useSearchParams();
    const paymentId = searchParams.get('payment_id');
    const config = STATUS_CONFIG[status];
    const Icon = config.icon;

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
            {/* Background */}
            <div className={`absolute inset-0 ${config.bgGlow} opacity-30 blur-[120px] pointer-events-none`} />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-md text-center"
            >
                {/* Logo */}
                <div className="mb-8">
                    <h1 className="text-[#d4af37] text-xl font-black tracking-[0.3em] uppercase">
                        FIT LEGACY
                    </h1>
                </div>

                {/* Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex justify-center mb-6"
                >
                    <Icon size={72} className={config.iconColor} strokeWidth={1.5} />
                </motion.div>

                {/* Title */}
                <h2 className="text-3xl font-black text-white mb-3 font-['Roboto'] uppercase tracking-tight">
                    {config.title}
                </h2>
                <p className="text-gray-400 text-lg mb-8 font-['Inter'] leading-relaxed">
                    {config.subtitle}
                </p>

                {/* Payment ID (if available) */}
                {paymentId && (
                    <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-8 text-left">
                        <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">
                            ID de Pago
                        </p>
                        <p className="text-sm text-white font-mono">{paymentId}</p>
                    </div>
                )}

                {/* CTA */}
                <Link to={config.ctaHref}>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-4 rounded-xl bg-[#d4af37] text-black font-black text-lg uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                    >
                        {status === 'failure' && <RotateCcw size={18} />}
                        {config.cta}
                        {status !== 'failure' && <ArrowRight size={18} />}
                    </motion.button>
                </Link>

                {/* Back to home */}
                {status !== 'success' && (
                    <Link to="/" className="block mt-4 text-sm text-gray-600 hover:text-gray-400 transition-colors">
                        ← Volver al inicio
                    </Link>
                )}

                {/* Stoic quote */}
                <p className="mt-10 text-xs text-gray-700 font-serif italic">
                    "Memento Mori. Memento Vivere."
                </p>
            </motion.div>
        </div>
    );
}
