import { useState, useMemo} from 'react'
import { Container, Typography, Box, Paper, FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import CSVUploader from './components/CSVUploader'
import DataTable from './components/DataTable'
import SearchBar from './components/SearchBar'
import SaveButton from './components/SaveButton'

function App() {
  const [rows, setRows] = useState<any[]>([])
  const [columns, setColumns] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState<{ column: string; direction: 'asc' | 'desc' } | null>(null);
  const [highlightColumn, setHighlightColumn] = useState<string | undefined>();
  const [highlightValue, setHighlightValue] = useState<string | undefined>();

  const handleFileUpload = (data: any[]) => {
    if (data.length > 0) {
      setColumns(Object.keys(data[0]))
      setRows(data)
    }
  }

  // Handle row updates when a cell is edited
  const handleRowUpdate = (rowIndex: number, field: string, value: string) => {
    const updatedRows = [...rows]
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], [field]: value }
    setRows(updatedRows)
  }

  // Filter rows based on search query
  // If searchQuery is empty, return all rows
  // If searchQuery is set, filter rows where any column contains the query
  // Uses useMemo to optimize performance by memoizing the filtered rows
  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return rows
    const query = searchQuery.toLowerCase()
    return rows.filter((row) =>
      columns.some((column) =>
        row[column]?.toString().toLowerCase().includes(query)
      )
    )
  }, [rows, columns, searchQuery])

  // Sort rows based on sortConfig
  // If sortConfig is null, return filteredRows as is
  // If sortConfig is set, sort filteredRows based on the specified column and direction
  // Uses useMemo to optimize performance by memoizing the sorted rows
  const sortedRows = useMemo(() => {
    if (!sortConfig) return filteredRows
    const { column, direction } = sortConfig
    return [...filteredRows].sort((a, b) => {
      const aVal = a[column] ?? ''
      const bVal = b[column] ?? ''
      if (aVal < bVal) return direction === 'asc' ? -1 : 1
      if (aVal > bVal) return direction === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredRows, sortConfig]);

  const uniqueValues = useMemo(() => {
  if (!highlightColumn) return [];
  const set = new Set(rows.map((row) => row[highlightColumn]));
  return Array.from(set);
}, [highlightColumn, rows]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          backgroundColor: '#1976d2', // MUI primary color, change as needed
          color: '#fff',
          padding: 2,
          boxShadow: 1,
          borderRadius: 1,
          mb: 3
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          CSV Editor
        </Typography>
      </Box>

      {/* Upload + Search row */}
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        gap={5}
        mb={3}
      >
        <Box sx={{ flexShrink: 0, width: { xs: '100%', sm: 'auto' } }}>
          <CSVUploader onDataLoaded={handleFileUpload} />
        </Box>

        {rows.length > 0 && (
          <Box sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 0 } }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </Box>
        )}
      </Box>

      {/* Highlight Column and Value Selection */}
      {/* Only show if there are rows to display */}
      {rows.length > 0 && (
        <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Highlight Column</InputLabel>
            <Select
              value={highlightColumn || ''}
              label="Highlight Column"
              onChange={(e) => {
                setHighlightColumn(e.target.value)
                setHighlightValue(undefined) // Reset value when column changes
              }}
            >
              {columns.map((col) => (
                <MenuItem key={col} value={col}>
                  {col}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }} disabled={!highlightColumn}>
            <InputLabel>Highlight Value</InputLabel>
            <Select
              value={highlightValue || ''}
              label="Highlight Value"
              onChange={(e) => setHighlightValue(e.target.value)}
            >
              {uniqueValues.map((val) => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {/* Data Table */}
      <Box sx={{ mb: 2 }}>
        <DataTable
          rows={sortedRows}
          columns={columns}
          onEdit={handleRowUpdate}
          searchQuery={searchQuery}
          onSort= {(column, direction) => setSortConfig({ column, direction })}
          sortConfig={sortConfig}
          highlightColumn={highlightColumn} // Column to highlight
          highlightValue={highlightValue} // Value to highlight
      />
      </Box>

      {/* Rows displayed info */}
      {rows.length > 0 && (
    <Paper
      elevation={1}
      sx={{
        mt: 2,
        p: 1,
        maxWidth: 200,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Rows displayed info */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontWeight: 'medium', textAlign: 'center' }}
      >
        Rows displayed: {filteredRows.length} / {rows.length}
      </Typography>
    </Paper>
      )}
      {/* Save Button aligned right on desktop */}
      {rows.length > 0 && (
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'flex-start' },
          mt: 5,
        }}
      >
        <SaveButton data={rows} defaultFileName="edited_data.csv" />
      </Box>
      )}
    </Container>
  )
}

export default App
