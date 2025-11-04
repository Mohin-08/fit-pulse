import { useState } from 'react'
import { Activity, Flame, Target, TrendingUp } from 'lucide-react'
import StatsCard from '../components/StatsCard'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const Dashboard = () => {
  const [stats] = useState({
    workouts: 24,
    calories: 2450,
    goals: 3,
    streak: 7,
  })

  // Sample data for the chart
  const activityData = [
    { day: 'Mon', calories: 420 },
    { day: 'Tue', calories: 380 },
    { day: 'Wed', calories: 510 },
    { day: 'Thu', calories: 390 },
    { day: 'Fri', calories: 450 },
    { day: 'Sat', calories: 520 },
    { day: 'Sun', calories: 480 },
  ]

  const recentWorkouts = [
    { id: 1, name: 'Morning Run', duration: '30 min', calories: 320, date: '2025-11-04' },
    { id: 2, name: 'Upper Body Strength', duration: '45 min', calories: 280, date: '2025-11-03' },
    { id: 3, name: 'Yoga Session', duration: '60 min', calories: 180, date: '2025-11-02' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
        <p className="mt-2 text-gray-600">Here's your fitness overview for this week</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Workouts"
          value={stats.workouts}
          icon={Activity}
          trend="up"
          trendValue="12% from last week"
          color="primary"
        />
        <StatsCard
          title="Calories Burned"
          value={stats.calories}
          icon={Flame}
          trend="up"
          trendValue="8% from last week"
          color="green"
        />
        <StatsCard
          title="Active Goals"
          value={stats.goals}
          icon={Target}
          color="blue"
        />
        <StatsCard
          title="Current Streak"
          value={`${stats.streak} days`}
          icon={TrendingUp}
          trend="up"
          trendValue="Personal best!"
          color="purple"
        />
      </div>

      {/* Activity Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Weekly Activity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
            />
            <Line 
              type="monotone" 
              dataKey="calories" 
              stroke="#0ea5e9" 
              strokeWidth={2}
              dot={{ fill: '#0ea5e9', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Workouts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Workouts</h2>
        <div className="space-y-4">
          {recentWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Activity className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{workout.name}</h3>
                  <p className="text-sm text-gray-600">{workout.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{workout.duration}</p>
                <p className="text-sm text-gray-600">{workout.calories} cal</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
