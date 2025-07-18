"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StatisticsScreenProps {
  onBack: () => void;
  onCaloriePredictor: () => void;
}

export function StatisticsScreen({
  onBack,
  onCaloriePredictor,
}: StatisticsScreenProps) {
  const [selectedMonth, setSelectedMonth] = useState("april");
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const chartData = [
    { day: "M", value: 60, color: "bg-green-400" },
    { day: "T", value: 40, color: "bg-yellow-400" },
    { day: "W", value: 80, color: "bg-blue-400" },
    { day: "T", value: 30, color: "bg-green-400" },
    { day: "F", value: 90, color: "bg-red-400" },
    { day: "S", value: 70, color: "bg-blue-400" },
    { day: "W", value: 85, color: "bg-green-400" },
  ];

  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
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

        {/* Profile Section */}
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/api/placeholder/64/64" alt="Profile" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
              NV
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Nguyen Van Den</h2>
            <p className="text-gray-500">Vietnam</p>
          </div>
        </div>
      </div>

      {/* Month Tabs */}
      <div className="px-4 py-4">
        <Tabs
          value={selectedMonth}
          onValueChange={setSelectedMonth}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5 bg-transparent gap-2 h-auto p-0">
            {["April", "May", "June", "July", "August"].map((month) => (
              <TabsTrigger
                key={month.toLowerCase()}
                value={month.toLowerCase()}
                className={`rounded-lg py-2 px-3 text-sm font-medium transition-colors ${
                  selectedMonth === month.toLowerCase()
                    ? "bg-black text-white shadow-sm"
                    : "bg-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {month}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Statistics Section */}
      <div className="px-4 py-4">
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Statistics
              </h3>
              <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <TabsList className="bg-gray-100 rounded-lg p-1 h-8">
                  <TabsTrigger
                    value="week"
                    className="text-xs px-3 py-1 rounded data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Week
                  </TabsTrigger>
                  <TabsTrigger
                    value="month"
                    className="text-xs px-3 py-1 rounded data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Month
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Chart */}
            <div className="mb-8">
              <div className="flex items-end justify-between h-32 gap-2">
                {chartData.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 flex-1"
                  >
                    <div className="relative w-full flex items-end justify-center h-24">
                      <div
                        className={`w-3 ${item.color} rounded-full transition-all duration-300`}
                        style={{ height: `${(item.value / maxValue) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🔥</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Fat</h4>
                  <p className="text-sm text-gray-500">0.45 kg burned</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">⚡</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Calories</h4>
                  <p className="text-sm text-gray-500">3512 calories burned</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-around">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600"
              onClick={onBack}
            >
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600"
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
