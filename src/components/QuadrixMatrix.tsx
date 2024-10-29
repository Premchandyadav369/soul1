import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Coins, Heart, Sparkles } from 'lucide-react';

interface QuadrantData {
  score: number;
  label: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

export function QuadrixMatrix() {
  const navigate = useNavigate();

  const quadrants: QuadrantData[] = [
    {
      score: 75,
      label: 'Dharma',
      icon: <Flame className="h-6 w-6" />,
      color: 'from-orange-500',
      description: 'Purpose & Duty'
    },
    {
      score: 60,
      label: 'Artha',
      icon: <Coins className="h-6 w-6" />,
      color: 'from-emerald-500',
      description: 'Prosperity & Wealth'
    },
    {
      score: 85,
      label: 'Kama',
      icon: <Heart className="h-6 w-6" />,
      color: 'from-rose-500',
      description: 'Pleasure & Desires'
    },
    {
      score: 70,
      label: 'Moksha',
      icon: <Sparkles className="h-6 w-6" />,
      color: 'from-purple-500',
      description: 'Liberation & Enlightenment'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto p-4">
      {quadrants.map((quadrant) => (
        <button
          key={quadrant.label}
          onClick={() => navigate(`/insights/${quadrant.label.toLowerCase()}`)}
          className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${quadrant.color} to-white/90 shadow-lg hover:shadow-xl transition-all duration-300 group`}
        >
          <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              {quadrant.icon}
              <span className="text-2xl font-bold">{quadrant.score}%</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">{quadrant.label}</h3>
            <p className="text-sm opacity-75">{quadrant.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}