import React from 'react';
import { useAuthStore } from '../store/authStore';
import { QuadrixMatrix } from '../components/QuadrixMatrix';
import { Activity, Brain, Calendar } from 'lucide-react';

export function DashboardPage() {
  const { user } = useAuthStore();

  const insights = [
    {
      title: 'Daily Reflection',
      description: 'Take a moment to journal your thoughts',
      icon: <Calendar className="h-5 w-5 text-indigo-500" />,
      action: 'Start Journal'
    },
    {
      title: 'Wellness Check',
      description: 'Complete today\'s wellness assessment',
      icon: <Activity className="h-5 w-5 text-emerald-500" />,
      action: 'Start Check'
    },
    {
      title: 'Mindfulness',
      description: 'Practice mindfulness meditation',
      icon: <Brain className="h-5 w-5 text-purple-500" />,
      action: 'Begin'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 mb-6">
          Your wellness journey continues. Here's your current status:
        </p>
        
        <QuadrixMatrix />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight) => (
          <div key={insight.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">
                {insight.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">{insight.title}</h3>
            <p className="text-gray-600 mb-4">{insight.description}</p>
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200">
              {insight.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}