
import {Button, TextField, Stack} from "@mui/material";
import Papa from "papaparse";
import { useState } from "react";

interface SaveButtonProps {
    data : any[]; 
    defaultFileName?: string;

}

/* Save Button Component */
const SaveButton = ({ data, defaultFileName = "edited_data.csv" }: SaveButtonProps) => {
    const [fileName, setFileName] = useState(defaultFileName);

    // Function to handle saving the CSV file
    const handleSave = () => {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName.endsWith('.csv') ? fileName : `${fileName}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log( 'Simulated CSV Save:\n', csv);
        alert("Data saved. Check console for CSV output."); 
    };

    return (
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
      <TextField
        label="File name"
        variant="outlined"
        size="small"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <Button variant="contained" onClick={handleSave}>
        Save CSV
      </Button>
    </Stack>
    );
};

export default SaveButton;

