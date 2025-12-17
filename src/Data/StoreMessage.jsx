// src/components/StoreMessage.jsx
import { Typography } from "@mui/material";

export const StoreMessage = ({ url, hasOffer = false}) => {
    console.log("🧭 StoreMessage received URL:", url);

  if (!url || typeof url !== "string" || url.trim() === "") {
    return (
      <Typography color="primary" fontWeight="bold"
      sx={{fontSize: { xs: 9, sm: 12, md: 14, lg: 16 }, 
  }}
      >
        Exclusive Partner Deal – Limited Time Offer!
      </Typography>
    );
  }

  try {
    const fullUrl = (url.startsWith("http") ? url : `https://${url}`).trim();
    const lowerUrl = fullUrl.toLowerCase();
    
    let storeName = "Main Store";
    if (lowerUrl.includes("fktr.in")) storeName = "flipkart";
    else if (lowerUrl.includes("bitli.in")) storeName = "mamaearth";
    else if (lowerUrl.includes("amazon")) storeName = "Amazon";
    else if (lowerUrl.includes("myntra")) storeName = "Myntra";

    return (
      <Typography color="primary" fontWeight="bold" sx={{
    fontSize: { xs: 9, sm: 12, md: 14, lg: 16 }, 
  }}>
        Available now on{" "}
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#1976d2",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          {storeName}
        </a>{" "}
{       hasOffer &&' – Limited Time Deal!'}    
  </Typography>
    );
  } catch (err) {
    console.error("Invalid product URL:", url, err);
    return (
      <Typography color="primary" fontWeight="bold">
{        hasOffer && '– Exclusive Deal-Limited Time Offer!'}
      </Typography>
    );
  }
}
