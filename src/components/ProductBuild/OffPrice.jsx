import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";

export const OffPrice = ({ blog, fadeInUp }) => {
  if (!blog || !Array.isArray(blog.details)) return null;

  // ---- Extract only prices ----
  const prices = blog.details.filter(
    (d) =>
      typeof d === "object" &&
      d.value &&
      !isNaN(d.value.replace(/[₹,]/g, ""))
  );

  // ---- Keep all details for names ----
  const otherDetails = blog.details;

  const lastPriceIndex = prices.length - 1;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeInUp}
      viewport={{ once: true }}
    >
      <Box sx={{ background: "#dedddc45", p: 2, mb: 3, borderRadius: 2 }}>
        {prices.length > 0 && (
          <Box sx={{ mb: 2, textAlign: "left" }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              💰 Special Price
            </Typography>
            {prices.map((d, i) => {
              const price = d.value.replace(/[₹,]/g, "");
              return (
                <Typography
                  key={i}
                  variant="body1" // 
                  sx={{
                    mb: 0.5,
                    fontWeight: i === lastPriceIndex ? "bold" : "normal",
                    color: i === lastPriceIndex ? "#1d1b1aff" : "#f34242ff",
                    textDecoration: i === lastPriceIndex ? "none" : "line-through",
                  }}
                >
                  ₹{price}
                </Typography>
              );
            })}
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          ✨ Key Highlights
        </Typography>
        {otherDetails.map((d, i) =>
          d.name ? (
            <Typography key={i} variant="body1" sx={{ mb: 1 }}>
              ✅<strong> {d.name}</strong>{''}
              {d.value || ""}
            </Typography>
          ) : null
        )}
      </Box>
    </motion.div>
  );
};
