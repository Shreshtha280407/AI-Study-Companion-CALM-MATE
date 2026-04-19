import { Link } from 'react-router-dom'

function BrandLogo({ className = '' }) {
  return (
    <Link to="/" className={`inline-flex items-center ${className}`}>
      <div className="inline-flex items-center gap-3 rounded-full border border-violet-200/30 bg-slate-950/65 px-3.5 py-2 shadow-[0_0_34px_rgba(139,92,246,0.4)] ring-1 ring-violet-300/20 backdrop-blur-xl transition hover:scale-[1.02] hover:shadow-[0_0_44px_rgba(168,85,247,0.52)]">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 via-violet-500 to-indigo-600 text-base shadow-[0_0_18px_rgba(168,85,247,0.65)]">
          💀
        </div>
        <div className="pr-1">
          <p className="text-[10px] uppercase tracking-[0.24em] text-violet-100/75">AI Study Companion</p>
          <p className="bg-gradient-to-r from-violet-100 via-fuchsia-100 to-indigo-100 bg-clip-text text-sm font-extrabold tracking-wide text-transparent">
            Calm Mate
          </p>
        </div>
      </div>
    </Link>
  )
}

export default BrandLogo
