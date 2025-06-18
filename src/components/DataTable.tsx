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


interface DataTableProps {
  rows: any[];
  columns: string[];
  onEdit: (rowIndex: number, field: string, value: string) => void;
  searchQuery?: string;
  onSort?: (column: string, direction: "asc" | "desc") => void;
  sortConfig?: { column: string; direction: "asc" | "desc" } | null;
  highlightColumn?: string;
  highlightValue?: string;
}

const EditableCell = memo(
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
        <TableBody>
          {rows.map((row, rowIndex) => {
            const isHighlighted =
              highlightColumn &&
              highlightValue &&
              row[highlightColumn] === highlightValue;

            return (
              <TableRow
                key={rowIndex}
                sx={{
                  backgroundColor: isHighlighted ? "rgba(255, 235, 59, 0.3)" : "inherit", // subtle yellow highlight
                }}
              >
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
