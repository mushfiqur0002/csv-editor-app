import React from "react";
import { Button} from "@mui/material";
import Papa from "papaparse";

interface CSVUploaderProps {
  onDataLoaded: (data: any[]) => void;
}

const CSVUploader = ({ onDataLoaded }: CSVUploaderProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        worker: true,
        complete: (results) => {
          onDataLoaded(results.data);
        },
        error: (error) => {
          console.error("Error parsing CSV file:", error);
          alert("Failed to parse CSV file. Please check the format.");
        }
      });
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <Button variant="contained" component="label">
        Upload CSV
        <input type="file" accept=".csv" hidden onChange={handleFileChange} />
      </Button>
    </div>
  )
};

export default CSVUploader;