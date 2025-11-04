import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import Workouts from './pages/Workouts'
import Goals from './pages/Goals'
import Profile from './pages/Profile'
import Login from './pages/Login'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <>
                  <Navigation />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/workouts" element={<Workouts />} />
                    <Route path="/goals" element={<Goals />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

