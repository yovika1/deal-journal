import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { BlogCard } from "../components/BlogCards";
import { EmailLeadMagnet } from "./EmailLeadMagnet";
import { useLocation } from "react-router-dom";
import { FeaturedOffers } from "../components/FeaturedProduct";
import { ShareButtons } from "../components/ShareBlog";
import API_BASE from "../config";

export const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [leadOpen, setLeadOpen] = useState(false);

  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const defaultCategory = params.get("category") || "all";

  const [category, setCategory] = useState(defaultCategory);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE}/getBlogs`);
        setBlogs(res.data.blogs || []);
      } catch (e) {
        console.error(e);
        setBlogs([])
      }
    })();   
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* SEO */}
      <Helmet>
        <title>Beauty Tips & Product Guides | My Blog</title>
        <meta
          name="description"
          content="Explore expert beauty tips, fashion trends, and top product recommendations. Updated daily to help you glow!"
        />
      </Helmet>

      {/* Hero */}
      <Typography variant="h3" sx={{ mb: 2, textAlign: "center" }}>
        💄 Beauty, Fashion & Lifestyle Blogs
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ mb: 4, textAlign: "center" }}
      >
        Latest tips, expert guides & trending products curated for you ✨
      </Typography>

      {/* Category Tabs */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Tabs
          value={category}
          onChange={(e, newValue) => setCategory(newValue)}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="All" value="all" />
          <Tab label="Fashion" value="fashion" />
          <Tab label="Beauty" value="beauty" />
          {/* <Tab label="Lifestyle" value="lifestyle" /> */}
        </Tabs>
      </Box>

      {/* Blog Grid */}
      <Grid container spacing={2} 
      sx={{
            display:"flex",
            justifyContent:'center',
            alignItems:'center',
            // ml:{md:100}
          }}
      >
        {blogs
          .filter((b) => category === "all" || b.category === category)
          .map((blog) => (
          <Box item   key={blog._id}>

  <BlogCard blog={blog} />
</Box>

          ))}
      </Grid>

      {/* Engagement */}
      <Divider sx={{ my: 5 }} />
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Found a blog useful? Share with your friends 
        </Typography>

             <ShareButtons shareUrl={location} />
        
      </Box>

      {/* CTA */}
      <FeaturedOffers/>
      {/* <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setLeadOpen(true)}
        >
          📩 Get Free Beauty Ebook
        </Button>
      </Box> */}

      {/* Lead Magnet */}
      <EmailLeadMagnet open={leadOpen} onClose={() => setLeadOpen(false)} />
    </Container>
  );
};
