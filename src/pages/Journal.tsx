import React, { useState } from 'react';
import { useJournalStore, JournalEntry } from '../store/journalStore';
import { Flame, Coins, Heart, Sparkles, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const prompts = {
  dharma: [
    'What gives you a sense of purpose today?',
    'How did you serve others today?',
    'What meaningful goal are you working towards?',
  ],
  artha: [
    'What steps did you take towards financial growth?',
    'How did you create value today?',
    'What resources do you need to achieve your goals?',
  ],
  kama: [
    'What brought you joy today?',
    'How did you practice self-care?',
    'What relationships enriched your life today?',
  ],
  moksha: [
    'What insights did you gain today?',
    'How did you practice mindfulness?',
    'What let you feel more connected to yourself?',
  ],
};

export function JournalPage() {
  const { entries, addEntry, deleteEntry } = useJournalStore();
  const [selectedQuadrant, setSelectedQuadrant] = useState<JournalEntry['quadrant']>('dharma');
  const [content, setContent] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState(prompts[selectedQuadrant][0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addEntry({
      content,
      mood: 'neutral',
      quadrant: selectedQuadrant,
      prompt: selectedPrompt,
    });
    setContent('');
  };

  const quadrantIcons = {
    dharma: <Flame className="h-5 w-5" />,
    artha: <Coins className="h-5 w-5" />,
    kama: <Heart className="h-5 w-5" />,
    moksha: <Sparkles className="h-5 w-5" />,
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Journal</h1>
        
        <div className="grid grid-cols-4 gap-4 mb-6">
          {(Object.keys(quadrantIcons) as Array<keyof typeof quadrantIcons>).map((quadrant) => (
            <button
              key={quadrant}
              onClick={() => {
                setSelectedQuadrant(quadrant);
                setSelectedPrompt(prompts[quadrant][0]);
              }}
              className={`flex items-center justify-center p-3 rounded-lg ${
                selectedQuadrant === quadrant
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {quadrantIcons[quadrant]}
              <span className="ml-2 capitalize">{quadrant}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Today's Prompt
            </label>
            <select
              value={selectedPrompt}
              onChange={(e) => setSelectedPrompt(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {prompts[selectedQuadrant].map((prompt) => (
                <option key={prompt} value={prompt}>
                  {prompt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Thoughts
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-32"
              placeholder="Write your thoughts here..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Save Entry
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Entries</h2>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 bg-gray-50 rounded-lg space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {quadrantIcons[entry.quadrant]}
                  <span className="text-sm text-gray-500">
                    {format(new Date(entry.date), 'MMM d, yyyy')}
                  </span>
                </div>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 italic">{entry.prompt}</p>
              <p className="text-gray-800">{entry.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}