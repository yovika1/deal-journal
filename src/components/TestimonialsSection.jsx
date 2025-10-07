import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import API_BASE from "../config";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const TestimonialsSection = ({ blogId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/getcomments`, {
        params: { blogId },
      });
      setComments(res.data.testimonials || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    try {
      await axios.post(`${API_BASE}/addComment`, {
        blogId,
        text: comment,
      });
      setComment("");
      setSuccess(true);
      fetchComments();
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <Box sx={{ mt: 6, position: "relative" }}>
      <Box
        sx={{
          background: "#fff8e5",
          p: 3,
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
            fontWeight: 600,
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          💬 Share your thoughts
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Write your comment..."
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{
            mb: 2,
            background: "white",
            borderRadius: 2,
            "& .MuiInputBase-input": {
              fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
            },
          }}
        />

        <Button
          variant="contained"
          color="secondary"
          sx={{
            borderRadius: "20px",
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 0.6, sm: 0.8 },
            fontSize: { xs: "0.7rem", sm: "0.9rem", md: "1rem" },
            display: "block",
            mx: { xs: "auto", sm: "inherit" },
          }}
          onClick={handleSubmit}
        >
          Post Comment
        </Button>

        <Snackbar
          open={success}
          autoHideDuration={2000}
          onClose={() => setSuccess(false)}
        >
          <Alert severity="success">Comment submitted for review!</Alert>
        </Snackbar>
      </Box>

      <Box sx={{ mt: 5, position: "relative" }}>
        <Box
          sx={{
            maxHeight: 250,
            overflowY: "auto",
            pr: 1,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {loading ? (
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              Loading comments...
            </Typography>
          ) : comments.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              No comments yet — be the first to share your thoughts!
            </Typography>
          ) : (
            comments.map((c, i) => (
              <motion.div
                key={c._id || i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ marginBottom: "1.2rem" }}
              >
                <Box
                  sx={{
                    background: "white",
                    p: 2,
                    borderRadius: 2,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    “{c.text}”
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mt: 1 }}
                  >
                    – {c.userName || "Glow Reader"}
                  </Typography>
                </Box>
              </motion.div>
            ))
          )}
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 50,
            background:
              "linear-gradient(to top, rgba(255,248,229,1), rgba(255,248,229,0))",
            pointerEvents: "none",
            borderRadius: "0 0 12px 12px",
            zIndex: 2,
          }}
        />
      </Box>
    </Box>
  );
};
