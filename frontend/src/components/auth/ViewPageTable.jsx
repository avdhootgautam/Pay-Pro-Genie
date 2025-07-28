import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
  },
];

const rows = [
  { id: 1, lastName: 'Doe', firstName: 'John', age: 25 },
  { id: 2, lastName: 'Smith', firstName: 'Anna', age: 30 },
  { id: 3, lastName: 'Brown', firstName: 'James', age: 35 },
  { id: 1, lastName: 'Doe', firstName: 'John', age: 25 },
  { id: 2, lastName: 'Smith', firstName: 'Anna', age: 30 },
  { id: 3, lastName: 'Brown', firstName: 'James', age: 35 },
{ id: 1, lastName: 'Doe', firstName: 'John', age: 25 },
  { id: 2, lastName: 'Smith', firstName: 'Anna', age: 30 },
  { id: 3, lastName: 'Brown', firstName: 'James', age: 35 },
  { id: 1, lastName: 'Doe', firstName: 'John', age: 25 },
  { id: 2, lastName: 'Smith', firstName: 'Anna', age: 30 },
  { id: 3, lastName: 'Brown', firstName: 'James', age: 35 },
];

const ViewPageTable = () => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        sx={{
          backgroundColor: '#1e1e1e',
          color: 'whitesmoke',
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#333',
            color: 'whitesmoke',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #444',
          },
        }}
      />
    </Box>
  );
};

export default ViewPageTable;
