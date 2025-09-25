import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Rating,
  Chip,
} from "@mui/material";
import axios from "axios";
import API_BASE from "../../config";

export const TopPicks = ({ category }) => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    (async () => {
      try {
        const offersRes = await axios.get(`${API_BASE}/getoffers`);
        let picks = [];

        if (category) {
          picks = offersRes.data.filter((p) => p.category === category).slice(0, 5);
        }

        if (picks.length === 0) {
          picks = offersRes.data.slice(0, 5);
        }

        if (picks.length === 0) {
          const blogsRes = await axios.get(`${API_BASE}/getBlogs`);
          picks = blogsRes.data
            .filter((p) => (category ? p.category === category : true))
            .map((b) => ({
              title: b.productName,
              price: null, 
              image: b.imageUrl,
              affiliateUrl: b.productUrl,
              rating: 4.5,
              ratingsCount: 100,
              badges: ["Editor’s Pick"],
            }))
            .slice(0, 5);
        }

        setProducts(picks);
      } catch (e) {
        console.error("Error fetching top picks:", e);
      }
    })();
  }, [category]);

  if (products.length === 0) return null;

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        🌟 Top Picks For You
      </Typography>

      <Box
       sx={{
  display: "flex",
  gap: 2,
  overflowX: "auto",
  scrollSnapType: "x mandatory",
  scrollBehavior: "smooth",
  px: 1,
  "&::-webkit-scrollbar": { display: "none" },
}}

      >
        {products.map((p, idx) => (
          <Card
            key={idx}
            sx={{
              minWidth: 220,
              maxWidth: 220,
              flexShrink: 0,
              scrollSnapAlign: "start",
              borderRadius: 3,
              boxShadow: 4,
              "&:hover": {
                boxShadow: 8,
                transform: "translateY(-6px) scale(1.03)",
              },
              transition: "0.3s",
            }}
          >
            <CardMedia
              component="img"
              height="160"
              image={p.imageUrl}
              alt={p.title}
              sx={{ objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            />
            <CardContent>
             
              <Typography variant="subtitle1" fontWeight="bold" noWrap>
                {p.productTitle}
              </Typography>
              {p.price && (
                <Typography variant="body2" color="primary" fontWeight="bold">
                  ₹{p.price}
                </Typography>
              )}
              <Rating value={p.rating} precision={0.1} readOnly size="small" />
              <Typography variant="caption" display="block" color="text.secondary">
                ({p.ratingsCount} ratings)
              </Typography>
              {p.badges?.map((b, i) => (
                <Chip key={i} label={b} size="small" color="secondary" sx={{ mt: 1 }} />
              ))}
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => window.open(p.affiliateUrl, "_blank")}
              >
                View Deal
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
