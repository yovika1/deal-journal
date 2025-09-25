// BlogFeedback.jsx
import { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import axios from "axios";
import API_BASE from "../config";

export const BlogFeedback = ({ blogId, category }) => {
  const [feedback, setFeedback] = useState(null);
  const [userFeedback, setUserFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState("")

  const affiliateLinks = {
    fashion: "https://amzn.to/your-fashion-affiliate-link",
    skincare: "https://nykaa.com/deals?affid=xyz",
    // electronics: "https://flipkart.com/offers?affid=xyz",
  };

  const submitFeedback = async (type) => {
    try {
     await axios.post(`${API_BASE}/send-feedback`, {
  blogId,
  feedbackType: type.toLowerCase(), 
  feedbackText: type === "no" ? userFeedback : "",
  category,
  userEmail,
});


      if (type === "no") setSubmitted(true);
      else setFeedback("yes"); 
    } catch (err) {
      console.error(err);
      alert("Failed to send feedback. Please try again.");
    }
  };

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      {!feedback && !submitted && (
        <>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Was this blog helpful?
          </Typography>
          <Button
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={() => submitFeedback("yes")}
          >
            👍 Yes
          </Button>
          <Button variant="outlined" onClick={() => setFeedback("no")}>
            👎 No
          </Button>
        </>
      )}

      {/* YES Case */}
      {feedback === "yes" && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ color: "green", mb: 1 }}>
            🎉 Glad you found it helpful!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              window.open(
                affiliateLinks[category] || "/getoffers",
                "_blank"
              )
            }
          >
            View Top {category || "Latest"} Deals
          </Button>
        </Box>
      )}

      {/* NO Case */}
{feedback === "no" && !submitted && (
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2" sx={{ color: "red", mb: 1 }}>
      🙏 Sorry to hear that. Tell us what we can improve:
    </Typography>

    <TextField
      fullWidth
      label="Your Email "
      value={userEmail}
      onChange={(e) => setUserEmail(e.target.value)}
      sx={{ mb: 2 }}
    />

    <TextField
      fullWidth
      multiline
      rows={3}
      value={userFeedback}
      onChange={(e) => setUserFeedback(e.target.value)}
      placeholder="Write your feedback here..."
      sx={{ mb: 2 }}
    />
    <Button
      variant="contained"
      color="secondary"
      onClick={() => submitFeedback("no")}
    >
      Submit Feedback
    </Button>
  </Box>
)}


      {/* NO Submitted */}
      {feedback === "no" && submitted && (
        <Typography variant="body2" sx={{ color: "green" }}>
          ✅ Thanks! Your feedback has been sent.
        </Typography>
      )}
    </Box>
  )};