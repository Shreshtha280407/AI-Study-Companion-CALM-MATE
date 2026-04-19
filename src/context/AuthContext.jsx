/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth, isConfigValid } from '../services/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  if (!isConfigValid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-slate-100">
        <div className="max-w-md rounded-xl border border-red-500/30 bg-red-500/10 p-8 text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-400">🔥 Missing Firebase Config!</h1>
          <p className="mb-4 text-slate-300">
            You need to open your <strong>.env</strong> file and paste in your Firebase configuration keys.
          </p>
          <p className="text-sm text-slate-400">
            The application cannot start until these are provided.
          </p>
        </div>
      </div>
    )
  }

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const logout = () => {
    return signOut(auth)
  }

  const value = useMemo(() => ({ user, loading, logout }), [user, loading])

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }

  return context
}
