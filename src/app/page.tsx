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

  const [selectedMonth, setSelectedMonth] = useState('april');
  const months = ['april', 'may', 'june', 'july', 'august'];
  const defaultChart = [
    { day: 'M', fat: 0, calories: 0 },
    { day: 'T', fat: 0, calories: 0 },
    { day: 'W', fat: 0, calories: 0 },
    { day: 'Th', fat: 0, calories: 0 },
    { day: 'F', fat: 0, calories: 0 },
    { day: 'Sa', fat: 0, calories: 0 },
    { day: 'Su', fat: 0, calories: 0 },
  ];
  const [chartsByMonth, setChartsByMonth] = useState(
    Object.fromEntries(months.map(m => [m, defaultChart.map(d => ({ ...d }))]))
  );
  const [fat, setFat] = useState(0);
  const [calories, setCalories] = useState(0);
  const [name, setName] = useState("Nguyen Van Den");
  const [nationality, setNationality] = useState("Vietnam");

  const handlePredictionResult = (type: 'fat' | 'calories', value: number, day: string, month: string) => {
    if (type === 'fat') setFat(prev => prev + value);
    if (type === 'calories') setCalories(prev => prev + value);
    setChartsByMonth(prev => {
      const newMonthData = [...prev[month]];
      const dayIndex = newMonthData.findIndex(d => d.day === day);
      if (dayIndex !== -1) {
        if (type === 'fat') {
          newMonthData[dayIndex] = {
            ...newMonthData[dayIndex],
            fat: newMonthData[dayIndex].fat + value,
          };
        } else if (type === 'calories') {
          newMonthData[dayIndex] = {
            ...newMonthData[dayIndex],
            calories: newMonthData[dayIndex].calories + value,
          };
        }
      }
      return { ...prev, [month]: newMonthData };
    });
  };


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

  const handleSaveFat = (day: string, value: number, month: string) => {
    handlePredictionResult('fat', value, day, month);
  };

  const handleSaveCalories = (day: string, value: number, month: string) => {
    handlePredictionResult('calories', value, day, month);
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
          onPredictionResult={handlePredictionResult}
          selectedMonth={selectedMonth}
        />
      );

    case "statistics":
      return (
        <StatisticsScreen
          onBack={handleBackToActivity}
          onCaloriePredictor={handleNavigateToCaloriePredictor}
          onFatburnPredictor={handleNavigateToFatburnPredictor}
          fat={fat}
          calories={calories}
          chartsByMonth={chartsByMonth}
          setFat={setFat}
          setCalories={setCalories}
          setChartsByMonth={setChartsByMonth}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          name={name}
          setName={setName}
          nationality={nationality}
          setNationality={setNationality}
        />
      );

    case "calorie-predictor":
      return (
        <CaloriePredictorScreen
          onBack={handleBackToActivity}
          onStatistics={handleNavigateToStats}
          onCaloriePredictor={handleNavigateToCaloriePredictor}
          onFatburnPredictor={handleNavigateToFatburnPredictor}
          onSaveCalories={handleSaveCalories}
        />
      );

    case "fatburn-predictor":
      return (
        <FatburnPredictorScreen
          onBack={handleBackToActivity}
          onStatistics={handleNavigateToStats}
          onCaloriePredictor={handleNavigateToCaloriePredictor}
          onFatburnPredictor={handleNavigateToFatburnPredictor}
          onSaveFat={handleSaveFat}
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
          onPredictionResult={handlePredictionResult}
          selectedMonth={selectedMonth}
        />
      );
  }
}
