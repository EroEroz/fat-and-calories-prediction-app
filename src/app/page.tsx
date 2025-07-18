"use client";

import { useState } from "react";
import { OnboardingScreen } from "@/components/onboarding-screen";
import { PersonalInfoScreen } from "@/components/personal-info-screen";
import { ActivityScreen } from "@/components/activity-screen";
import { StatisticsScreen } from "@/components/statistics-screen";
import { CaloriePredictorScreen } from "@/components/calorie-predictor-screen";
import CaloriePredictor from "@/components/calorie-predictor";

type Screen =
  | "onboarding"
  | "personal-info"
  | "activity"
  | "statistics"
  | "calorie-predictor";

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
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);

  const handleGetStarted = () => {
    setCurrentScreen("personal-info");
  };

  const handlePersonalInfoSubmit = (info: PersonalInfo) => {
    setPersonalInfo(info);
    setCurrentScreen("activity");
  };

  const handleActivitySelect = (activity: Activity) => {
    setSelectedActivity(activity);
    // Could navigate to workout detail or start workout
    console.log("Selected activity:", activity);
  };

  const handleBackToOnboarding = () => {
    setCurrentScreen("onboarding");
  };

  const handleBackToPersonalInfo = () => {
    setCurrentScreen("personal-info");
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

  // Render the appropriate screen based on current state
  switch (currentScreen) {
    case "onboarding":
      return <OnboardingScreen onGetStarted={handleGetStarted} />;

    case "personal-info":
      return (
        <PersonalInfoScreen
          onBack={handleBackToOnboarding}
          onContinue={handlePersonalInfoSubmit}
        />
      );

    case "activity":
      return (
        <>
          <ActivityScreen
            onBack={handleBackToPersonalInfo}
            onActivitySelect={handleActivitySelect}
            onNavigateToStats={handleNavigateToStats}
            onCaloriePredictor={handleNavigateToCaloriePredictor}
          />
        </>
      );

    case "statistics":
      return (
        <StatisticsScreen
          onBack={handleBackToActivity}
          onCaloriePredictor={handleNavigateToCaloriePredictor}
        />
      );

    case "calorie-predictor":
      return (
        <CaloriePredictorScreen
          onBack={handleBackToActivity}
          onStatistics={handleNavigateToStats}
          onCaloriePredictor={handleNavigateToCaloriePredictor}
        />
      );

    default:
      return <OnboardingScreen onGetStarted={handleGetStarted} />;
  }
}
