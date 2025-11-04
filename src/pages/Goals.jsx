import { useState } from 'react'
import { Target, Plus, CheckCircle, Clock } from 'lucide-react'

const Goals = () => {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Run 50km this month', progress: 32, target: 50, unit: 'km', status: 'active' },
    { id: 2, title: 'Workout 4 times per week', progress: 3, target: 4, unit: 'sessions', status: 'active' },
    { id: 3, title: 'Burn 2000 calories weekly', progress: 1450, target: 2000, unit: 'cal', status: 'active' },
    { id: 4, title: 'Complete 30-day yoga challenge', progress: 30, target: 30, unit: 'days', status: 'completed' },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    unit: 'km'
  })

  const handleAddGoal = (e) => {
    e.preventDefault()
    const goal = {
      id: goals.length + 1,
      ...newGoal,
      target: parseInt(newGoal.target),
      progress: 0,
      status: 'active'
    }
    setGoals([...goals, goal])
    setNewGoal({ title: '', target: '', unit: 'km' })
    setShowAddForm(false)
  }

  const getProgressPercentage = (progress, target) => {
    return Math.min((progress / target) * 100, 100)
  }

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-green-500'
    if (percentage >= 75) return 'bg-blue-500'
    if (percentage >= 50) return 'bg-yellow-500'
    return 'bg-gray-300'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Goals</h1>
          <p className="mt-2 text-gray-600">Set and track your fitness objectives</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Goal
        </button>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Goal</h2>
          <form onSubmit={handleAddGoal} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Run 50km this month"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target
                </label>
                <input
                  type="number"
                  required
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={newGoal.unit}
                  onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="km">Kilometers</option>
                  <option value="sessions">Sessions</option>
                  <option value="cal">Calories</option>
                  <option value="days">Days</option>
                  <option value="hours">Hours</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Create Goal
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

      {/* Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const percentage = getProgressPercentage(goal.progress, goal.target)
          const isCompleted = goal.status === 'completed'
          
          return (
            <div
              key={goal.id}
              className={`bg-white rounded-lg shadow-sm border p-6 ${
                isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${isCompleted ? 'bg-green-100' : 'bg-primary-100'}`}>
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <Target className="h-6 w-6 text-primary-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                    <div className="mt-1 flex items-center space-x-2">
                      {isCompleted ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Clock className="h-3 w-3 mr-1" />
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold text-gray-900">
                    {goal.progress} / {goal.target} {goal.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${getProgressColor(percentage)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-600">
                    {percentage.toFixed(0)}% Complete
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Goals
