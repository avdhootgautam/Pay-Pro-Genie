import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field: 'age',headerName: 'Age',type: 'number',width: 110,},
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
    <Box sx={{
      height: 400,
      width: '98%',
      marginLeft:'10px',
      marginTop:'10px',
      }}>
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
            color: '#2e2e2e',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #444',
          },
          '& .MuiDataGrid-row:hover':{
            backgroundColor: '#2e2e2e',
            cursor:'pointer'
          },
          '& .MuiDataGrid-footerContainer':{
            backgroundColor:'#333',
            color:'whitesmoke',
            borderTop:'1px solid #444'
          },
          '& .MuiTablePagination-root':{
            color:'whitesmoke'
          },
          '& .MuiSelect-select':{
            //This section is for styling the closed menu for selecting the columns
            backgroundColor: '#1e1e1e',
            color:"whitesmoke",
            borderRadius:'6px',
            padding: '4px 8px'
          },
          // Opened Menu List
          '& .MuiMenu-paper':{
            backgroundColor:"#1e1e1e",
            color:'whitesmoke',
            border:'1px solid #444',
            '& .MuiMenuItem-root': {
            '&:hover': {
              backgroundColor: '#333',
            },
            '&.Mui-selected': {
              backgroundColor: '#555',
            },
          },
          }
        }}
      />
    </Box>
  );
};

export default ViewPageTable;
