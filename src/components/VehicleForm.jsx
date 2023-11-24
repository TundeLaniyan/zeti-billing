import React, { useEffect, useState } from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./VehicleForm.css";

const VehicleForm = ({
  onSubmit,
  handleShowResult,
  setLoading,
  convertDateToString,
}) => {
  const [AssetOperator, setAssetOperator] = useState("");
  const [vin, setVin] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [costPerMileage, setCostPerMileage] = useState(0.27);
  const [error, setError] = useState({});

  useEffect(() => {
    const currentStartDate = new Date("2021-02-01T00:00:00Z");
    const currentEndDate = new Date("2021-02-28T23:59:00Z");
    currentStartDate.setHours(0, 0, 0, 0);
    currentEndDate.setHours(23, 59, 0, 0);
    setStartDate(currentStartDate);
    setEndDate(currentEndDate);
  }, []);

  const startDateFormatted = startDate.toISOString();
  const endDateFormatted = endDate.toISOString();

  const handleDateChange = (e, dateType) => {
    const dateValue = e.target.value;
    const selectedDate = new Date(dateValue);

    if (dateType === "startDate") {
      selectedDate.setHours(0, 0, 0, 0);
      setStartDate(selectedDate);
    } else if (dateType === "endDate") {
      selectedDate.setHours(23, 59, 0, 0);
      setEndDate(selectedDate);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let errorMessage = {};

    if (!AssetOperator) {
      errorMessage.assetOperator = "* Enter Asset Operator details";
      isValid = false;
    }

    if (!vin) {
      errorMessage.vin = "* Enter a vin number";
      isValid = false;
    }

    if (isValid) {
      setLoading(true);
      onSubmit({
        AssetOperator,
        VehicleVin: vin,
        StartDate: startDateFormatted,
        EndDate: endDateFormatted,
        CostPerMileage: costPerMileage,
      });
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      handleShowResult();
    }
    setError(errorMessage);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="heading">
        <AccountBalanceIcon className="app-logo" />
        <h1>{AssetOperator}</h1>
      </div>

      <div className="input-group">
        <label className="form-label">Asset Operator</label>
        <input
          className="form-input"
          value={AssetOperator}
          onChange={(e) => setAssetOperator(e.target.value)}
        />
        <small className="error">{error.assetOperator}</small>
      </div>
      <div className="input-group">
        <label className="form-label">Vin Number</label>
        <input
          className="form-input"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
        />
        <small className="error">{error.vin}</small>
      </div>

      <div className="input-group">
        <label className="form-label">Start Mileage</label>
        <input
          className="form-input"
          type="date"
          value={convertDateToString(startDate)}
          onChange={(e) => handleDateChange(e, "startDate")}
        />
      </div>
      <div className="input-group">
        <label className="form-label">End Mileage</label>
        <input
          className="form-input"
          type="date"
          value={convertDateToString(endDate)}
          onChange={(e) => handleDateChange(e, "endDate")}
        />
      </div>
      <div className="input-group">
        <label className="form-label">Cost Per Mileage (£)</label>
        <input
          className="form-input"
          type="number"
          value={costPerMileage}
          onChange={(e) => setCostPerMileage(e.target.value)}
          disabled
        />
      </div>

      <button className="form-button" type="submit">
        Calculate Bill
      </button>
    </form>
  );
};

export default VehicleForm;
