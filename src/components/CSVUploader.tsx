import React from "react";
import { Button} from "@mui/material";
import Papa from "papaparse";

interface CSVUploaderProps {
  onDataLoaded: (data: any[]) => void;
}

/* CSV File Uploader */
const CSVUploader = ({ onDataLoaded }: CSVUploaderProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => { // Handle file input change event
    const file = event.target.files?.[0]; // Get the first file from the input
    if (!file) return;

    // Parse CSV file
      Papa.parse(file, {
        header: true, // Use first row as header
        skipEmptyLines: true, // Skip empty lines
        worker: true, // For performance
        complete: (results) => { // Handle parsed data and send to parent component
          onDataLoaded(results.data);
        },
        error: (error) => {
          console.error("Error parsing CSV file:", error);
          alert("Failed to parse CSV file. Please check the format.");
        }
      });
  };
// Render the file upload button
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