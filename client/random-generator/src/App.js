import "./App.css";
import axios from "axios";
import React, { useState, useCallback } from "react";

function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [reportInfo, setReportInfo] = useState({});
  const generate = useCallback(async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    await generateRandom();
    setIsGenerating(false);
  }, []);

  const report = useCallback(async () => {
    await getReport();
  }, []);

  const downloadReport = () => {
    axios.get("http://localhost:4000/downloadReport").then((res) => {
      const response = res.data;

      const element = document.createElement("a");
      const file = new Blob([response], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "RandomValues.txt";
      document.body.appendChild(element);
      element.click();
    });
  };

  const generateRandom = () => {
    axios.get("http://localhost:4000/generate").then((res) => {
      const response = res.data;
      setIsGenerated(true);
    });
  };
  const getReport = () => {
    axios.get("http://localhost:4000/getReport").then((res) => {
      const response = res.data;
      setReportInfo(response.data);
    });
  };

  return (
    <div>
      <input
        type="button"
        disabled={isGenerating}
        onClick={generate}
        value="Generate"
      />
      {isGenerated && (
        <>
          <input
            type="button"
            disabled={isGenerating}
            onClick={downloadReport}
            value="Download Report"
          />
          <input
            type="button"
            disabled={isGenerating}
            onClick={report}
            value="Show Report"
          />
          {reportInfo && Object.keys(reportInfo).length !== 0 && (
            <ul>
              <li>Alphabetical String : {reportInfo.alphaCount}</li>
              <li>Real numbers : {reportInfo.numCount}</li>
              <li>Integers : {reportInfo.intCount}</li>
              <li>Alphanumerics : {reportInfo.alphaNumericCount}</li>
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default App;
