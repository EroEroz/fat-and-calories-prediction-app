'use client'

import { Button } from '@/components/ui/button'

interface OnboardingScreenProps {
  onGetStarted: () => void
}

export function OnboardingScreen({ onGetStarted }: OnboardingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      {/* Illustration Area */}
      <div className="flex-1 flex items-center justify-center px-8 pt-16">
        <div className="relative w-full max-w-sm">
          {/* Running Person Illustration */}
          <div className="relative bg-white rounded-3xl p-8 shadow-lg">
            <div className="flex items-center justify-center h-64">
              {/* Abstract running figure with geometric shapes */}
              <div className="relative">
                {/* Background shapes */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-200 rounded-full opacity-60"></div>
                <div className="absolute -bottom-2 -right-6 w-12 h-12 bg-yellow-200 rounded-full opacity-60"></div>
                <div className="absolute top-8 -right-4 w-8 h-8 bg-purple-200 rounded-full opacity-60"></div>
                
                {/* Running person silhouette */}
                <div className="relative z-10">
                  {/* Head */}
                  <div className="w-12 h-12 bg-orange-300 rounded-full mx-auto mb-2"></div>
                  
                  {/* Body */}
                  <div className="w-16 h-20 bg-yellow-400 rounded-2xl mx-auto mb-2 relative">
                    {/* Arms */}
                    <div className="absolute -left-3 top-4 w-6 h-12 bg-orange-300 rounded-full transform -rotate-12"></div>
                    <div className="absolute -right-3 top-4 w-6 h-12 bg-orange-300 rounded-full transform rotate-12"></div>
                  </div>
                  
                  {/* Legs */}
                  <div className="flex justify-center gap-2">
                    <div className="w-6 h-16 bg-teal-500 rounded-full transform rotate-12"></div>
                    <div className="w-6 h-16 bg-teal-500 rounded-full transform -rotate-12"></div>
                  </div>
                  
                  {/* Motion lines */}
                  <div className="absolute -left-8 top-16 w-16 h-1 bg-blue-300 rounded-full opacity-60"></div>
                  <div className="absolute -left-6 top-20 w-12 h-1 bg-blue-300 rounded-full opacity-40"></div>
                  <div className="absolute -left-4 top-24 w-8 h-1 bg-blue-300 rounded-full opacity-30"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-8 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Track your Active Lifestyle
          </h1>
          <p className="text-gray-600 text-lg">
            Find your way to the perfect body
          </p>
        </div>

        {/* Page Indicators */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-8 h-2 bg-orange-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>

        {/* Get Started Button */}
        <Button 
          onClick={onGetStarted}
          className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-2xl text-lg font-semibold"
        >
          Get Started
        </Button>
      </div>
    </div>
  )
}
