import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StoreMessage from "../Data/StoreMessage";

export const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  let preview = "";
  if (blog.details && blog.details.length > 0) {
    const firstDetail = blog.details[0];
    if (typeof firstDetail === "string") {
      preview = firstDetail;
    } else if (typeof firstDetail === "object") {
      preview = firstDetail.value || firstDetail.name || "";
    }
  }

  // Motion variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={fadeInUp}
      viewport={{ once: true }}
      style={{ width: "100%" }} 
    >
      <Card
  sx={{
    width: { xs: "90%", sm: 300, md: 300, lg: 258 }, 
    borderRadius: "16px",
    boxShadow: 3,
    transition: "0.3s",
    "&:hover": { transform: "translateY(-6px)", boxShadow: 6 },
    mx: { xs: "auto", sm: "auto", md: "auto", lg: 0 },
    mb: 3,
    ml:{ md:'80%'}
  }}
>

        <CardActionArea onClick={() => navigate(`/getBlogs/${blog._id}`)}>
          {/* Blog Image */}
          <CardMedia
            component="img"
            height="180"
            image={blog.imageUrl}
            alt={blog.title}
          />

          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>
              {blog.productTitle}
            </Typography>

            {blog.productName && (
              <Typography variant="body2" color="text.secondary" noWrap>
                {blog.productName}
              </Typography>
            )}

            {preview && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, fontWeight:'bold' }}

                noWrap
              >
                ₹{preview}
              </Typography>
            )}

            <StoreMessage url={blog.productUrl || blog.affiliateUrl} />
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
};
