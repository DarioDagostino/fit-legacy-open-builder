import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { error: Error | null };

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Builder route failed', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0C0C0E] px-6 text-[#F0EEF8]" role="alert">
        <section className="max-w-md space-y-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8873A]">Builder en pausa</p>
          <h1 className="text-2xl font-black">No pudimos cargar esta vista.</h1>
          <p className="text-sm text-white/60">Reintentá la ruta. Tu rutina guardada no se modifica.</p>
          <button type="button" onClick={() => window.location.reload()} className="rounded-full bg-[#E8873A] px-5 py-3 text-sm font-bold text-black">
            Reintentar
          </button>
        </section>
      </main>
    );
  }
}
