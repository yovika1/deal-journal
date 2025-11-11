import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Divider,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { BlogCard } from "../components/BlogCards";
import { EmailLeadMagnet } from "../pages/EmailLeadMagnet";
import { useNavigate } from "react-router-dom";
import { FeaturedOffers } from "./FeaturedProduct";
import API_BASE from "../config";
import axios from "axios";
import { TestimonialsSection } from "./TestimonialsSection";

export const BlogHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [leadOpen, setLeadOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE}/getBlogs`);

        const mapped = (res.data.blogs || []).map((item) => ({
          _id: item._id,
          productName: item.product?.productName || "",
          productTitle: item.productTitle,
          imageUrl: item.product?.imageUrl || "",
          productUrl: item.product?.affiliateUrl || "",
          category: item.category || "general",
          details: item.details || [],
        }));

        setBlogs(mapped);
      } catch (e) {
        console.error("Error fetching blogs:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title variant="h3">
          Glow with Us | Beauty, Fashion & Lifestyle Blog
        </title>
        <meta
          name="description"
          content="Glow with Us is your go-to blog for beauty tips, skincare routines, and fashion trends. Read expert guides and shop curated product deals."
        />
      </Helmet>

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

      {/* <Divider sx={{ my: 5 }} /> */}

      {/* ✅ Latest Blogs Section */}
      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5">📝 Latest Blogs</Typography>
        <Button
          onClick={() => navigate("/bloglistpage?category=general")}
          sx={{
            fontSize: { xs: "0.70rem", sm: "0.85rem", md: "1rem" },
          }}
        >
          View All
        </Button>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : blogs.filter((b) => b.category === "general").length > 0 ? (
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 1.5,
            px: 1,
            pb: 2,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {blogs
            .filter((b) => b.category === "general")
            .map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No blogs available yet.
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 6,
          mb: 3,
          rowGap: 1,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "1rem", sm: "1.4rem", md: "1.6rem" },
          }}
        >
          👗 Fashion Trends
        </Typography>
        <Button
          onClick={() => navigate("/bloglistpage?category=fashion")}
          sx={{
            fontSize: { xs: "0.70rem", sm: "0.85rem", md: "1rem" },
            px: { xs: 0.1, sm: 2.5, md: 0 },
            py: { xs: 0.5, sm: 0.7 },
            borderRadius: 20,
            textTransform: "none",
          }}
        >
          Explore Fashion
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 1.5,
          px: 1,
          pb: 2,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {blogs
          .filter((b) => b.category === "fashion")
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 6,
          mb: 3,
          flexWrap: "wrap",
          rowGap: 1,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "1rem", sm: "1.4rem", md: "1.6rem" },
          }}
        >
          💄 Beauty & Skincare
        </Typography>
        <Button
          onClick={() => navigate("/bloglistpage?category=beauty")}
          sx={{
            fontSize: { xs: "0.70rem", sm: "0.85rem", md: "1rem" },
            px: { xs: 0.1, sm: 2.5, md: 0 },
            py: { xs: 0.5, sm: 0.7 },
            borderRadius: 20,
            textTransform: "none",
          }}
        >
          Explore Beauty
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 1.5,
          px: 1,
          pb: 2,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {blogs
          .filter((b) => b.category === "beauty")
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </Box>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/explore-offers")}
        sx={{
          position: "fixed",
          bottom: { xs: 12, sm: 16, md: 20 },
          right: 20,
          borderRadius: "30px",
          px: { xs: 2, sm: 3, md: 4 },
          py: 1.2,
          fontSize: { xs: "0.50rem", sm: "0.85rem", md: "1rem" },

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
      <TestimonialsSection />

      <FeaturedOffers />

      {/* ✅ Sticky Email Lead Magnet */}
      <EmailLeadMagnet open={leadOpen} onClose={() => setLeadOpen(false)} />
    </Container>
  );
};
