import { Card, CardContent, Typography, Box, Button } from "@mui/material";

const FileCard = ({ file }) => {
    console.log("This is the file :: "+file+" and type fo te file is "+"")
  return (
    <Card
      sx={{
        width: 300,
        borderRadius: 4,
        boxShadow: 3,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#161616",
        color: "white",
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        {/* <FileText size={24} style={{ marginRight: 8 }} /> */}
        <Typography variant="h6" noWrap title={file?.file_name}>
            {/* file?.file_name -> This is used so that it gives  the value else show undefined rather than showing the error */}
          {file?.file_name || "Unnamed File"}
        </Typography>
      </Box>

      <CardContent sx={{ padding: 0 }}>
        <Typography variant="body2" color="whitesmoke">
          📏 Size: {file?.file_size || "N/A"}
        </Typography>

        <Typography variant="body2" color="whitesmoke">
          📄 Rows: {file?.number_of_rows || 0}
        </Typography>

        <Typography variant="body2" color="whitesmoke">
          📊 Columns: {file?.number_of_columns || 0}
        </Typography>
      </CardContent>

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button size="small" variant="outlined" color="primary">
          Preview
        </Button>
        <Button size="small" variant="outlined" color="error">
          Delete
        </Button>
      </Box>
    </Card>
  );
};

export default FileCard;
