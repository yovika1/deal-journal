import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Button, Divider, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { motion } from "framer-motion";

export const FreeGuideCard = ({ guide, index }) => {
  if (!guide) return null;

  return (
    <>
      <Grid
        container
        spacing={4}
        alignItems="center"
        sx={{ mb: { xs: 4, md: 8 } }}
        direction={{ xs: "column", md: index % 2 === 0 ? "row" : "row-reverse" }}
        component={motion.div}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Image Section */}
        <Grid item xs={12} md={5}>
          {guide.image && (
            <Box
              component={motion.img}
              src={guide.image}
              alt={guide.heading}
              sx={{
                width: "37vh",
                maxWidth: { xs: "100%", sm: "400px", },
                height: { xs: 180, sm: 250, md: 220 },
                borderRadius: 9,
                objectFit: "cover",
                display: "block",
                mx: "auto",
                boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          )}
        </Grid>

        {/* Text Section */}
        <Grid item xs={12} md={7}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
            component={motion.div}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            💡 Tip #{index + 1}: {guide.heading}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 2,
              fontSize: { xs: "0.9rem", sm: "1rem" },
              lineHeight: 1.6,
              ml:'10%'
            }}
          >
            {guide.description}
          </Typography>

          {guide.productLink && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                sx={{
                  borderRadius: "50px",
                  px: { xs: 2, sm: 3 },
                  py: 1.2,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  background:
                    index % 2 === 0
                      ? "linear-gradient(45deg, #ff4081, #ff9100)"
                      : "linear-gradient(45deg, #42a5f5, #478ed1)",
                  "&:hover": { opacity: 0.9, transform: "scale(1.05)" },
                }}
                href={guide.productLink}
                target="_blank"
              >
                {guide.buttonText || "Shop Now"}
              </Button>
            </motion.div>
          )}
        </Grid>
      </Grid>

      {/* Divider with animation */}
      <Divider
        component={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        sx={{ my: { xs: 2, md: 4 } }}
      >
        {index % 2 === 0 ? "🌿" : "💬"}
      </Divider>
    </>
  );
};

// ✅ PropTypes for safety
FreeGuideCard.propTypes = {
  guide: PropTypes.shape({
    _id: PropTypes.string,
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    productLink: PropTypes.string,
    buttonText: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
