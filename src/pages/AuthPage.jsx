import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import BrandLogo from '../components/layout/BrandLogo'
import LoginForm from '../components/auth/LoginForm'
import SignupForm from '../components/auth/SignupForm'
import GoogleAuthButton from '../components/auth/GoogleAuthButton'

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect away if already logged in
    if (user) {
      navigate('/feature-cards', { replace: true })
    }
  }, [user, navigate])

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

        {/* Right Side: Auth Form */}
        <section className="flex flex-col justify-center rounded-3xl border border-white/10 bg-slate-950/60 p-10 shadow-2xl backdrop-blur-xl">
          <h1 className="mb-2 mt-4 text-2xl font-bold text-violet-300">
            {isLogin ? 'Welcome Back!' : 'Create an Account'}
          </h1>
          <p className="mb-8 text-sm text-slate-400">
            {isLogin ? 'Log in to continue your learning journey.' : 'Join Calm Mate to start practicing smarter.'}
          </p>

          <div className="mb-6">
            {isLogin ? <LoginForm /> : <SignupForm />}
          </div>

          <div className="relative mb-6 text-center text-sm">
            <span className="relative z-10 bg-slate-900 px-2 text-slate-500">OR</span>
            <div className="absolute top-1/2 w-full border-t border-slate-800"></div>
          </div>

          <GoogleAuthButton />

          <p className="mt-8 text-center text-sm text-slate-400">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-violet-400 hover:text-violet-300 hover:underline"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>

          <div className="mt-6 text-center">
            <Link to="/" className="inline-block text-sm text-slate-500 hover:text-slate-400">
              ← Back to landing
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AuthPage
