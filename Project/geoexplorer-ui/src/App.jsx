import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { AppRoutes } from './routes'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-geo-bg text-white">
      <header className="sticky top-0 z-50 border-b border-geo-p20/40 bg-geo-bg/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <Navbar />
        </div>
      </header>

      <div className="flex flex-1 flex-col">
        <main className="flex-1 w-full">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
            <AppRoutes />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App
