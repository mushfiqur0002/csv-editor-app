import { useState, useEffect, memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TableSortLabel,
} from "@mui/material";

/* Data Table Props */
interface DataTableProps {
  rows: any[]; // Array of objects representing the data rows
  columns: string[]; // Representing the column headers
  onEdit: (rowIndex: number, field: string, value: string) => void; // Callback when a cell is edited
  searchQuery?: string;
  onSort?: (column: string, direction: "asc" | "desc") => void; // Callback for sorting the table
  sortConfig?: { column: string; direction: "asc" | "desc" } | null; 
  highlightColumn?: string; 
  highlightValue?: string; 
}

/* Editable Cell Component */
const EditableCell = memo( //prevent unnecessary re-renders
  ({
    value: initialValue,
    rowIndex,
    column,
    onEdit,
  }: {
    value: string;
    rowIndex: number;
    column: string;
    onEdit: (rowIndex: number, field: string, value: string) => void;
  }) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    // Check if user has finished editing the cell
    const handleBlur = () => {
      if (value !== initialValue) {
        onEdit(rowIndex, column, value);
      }
    };

    return (
      <TextField
        variant="standard"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        fullWidth
        multiline
        minRows={1}
        maxRows={10}
        slotProps={{
          input: {
            style: {
              fontSize: "0.875rem",
              whiteSpace: "pre-wrap",
            },
          },
        }}
      />
    );
  }
);


const DataTable = ({
  rows,
  columns,
  onEdit,
  onSort,
  sortConfig,
  highlightColumn,
  highlightValue,
}: DataTableProps) => {
  // Handle sorting when a column header is clicked
  const handleSort = (column: string) => {
    if (!onSort) return;
    if (sortConfig?.column === column) {
      // Toggle sort direction
      onSort(column, sortConfig.direction === "asc" ? "desc" : "asc");
    } else {
      // Default to ascending
      onSort(column, "asc");
    }
  };

  return (
    // Render the table with sorting and highlighting
    <TableContainer
      component={Paper}
      sx={{ mb: 2, maxHeight: "50vh", overflowY: "auto" }}
    >
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column}
                sx={{ fontWeight: "bold", cursor: onSort ? "pointer" : "default" }}
                onClick={() => handleSort(column)}
                sortDirection={sortConfig?.column === column ? sortConfig.direction : false}
              >
                {/* Display sort arrows, makes column header clickable ONLY if onSort is provided */}
                <TableSortLabel
                  active={sortConfig?.column === column}
                  direction={sortConfig?.column === column ? sortConfig.direction : "asc"}
                >
                  {column}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {rows.map((row, rowIndex) => {
            // Check if the row should be highlighted based on the highlightColumn and highlightValue
            const isHighlighted =
              highlightColumn &&
              highlightValue &&
              row[highlightColumn] === highlightValue;

            return (
              <TableRow
                key={rowIndex}
                sx={{
                  backgroundColor: isHighlighted ? "rgba(255, 235, 59, 0.3)" : "inherit", // highlight colour
                }}
              >
                {/* Highlight the row if it matches the highlight criteria */}
                {columns.map((column) => (
                  <TableCell
                    key={column}
                    sx={{ verticalAlign: "top", minWidth: "150px" }}
                  >
                    <EditableCell
                      value={row[column] || ""}
                      rowIndex={rowIndex}
                      column={column}
                      onEdit={onEdit}
                    />
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
