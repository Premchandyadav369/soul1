import React, { useState } from 'react';
import { questions, usesPsychometricStore } from '../store/psychometricStore';
import { Brain, TrendingUp, Users } from 'lucide-react';

const categoryIcons = {
  self_honesty: <Brain className="h-5 w-5" />,
  emotional_stability: <TrendingUp className="h-5 w-5" />,
  social_perception: <Users className="h-5 w-5" />,
};

const categoryLabels = {
  self_honesty: 'Self-Honesty',
  emotional_stability: 'Emotional Stability',
  social_perception: 'Social Perception',
};

export function PsychometricPage() {
  const { addResponse, getScoreByCategory } = usesPsychometricStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: number) => {
    addResponse(questions[currentQuestion].id, value);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Psychometric Results</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(categoryLabels).map(([category, label]) => (
              <div key={category} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  {categoryIcons[category as keyof typeof categoryIcons]}
                  <h3 className="text-lg font-semibold">{label}</h3>
                </div>
                <div className="text-3xl font-bold text-indigo-600">
                  {getScoreByCategory(category as any)}%
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setCurrentQuestion(0);
              setShowResults(false);
            }}
            className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Start New Assessment
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Psychometric Assessment</h1>
          <div className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            {categoryIcons[question.category]}
            <span className="text-sm font-medium text-gray-600">
              {categoryLabels[question.category]}
            </span>
          </div>
          <h2 className="text-xl font-medium text-gray-800">{question.question}</h2>
        </div>

        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition duration-200"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}