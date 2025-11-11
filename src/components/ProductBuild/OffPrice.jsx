import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";

export const OffPrice = ({ blog, fadeInUp }) => {
  if (!blog || !Array.isArray(blog.details)) return null;


  const product = blog.product;
  const currentPrice = product.currentPrice
    ? `₹${product.currentPrice}`
    : null;
  const originalPrice = product.originalPrice
    ? `₹${product.originalPrice}`
    : null;

  const otherDetails = blog.details || [];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeInUp}
      viewport={{ once: true }}
    >
      <Box sx={{ background: "#dedddc45", p: 2, mb: 3, borderRadius: 2 }}>
        {(currentPrice || originalPrice) && (
          <Box sx={{ mb: 2, textAlign: "left" }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              💰 Special Price
            </Typography>
              {originalPrice && (
              <Typography
                variant="body1"
                sx={{
                  mb: 0.5,
                  color: "#f34242ff",
                  textDecoration: "line-through",
                }}
              >
                {originalPrice}
              </Typography>
            )}

            {currentPrice && (
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#1d1b1aff" }}
              >
                {currentPrice}
              </Typography>
            )}
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
