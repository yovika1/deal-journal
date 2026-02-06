import React, { useState } from "react";
import { Box, Typography, IconButton, Tooltip, Snackbar, Alert } from "@mui/material";
import { WhatsApp as WhatsAppIcon, Facebook as FacebookIcon, Instagram as InstagramIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

export const ShareButtons = ({ shareUrl, fadeInUp }) => {
  const [open, setOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setOpen(true);
  };
  <head>
  <title>RangyBlux</title>

  <meta name="description" content="Hand-picked blogs & smart finds you’ll love ✨" />

  <meta property="og:title" content="🔥 Found something useful!" />
  <meta property="og:description" content="Tap to read this hand-picked blog on RangyBlux 👇" />
  <meta property="og:image" content="https://www.rangyblux.com/preview.jpg" />
  <meta property="og:url" content="https://www.rangyblux.com" />
  <meta property="og:type" content="website" />
</head>

    const message = `🔥 Found something useful! Check this 👉 ${shareUrl}`;
          const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
         <Typography variant="h6" gutterBottom>
          Share this blog:
        </Typography>
        <Box sx={{ display: "flex", gap: 3, mb: 4 }}>
      {/* WhatsApp */}
      <Tooltip title="Share on WhatsApp">
        <Box
          sx={{
            position: "relative",
            display: "inline-block",
            "&:hover .hover-line": {
              width: "100%",
            },
          }}
        >
      
          <IconButton   component="a"
  href={whatsappLink}
  target="_blank"
  rel="noopener noreferrer"
          >
            <WhatsAppIcon sx={{ fontSize: 32, color: "#25D366" }} />
          </IconButton>
          <Box
            className="hover-line"
            sx={{
              position: "absolute",
              bottom: 2,
              left: 0,
              height: "2px",
              width: "0%",
              bgcolor: "#25D366",
              transition: "width 0.3s ease",
              borderRadius: 1,
              pointerEvents: "none"
            }}
          />
        </Box>
      </Tooltip>

      {/* Facebook */}
      <Tooltip title="Share on Facebook">
        <Box
          sx={{
            position: "relative",
            display: "inline-block",
            "&:hover .hover-line": {
              width: "100%",
            },
          }}
        >
          <IconButton
            onClick={() =>
              window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
              )
            }
          >
            <FacebookIcon sx={{ fontSize: 32, color: "#1877F2" }} />
          </IconButton>
          <Box
            className="hover-line"
            sx={{
              position: "absolute",
              bottom: 2,
              left: 0,
              height: "2px",
              width: "0%",
              bgcolor: "#1877F2",
              transition: "width 0.3s ease",
              borderRadius: 1,
            }}
          />
        </Box>
      </Tooltip>

          {/* Instagram (copy link) */}
          <Tooltip title="Copy link for Instagram">
          <IconButton onClick={handleCopy}>
            <InstagramIcon sx={{ fontSize: 32, color: "#E1306C" }} />
          </IconButton>
        </Tooltip>
      </Box>
      </motion.div>

      {/* Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
          onClose={() => setOpen(false)}
        >
          ✅ Link copied! Paste it in Instagram story, DM, or bio.
        </Alert>
      </Snackbar>
    </>
  );
};
