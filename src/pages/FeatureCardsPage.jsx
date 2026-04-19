import { Link } from 'react-router-dom'
import BrandLogo from '../components/layout/BrandLogo'

const NAV_CARDS = [
  {
    title: 'Dashboard',
    description: 'Track your study progress and view assignments.',
    to: '/dashboard',
    icon: '📊',
    color: 'from-violet-500/20 to-fuchsia-500/20',
    borderColor: 'border-violet-500/30'
  },
  {
    title: 'Dashboard Pro',
    description: 'Upgrade to unlock AI-powered personal tutoring.',
    to: '/plans',
    icon: '💎',
    color: 'from-fuchsia-500/20 to-pink-500/20',
    borderColor: 'border-fuchsia-500/30'
  },
  {
    title: 'FAQs & About Us',
    description: 'Learn more about Calm Mate and get support.',
    to: '/about-faq',
    icon: '❓',
    color: 'from-indigo-500/20 to-violet-500/20',
    borderColor: 'border-indigo-500/30'
  },
]

function FeatureCardsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-10 text-slate-100">
      
      {/* Ambient Glow Effects */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/30 mix-blend-screen blur-[120px]"></div>
      <div className="pointer-events-none absolute -bottom-40 right-10 h-96 w-96 rounded-full bg-fuchsia-600/20 mix-blend-screen blur-[120px]"></div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 mix-blend-screen blur-[120px]"></div>
      
      <BrandLogo className="absolute left-6 top-6 z-20" />
      
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-2 items-center min-h-[calc(100vh-5rem)]">
        
        {/* Left Side: Cute Robot */}
        <section className="flex items-center justify-center p-4">
          <img 
            src="/ai-companion.png" 
            alt="AI Companion" 
            className="w-full max-w-lg object-contain drop-shadow-[0_0_50px_rgba(168,85,247,0.45)] transition-transform duration-[2000ms] ease-in-out hover:-translate-y-4 hover:scale-105 animate-[pulse_4s_ease-in-out_infinite]"
          />
        </section>

        {/* Right Side: Navigation Cards */}
        <section className="flex flex-col gap-5">
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-violet-300">Welcome to Calm Mate</h1>
            <p className="text-slate-400 mt-2">Where would you like to go today?</p>
          </div>

          <div className="grid gap-4">
            {NAV_CARDS.map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className={`group relative overflow-hidden rounded-2xl border ${card.borderColor} bg-slate-950/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900/60 hover:shadow-2xl hover:shadow-violet-500/10 backdrop-blur-xl`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}></div>
                
                <div className="relative z-10 flex items-center gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-2xl border border-white/5 shadow-inner">
                    {card.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-100 group-hover:text-violet-300 transition-colors">{card.title}</h2>
                    <p className="text-sm text-slate-400 leading-relaxed">{card.description}</p>
                  </div>
                  <div className="ml-auto text-slate-600 group-hover:text-violet-400 transition-colors">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default FeatureCardsPage
