import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Rating,
  Box,
  Stack,
} from "@mui/material";
import axios from "axios";
import { FeaturedOffers } from "../components/FeaturedProduct";
import { CountdownTimer } from "../components/ProductBuild/formatCountdown ";
import API_BASE from "../config";

export const OffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [cat, setCat] = useState("all");
  const [q] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE}/getoffers`); 
        setOffers(res?.data);
      } catch (e) {
        console.error("Error fetching offers:", e);
      }
    })();
  }, []);

  const shown = offers.filter(
    (o) =>
      (cat === "all" || o.category === cat) &&
      (q.trim() === "" || o.title.toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Typography
        variant="h3"
        gutterBottom
        fontWeight="bold"
        textAlign="center"
      >
        🎉 Today’s Top Discounts
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        textAlign="center"
        sx={{ mb: 4 }}
      >
        Grab the hottest deals before they’re gone! ✨
      </Typography>
      <FeaturedOffers/>

      {/* Filters */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ mb: 4 ,
             px: { xs: 1, sm: 4, md: 6 }, 

        }}
      >
        <ToggleButtonGroup
    value={cat}
    exclusive
    onChange={(e, v) => setCat(v || "all")}
    sx={{
      backgroundColor: "rgba(255,255,255,0.9)",
      borderRadius: 3,
      fontSize:{xs:10},
      boxShadow: 3,
      "& .MuiToggleButton-root": {
        px: 3,
        py: 1,
        fontWeight: "bold",
        color: "#555",
        border: "none",
        transition: "all 0.3s",
      },
      "& .Mui-selected": {
        backgroundColor: "#f3a0e5ff",
        color: "#272323ff",
        "&:hover": {
          backgroundColor: "#d420ecff",
        },
      },
      "& .MuiToggleButton-root:hover": {
        backgroundColor: "rgba(220, 64, 255, 0.1)",
      },
    }}
  >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="fashion">Fashion</ToggleButton>
          <ToggleButton value="cosmetics">Cosmetics</ToggleButton>
        </ToggleButtonGroup>

        <Chip
          label="🔥 Limited Offers"
          color="error"
          variant="filled"
          sx={{ fontWeight: "bold" }}
        />
      </Stack>

      {/* Offer Cards */}
      {shown.length === 0 ? (
        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ mt: 5 }}
        >
          🚫 No offers available right now. Please check back later!
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {shown?.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p._id || p.productTitle}>
              <Card
                sx={{
                  borderRadius: 4,
                  width:274,
                  height: 480,
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 6,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    boxShadow: 10,
                    transform: "translateY(-6px) scale(1.02)",
                  },
                }}
              >
                {/* Image */}
                <CardMedia
                  component="img"
                  width='100%'
                  height="180"
                  image={p.imageUrl}
                  alt={p.title}
                  sx={{ objectFit: "cover", borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                />

                {/* Content */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mb: 1 }}
                  >
                    {p.productTitle}
                  </Typography>
                  {/* <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                    {p.details}
                  </Typography> */}

                  <Typography 
                  variant="h6"
                   sx={{ 
                    mb: 1 ,
                    color: p.discount > 0 ? "success.main" : "secondary.main",
                  }}>
                    {p.discount > 0
                      ? `${p.discount}% off`
                      :`Use Code: ${p.code}`
                    }
                    </Typography>


                  <Rating
                    value={p.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography
                    variant="outlined"
                    display="block"
                    color="text.secondary"
                  >
                    ({p.ratingsCount} ratings)
                  </Typography>

                  {/* Badges */}
                  <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {p.badges?.map((b, i) => (
                      <Chip
                        key={i}
                        label={b}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    ))}
                  </Box>

                  {/* Countdown */}
                  {p.expiry && (
                    <Typography
                      variant="body2"
                      color="error"
                      sx={{ display: "block", mt: 2, fontWeight: "bold" }}
                    >
                      ⏳ <CountdownTimer expiry={p.expiry} />

                    </Typography>
                  )}
                </CardContent>

                {/* Action */}
                <CardActions sx={{ p: 2 }}>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => window.open(p.affiliateUrl, "_blank")}
                    sx={{ borderRadius: 3, textTransform: "none", fontWeight: "bold" }}
                  >
                    🛒 Grab Deal
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
