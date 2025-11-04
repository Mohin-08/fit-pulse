import { Link, useLocation } from 'react-router-dom'
import { Home, Activity, Target, User, LogOut, Dumbbell } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const Navigation = () => {
  const location = useLocation()
  const { user, signOut } = useAuth()

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/workouts', icon: Activity, label: 'Workouts' },
    { path: '/goals', icon: Target, label: 'Goals' },
    { path: '/profile', icon: User, label: 'Profile' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-900">FitPulse</span>
            </Link>
            <div className="ml-10 flex space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
          {user && (
            <div className="flex items-center">
              <button
                onClick={() => signOut()}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
