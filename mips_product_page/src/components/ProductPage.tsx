import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

// 1. A shared type for our product.
export interface Product {
  id: string;
  name: string;
  price: number;
}

// 2. The props this component expects from the host
interface ProductPageProps {
  onAddToCart: (product: Product) => void;
}

// 3. A list of dummy products
const dummyProducts: Product[] = [
  { id: "p1", name: "MIPS T-Shirt", price: 24.99 },
  { id: "p2", name: "MIPS Hoodie", price: 49.99 },
  { id: "p3", name: "MIPS Sticker Pack", price: 9.99 },
];

// --- COMPONENT ---

const ProductPage = ({ onAddToCart = () => {} }: ProductPageProps) => {
  return (
    // Replaced main <div> with MUI Box
    <Box
      sx={{
        p: "1.5rem",
        border: "2px dashed",
        borderColor: "primary.main", // Use theme color
        borderRadius: "8px",
        bgcolor: "#17181aff", // Your custom background
        color: "#f1f1f1", // Your custom text
        maxWidth: "800px",
        my: "1rem", // Replaces margin: "1rem 0"
        textAlign: "left",
      }}
    >
      {/* Replaced <h2> with Typography */}
      <Typography
        variant="h4"
        component="h2"
        sx={{
          color: "primary.main", // Use theme color
          mt: 0,
          fontWeight: "bold",
        }}
      >
        📦 Product Page (Loaded from Remote)
      </Typography>

      {/* Replaced <p> with Typography */}
      <Typography variant="body1" sx={{ mb: 2 }}>
        This component lists products and calls the host's `onAddToCart`
        function.
      </Typography>

      {/* Replaced <div> with Box, kept grid styles in `sx` */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        {dummyProducts.map((product) => (
          // Replaced <div> with Card for a more semantic item
          <Card
            key={product.id}
            sx={{
              bgcolor: "#2a2a2a", // Your custom item background
              color: "inherit", // Inherit text color from parent Box
            }}
          >
            {/* CardContent adds MUI-standardized padding */}
            <CardContent>
              {/* Replaced <h4> with Typography */}
              <Typography
                variant="h6"
                component="h4"
                sx={{ marginTop: 0, fontWeight: "bold" }}
              >
                {product.name}
              </Typography>

              {/* Replaced <p> with Typography */}
              <Typography variant="body1" sx={{ mb: 2 }}>
                ${product.price.toFixed(2)}
              </Typography>

              {/* Replaced <button> with Button */}
              <Button
                variant="contained" // Gives background
                color="primary" // Uses blue theme color
                fullWidth // Replaces width: "100%"
                onClick={() => onAddToCart(product)}
                sx={{
                  fontWeight: "bold", // Your custom style
                }}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ProductPage;
