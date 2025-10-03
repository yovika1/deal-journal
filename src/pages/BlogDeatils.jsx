import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Divider,
  Button,
  Box,

} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { RelatedBlogs } from "../components/RelatedBlogs";
import { StickyInBlogCTA } from "../components/StickyCTA";
import { EmailLeadMagnet } from "./EmailLeadMagnet";
import { TopPicks } from "../components/ProductBuild/Toppicks";
import { BlogFeedback } from "./FeedbackBlog";

import { motion } from "framer-motion";
import { OffPrice } from "../components/ProductBuild/OffPrice";
import { ShareButtons } from "../components/ShareBlog";
import API_BASE from "../config";

export const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [leadOpen, setLeadOpen] = useState(false);
  const shareUrl = window.location.href;
  const navigate = useNavigate();

 
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE}/getBlogs/${id}`);
        setBlog(res.data.blog|| []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id]);

  if (!blog) return <Typography sx={{ m: 4 }}>Loading...</Typography>;

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      {blog.imageUrl && (
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <Box
            sx={{
              position: "relative",
              mb: 4,
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            }}
          >
            <img
              src={blog.imageUrl}
              alt={blog.title || "Blog Image"}
              style={{ width: "100%", maxHeight: "495px", objectFit: "cover" }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
                color: "white",
                p: 3,
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                {blog.productName || "No Product Name"}
              </Typography>
              <Typography variant="subtitle1">
                {blog.productTitle || "No Title"}
              </Typography>
            </Box>
          </Box>
        </motion.div>
      )}

      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            {blog.intro ||
              "Every buyer faces the same problem: finding a product that actually delivers results. Here’s my experience…"}
          </Typography>
        </Box>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Why this type of product matters
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
            {blog.education ||
              "Before choosing, it’s important to understand why this category of product is useful and what benefits it brings."}
          </Typography>
        </Box>
      </motion.div>

      <OffPrice blog={blog} fadeInUp={fadeInUp} />
      

      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Button
            variant="contained"
            onClick={() => window.open(blog.affiliateUrl, "_blank")}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 4,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              background: "linear-gradient(45deg, #ff4081, #ff9800)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
              "&:hover": {
                background: "linear-gradient(45deg, #ff9800, #ff4081)",
              },
            }}
          >
            🛍️ Grab Deal Now
          </Button>
        </Box>
      </motion.div>

      {/* 5. Honest Opinion (Pros & Cons)
      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">My Experience</Typography>
          <Typography variant="body2" gutterBottom>
            Here’s what I liked and what could be better:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Pros:
          </Typography>
          <ul>
            {blog.pros?.map((p, i) => (
              <li key={i}>
                <Typography variant="body2">👍 {p}</Typography>
              </li>
            )) || (
              <Typography variant="body2">👍 Effective & budget-friendly</Typography>
            )}
          </ul>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Cons:
          </Typography>
          <ul>
            {blog.cons?.map((c, i) => (
              <li key={i}>
                <Typography variant="body2">👎 {c}</Typography>
              </li>
            )) || (
              <Typography variant="body2">
                👎 Limited stock during sales
              </Typography>
            )}
          </ul>
        </Box>
      </motion.div> */}

      {/* 6. Social Proof (Testimonials) */}
      <motion.div initial="hidden" whileInView="visible" variants={fadeInUp}>
        <Box
          sx={{
            background: "#fef9f4",
            p: 3,
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            mb: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            💬 What Readers Say
          </Typography>
          <Typography variant="body1" sx={{ fontStyle: "italic" }}>
            ⭐⭐⭐⭐⭐ “This guide helped me pick the best serum for my skin.” – Ayesha
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, fontStyle: "italic" }}>
            ⭐⭐⭐⭐ “Loved the recommendations! Already ordered the Vitamin C cream.” – Priya
          </Typography>
        </Box>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" variants={fadeIn}>
        <Box
          sx={{
            background: "#fff8e5",
            p: 2,
            borderRadius: 3,
            textAlign: "center",
            mb: 4,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "#e65100" }}
          >
            Hurry! Limited stock on our top picks 🔥
          </Typography>
        </Box>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <TopPicks category={blog.category} />
      </motion.div>

      <Divider sx={{ my: 4 }} />

     <ShareButtons shareUrl={shareUrl} />


      <motion.div>
        <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
          <Button variant="outlined" onClick={() => navigate("/")}>
            ← Back to Blogs
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/explore-offers")}
          >
            🛍️ Explore Top Offers
          </Button>
          <Button variant="text"   
              onClick={() => navigate("/free-skincare")}
>
            Get Free Guide
          </Button>
        </Box>
        <Divider sx={{ my: 4 }} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        <RelatedBlogs currentId={id} category={blog.category} />
      </motion.div>

      <StickyInBlogCTA
        href="/offers"
        dealEndsAt={new Date(Date.now() + 2 * 3600e3)}
      />
      <EmailLeadMagnet open={leadOpen} onClose={() => setLeadOpen(false)} />

      <motion.div initial="hidden" whileInView="visible" variants={fadeIn}>
        <BlogFeedback blogId={blog._id} />
      </motion.div>
    </Container>
  );
};
