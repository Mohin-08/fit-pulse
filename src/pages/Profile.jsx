import { useState } from 'react'
import { User, Mail, Calendar, Ruler, Weight, Target } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const Profile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: user?.email || 'demo@fitpulse.com',
    joinDate: '2024-01-15',
    age: 28,
    height: 175,
    weight: 72,
    targetWeight: 68,
    fitnessLevel: 'Intermediate'
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setIsEditing(false)
    // Here you would typically save to Supabase
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-2 text-gray-600">Manage your personal information and preferences</p>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center space-x-6">
          <div className="bg-primary-100 p-6 rounded-full">
            <User className="h-16 w-16 text-primary-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
            <p className="text-gray-600 flex items-center mt-1">
              <Mail className="h-4 w-4 mr-2" />
              {profile.email}
            </p>
            <p className="text-gray-600 flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-2" />
              Member since {new Date(profile.joinDate).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                disabled={!isEditing}
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                disabled={!isEditing}
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fitness Level
              </label>
              <select
                disabled={!isEditing}
                value={profile.fitnessLevel}
                onChange={(e) => setProfile({ ...profile, fitnessLevel: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Expert</option>
              </select>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Body Metrics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Body Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Ruler className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Height</p>
              <p className="text-xl font-bold text-gray-900">{profile.height} cm</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-green-100 p-3 rounded-lg">
              <Weight className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Weight</p>
              <p className="text-xl font-bold text-gray-900">{profile.weight} kg</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Target Weight</p>
              <p className="text-xl font-bold text-gray-900">{profile.targetWeight} kg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
