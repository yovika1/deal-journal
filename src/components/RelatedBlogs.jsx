import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import { BlogCard } from "./BlogCards";
import API_BASE from "../config";

export const RelatedBlogs = ({ currentId, category }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE}/getBlogs`);
        const filtered = res.data
          .filter((b) => b._id !== currentId)
          .filter((b) => b.category?.toLowerCase() === category?.toLowerCase());
        setRelated(filtered.slice(0, 3));
      } catch (e) { console.error(e); }
    })();
  }, [currentId, category]);

  if (!related.length) return null;

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>Related Blogs</Typography>
      <Grid container spacing={3}>
        {related.map((b) => (
          <Grid item xs={12} sm={6} md={4} key={b._id}>
            <BlogCard blog={b} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
