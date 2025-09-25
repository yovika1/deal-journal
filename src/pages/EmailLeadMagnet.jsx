import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import axios from "axios";

export const EmailLeadMagnet = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8080/subscribe", { email, message });
      setOk("✅ Check your inbox for the guide!");
      setEmail("");
      setMessage("");
    } catch {
      setOk("⚠️ Subscription failed. Try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>💄 Free Guide: Top 5 Fashion Picks Under ₹999</DialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          type="email"
          label="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mt: 1 }}
        />

        <TextField
          fullWidth
          multiline
          minRows={3}
          label="Your message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ mt: 2 }}
        />

        {ok && (
          <Alert sx={{ mt: 2 }} severity="info">
            {ok}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Get Guide
        </Button>
      </DialogActions>
    </Dialog>
  );
};
