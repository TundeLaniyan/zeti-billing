import React, { useState } from "react";
import axios from "axios";
import VehicleForm from "./components/VehicleForm.jsx";
import BillResult from "./components/BillResult.jsx";
import "./App.css";

const App = () => {
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bill, setBill] = useState({});

  const handleShowResult = () => setShowResult(true);
  const handleCloseResult = () => setShowResult(false);

  const convertDateToString = (date) => date.toISOString().split("T")[0];

  const API_URL = "https://localhost:7206/api/Billing";

  const calculateBill = async ({
    AssetOperator,
    VehicleVin,
    StartDate,
    EndDate,
    CostPerMileage,
  }) => {
    try {
      const response = await axios.get(
        `${API_URL}?AssetOperator=${AssetOperator}&VehicleVin=${VehicleVin}&StartDate=${StartDate}&EndDate=${EndDate}&Multiplier=${CostPerMileage}`
      );
      const {
        assetOperator,
        vehicleVin,
        vehicleReg,
        startDate,
        endDate,
        multiplier,
        miles,
        totalAmount,
      } = response.data || {
        assetOperator: "Bob's Taxis",
        vehicleVin: "abcd123",
        vehicleReg: "CBDH 789",
        startDate: "2021-02-01",
        endDate: "2021-02-28",
        multiplier: 0.207,
        miles: 160934,
        totalAmount: "£33,313.34",
      };
      setBill({
        assetOperator,
        vehicleVin,
        vehicleReg,
        startDate,
        endDate,
        costPerMileage: multiplier,
        miles,
        totalAmount,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="overlay"></div>
      <VehicleForm
        onSubmit={calculateBill}
        handleShowResult={handleShowResult}
        setLoading={setLoading}
        convertDateToString={convertDateToString}
      />
      <BillResult
        handleCloseResult={handleCloseResult}
        showResult={showResult}
        loading={loading}
        bill={bill}
      />
    </div>
  );
};

export default App;
