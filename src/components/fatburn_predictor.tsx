import React, { useState } from "react";

export default function FatPredictor() {
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
        `http://127.0.0.1:8000/predict_fatburn?${params.toString()}`
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(
          Array.isArray(data.prediction) ? data.prediction[0] : data.prediction
        );
      }
    } catch (err) {
      setError("Failed to get prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: 400, margin: "2rem auto" }}
    >
      <h2>Predict Fat Burned</h2>
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
        <div>
          Estimated Fat Burned: <b>{result}</b>
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
