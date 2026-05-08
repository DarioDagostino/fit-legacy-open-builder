import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Trophy, Download, Apple } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Interfaces para tipado (Basadas en las de la app mobile)
interface PostData {
  username: string;
  routineName: string;
  weight: number;
  reps: number;
  isPr: boolean;
  type: string;
  metadata?: any;
}

export const SharedPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      
      setLoading(true);
      try {
        // Query de Supabase: Obtenemos el post y el nombre de usuario del perfil asociado
        const { data, error } = await supabase
          .from('posts')
          .select('*, user_profile:user_id(username)')
          .eq('id', postId)
          .single();

        if (error) throw error;

        if (data) {
          setPost({
            username: data.user_profile?.username || "atleta_legacy",
            routineName: data.routine_name || data.exercise_name || "Entrenamiento",
            weight: data.weight || 0,
            reps: data.reps || 0,
            isPr: data.is_pr || false,
            type: data.type || 'workout'
          });
        }
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] text-white p-6">
        <h1 className="text-2xl font-bold mb-4">Publicación no encontrada</h1>
        <Link to="/" className="text-[#D4AF37] underline">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* HEADER: Logo de Fit Legacy */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-8 flex items-center gap-3"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#FDB931] rounded-lg flex items-center justify-center shadow-lg shadow-[#D4AF37]/20">
          <span className="text-black font-black text-xl">L</span>
        </div>
        <h1 className="text-2xl font-black tracking-widest uppercase italic">Fit Legacy</h1>
      </motion.div>

      {/* CONTENIDO PRINCIPAL: El Récord del Amigo */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md bg-[#0f172a] rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden mt-12"
      >
        {/* Decorative Gradient Overlay */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D4AF37]/10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#A855F7]/10 blur-3xl rounded-full"></div>

        <div className="relative z-10 text-center">
          <p className="text-gray-400 text-sm mb-6">
            <strong className="text-white">@{post.username}</strong> acaba de compartir un logro:
          </p>

          {post.isPr && (
            <motion.div 
              initial={{ rotate: -5, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              className="inline-flex items-center gap-2 bg-[#D4AF37]/20 text-[#D4AF37] px-4 py-1.5 rounded-full text-xs font-black tracking-widest mb-6 border border-[#D4AF37]/30"
            >
              <Trophy size={14} />
              NUEVO RÉCORD PERSONAL
            </motion.div>
          )}

          <h2 className="text-3xl font-black mb-2 uppercase tracking-tight">{post.routineName}</h2>
          
          <div className="py-8">
            <span className="text-6xl font-black text-white lining-nums">
              {post.weight} <span className="text-2xl font-bold text-[#D4AF37]">kg</span>
            </span>
            <div className="text-gray-500 font-bold text-xl mt-2 uppercase tracking-widest flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-white/10"></span>
              {post.reps} Repeticiones
              <span className="w-8 h-px bg-white/10"></span>
            </div>
          </div>

          {/* CALL TO ACTION (CTA) */}
          <div className="space-y-6 pt-8 border-t border-white/5">
            <div className="space-y-2">
              <p className="text-gray-200 font-bold text-lg">
                ¿Quieres ver su técnica y dejar un comentario?
              </p>
              <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">
                Únete a la legión en la app
              </p>
            </div>

            {/* BOTONES DE DESCARGA */}
            <div className="flex flex-col gap-4">
              <a 
                href="https://play.google.com/store/apps/details?id=com.tuapp.fitlegacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-white text-black py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gray-200 transition-all active:scale-95 group shadow-xl shadow-white/5"
              >
                <Download className="group-hover:bounce" size={20} />
                DESCARGAR EN PLAY STORE
              </a>
              
              <a 
                href="https://apps.apple.com/app/id123456789" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#1e293b] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 border border-white/10 hover:bg-[#334155] transition-all active:scale-95 group shadow-xl"
              >
                <Apple size={20} />
                DESCARGAR EN APP STORE
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* FOOTER TEXT */}
      <p className="mt-8 text-gray-600 text-xs font-bold tracking-[0.2em] uppercase text-center max-w-xs leading-relaxed">
        Fit Legacy &copy; 2026<br/>
        Forja tu legado. Rompe tus límites.
      </p>
    </div>
  );
};
