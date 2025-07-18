'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeft, Menu } from 'lucide-react'

interface Activity {
  id: string
  name: string
  calories: number
  image: string
  color: string
}

interface ActivityScreenProps {
  onBack: () => void;
  onActivitySelect: (activity: Activity) => void;
  onNavigateToStats?: () => void;
  onCaloriePredictor: () => void;
  onFatburnPredictor: () => void;
}

export function ActivityScreen({
  onBack,
  onActivitySelect,
  onNavigateToStats,
  onCaloriePredictor,
  onFatburnPredictor,
}: ActivityScreenProps) {
  const [selectedTab, setSelectedTab] = useState("popular");

  const activities: Activity[] = [
    {
      id: "1",
      name: "Swimming",
      calories: 430,
      image: "swimming",
      color: "from-blue-400 to-cyan-400",
    },
    {
      id: "2",
      name: "Playing Tennis",
      calories: 430,
      image: "tennis",
      color: "from-green-400 to-teal-400",
    },
    {
      id: "3",
      name: "Running",
      calories: 380,
      image: "running",
      color: "from-orange-400 to-red-400",
    },
    {
      id: "4",
      name: "Cycling",
      calories: 320,
      image: "cycling",
      color: "from-purple-400 to-pink-400",
    },
  ];

  const renderActivityIllustration = (activity: Activity) => {
    switch (activity.image) {
      case "swimming":
        return (
          <div className="relative h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-4 overflow-hidden">
            {/* Pool background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-blue-300 opacity-30"></div>
            {/* Water waves */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-blue-300 opacity-40 rounded-full"></div>
            <div className="absolute bottom-2 left-0 right-0 h-6 bg-blue-400 opacity-30 rounded-full"></div>

            {/* Swimmer */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="relative">
                {/* Head */}
                <div className="w-8 h-8 bg-orange-300 rounded-full mx-auto mb-1"></div>
                {/* Body swimming */}
                <div className="w-12 h-6 bg-blue-600 rounded-full mx-auto relative">
                  {/* Arms extended */}
                  <div className="absolute -left-2 -top-1 w-8 h-3 bg-orange-300 rounded-full transform -rotate-12"></div>
                  <div className="absolute -right-2 -top-1 w-8 h-3 bg-orange-300 rounded-full transform rotate-12"></div>
                </div>
                {/* Splash effects */}
                <div className="absolute -left-4 top-4 w-2 h-2 bg-white rounded-full opacity-60"></div>
                <div className="absolute -right-4 top-4 w-2 h-2 bg-white rounded-full opacity-60"></div>
              </div>
            </div>
          </div>
        );

      case "tennis":
        return (
          <div className="relative h-32 bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl p-4 overflow-hidden">
            {/* Court background */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-200 to-green-300 opacity-30"></div>
            {/* Court lines */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white opacity-60"></div>

            {/* Tennis player */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="relative">
                {/* Head */}
                <div className="w-8 h-8 bg-orange-300 rounded-full mx-auto mb-1"></div>
                {/* Body */}
                <div className="w-10 h-12 bg-white rounded-xl mx-auto mb-1 relative">
                  {/* Racket arm */}
                  <div className="absolute -right-3 -top-2 w-6 h-8 bg-orange-300 rounded-full transform rotate-45"></div>
                  {/* Racket */}
                  <div className="absolute -right-6 -top-4 w-4 h-6 border-2 border-gray-600 rounded-full bg-transparent"></div>
                  {/* Other arm */}
                  <div className="absolute -left-2 top-2 w-4 h-6 bg-orange-300 rounded-full"></div>
                </div>
                {/* Legs */}
                <div className="flex justify-center gap-1">
                  <div className="w-3 h-8 bg-white rounded-full"></div>
                  <div className="w-3 h-8 bg-white rounded-full"></div>
                </div>
                {/* Tennis ball */}
                <div className="absolute -left-6 top-2 w-3 h-3 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div
            className={`relative h-32 bg-gradient-to-br ${activity.color} opacity-20 rounded-2xl p-4`}
          >
            <div className="flex items-center justify-center h-full">
              <div className="text-4xl">🏃‍♂️</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-900"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Find your</h1>
          <h2 className="text-2xl font-bold text-gray-900">activity</h2>
        </div>
      </div>

      {/* Activity Tabs */}
      <div className="px-4 py-6">
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl p-1">
            <TabsTrigger
              value="popular"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
            >
              Popular
            </TabsTrigger>
            <TabsTrigger
              value="moderate"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium text-gray-500"
            >
              Moderate
            </TabsTrigger>
            <TabsTrigger
              value="intensive"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium text-gray-500"
            >
              Intensive
            </TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="mt-6">
            <div className="space-y-4">
              {activities.slice(0, 2).map((activity) => (
                <Card
                  key={activity.id}
                  className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onActivitySelect(activity)}
                >
                  <CardContent className="p-4">
                    {renderActivityIllustration(activity)}
                    <div className="flex items-center justify-between mt-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {activity.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⚡</span>
                        <span className="text-sm font-medium text-gray-600">
                          {activity.calories}Kcal/hr
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="moderate" className="mt-6">
            <div className="space-y-4">
              {activities.slice(2, 4).map((activity) => (
                <Card
                  key={activity.id}
                  className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onActivitySelect(activity)}
                >
                  <CardContent className="p-4">
                    {renderActivityIllustration(activity)}
                    <div className="flex items-center justify-between mt-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {activity.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⚡</span>
                        <span className="text-sm font-medium text-gray-600">
                          {activity.calories}Kcal/hr
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="intensive" className="mt-6">
            <div className="space-y-4">
              {activities.map((activity) => (
                <Card
                  key={activity.id}
                  className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onActivitySelect(activity)}
                >
                  <CardContent className="p-4">
                    {renderActivityIllustration(activity)}
                    <div className="flex items-center justify-between mt-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {activity.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">⚡</span>
                        <span className="text-sm font-medium text-gray-600">
                          {activity.calories}Kcal/hr
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-around">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600"
            >
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600"
              onClick={onFatburnPredictor}
            >
              <div className="w-6 h-6 flex flex-col gap-0.5">
                <div className="w-full h-1 bg-gray-400 rounded"></div>
                <div className="w-full h-1 bg-gray-400 rounded"></div>
                <div className="w-full h-1 bg-gray-400 rounded"></div>
              </div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600"
              onClick={onCaloriePredictor}
            >
              <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600"
              onClick={onNavigateToStats}
            >
              <div className="w-6 h-6 flex flex-col gap-1">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
