import { useState } from 'react'
import { Plus, Activity, Clock, Flame } from 'lucide-react'

const Workouts = () => {
  const [workouts, setWorkouts] = useState([
    { id: 1, name: 'Morning Run', type: 'Cardio', duration: 30, calories: 320, date: '2025-11-04', intensity: 'Moderate' },
    { id: 2, name: 'Upper Body Strength', type: 'Strength', duration: 45, calories: 280, date: '2025-11-03', intensity: 'High' },
    { id: 3, name: 'Yoga Session', type: 'Flexibility', duration: 60, calories: 180, date: '2025-11-02', intensity: 'Low' },
    { id: 4, name: 'HIIT Workout', type: 'Cardio', duration: 25, calories: 350, date: '2025-11-01', intensity: 'High' },
    { id: 5, name: 'Lower Body Strength', type: 'Strength', duration: 50, calories: 300, date: '2025-10-31', intensity: 'Moderate' },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    type: 'Cardio',
    duration: '',
    calories: '',
    intensity: 'Moderate'
  })

  const handleAddWorkout = (e) => {
    e.preventDefault()
    const workout = {
      id: workouts.length + 1,
      ...newWorkout,
      duration: parseInt(newWorkout.duration),
      calories: parseInt(newWorkout.calories),
      date: new Date().toISOString().split('T')[0]
    }
    setWorkouts([workout, ...workouts])
    setNewWorkout({ name: '', type: 'Cardio', duration: '', calories: '', intensity: 'Moderate' })
    setShowAddForm(false)
  }

  const getIntensityColor = (intensity) => {
    const colors = {
      Low: 'bg-green-100 text-green-800',
      Moderate: 'bg-yellow-100 text-yellow-800',
      High: 'bg-red-100 text-red-800'
    }
    return colors[intensity] || colors.Moderate
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Workouts</h1>
          <p className="mt-2 text-gray-600">Track and manage your fitness activities</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Log Workout
        </button>
      </div>

      {/* Add Workout Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Log New Workout</h2>
          <form onSubmit={handleAddWorkout} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Workout Name
                </label>
                <input
                  type="text"
                  required
                  value={newWorkout.name}
                  onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Morning Run"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={newWorkout.type}
                  onChange={(e) => setNewWorkout({ ...newWorkout, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option>Cardio</option>
                  <option>Strength</option>
                  <option>Flexibility</option>
                  <option>Sports</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  required
                  value={newWorkout.duration}
                  onChange={(e) => setNewWorkout({ ...newWorkout, duration: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calories Burned
                </label>
                <input
                  type="number"
                  required
                  value={newWorkout.calories}
                  onChange={(e) => setNewWorkout({ ...newWorkout, calories: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="250"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Intensity
                </label>
                <select
                  value={newWorkout.intensity}
                  onChange={(e) => setNewWorkout({ ...newWorkout, intensity: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option>Low</option>
                  <option>Moderate</option>
                  <option>High</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Save Workout
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Workouts List */}
      <div className="grid grid-cols-1 gap-4">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Activity className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-600">{workout.type}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{workout.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-medium">{workout.duration} min</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Flame className="h-5 w-5 mr-2" />
                  <span className="font-medium">{workout.calories} cal</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getIntensityColor(workout.intensity)}`}>
                  {workout.intensity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Workouts
