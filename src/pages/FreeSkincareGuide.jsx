import { Typography, Container, Box, Divider, CircularProgress, Button } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import { useEffect, useState } from "react";
import axios from "axios";
import { BlogFeedback } from "./FeedbackBlog";
import {FreeGuideCard} from '../components/ProductBuild/FreeGuideCard'
import API_BASE from "../config";

export const FreeSkincareGuide = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await axios.get(`${API_BASE}/getGuide`); 
        setGuides(res.data);
      } catch (err) {
        console.error("Error fetching guides:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;

  if (!guides.length) return <Typography textAlign="center">No guides available.</Typography>;

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Box
        sx={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1612817159949-195b42a3660d?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 350,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 5,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            px: 2,
          }}
        >
          🌸 Hacks for Glowing Skin ✨
        </Typography>
      </Box>

      <Typography
        variant="body1"
        sx={{ mb: 4, textAlign: "center", fontSize: "1.1rem" }}
      >
        This exclusive guide is crafted for readers who want a quick but effective skincare
        routine. Each tip includes expert-backed advice along with products you can shop instantly.
      </Typography>

      <Divider sx={{ my: 4 }}>✨</Divider>

       {/* Render FreeGuidance Cards  */}
          {guides.map((guide, index) => (
         <FreeGuideCard key={guide._id} guide={guide} index={index} />
))}


      <Divider sx={{ my: 4 }}>💬</Divider>

      {/* CTA Footer */}
      <Box
        sx={{
          textAlign: "center",
          mt: 6,
          p: 4,
          bgcolor: "#d0bea2c2",
          borderRadius: 3,
          boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Got Questions? Let’s Talk 💕
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Want personalized skincare recommendations? Reach out directly.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
          <Button
            startIcon={<WhatsAppIcon />}
            variant="contained"
            color="success"
            sx={{ borderRadius: "50px", px: 3, "&:hover": { transform: "scale(1.05)" } }}
            href="https://wa.me/919817457779"
            target="_blank"
          >
            Ask on WhatsApp
          </Button>
          <Button
            startIcon={<EmailIcon />}
            variant="outlined"
            color="secondary"
            sx={{ borderRadius: "50px", px: 3, "&:hover": { backgroundColor: "#fce4ec" } }}
            href="mailto:info@mymarket.com"
          >
            Email Us
          </Button>
        </Box>
      </Box>

      <BlogFeedback blogId="freeskincare" />
    </Container>
  );
};
