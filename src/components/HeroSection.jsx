import React from "react";
import { Box, Typography, Button } from "@mui/material";

export const HeroSection = () => {
  return (
    <Box
      sx={{
        height: "300px",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: 3,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        p: 4,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Discover the Best Deals & Smart Shopping Tips
      </Typography>
      <Typography variant="h6" gutterBottom>
        Read our latest blogs and never miss a chance to save!
      </Typography>
      <Button variant="contained" color="secondary">
        Start Reading →
      </Button>
    </Box>
  );
};

