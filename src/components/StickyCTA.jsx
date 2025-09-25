import { Button } from "@mui/material";
// import CountdownBadge from "./ProductBuild/CountdownBadget";

export const StickyInBlogCTA =({ label = "Shop Now", href = "/offers", dealEndsAt })=> {
  return (
    <div style={{
      position: "fixed", right: 20, bottom: 20, zIndex: 1300,
      display: "flex", gap: 8, alignItems: "center"
    }}>
      {/* <CountdownBadge endTime={dealEndsAt} /> */}
      <Button
        variant="contained"
        color="secondary"
        sx={{ borderRadius: "30px", px: 3, py: 1.2, fontWeight: "bold", boxShadow: 3 }}
        onClick={() => href.startsWith("http") ? window.open(href, "_blank") : (window.location.href = href)}
      >
        🛍️ {label}
      </Button>
    </div>
  );
}
