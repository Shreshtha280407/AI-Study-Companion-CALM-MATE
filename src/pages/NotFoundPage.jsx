import { Link } from 'react-router-dom'
import BrandLogo from '../components/layout/BrandLogo'

function NotFoundPage() {
  return (
    <main className="relative grid min-h-screen place-items-center bg-slate-950 px-6 text-slate-100">
      <BrandLogo className="absolute left-6 top-6 z-20" />
      <div className="text-center">
        <h1 className="text-3xl font-bold text-violet-300">404</h1>
        <p className="mt-2 text-slate-300">Page not found.</p>
        <Link to="/" className="mt-4 inline-block text-violet-300 hover:text-violet-200">
          Go home
        </Link>
      </div>
    </main>
  )
}

export default NotFoundPage
