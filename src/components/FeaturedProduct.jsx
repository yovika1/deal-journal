import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Rating,
  Box,
  IconButton,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "@mui/icons-material"; // 🔥 CHANGED

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import API_BASE from "../config";
import { StoreMessage } from "../Data/StoreMessage";

export const FeaturedOffers = () => {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedOffers = async () => {
try {
  const res = await axios.get(`${API_BASE}/getoffers/featured`);
  console.log("Featured offers response:", res.data);
  setOffers(res.data?.offers || res.data?.data || res?.data || []);
} catch (err) {
  console.error("Error fetching featured offers:", err);
  setError("⚠️ Failed to load featured offers. Please try again later.");
}

    };
    fetchFeaturedOffers();
  }, []);

  return (
    <div style={{ margin: "30px 0", width: "100%" }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        🔥 Featured Offers
      </Typography>
        
      {error ? (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      ) : offers.length === 0 ? (
        <Typography color="text.secondary" textAlign="center">
          No featured offers available right now.
        </Typography>
      ) : (
        <>
        <Box sx={{position: 'relative'}}>
        <Swiper
        
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          navigation={{
            nextEl: ".custom-next",   
              prevEl: ".custom-prev",  
          }}
          pagination={{
             el: ".custom-pagination",
             clickable: true
             }}
          autoplay={{ delay: 3000 }}
          loop
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            960: { slidesPerView: 3 },
          }}
          
         >
        {offers?.map((offer) => (
            <SwiperSlide key={offer._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: 3,
                  bgcolor: "#fff3e062",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src={offer?.imageUrl || offer?.image}
                  alt={offer.productTitle || offer.title}
                  style={{ width: "100%", height: 180, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" noWrap>
                    {offer.productTitle || offer.title}
                  </Typography>

                    <StoreMessage url={offer.imageUrl || offer.link} />

                  <Box sx={{ display: "flex", alignItems: "center", mt: 1, mb: 1 }}>
                    {offer.rating && (
                      <Rating
                        value={offer.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                    )}
                    {offer.ratingsCount && (
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                        ({offer.ratingsCount})
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: "flex",  flexWrap: "wrap", mb: 1 }}>
                    {offer.badges?.map((b, i) => (
                      <Chip key={i} label={b} size="small" color="secondary" variant="outlined" />
                    ))}
                  </Box>

                  <Typography color="primary" fontWeight="bold">
                    {offer.discount}% off
                  </Typography>
                </CardContent>

                <CardActions sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    href={offer.productUrl || offer.link}
                    target="_blank"
                    sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
                  >
                    Shop Now 
                  </Button>
                </CardActions>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        
         <IconButton
            className="custom-prev"
            sx={{
              position: "absolute",
              top: "50%",
              // left: "-50px",
              left: { xs: "-20px", sm: "-35px", md: "-42px" }, 
              transform: "translateY(-50%)",
              bgcolor: "white",
              // boxShadow: 2,
              p: { xs: 0.5, sm: 1 }, 
               "& svg": { fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" } },
              // "&:hover": { bgcolor: "grey.200" },
              zIndex: 10,
            }}
          >
            <ChevronLeft />
          </IconButton>

          <IconButton
            className="custom-next"
            sx={{
              position: "absolute",
              top: "50%",
               right: { xs: "-20px", sm: "-35px", md: "-42px" },
              transform: "translateY(-50%)",
              bgcolor: "white",
              // boxShadow: 2,
              p: { xs: 0.5, sm: 1 },
    "& svg": { fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" } },
              "&:hover": { bgcolor: "grey.200" },
              zIndex: 10,
            }}
          >
            <ChevronRight />
          </IconButton>

          </Box>
          {/* 🔥 CHANGED - Pagination container below cards */}
          <div
            className="custom-pagination"
            style={{
              marginTop: "17px",
            //  right: { xs: "5px", sm: "10px", md: "-50px" }, 
              display: "flex",
              justifyContent: "center",
              marginBottom:'10%'
            }}
          />
        </>
      )}
    </div>
  );
};
