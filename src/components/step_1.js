import React, { useState } from "react";
import * as XLSX from "xlsx/xlsx.mjs";
import "./step_1.css";
import Statistics from "./Statistics";

function Step1({ onDataLoad }) {
  const [data, setData] = useState([]);

  const handleFile = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const result = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Add new column with grade
        const newData = result.map((row, i) => {
          const score = row[2];
          let grade;
          if (score >= 90) {
            grade = "A";
          } else if (score >= 80) {
            grade = "B";
          } else if (score >= 70) {
            grade = "C";
          } else if (score >= 60) {
            grade = "D";
          } else {
            grade = "F";
          }
          return [...row, grade];
        });

        setData(newData);
        onDataLoad(newData); // pass data to parent component
      };
      fileReader.readAsBinaryString(files[0]);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFile} />

      <br />
      <br />
      {data.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th> Roll Number</th>
                <th> Name</th>
                <th> Score (Max 100)</th>
                <th> Grade [New] </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Statistics data={data} />
        </>
      )}
    </div>
  );
}

export default Step1;
