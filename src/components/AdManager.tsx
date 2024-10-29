import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

interface AdManagerProps {
  children: React.ReactNode;
}

export function AdManager({ children }: AdManagerProps) {
  const [showAd, setShowAd] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const { user } = useAuthStore();
  const isPremium = false; // TODO: Implement premium check

  useEffect(() => {
    if (!isPremium) {
      setShowAd(true);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isPremium]);

  if (!showAd || isPremium) return <>{children}</>;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Support Soul</h2>
        <p className="text-gray-600 mb-4">
          Upgrade to Soul Oasis for an ad-free experience and premium features.
        </p>
        {timeLeft > 0 ? (
          <p className="text-sm text-gray-500">
            Ad will be skippable in {timeLeft} seconds...
          </p>
        ) : (
          <button
            onClick={() => setShowAd(false)}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Skip Ad
          </button>
        )}
      </div>
    </div>
  );
}