// src/components/StoreMessage.jsx
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

export const StoreMessage = ({ url, hasOffer = false }) => {
  if (!url || typeof url !== "string" || url.trim() === "") {
    return null; 
  }

  const fullUrl = (url.startsWith("http") ? url : `https://${url}`).trim();

  return (
    <>

<Box
  component="a"
  href={fullUrl}
  target="_blank"
  rel="noopener noreferrer"
  sx={{
    display: "inline-block",
    background: hasOffer ? "#d32f2f" : "#6a1b9a",
    color: "#fff",
    borderRadius: "25px",
    fontWeight: "bold",
    textDecoration: "none",
    mt: 1,
    px: { xs: 1.5, sm: 2 },
    py: { xs: 0.8, sm: 1 },
    fontSize: { xs: "10px", sm: "14px", md: "16px" },
  }}
>
  {hasOffer ? "🔥 Grab Limited Time Deal" : "🛍 View Today's Price"}
</Box>


      <Typography
        sx={{
          fontSize: { xs: 7, sm: 9, md: 10 },
          color: "gray",
          marginTop: "4px",
        }}
      >
        Redirecting to our trusted partner store.
      </Typography>
    </>
  );
};
