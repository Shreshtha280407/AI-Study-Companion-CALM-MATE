import BrandLogo from './BrandLogo'

function PageScaffold({ title, subtitle, children }) {
  return (
    <main className="relative min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <BrandLogo className="absolute left-6 top-6 z-20" />
      <div className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-700 bg-slate-900/70 p-8">
        <h1 className="text-3xl font-bold text-violet-300">{title}</h1>
        {subtitle ? <p className="mt-2 text-slate-300">{subtitle}</p> : null}
        <div className="mt-6">{children}</div>
      </div>
    </main>
  )
}

export default PageScaffold
