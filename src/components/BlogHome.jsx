import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { BlogCard } from "../components/BlogCards";
import { EmailLeadMagnet } from "../pages/EmailLeadMagnet";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FeaturedOffers } from "./FeaturedProduct";
import API_BASE from "../config";

export const BlogHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [leadOpen, setLeadOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE}/getBlogs`);

        const mapped = (res.data || []).map((item) => ({
          _id: item._id,
          productName: item.productName,
          productTitle: item.productTitle,
          imageUrl: item.imageUrl,
          productUrl: item.productUrl,
          category: item.category || "general",
          details: item.details || [],
        }));

        setBlogs(mapped);
      } catch (e) {
        console.error("Error fetching blogs:", e);
      }
    })();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>Glow with Us | Beauty, Fashion & Lifestyle Blog</title>
        <meta
          name="description"
          content="Glow with Us is your go-to blog for beauty tips, skincare routines, and fashion trends. Read expert guides and shop curated product deals."
        />
      </Helmet>

      {/* ✅ Hero Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: "bold" }}>
          ✨ Glow With Us
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Your trusted <strong>beauty & fashion blog</strong> with guides, tips,
          and product reviews that really work.
        </Typography>
        
       <Button
      variant="contained"
      color="secondary"
      size="large"
      onClick={() => navigate("/free-skincare")}
      sx={{ borderRadius: 20, px: 4 }}
    >
      📩 Get My Free Guide
    </Button>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* ✅ Latest Blogs Section */}
      <Box
        sx={{
          display: "flex",
          overflow:'hidden',
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5">📝 Latest Blogs</Typography>
        <Button onClick={() => navigate("/bloglistpage")}>View All</Button>
      </Box>

      <Grid container spacing={3}
              sx={{
    "& > .MuiGrid-item": {
      display: "flex",
    },
  }}
      >
        {blogs.length > 0 ? (
          blogs
            .map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog._id}>
                <BlogCard blog={blog} />
              </Grid>
            ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No blogs Product available yet.
          </Typography>
        )}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 6,
          mb: 3,
        }}
      >
        <Typography variant="h5">👗 Fashion Trends</Typography>
        <Button onClick={() => navigate("/bloglistpage?category=fashion")}>
          Explore Fashion
        </Button>
      </Box>

      <Grid container spacing={3}>
        {blogs
          .filter((b) => b.category === "fashion")
          .map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
              <BlogCard blog={blog} />
            </Grid>
          ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 6,
          mb: 3,
        }}
      >
        <Typography variant="h5">💄 Beauty & Skincare</Typography>
        <Button onClick={() => navigate("/bloglistpage?category=beauty")}>
          Explore Beauty
        </Button>
      </Box>

      <Grid container spacing={3}>
        {blogs
          .filter((b) => b.category === "beauty")
          .map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
              <BlogCard blog={blog} />
            </Grid>
          ))}
      </Grid>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/explore-offers")}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          borderRadius: "30px",
          px: 3,
          py: 1.2,
          fontWeight: "bold",
          boxShadow: 3,
          zIndex: 1200,
        }}
      >
        🔥 View Top Offers
      </Button>

      {/* View All Blogs Button */}
      {/* <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => navigate("/bloglistpage")}
          sx={{ borderRadius: "25px", px: 4 }}
        >
          View All Blogs →
        </Button>
      </Box> */}

      {/* ✅ Testimonials */}
      <Box
        sx={{
          mt: 8,
          p: 4,
          background: "#f9f9f9",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">🌟 Reader Love</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          ⭐⭐⭐⭐⭐ “The skincare guides here are life-changing. My skin routine
          feels sorted!” – Neha
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          ⭐⭐⭐⭐ “Saved me hours of research. Love the top fashion picks!” – Simran
        </Typography>
      </Box>
      
            <FeaturedOffers/>


      {/* ✅ Sticky Email Lead Magnet */}
      <EmailLeadMagnet open={leadOpen} onClose={() => setLeadOpen(false)} />
    </Container>
  );
};
