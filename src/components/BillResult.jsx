import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "./BillResult.css";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const BillResult = ({ showResult, handleCloseResult, loading, bill }) => {
  const handleDownload = async () => {
    const API_URL = "https://localhost:7206/api/Billing/GeneratePDF";
    await axios.get(`
    ${API_URL}?AssetOperator=${bill.assetOperator}&VehicleVin=${bill.vehicleVin}&VehicleReg=${bill.vehicleReg}&StartDate=${bill.startDate}&EndDate=${bill.endDate}&Multiplier=${bill.costPerMileage}&Miles=${bill.miles}&TotalAmount=${bill.totalAmount}`);
  };

  return (
    <div>
      <Modal
        open={showResult}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal"
      >
        {loading ? (
          <div className="spinner-container">
            <CircularProgress className="spinner" />
          </div>
        ) : (
          <div className="result-container">
            <Button
              variant="contained"
              className="close-btn"
              onClick={handleCloseResult}
            >
              <CloseIcon />
            </Button>
            <div className="result-body">
              <h1>Bill Calculation</h1>
              {Object.entries(bill).map(([key, value]) => {
                if (!value || key === "totalAmount") return;
                return (
                  <div className="details" key={key}>
                    <p>{key.replace(/([a-z])([A-Z])/g, "$1 $2")}</p>
                    <p>
                      <b>
                        {["StartDate", "EndDate"].includes(key)
                          ? new Date(value).toDateString()
                          : `${value}`.toUpperCase()}
                      </b>
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="result-footer">
              <div>Total Amount:</div>
              <div className="amount-text">{bill.totalAmount}</div>
            </div>

            <div className="download">
              <button className="form-button" onClick={handleDownload}>
                Download
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BillResult;
