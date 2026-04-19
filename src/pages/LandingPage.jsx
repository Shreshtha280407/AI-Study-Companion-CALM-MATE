import { Link } from 'react-router-dom'
import calmMateBg from '../assets/calmmate-bg.png'
import BrandLogo from '../components/layout/BrandLogo'

function LandingPage() {
  return (
    <main
      className="relative h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed px-6 py-10 text-slate-100"
      style={{ backgroundImage: `url(${calmMateBg})` }}
    >
      <BrandLogo className="absolute left-6 top-6 z-30" />

      <div className="mx-auto flex h-[calc(100vh-5rem)] w-full max-w-5xl flex-col">
        <section className="fixed left-1/2 top-[33%] z-20 w-fit -translate-x-1/2">
          <div className="rounded-full bg-violet-400/30 p-[2px] shadow-[0_0_42px_rgba(168,85,247,0.65)]">
            <Link
              to="/auth"
              className="inline-block rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 px-9 py-3 font-semibold tracking-wide text-white transition duration-300 hover:scale-[1.03] hover:from-fuchsia-400 hover:via-violet-400 hover:to-indigo-400"
            >
              Get Started
            </Link>
          </div>
        </section>
        <footer className="mt-auto w-full rounded-2xl border border-violet-400/20 bg-gradient-to-r from-slate-950/90 via-slate-900/85 to-slate-950/90 p-6 text-center shadow-xl shadow-black/40 backdrop-blur-md">
          <p className="text-sm font-medium text-slate-200">
            Your AI study companion for smarter practice and calm consistency.
          </p>
          <div className="mx-auto mt-3 h-px w-32 bg-violet-300/30" />
          <p className="mt-3 text-xs tracking-wide text-violet-200/90">
            Assignments • Flashcards • Quizzes • Roadmaps
          </p>
        </footer>
      </div>
    </main>
  )
}

export default LandingPage
