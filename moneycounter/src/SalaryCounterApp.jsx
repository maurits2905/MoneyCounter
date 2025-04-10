import React, { useState, useEffect, useRef } from "react";

export default function SalaryCounterApp() {
  const [salary, setSalary] = useState("");
  const [salaryType, setSalaryType] = useState("monthly");
  const [hoursPerMonth, setHoursPerMonth] = useState(160);
  const [currency, setCurrency] = useState("DKK");
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [earned, setEarned] = useState(0);
  const intervalRef = useRef(null);

  const calculatePerSecondRate = () => {
    const yearlySalary = salaryType === "monthly" ? Number(salary) * 12 : Number(salary);
    const totalHours = Number(hoursPerMonth) * 12;
    const totalSeconds = totalHours * 3600;
    return yearlySalary / totalSeconds;
  };

  const handleStart = () => {
    const now = Date.now();
    setStartTime(now);
    setEarned(0);
    setStarted(true);
  };

  const resetApp = () => {
    setStarted(false);
    setSalary("");
    setSalaryType("monthly");
    setHoursPerMonth(160);
    setCurrency("DKK");
    setEarned(0);
  };

  useEffect(() => {
    if (started && startTime) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const secondsElapsed = (now - startTime) / 1000;
        const perSecondRate = calculatePerSecondRate();
        setEarned(secondsElapsed * perSecondRate);
      }, 100);
    }
    return () => clearInterval(intervalRef.current);
  }, [started, startTime]);

  const AnimatedBackground = () => (
    <style>
      {`
        body {
          margin: 0;
          background: linear-gradient(-45deg, #0f2027, #203a43, #2c5364, #1c1f2b);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
          height: 100vh;
          overflow: hidden;
        }
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 1rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .form-control, .form-select, .btn {
          max-width: 260px;
          margin-left: auto;
          margin-right: auto;
        }

        .form-label {
          text-align: center;
          display: block;
        }
      `}
    </style>
  );

  if (!started) {
    return (
      <>
        <AnimatedBackground />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        />

        <div className="min-vh-100 d-flex justify-content-center align-items-center">
          <div className="glass-card text-white p-5 px-4 text-center">
            <h1 className="h4 fw-bold mb-4">💸 Real-Time Salary Counter</h1>

            <div className="mb-3">
              <label className="form-label">💰 Salary Amount</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. 35000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">📅 Salary Type</label>
              <select
                className="form-select"
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">⏱ Hours / Month</label>
              <input
                type="text"
                className="form-control"
                value={hoursPerMonth}
                placeholder="e.g. 160"
                onChange={(e) => setHoursPerMonth(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">🌍 Currency</label>
              <select
                className="form-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="DKK">DKK</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
              </select>
            </div>

            <button
              onClick={handleStart}
              className="btn btn-success w-100 fw-semibold"
            >
              🚀 Start Counting
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AnimatedBackground />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
      />

      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div
          className="glass-card text-white text-center p-5"
          style={{ width: "320px" }}
        >
          <h1
            className="fw-bold mb-4"
            style={{
              fontFamily: "monospace",
              fontSize: "2.5rem",
              minWidth: "100%",
              letterSpacing: "1px",
            }}
          >
            {currency}{" "}
            {earned.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h1>
          <button
            onClick={resetApp}
            className="btn btn-light text-dark fw-semibold w-100"
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </>
  );
}