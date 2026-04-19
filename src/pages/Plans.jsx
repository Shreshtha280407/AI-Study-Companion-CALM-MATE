import { Link } from 'react-router-dom'

function Plans() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 flex items-center justify-center px-6 text-slate-100">
      
      {/* Ambient Glow Effects */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/20 mix-blend-screen blur-[120px]"></div>
      <div className="pointer-events-none absolute -bottom-40 right-10 h-96 w-96 rounded-full bg-fuchsia-600/20 mix-blend-screen blur-[120px]"></div>

      <div className="relative z-10 text-center max-w-lg">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-fuchsia-500/10 border border-fuchsia-500/30 text-4xl mb-8 shadow-[0_0_30px_rgba(217,70,239,0.2)]">
          💎
        </div>
        
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Dashboard Pro</h1>
        <p className="text-xl text-fuchsia-300 font-medium mb-6">Coming Soon!</p>
        
        <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-8 backdrop-blur-xl shadow-2xl">
          <p className="text-slate-400 leading-relaxed mb-8">
            We are currently under development to bring you the most advanced AI-powered personal tutoring experience. 
            Calm Mate Pro will be available very soon!
          </p>
          
          <Link 
            to="/feature-cards"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 font-bold text-white transition-transform hover:scale-[1.03] active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            ← Back to Navigation
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Plans
