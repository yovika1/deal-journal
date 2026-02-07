import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
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
import { motion } from "framer-motion";
// import { RelatedBlogs } from "./RelatedBlogs";

export const BlogHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [leadOpen, setLeadOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recent, setRecent] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE}/getBlogs`);

        const mapped = (res.data.blogs || []).map((item) => ({
          _id: item._id,
          productTitle: item.productTitle,
          category: item.category || "general",
          specialDay: item.specialDay || null,
          productUrl: item.product?.affiliateUrl || "",
          details: item.details || [],

          product: {
            imageUrl: item.product?.imageUrl || "",
            productUrl: item.product?.affiliateUrl || "",
            currentPrice: item.product?.currentPrice || null,
            originalPrice: item.product?.originalPrice || null,
          },
        }));

        setBlogs(mapped.reverse());
      } catch (e) {
        console.error("Error fetching blogs:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("recentBlogs")) || [];
    setRecent(items);
  }, []);

  const valentineBlogs = blogs.filter((b) => b.specialDay === "valentines");

  const latestBlogs = blogs.filter(
    (b) => b.category === "general" && !b.specialDay,
  );

  return (
    <Container maxWidth="lg">
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          py: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(90deg, #ff6ec4, #7873f5)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "1px",
          }}
        >
          Rangyblux
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" 
        sx={{
            mb: 2,
            mr:4,
              color: "#c2185b",
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },

         }}>
          ✨ Glow With Us
        </Typography>

        <Typography  color="text.secondary"
         sx={{ 
          mb: 1,
          fontSize: { xs: "0.95rem",
          sm: "1.05rem", 
          md: "1.55rem" ,
            color: "text.secondary",

        },

          }}>
           Your trusted{" "}
  <Typography
    component="span"
    sx={{
      color: "#c2185b",
      fontWeight: 600,
       fontSize: { xs: "0.95rem",
          sm: "1.05rem", 
          md: "1.55rem" ,
       }
    }}
  >
    beauty & fashion blog
  </Typography>{" "}
  with guides, tips,and product reviews that really work.
        </Typography>

        <Typography textAlign="center" mb={3}>
          <Typography
            sx={{
              fontSize: { xs: "0.85rem",
                 sm: "0.95rem",
                  md: "1rem"
                 },
              color: "text.secondary",
              
            }}
          >
            <strong>
         Selected after comparing multiple options — buy with confidence.            </strong>
          </Typography>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5 }}
            style={{ overflow: "hidden", whiteSpace: "nowrap" }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
                fontWeight: 700,
                textAlign: "center",
                fontFamily: "'Playfair Display', serif",
                color: "#c2185b",
              }}
            >
              Tap it. Love it. Own it.
            </Typography>
          </motion.div>
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

      {/* 🎉 Special Days Section */}
      {valentineBlogs.length > 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              
            }}
          >
            <Typography variant="h5"
            sx={{
            fontSize: { xs: "1rem", sm: "1.4rem", md: "1.6rem" },

            }}
            >💖 Valentine’s Special</Typography>
            <Button
              onClick={() => navigate("/bloglistpage?special=valentines")}
                sx={{
            fontSize: { xs: "0.70rem", sm: "0.85rem", md: "1rem" },
          }}
            >
              
              View All
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
            {valentineBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </Box>
        </>
      )}

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
      ) : latestBlogs.length > 0 ? (
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
          {latestBlogs.map((blog) => (
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

      {recent.length > 0 && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "1rem", sm: "1.4rem", md: "1.6rem" },
              }}
            >
              👀 Recently Viewed
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 1.5,

              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {recent.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </Box>
        </>
      )}

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
      {/* <RelatedBlogs/> */}

      {/* ✅ Sticky Email Lead Magnet */}
      <EmailLeadMagnet open={leadOpen} onClose={() => setLeadOpen(false)} />
    </Container>
  );
};
