import { Footer } from './components/layout/Footer.tsx'
import { Navbar } from './components/layout/Navbar.tsx'
import { AppRoutes } from './routes.tsx'

function App() {
  return (
    <main className="min-h-screen bg-geo-bg text-white">
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-10">
        <header className="mb-6 rounded-2xl border border-geo-p20/40 bg-geo-card p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-geo-p10">Project Proposal Template</p>
          <h1 className="mt-2 text-3xl font-black">GeoExplorer Frontend Structure</h1>
          <p className="mt-2 text-geo-p10">Pages and components only. Backend implementation comes later.</p>
        </header>
        <Navbar />
        <div className="mt-6">
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </main>
  )
}

export default App
