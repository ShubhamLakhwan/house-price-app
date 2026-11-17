"use client";

import { FormEvent, useState } from "react";
import Navbar from "@/components/Navbar";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

type PredictionResult = {
  predicted_price_lakhs: number;
  predicted_price_inr: number;
};

export default function PredictPage() {
  const [area, setArea] = useState("1500");
  const [bedrooms, setBedrooms] = useState("3");
  const [age, setAge] = useState("5");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    const areaNum = Number(area);
    const bedroomsNum = Number(bedrooms);
    const ageNum = Number(age);

    if (!areaNum || areaNum <= 0) {
      setError("Enter a valid area greater than 0 sqft.");
      return;
    }
    if (!Number.isInteger(bedroomsNum) || bedroomsNum < 1 || bedroomsNum > 10) {
      setError("Bedrooms must be a whole number between 1 and 10.");
      return;
    }
    if (ageNum < 0 || ageNum > 150) {
      setError("Age must be between 0 and 150 years.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          area_sqft: areaNum,
          bedrooms: bedroomsNum,
          age_years: ageNum,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.detail || `Request failed (${res.status})`);
      }

      const data: PredictionResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not reach the prediction API. Check the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar active="Predict" />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold text-ink-900">
          Predict a House Price
        </h1>
        <p className="mt-2 text-sm text-ink-500">
          Enter the property details below. The model uses area, bedrooms,
          and age to estimate price — the same three features used in the
          original notebook.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid grid-cols-1 gap-6 rounded-2xl border border-slate-100 bg-slate-50/50 p-6 sm:grid-cols-2"
        >
          <Field label="Area (sqft)">
            <input
              type="number"
              min={1}
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              required
            />
          </Field>

          <Field label="Bedrooms">
            <input
              type="number"
              min={1}
              max={10}
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              required
            />
          </Field>

          <Field label="Age (years)">
            <input
              type="number"
              min={0}
              max={150}
              step={0.5}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              required
            />
          </Field>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Predicting…" : "Predict Price"}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/60 p-6">
            <p className="text-xs font-medium text-brand-600">
              Estimated Price
            </p>
            <p className="mt-1 text-3xl font-extrabold text-ink-900">
              ₹{result.predicted_price_lakhs.toLocaleString()} Lakhs
            </p>
            <p className="mt-1 text-xs text-ink-500">
              (≈ ₹{result.predicted_price_inr.toLocaleString()})
            </p>
            <p className="mt-3 text-xs text-ink-500">
              Estimate from a LinearRegression model trained on synthetic
              data — illustrative, not a real market valuation.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink-700">
        {label}
      </span>
      {children}
    </label>
  );
}
