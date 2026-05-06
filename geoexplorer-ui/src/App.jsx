import { useLocation } from 'react-router-dom'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { AdminNavbar } from './components/admin/AdminNavbar'
import { AppRoutes } from './routes'

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="flex min-h-screen flex-col bg-geo-bg text-geo-p10">
      {/* Top chrome */}
      <header className="sticky top-0 z-50 border-b border-[#e2e8f0] bg-geo-bg/95 backdrop-blur-md">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-4 lg:px-20">
          {isAdminRoute ? <AdminNavbar /> : <Navbar />}
        </div>
      </header>

      <div className="flex flex-1 flex-col">
        <main className="flex-1 w-full">
          <div className={`mx-auto w-full ${isAdminRoute ? 'max-w-7xl' : 'max-w-[1440px]'} px-6 py-8 lg:px-20`}>
            <AppRoutes />
          </div>
        </main>

        {!isAdminRoute && <Footer />}
      </div>
    </div>
  )
}

export default App
