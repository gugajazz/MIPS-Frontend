import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ExamplePage = () => {
  return (
    <Box
      sx={{
        p: "1.5rem",
        border: "2px dashed",
        borderColor: "error.main",
        borderRadius: "8px",
        bgcolor: "background.paper",
        maxWidth: "800px",
        my: "1rem",
        textAlign: "left",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ color: "error.main", mt: 0, fontWeight: "bold" }}
      >
        Example Page
      </Typography>
    </Box>
  );
};

export default ExamplePage;
