import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import AuthPage from '../pages/AuthPage'
import FeatureCardsPage from '../pages/FeatureCardsPage'
import Dashboard from '../pages/Dashboard'
import Assignments from '../pages/Assignments'
import Flashcards from '../pages/Flashcards'
import Roadmap from '../pages/Roadmap'
import GradedQuiz from '../pages/GradedQuiz'
import Plans from '../pages/Plans'
import AboutFaq from '../pages/AboutFaq'
import NotFoundPage from '../pages/NotFoundPage'
import ProtectedRoute from '../components/auth/ProtectedRoute'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/feature-cards"
        element={
          <ProtectedRoute>
            <FeatureCardsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assignments"
        element={
          <ProtectedRoute>
            <Assignments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/flashcards"
        element={
          <ProtectedRoute>
            <Flashcards />
          </ProtectedRoute>
        }
      />
      <Route
        path="/roadmap"
        element={
          <ProtectedRoute>
            <Roadmap />
          </ProtectedRoute>
        }
      />
      <Route
        path="/graded-quiz"
        element={
          <ProtectedRoute>
            <GradedQuiz />
          </ProtectedRoute>
        }
      />
      <Route
        path="/plans"
        element={
          <ProtectedRoute>
            <Plans />
          </ProtectedRoute>
        }
      />
      <Route
        path="/about-faq"
        element={
          <ProtectedRoute>
            <AboutFaq />
          </ProtectedRoute>
        }
      />
      <Route path="/home" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
