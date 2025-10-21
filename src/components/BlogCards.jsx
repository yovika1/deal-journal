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
import { StoreMessage } from "../Data/StoreMessage";

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
const hasOffer = blog.details.some(
  (d) =>
    d.name?.toLowerCase().includes("offer") ||
    d.value?.toLowerCase().includes("offer") ||
    d.value?.includes("%")
);


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
      style={{ width: "100%"}}
    >
      <Card
        sx={{
          width: { xs: 124, sm: 200, md: 250, lg: 258 }, 
        
          borderRadius: "12px",
          boxShadow: 2,
          transition: "0.3s",
          "&:hover": { transform: "translateY(-4px) translateX(none)" , boxShadow: 5 },
          mx: { sm: "auto" },  
          mb: 2,
          flexShrink: 0, 
           cursor: "pointer",
        }}
      >
        <CardActionArea onClick={() => navigate(`/getBlogs/${blog._id}`)}>
          {/* Blog Image */}
          <CardMedia
            component="img"
            sx={{
              height: { xs: 120, sm: 160, md: 250 }, 
            }}
            image={blog.imageUrl}
            alt={blog.title}
          />

          <CardContent sx={{ p: 1.2 }}>
            <Typography
              variant="subtitle 2"
              fontWeight="bold"
              gutterBottom
              noWrap
            >
              {blog.productTitle}
            </Typography>

            {blog.productName && (
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                noWrap
              >
                {blog.productName}
              </Typography>
            )}

            {preview && (
              <Typography
                variant="body7"
                color="primary"
                fontWeight="bold"
                sx={{ mt: 0.5 }}
                noWrap
              >
                ₹{preview}
              </Typography>
            )}

          { blog?.productUrl &&  <StoreMessage url={blog.productUrl }  hasOffer={hasOffer}/>}
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
};
