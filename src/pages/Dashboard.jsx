import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useSubject } from '../context/SubjectContext'
import { getUserAssignments, getLatestQuizResult, addAssignment } from '../services/db'
import { generateAIQuestions } from '../services/ai'
import BrandLogo from '../components/layout/BrandLogo'

const SIDEBAR_ITEMS = [
  { label: 'Home', to: '/feature-cards' },
  { label: 'Assignment', to: '/assignments' },
  { label: 'Flashcards', to: '/flashcards' },
  { label: 'Roadmap', to: '/roadmap' },
  { label: 'Graded Quiz', to: '/graded-quiz' },
]

function Dashboard() {
  const { user, logout } = useAuth()
  const { selectedSubject, setSelectedSubject, subjects } = useSubject()
  const [isGenerating, setIsGenerating] = useState(false)
  const [stats, setStats] = useState({
    assignmentPercent: 0,
    quizPercent: 0
  })

  const fetchStats = async () => {
    if (!user) return
    try {
      const assignments = await getUserAssignments(user.uid, selectedSubject)
      const aPercent = assignments.length > 0 
        ? Math.round((assignments.filter(a => a.completed).length / assignments.length) * 100)
        : 0

      const latestQuiz = await getLatestQuizResult(user.uid, selectedSubject)
      const qPercent = latestQuiz ? latestQuiz.percentage : 0

      setStats({
        assignmentPercent: aPercent,
        quizPercent: qPercent
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [user, selectedSubject])

  const handleGenerate = async () => {
    if (!user) return
    setIsGenerating(true)
    try {
      const newQuestions = await generateAIQuestions(selectedSubject)
      
      // Save all 10 questions to Firestore
      for (const q of newQuestions) {
        await addAssignment(user.uid, {
          ...q,
          subject: selectedSubject
        })
      }
      
      alert(`Successfully generated 10 new ${selectedSubject} assignments!`)
      fetchStats() // Refresh progress bars
    } catch (error) {
      alert(error.message)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      
      {/* Left Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-slate-900/50 p-6 backdrop-blur-xl flex flex-col">
        <BrandLogo className="mb-10" />
        
        <nav className="flex-1 space-y-2">
          {SIDEBAR_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition hover:bg-violet-500/10 hover:text-violet-300"
            >
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <span>🚪</span>
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* Center Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 mt-1">Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'Student'}!</p>
          </div>
          
          <div className="flex items-center gap-4">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-200 outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
            >
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </header>

        <section className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <div className="relative group">
            <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-r from-violet-600 to-fuchsia-600 transition duration-1000 ${isGenerating ? 'opacity-100 animate-pulse' : 'opacity-25 blur group-hover:opacity-75 group-hover:duration-200'}`}></div>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="relative flex flex-col items-center gap-4 rounded-3xl bg-slate-900 px-12 py-10 transition-transform hover:scale-[1.02] disabled:cursor-wait disabled:scale-100"
            >
              <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/20 text-4xl border border-violet-500/30 ${isGenerating ? 'animate-spin' : ''}`}>
                {isGenerating ? '⚙️' : '🚀'}
              </div>
              <div>
                <span className="block text-2xl font-bold text-white mb-1">
                  {isGenerating ? 'Generating...' : 'Random Practice Questions'}
                </span>
                <span className="text-slate-400 text-sm">
                  {isGenerating ? 'Consulting Groq AI...' : `Generate 10 AI questions for ${selectedSubject}`}
                </span>
              </div>
            </button>
          </div>
        </section>
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 border-l border-white/5 bg-slate-900/50 p-8 backdrop-blur-xl space-y-8">
        <h3 className="text-lg font-bold text-white">Your Progress</h3>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-slate-400">Assignment Completion</span>
              <span className="text-violet-300">{stats.assignmentPercent}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all duration-1000 ease-out"
                style={{ width: `${stats.assignmentPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-slate-400">Quiz Performance</span>
              <span className="text-emerald-300">{stats.quizPercent}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000 ease-out"
                style={{ width: `${stats.quizPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-slate-950/50 p-6 mt-10">
          <h4 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Upcoming Tasks</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-violet-500"></div>
              <span className="text-sm text-slate-400 leading-snug">Complete DSA Trees Assignment</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-slate-400 leading-snug">English Vocab Quiz</span>
            </li>
          </ul>
        </div>
      </aside>

    </div>
  )
}

export default Dashboard
