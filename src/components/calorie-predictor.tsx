import React, { useState } from "react";

interface CaloriePredictorProps {
  onSaveCalories?: (day: string, value: number, month: string) => void;
}

export default function CaloriePredictor({ onSaveCalories }: CaloriePredictorProps) {
  const [form, setForm] = useState({
    Age: "",
    Gender: "Male",
    Height: "",
    Weight: "",
    Duration: "",
    Intensity_Level: "Low",
  });
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [showDaySelect, setShowDaySelect] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("april");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setShowSave(false);
    setShowDaySelect(false);
    setConfirmation("");

    // Build query string
    const params = new URLSearchParams({
      Age: form.Age,
      Gender: form.Gender,
      Height: form.Height,
      Weight: form.Weight,
      Duration: form.Duration,
      Intensity_Level: form.Intensity_Level,
    });

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/predict_calories?${params.toString()}`
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        const value = Array.isArray(data.prediction) ? data.prediction[0] : data.prediction;
        setResult(value);
        setShowSave(true);
      }
    } catch (err) {
      setError("Failed to get prediction.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    setShowDaySelect(true);
  };

  const handleDaySelect = (day: string) => {
    if (onSaveCalories && result !== null) {
      onSaveCalories(day, Number(result), selectedMonth);
      setConfirmation(`Saved ${result} calories to ${day} (${selectedMonth})`);
      setTimeout(() => {
        setResult(null);
        setShowSave(false);
        setShowDaySelect(false);
        setConfirmation("");
        setForm({
          Age: "",
          Gender: "Male",
          Height: "",
          Weight: "",
          Duration: "",
          Intensity_Level: "Low",
        });
        setSelectedMonth("april");
      }, 1500);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 400, margin: "2rem auto" }}
    >
      <h2>Predict Calories Burned</h2>
      <div style={{ marginBottom: 12 }}>
        <label>Month: </label>
        <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
          <option value="april">April</option>
          <option value="may">May</option>
          <option value="june">June</option>
          <option value="july">July</option>
          <option value="august">August</option>
        </select>
      </div>
      <input
        name="Age"
        type="number"
        placeholder="Age"
        value={form.Age}
        onChange={handleChange}
        required
      />
      <input
        name="Height"
        type="number"
        placeholder="Height (cm)"
        value={form.Height}
        onChange={handleChange}
        required
      />
      <input
        name="Weight"
        type="number"
        placeholder="Weight (kg)"
        value={form.Weight}
        onChange={handleChange}
        required
      />
      <input
        name="Duration"
        type="number"
        placeholder="Duration (minutes)"
        value={form.Duration}
        onChange={handleChange}
        required
      />
      <select name="Gender" value={form.Gender} onChange={handleChange}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <select
        name="Intensity_Level"
        value={form.Intensity_Level}
        onChange={handleChange}
      >
        <option value="Low">Low</option>
        <option value="Moderate">Moderate</option>
        <option value="High">High</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? "Predicting..." : "Predict"}
      </button>
      {result !== null && (
        <div style={{ marginTop: 12 }}>
          Estimated Calories Burned: <b>{result} calories</b>
        </div>
      )}
      {showSave && !showDaySelect && (
        <button type="button" style={{ marginTop: 12 }} onClick={handleSave}>
          Save
        </button>
      )}
      {showDaySelect && (
        <div style={{ marginTop: 12 }}>
          <div>Select day to save:</div>
          { ["M", "T", "W", "Th", "F", "Sa", "Su"].map((d) => (
            <button
              key={d}
              type="button"
              style={{ margin: 4 }}
              onClick={() => handleDaySelect(d)}
            >
              {d}
            </button>
          )) }
        </div>
      )}
      {confirmation && (
        <div style={{ marginTop: 12, color: "green" }}>{confirmation}</div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
