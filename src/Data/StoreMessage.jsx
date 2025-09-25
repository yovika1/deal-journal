// src/components/StoreMessage.jsx
import { Typography } from "@mui/material";

export default function StoreMessage({ url }) {
  if (!url) {
    return (
      <Typography color="primary" fontWeight="bold">
        Exclusive Partner Deal – Limited Time Offer!
      </Typography>
    );
  }

  try {
    // add protocol if missing
    const fullUrl = url.startsWith("http") ? url : `https://${url}`;
    const hostname = new URL(fullUrl).hostname.toLowerCase();

    let storeName = "Our Partner Store";
    if (hostname.includes("flipkart")) storeName = "Flipkart";
    else if (hostname.includes("amazon")) storeName = "Amazon";
    else if (hostname.includes("myntra")) storeName = "Myntra";
    else if (hostname.includes("nykaa")) storeName = "Nykaa";

    return (
      <Typography color="primary" fontWeight="bold">
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
        – Limited Time Deal!
      </Typography>
    );
  } catch (err) {
    console.error("Invalid product URL:", url, err);
    return (
      <Typography color="primary" fontWeight="bold">
        Exclusive Partner Deal – Limited Time Offer!
      </Typography>
    );
  }
}
