import { useAuth } from '../hooks/useAuth'
import BrandLogo from '../components/layout/BrandLogo'

function DashboardPage() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <main className="relative min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <BrandLogo className="absolute left-6 top-6 z-20" />
      <div className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-700 bg-slate-900/70 p-8">
        <h1 className="text-3xl font-bold text-violet-300">Dashboard</h1>
        <p className="mt-2 text-slate-300">Welcome {user?.name || 'friend'}.</p>
        <p className="mt-1 text-slate-400">Core Calm Mate widgets will be added feature-by-feature.</p>
        <button
          onClick={handleLogout}
          className="mt-6 rounded-lg border border-slate-600 px-4 py-2 text-slate-100 hover:bg-slate-800"
        >
          Logout
        </button>
      </div>
    </main>
  )
}

export default DashboardPage
