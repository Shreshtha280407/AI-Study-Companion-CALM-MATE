import { Link } from 'react-router-dom'
import BrandLogo from '../components/layout/BrandLogo'

const FAQS = [
  {
    question: "What exactly is Calm Mate?",
    answer: "Calm Mate is your AI-powered study companion designed to help you stay consistent, practice regularly, and master your subjects through personalized learning support and structured revision."
  },
  {
    question: "How does the AI generate practice questions?",
    answer: "Our AI analyzes standard curriculum patterns for your selected subjects (like Web Dev or DSA) to generate unique, relevant practice questions and assignments tailored to your level."
  },
  {
    question: "Which subjects can I study here?",
    answer: "Currently, we support Web Development, Data Structures & Algorithms (DSA), Mathematics, and English. We are constantly working to add more subjects to the platform!"
  },
  {
    question: "Is my progress tracked automatically?",
    answer: "Yes! Every quiz you take and every assignment you complete is tracked and visualized on your Dashboard so you can see exactly how much you've improved over time."
  },
  {
    question: "How does Calm Mate help with study consistency?",
    answer: "By providing structured roadmaps, daily flashcards, and a 'Random Practice' feature, we remove the friction of 'what to study next,' making it easier for you to just start and keep going."
  },
  {
    question: "Can I use Calm Mate on my mobile phone?",
    answer: "Yes! Calm Mate is fully responsive and works perfectly on your smartphone, tablet, or laptop so you can study anywhere, anytime."
  },
  {
    question: "Is there a limit to how many questions I can generate?",
    answer: "For our free tier, there is a daily limit to ensure everyone gets a smooth experience. Pro users enjoy unlimited AI question generation!"
  },
  {
    question: "How do I upgrade to Dashboard Pro?",
    answer: "You can visit the 'Dashboard Pro' card in your navigation menu to see our upcoming subscription plans and early-access benefits."
  }
]

function AboutFaq() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-12 text-slate-100">
      
      {/* Ambient Glow Effects */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/20 mix-blend-screen blur-[120px]"></div>
      <div className="pointer-events-none absolute -bottom-40 right-10 h-96 w-96 rounded-full bg-fuchsia-600/20 mix-blend-screen blur-[120px]"></div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-12 flex items-center justify-between">
          <BrandLogo />
          <Link 
            to="/feature-cards" 
            className="text-sm font-medium text-slate-400 hover:text-violet-300 transition-colors"
          >
            ← Back to Navigation
          </Link>
        </div>

        <header className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Frequently Asked Questions</h1>
          <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
            Hover over a question to reveal the answer. Explore everything Calm Mate has to offer.
          </p>
        </header>

        <section className="grid gap-4 mb-20">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className="group rounded-2xl border border-white/5 bg-slate-900/40 p-6 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/40 hover:bg-slate-900/60"
            >
              <h3 className="text-lg font-bold text-violet-300 flex items-center gap-3 transition-colors group-hover:text-white">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-sm opacity-50 group-hover:bg-violet-500/20 group-hover:opacity-100 transition-all">Q</span>
                {faq.question}
              </h3>
              <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="text-slate-400 leading-relaxed pt-4 pl-11">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <footer className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-slate-900 to-slate-950 p-10 text-center shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-2">Still have questions?</h2>
          <p className="text-slate-400 mb-8">We're here to help you on your learning journey.</p>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-sm text-slate-500 uppercase tracking-widest mb-1">Email Us</span>
              <a href="mailto:support@calmmate.ai" className="text-lg font-medium text-violet-300 hover:text-violet-200 underline underline-offset-4">
                support@calmmate.ai
              </a>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-slate-500 uppercase tracking-widest mb-1">Follow Us</span>
              <span className="text-lg font-medium text-fuchsia-300">@CalmMateAI</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}

export default AboutFaq
