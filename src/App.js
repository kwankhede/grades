import "./App.css";
import Step1 from "./components/step_1";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  const handleDataUpload = (newData) => {
    setData(newData);
  };

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <h1> Grading Helper</h1>
      <Step1 />
    </div>
  );
}

export default App;
