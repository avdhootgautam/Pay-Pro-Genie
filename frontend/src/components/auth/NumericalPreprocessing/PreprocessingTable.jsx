import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';


// const columns = [
//   { field: 'id', headerName: 'id', width: 90 },
//   { field: 'abc', headerName: 'ABC', width: 150 },
//   { field: 'lastName', headerName: 'lastName', width: 150 },
//   { field: 'age',headerName: 'age',type: 'number',width: 110,},
// ];

// const rows = [
//   { id: 1, lastName: 'Doe', abc: 'John', age: 25 },
//   { id: 2, lastName: 'Smith', abc: 'Anna', age: 30 },
//   { id: 3, lastName: 'Brown', abc: 'James', age: 35 }, 
// ];

const PreprocessingTable = (props) => {
  console.log("This is the props:: "+props)
//   console.log("This is the rows:: ",props.rows)
  return (
    
    <Box sx={{
      height: 200,
    //   width:700,
      width: '70%',
      marginLeft:'10px',
      marginTop:'10px',
      border:'1.5px dashed white',
      borderRadius:"1px"
      }}>
      <DataGrid
        // rows={props.rows}
        // columns={props.columns}
        rows={props.rows}
        columns={props.columns}
        pageSize={5}
        rowsPerPageOptions={[5,10,20]}
        sx={{
          backgroundColor: '#1e1e1e',
          color: 'whitesmoke',
          borderRadius:"1px",
          border: '1.5px dotted black',
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

export default PreprocessingTable;
