"use client";

import { useState } from "react";
import { ActivityScreen } from "@/components/activity-screen";
import { StatisticsScreen } from "@/components/statistics-screen";
import { CaloriePredictorScreen } from "@/components/calorie-predictor-screen";
import { FatburnPredictorScreen } from "@/components/fatburn_predictor-screen";

type Screen =
  | "activity"
  | "statistics"
  | "calorie-predictor"
  | "fatburn-predictor";

interface Activity {
  id: string;
  name: string;
  calories: number;
  image: string;
  color: string;
}

interface PersonalInfo {
  height: string;
  weight: string;
  age: string;
  gender: string;
}

export default function FitnessTracker() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("statistics");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );


  const handleActivitySelect = (activity: Activity) => {
    setSelectedActivity(activity);
    // Could navigate to workout detail or start workout
    console.log("Selected activity:", activity);
  };


  const handleBackToActivity = () => {
    setCurrentScreen("activity");
  };

  const handleNavigateToStats = () => {
    setCurrentScreen("statistics");
  };

  const handleNavigateToCaloriePredictor = () => {
    setCurrentScreen("calorie-predictor");
  };
  const handleNavigateToFatburnPredictor = () => {
    setCurrentScreen("fatburn-predictor");
  };

  // Render the appropriate screen based on current state
  switch (currentScreen) {

    case "activity":
      return (
        <ActivityScreen
          onBack={handleBackToActivity}
          onActivitySelect={handleActivitySelect}
          onNavigateToStats={handleNavigateToStats}
          onCaloriePredictor={handleNavigateToCaloriePredictor}
          onFatburnPredictor={handleNavigateToFatburnPredictor}
        />
      );

    case "statistics":
      return (
        <StatisticsScreen
          onBack={handleBackToActivity}
          onCaloriePredictor={handleNavigateToCaloriePredictor}
          onFatburnPredictor={handleNavigateToFatburnPredictor}
        />
      );

    case "calorie-predictor":
      return (
        <CaloriePredictorScreen
          onBack={handleBackToActivity}
          onStatistics={handleNavigateToStats}
          onCaloriePredictor={handleNavigateToCaloriePredictor}
          onFatburnPredictor={handleNavigateToFatburnPredictor}
        />
      );

    case "fatburn-predictor":
      return (
        <FatburnPredictorScreen
          onBack={handleBackToActivity}
          onStatistics={handleNavigateToStats}
          onCaloriePredictor={handleNavigateToCaloriePredictor}
          onFatburnPredictor={handleNavigateToFatburnPredictor}
        />
      );

    default:
      return (
        <ActivityScreen
          onBack={handleBackToActivity}
          onActivitySelect={handleActivitySelect}
          onNavigateToStats={handleNavigateToStats}
          onCaloriePredictor={handleNavigateToCaloriePredictor}
          onFatburnPredictor={handleNavigateToFatburnPredictor}
        />
      );
  }
}
